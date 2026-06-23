import { motion } from 'framer-motion'
import { Calendar, Clock, User, ChevronDown } from 'lucide-react'
import { Application, ApplicationStatus } from '../../types'
import { useApplicationsStore } from '../../store/applicationsStore'
import toast from 'react-hot-toast'

const statusConfig = {
  pending: { label: 'Ожидает', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  confirmed: { label: 'Подтверждена', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  cancelled: { label: 'Отменена', color: 'bg-red-100 text-red-600 border-red-200' },
  completed: { label: 'Завершена', color: 'bg-purple-100 text-purple-700 border-purple-200' },
}

const serviceEmoji: Record<string, string> = {
  'Макияж': '💄', 'Уход за кожей': '✨', 'Маникюр': '💅',
  'Окрашивание волос': '🎨', 'Брови и ресницы': '👁️', 'СПА-процедуры': '🌸',
}

interface Props {
  application: Application & { user_name?: string }
  index?: number
}

export function AdminApplicationRow({ application, index = 0 }: Props) {
  const { updateStatus } = useApplicationsStore()
  const emoji = serviceEmoji[application.service] || '💋'
  const status = statusConfig[application.status]

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    const { error } = await updateStatus(application.id, newStatus)
    if (error) {
      toast.error('Ошибка обновления статуса')
    } else {
      toast.success(`Статус изменён на "${statusConfig[newStatus].label}"`)
    }
  }

  const formattedDate = new Date(application.preferred_date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  })

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-nude-100 hover:bg-nude-50/50 transition-colors"
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">{emoji}</span>
          <div>
            <p className="font-medium text-charcoal text-sm">{application.service}</p>
            <p className="text-xs text-nude-400 mt-0.5 truncate max-w-[180px]">
              {application.message || 'Без пожеланий'}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5 text-sm text-nude-600">
          <User className="w-3.5 h-3.5 text-nude-400" />
          {application.user_name || 'Клиент'}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1 text-sm text-nude-600">
          <Calendar className="w-3.5 h-3.5 text-nude-400" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-1 text-xs text-nude-400 mt-0.5">
          <Clock className="w-3 h-3" />
          {application.preferred_time}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="relative inline-flex items-center">
          <select
            value={application.status}
            onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
            className={`status-badge border pr-7 cursor-pointer appearance-none ${status.color} focus:outline-none focus:ring-2 focus:ring-rose-300`}
          >
            <option value="pending">⏳ Ожидает</option>
            <option value="confirmed">✅ Подтверждена</option>
            <option value="cancelled">❌ Отменена</option>
            <option value="completed">🎉 Завершена</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-2 pointer-events-none opacity-60" />
        </div>
      </td>
      <td className="py-4 px-4 text-xs text-nude-400">
        {new Date(application.created_at).toLocaleDateString('ru-RU')}
      </td>
    </motion.tr>
  )
}
