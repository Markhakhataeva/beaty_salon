import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { sendTelegramNotification } from '../lib/telegram'
import { Application, ApplicationStatus } from '../types'

interface ApplicationsState {
  applications: Application[]
  isLoading: boolean
  fetchApplications: (userId?: string) => Promise<void>
  createApplication: (data: Omit<Application, 'id' | 'created_at' | 'status'> & {
    user_name?: string
    user_email?: string
  }) => Promise<{ error: string | null }>
  updateStatus: (id: string, status: ApplicationStatus) => Promise<{ error: string | null }>
}

export const useApplicationsStore = create<ApplicationsState>((set, get) => ({
  applications: [],
  isLoading: false,

  fetchApplications: async (userId?: string) => {
    set({ isLoading: true })
    try {
      let query = supabase
        .from('applications')
        .select(`
          *,
          profiles:user_id (full_name, phone)
        `)
        .order('created_at', { ascending: false })

      if (userId) {
        query = query.eq('user_id', userId)
      }

      const { data, error } = await query
      if (error) throw error

      const mapped = (data || []).map((item: Record<string, unknown>) => ({
        ...item,
        user_name: (item.profiles as { full_name?: string } | null)?.full_name,
      })) as Application[]

      set({ applications: mapped })
    } finally {
      set({ isLoading: false })
    }
  },

  createApplication: async (data) => {
    set({ isLoading: true })
    try {
      const { user_name, user_email, ...rest } = data
      const { data: created, error } = await supabase
        .from('applications')
        .insert({ ...rest, status: 'pending' })
        .select()
        .single()

      if (error) return { error: error.message }

      // Send Telegram notification
      await sendTelegramNotification({
        ...created,
        user_name,
        user_email,
      })

      // Refresh list
      await get().fetchApplications(data.user_id)
      return { error: null }
    } finally {
      set({ isLoading: false })
    }
  },

  updateStatus: async (id, status) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)

      if (error) return { error: error.message }

      set((state) => ({
        applications: state.applications.map((a) =>
          a.id === id ? { ...a, status } : a
        ),
      }))
      return { error: null }
    } catch (e) {
      return { error: 'Ошибка обновления статуса' }
    }
  },
}))
