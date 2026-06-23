import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Menu, X, Sparkles, User, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

export function Navbar() {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    toast.success('До свидания! 👋')
    navigate('/')
  }

  const isHome = location.pathname === '/'

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome ? 'glass border-b border-white/20' : 'bg-white/95 backdrop-blur-md border-b border-nude-100 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg group-hover:shadow-rose-300 transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-xl font-bold gradient-text tracking-wide">LUMIÈRE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-nude-600 hover:text-rose-500 transition-colors text-sm font-medium">
              Главная
            </Link>
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/client'}
                  className="flex items-center gap-1.5 text-nude-600 hover:text-rose-500 transition-colors text-sm font-medium"
                >
                  {user.role === 'admin' ? (
                    <><LayoutDashboard className="w-4 h-4" /> Панель</>
                  ) : (
                    <><User className="w-4 h-4" /> Личный кабинет</>
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-nude-500 hover:text-rose-500 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
                <div className="flex items-center gap-2 bg-nude-50 border border-nude-200 rounded-full px-3 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white text-xs font-bold">
                    {(user.full_name || user.email)[0].toUpperCase()}
                  </div>
                  <span className="text-sm text-nude-700 font-medium">{user.full_name?.split(' ')[0] || 'Профиль'}</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-nude-600 hover:text-rose-500 transition-colors text-sm font-medium">
                  Войти
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">
                  Записаться
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-nude-600 hover:bg-nude-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-nude-100 px-4 pb-4"
          >
            <div className="pt-3 flex flex-col gap-3">
              <Link to="/" className="text-nude-600 py-2 text-sm" onClick={() => setMobileOpen(false)}>Главная</Link>
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/client'}
                    className="text-nude-600 py-2 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {user.role === 'admin' ? 'Панель админа' : 'Личный кабинет'}
                  </Link>
                  <button onClick={handleSignOut} className="text-left text-nude-500 py-2 text-sm">
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-nude-600 py-2 text-sm" onClick={() => setMobileOpen(false)}>Войти</Link>
                  <Link to="/register" className="btn-primary text-center text-sm" onClick={() => setMobileOpen(false)}>Записаться</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
