import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import { User } from '../types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isInitialized: false,

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),

      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profile) {
              set({ user: { ...profile, email: session.user.email! } })
            }
          }
        } catch (error) {
          console.error('Init error:', error)
        } finally {
          set({ isInitialized: true })
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password })
          if (error) return { error: error.message }

          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()

          if (profile) {
            set({ user: { ...profile, email: data.user.email! } })
          }
          return { error: null }
        } finally {
          set({ isLoading: false })
        }
      },

      signUp: async (email, password, fullName, phone) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signUp({ email, password })
          if (error) return { error: error.message }
          if (!data.user) return { error: 'Ошибка создания аккаунта' }

          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              full_name: fullName,
              phone,
              role: 'client',
            })

          if (profileError) return { error: profileError.message }

          const newUser: User = {
            id: data.user.id,
            email,
            full_name: fullName,
            phone,
            role: 'client',
            created_at: new Date().toISOString(),
          }
          set({ user: newUser })
          return { error: null }
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null })
      },
    }),
    {
      name: 'lumiere-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
