import { Application } from '../types'

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

export async function sendTelegramNotification(application: Application & {
  user_name?: string
  user_email?: string
}): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured')
    return false
  }

  const serviceEmoji: Record<string, string> = {
    'Макияж': '💄',
    'Уход за кожей': '✨',
    'Маникюр': '💅',
    'Окрашивание волос': '🎨',
    'Брови и ресницы': '👁️',
    'СПА-процедуры': '🌸',
  }

  const emoji = serviceEmoji[application.service] || '💋'
  const statusMap = {
    pending: '⏳ Ожидает подтверждения',
    confirmed: '✅ Подтверждена',
    cancelled: '❌ Отменена',
    completed: '🎉 Завершена',
  }

  const message = `
${emoji} *Новая заявка на запись*

👤 *Клиент:* ${application.user_name || 'Не указано'}
📧 *Email:* ${application.user_email || 'Не указан'}
💆 *Услуга:* ${application.service}
📅 *Дата:* ${new Date(application.preferred_date).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
🕐 *Время:* ${application.preferred_time}
${application.message ? `📝 *Пожелания:* ${application.message}` : ''}
📊 *Статус:* ${statusMap[application.status]}

🔗 ID заявки: \`${application.id.slice(0, 8)}\`
  `.trim()

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    )
    const data = await response.json()
    return data.ok === true
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
    return false
  }
}
