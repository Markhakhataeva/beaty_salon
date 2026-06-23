import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Sparkles, UserPlus, Phone, User, Mail, Lock } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export function RegisterPage() {
  const { signUp, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', fullName: '', phone: '' })
  const [showPass, setShowPass] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Пароль должен быть не менее 6 символов')
      return
    }
    const { error } = await signUp(form.email, form.password, form.fullName, form.phone)
    if (error) {
      toast.error(error.includes('already') ? 'Этот email уже зарегистрирован' : error)
    } else {
      toast.success('Аккаунт создан! Добро пожаловать в LUMIÈRE 🌸')
      navigate('/client')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-nude-50 to-blush-50 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blush-200/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-rose-200/30 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold gradient-text">LUMIÈRE</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-charcoal mt-6">Создать аккаунт</h1>
          <p className="text-nude-500 mt-2">Станьте частью нашего сообщества красоты</p>
        </div>

        <div className="card p-8 shadow-xl shadow-rose-100/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-400" /> Полное имя
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={set('fullName')}
                placeholder="Анна Иванова"
                className="input-field"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="label flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-rose-400" /> Телефон
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+7 (999) 123-45-67"
                className="input-field"
              />
            </div>

            <div>
              <label className="label flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-rose-400" /> Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-400" /> Пароль
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Минимум 6 символов"
                  className="input-field pr-12"
                  required
                  minLength={6}
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
                <UserPlus className="w-4 h-4" />
              )}
              {isLoading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
            </motion.button>
          </form>

          <p className="text-xs text-nude-400 text-center mt-4 leading-relaxed">
            Регистрируясь, вы соглашаетесь с условиями использования и политикой конфиденциальности
          </p>

          <p className="text-center text-sm text-nude-500 mt-5">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-rose-500 hover:text-rose-600 font-medium">
              Войти
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
