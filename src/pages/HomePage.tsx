import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Shield, Leaf, Heart } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'

const SERVICES = [
  { name: 'Макияж', emoji: '💄', desc: 'Профессиональный макияж на любой случай' },
  { name: 'Уход за кожей', emoji: '✨', desc: 'Глубокое очищение и омоложение' },
  { name: 'Маникюр', emoji: '💅', desc: 'Идеальные ногти с долговременным эффектом' },
  { name: 'Окрашивание волос', emoji: '🎨', desc: 'Модные техники и натуральные краски' },
  { name: 'Брови и ресницы', emoji: '👁️', desc: 'Архитектура бровей и наращивание ресниц' },
  { name: 'СПА-процедуры', emoji: '🌸', desc: 'Расслабление и восстановление' },
]

const FEATURES = [
  { icon: Leaf, title: 'Натуральные ингредиенты', desc: '100% органические компоненты без вредных добавок' },
  { icon: Shield, title: 'Дерматологически проверено', desc: 'Все процедуры прошли клинические испытания' },
  { icon: Star, title: 'Премиум качество', desc: 'Косметика мирового класса от ведущих брендов' },
  { icon: Heart, title: 'Индивидуальный подход', desc: 'Программы созданы специально для вас' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-nude-50">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-nude-50 to-blush-50" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(244,63,94,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(253,164,175,0.2) 0%, transparent 40%),
                             radial-gradient(circle at 60% 80%, rgba(190,18,60,0.1) 0%, transparent 40%)`,
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-rose-200/40 to-blush-300/30 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 left-1/5 w-80 h-80 rounded-full bg-gradient-to-br from-nude-300/30 to-rose-200/20 blur-3xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-rose-200 rounded-full px-4 py-1.5 text-sm text-rose-600 font-medium mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Премиальная косметология в Москве
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-tight"
          >
            Красота — это{' '}
            <span className="gradient-text italic">искусство</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-nude-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Мы создаём неповторимые образы, используя лучшую органическую косметику и авторские техники. Ваша красота — наше призвание.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
              Записаться на приём
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn-outline text-base px-8 py-4">
              Войти в кабинет
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '2 000+', label: 'Довольных клиентов' },
              { value: '15+', label: 'Лет опыта' },
              { value: '98%', label: 'Рекомендуют нас' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-nude-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-rose-300 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-rose-500 text-sm font-medium uppercase tracking-widest">Наши услуги</span>
            <h2 className="font-display text-4xl font-bold text-charcoal mt-3">
              Всё для вашей красоты
            </h2>
            <p className="text-nude-600 mt-4 max-w-xl mx-auto">
              Широкий спектр косметологических услуг от профессионалов своего дела
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="card p-6 cursor-pointer group hover:shadow-lg hover:shadow-rose-100 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-nude-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {service.emoji}
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">{service.name}</h3>
                <p className="text-nude-500 text-sm mt-2 leading-relaxed">{service.desc}</p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1 text-rose-500 text-sm font-medium mt-4 hover:gap-2 transition-all"
                >
                  Записаться <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-charcoal to-midnight">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-rose-400 text-sm font-medium uppercase tracking-widest">Почему LUMIÈRE</span>
            <h2 className="font-display text-4xl font-bold text-white mt-3">
              Наши преимущества
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-white/50 text-xs mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-3xl p-10 shadow-2xl shadow-rose-300/40"
          >
            <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Готовы преобразиться?
            </h2>
            <p className="text-rose-100 mt-4 text-lg">
              Зарегистрируйтесь и запишитесь на первую процедуру уже сегодня
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-rose-600 font-semibold px-8 py-3 rounded-full hover:bg-rose-50 transition-colors shadow-lg"
              >
                Создать аккаунт
              </Link>
              <Link
                to="/login"
                className="border-2 border-white/40 text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Уже есть аккаунт
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white/60 py-10 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className="font-display text-white text-lg">LUMIÈRE</span>
        </div>
        <p>© 2024 LUMIÈRE Beauty Studio. Все права защищены.</p>
      </footer>
    </div>
  )
}
