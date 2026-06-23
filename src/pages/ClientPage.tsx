import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusCircle, ClipboardList, Sparkles, X } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { ApplicationForm } from '../components/client/ApplicationForm'
import { ApplicationCard } from '../components/client/ApplicationCard'
import { useAuthStore } from '../store/authStore'
import { useApplicationsStore } from '../store/applicationsStore'

export function ClientPage() {
  const { user } = useAuthStore()
  const { applications, fetchApplications, isLoading } = useApplicationsStore()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (user) fetchApplications(user.id)
  }, [user, fetchApplications])

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    confirmed: applications.filter(a => a.status === 'confirmed').length,
    completed: applications.filter(a => a.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-nude-50">
      <Navbar />

      <main className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg">
              {(user?.full_name || user?.email || 'К')[0].toUpperCase()}
            </div>
            <div>
              <p className="text-nude-500 text-sm">Добро пожаловать,</p>
              <h1 className="font-display text-2xl font-bold text-charcoal">
                {user?.full_name || user?.email}
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Всего заявок', value: stats.total, color: 'from-rose-400 to-rose-600' },
            { label: 'Ожидают', value: stats.pending, color: 'from-amber-400 to-amber-500' },
            { label: 'Подтверждены', value: stats.confirmed, color: 'from-emerald-400 to-emerald-500' },
            { label: 'Завершены', value: stats.completed, color: 'from-purple-400 to-purple-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-4 text-center"
            >
              <div className={`text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs text-nude-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* New application button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Новая заявка
          </button>
        </motion.div>

        {/* Applications list */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-rose-400" />
            <h2 className="font-display text-xl font-semibold text-charcoal">Мои заявки</h2>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="card p-5 h-24 shimmer" />
              ))}
            </div>
          ) : applications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-12 text-center"
            >
              <Sparkles className="w-12 h-12 text-rose-200 mx-auto mb-4" />
              <h3 className="font-display text-xl text-charcoal">Заявок пока нет</h3>
              <p className="text-nude-500 text-sm mt-2 mb-6">
                Запишитесь на первую процедуру и откройте для себя мир красоты
              </p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                Записаться сейчас
              </button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {applications.map((app, i) => (
                <ApplicationCard key={app.id} application={app} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-nude-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  <h2 className="font-display text-xl font-bold text-charcoal">Новая заявка</h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-lg hover:bg-nude-100 text-nude-400 hover:text-charcoal transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <ApplicationForm onSuccess={() => setShowForm(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
