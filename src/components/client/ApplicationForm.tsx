import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MessageSquare, Sparkles, Send } from 'lucide-react'
import { useApplicationsStore } from '../../store/applicationsStore'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

const SERVICES = [
  { name: 'Макияж', emoji: '💄', price: 'от 3 000 ₽' },
  { name: 'Уход за кожей', emoji: '✨', price: 'от 4 500 ₽' },
  { name: 'Маникюр', emoji: '💅', price: 'от 2 000 ₽' },
  { name: 'Окрашивание волос', emoji: '🎨', price: 'от 6 000 ₽' },
  { name: 'Брови и ресницы', emoji: '👁️', price: 'от 1 500 ₽' },
  { name: 'СПА-процедуры', emoji: '🌸', price: 'от 5 000 ₽' },
]

const TIMES = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
]

export function ApplicationForm({ onSuccess }: { onSuccess?: () => void }) {
  const { user } = useAuthStore()
  const { createApplication, isLoading } = useApplicationsStore()
  const [selectedService, setSelectedService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (!selectedService || !date || !time) {
      toast.error('Пожалуйста, заполните все обязательные поля')
      return
    }

    const { error } = await createApplication({
      user_id: user.id,
      service: selectedService,
      preferred_date: date,
      preferred_time: time,
      message: message || undefined,
      user_name: user.full_name,
      user_email: user.email,
    })

    if (error) {
      toast.error('Ошибка при отправке заявки: ' + error)
    } else {
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время 💄')
      setSelectedService('')
      setDate('')
      setTime('')
      setMessage('')
      onSuccess?.()
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Service Selection */}
      <div>
        <label className="label flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-400" />
          Выберите услугу *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
          {SERVICES.map((service) => (
            <motion.button
              key={service.name}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedService(service.name)}
              className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedService === service.name
                  ? 'border-rose-400 bg-rose-50 shadow-sm shadow-rose-100'
                  : 'border-nude-200 bg-white hover:border-rose-300 hover:bg-nude-50'
              }`}
            >
              <span className="text-xl">{service.emoji}</span>
              <p className="text-xs font-semibold text-charcoal mt-1 leading-tight">{service.name}</p>
              <p className="text-xs text-nude-500 mt-0.5">{service.price}</p>
              {selectedService === service.name && (
                <motion.div
                  layoutId="service-check"
                  className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center"
                  initial={false}
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-400" />
            Дата *
          </label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-400" />
            Удобное время *
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Выберите время</option>
            {TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="label flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-rose-400" />
          Пожелания или вопросы
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Расскажите о своих пожеланиях, аллергиях или особых требованиях..."
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2 text-base"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {isLoading ? 'Отправляем...' : 'Отправить заявку'}
      </motion.button>
    </motion.form>
  )
}
