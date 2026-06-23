import { motion } from 'framer-motion'
import { Calendar, Clock, MessageSquare } from 'lucide-react'
import { Application } from '../../types'

const statusConfig = {
  pending: { label: 'Ожидает', color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-400' },
  confirmed: { label: 'Подтверждена', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-400' },
  cancelled: { label: 'Отменена', color: 'bg-red-100 text-red-600 border-red-200', dot: 'bg-red-400' },
  completed: { label: 'Завершена', color: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'bg-purple-400' },
}

const serviceEmoji: Record<string, string> = {
  'Макияж': '💄',
  'Уход за кожей': '✨',
  'Маникюр': '💅',
  'Окрашивание волос': '🎨',
  'Брови и ресницы': '👁️',
  'СПА-процедуры': '🌸',
}

interface Props {
  application: Application
  index?: number
}

export function ApplicationCard({ application, index = 0 }: Props) {
  const status = statusConfig[application.status]
  const emoji = serviceEmoji[application.service] || '💋'
  const formattedDate = new Date(application.preferred_date).toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card p-4 sm:p-5 hover:shadow-md transition-shadow duration-300 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-50 to-nude-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
            {emoji}
          </div>
          <div>
            <h3 className="font-semibold text-charcoal">{application.service}</h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-nude-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {application.preferred_time}
              </span>
            </div>
          </div>
        </div>
        <span className={`status-badge border ${status.color} flex-shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {application.message && (
        <div className="mt-3 pt-3 border-t border-nude-100 flex items-start gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-nude-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-nude-600 leading-relaxed">{application.message}</p>
        </div>
      )}

      <div className="mt-3 pt-2 text-xs text-nude-400">
        Создана {new Date(application.created_at).toLocaleDateString('ru-RU')}
      </div>
    </motion.div>
  )
}
