export interface User {
  id: string
  email: string
  role: 'admin' | 'client'
  full_name?: string
  phone?: string
  created_at: string
}

export interface Application {
  id: string
  user_id: string
  user_email?: string
  user_name?: string
  service: string
  preferred_date: string
  preferred_time: string
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
}

export type ApplicationStatus = Application['status']

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  category: string
}
