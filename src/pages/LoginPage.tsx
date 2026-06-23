import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Sparkles, LogIn } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export function LoginPage() {
  const { signIn, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (error) {
      toast.error(error.includes('Invalid') ? 'Неверный email или пароль' : error)
    } else {
      toast.success('Добро пожаловать! 💄')
      const user = useAuthStore.getState().user
      navigate(user?.role === 'admin' ? '/admin' : '/client')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-nude-50 to-blush-50 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-nude-300/30 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg group-hover:shadow-rose-300 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold gradient-text">LUMIÈRE</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-charcoal mt-6">Добро пожаловать</h1>
          <p className="text-nude-500 mt-2">Войдите, чтобы управлять записями</p>
        </div>

        <div className="card p-8 shadow-xl shadow-rose-100/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="label">Пароль</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-nude-400 hover:text-nude-600 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoading ? 'Входим...' : 'Войти'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-nude-500 mt-6">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-rose-500 hover:text-rose-600 font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-nude-400 mt-6">
          <Link to="/" className="hover:text-rose-400 transition-colors">← На главную</Link>
        </p>
      </motion.div>
    </div>
  )
}
