import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, ClipboardList, TrendingUp, Clock, Search, RefreshCw } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { AdminApplicationRow } from '../components/admin/AdminApplicationRow'
import { useApplicationsStore } from '../store/applicationsStore'
import { ApplicationStatus } from '../types'

const STATUS_FILTERS: { value: ApplicationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'pending', label: '⏳ Ожидают' },
  { value: 'confirmed', label: '✅ Подтверждены' },
  { value: 'completed', label: '🎉 Завершены' },
  { value: 'cancelled', label: '❌ Отменены' },
]

export function AdminPage() {
  const { applications, fetchApplications, isLoading } = useApplicationsStore()
  const [filter, setFilter] = useState<ApplicationStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  const filtered = applications.filter((a) => {
    const matchStatus = filter === 'all' || a.status === filter
    const matchSearch = search === '' ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      (a.user_name || '').toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    confirmed: applications.filter(a => a.status === 'confirmed').length,
    revenue: applications.filter(a => a.status === 'completed').length * 3500,
  }

  return (
    <div className="min-h-screen bg-nude-50">
      <Navbar />

      <main className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-charcoal">Панель администратора</h1>
            <p className="text-nude-500 text-sm mt-1">Управление заявками и клиентами LUMIÈRE</p>
          </div>
          <button
            onClick={() => fetchApplications()}
            className="btn-outline flex items-center gap-2 self-start"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Обновить
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: ClipboardList, label: 'Всего заявок', value: stats.total, color: 'text-rose-500', bg: 'bg-rose-50' },
            { icon: Clock, label: 'Ожидают ответа', value: stats.pending, color: 'text-amber-500', bg: 'bg-amber-50' },
            { icon: Users, label: 'Подтверждено', value: stats.confirmed, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { icon: TrendingUp, label: 'Выручка (оценка)', value: `${stats.revenue.toLocaleString('ru-RU')} ₽`, color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-charcoal">{stat.value}</div>
              <div className="text-xs text-nude-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по услуге или клиенту..."
                className="input-field pl-10"
              />
            </div>
            {/* Status filter */}
            <div className="flex gap-2 flex-wrap">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    filter === f.value
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-nude-100 text-nude-600 hover:bg-nude-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card overflow-hidden"
        >
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 shimmer rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <ClipboardList className="w-12 h-12 text-nude-200 mx-auto mb-4" />
              <p className="text-nude-500">
                {search || filter !== 'all' ? 'Ничего не найдено' : 'Заявок пока нет'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nude-100 bg-nude-50/50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-nude-500 uppercase tracking-wide">Услуга</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-nude-500 uppercase tracking-wide">Клиент</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-nude-500 uppercase tracking-wide">Дата / Время</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-nude-500 uppercase tracking-wide">Статус</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-nude-500 uppercase tracking-wide">Создана</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, i) => (
                    <AdminApplicationRow key={app.id} application={app} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <p className="text-xs text-nude-400 mt-4 text-center">
          Показано {filtered.length} из {applications.length} заявок
        </p>
      </main>
    </div>
  )
}
