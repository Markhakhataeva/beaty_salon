# 💄 LUMIÈRE Beauty Studio

Современный сайт косметологической студии с системой онлайн-записи, авторизацией, панелью администратора и уведомлениями в Telegram.

## ✨ Возможности

- **Лендинг** — анимированная главная страница с услугами и CTA
- **Авторизация** — регистрация и вход через Supabase Auth
- **Личный кабинет** — клиент видит свои заявки и создаёт новые
- **Панель администратора** — все заявки, поиск, фильтры, смена статусов
- **Форма заявки** — выбор услуги, даты, времени, пожелания
- **Telegram-уведомления** — при каждой новой заявке бот отправляет сообщение
- **База данных** — все заявки хранятся в Supabase Postgres

## 🛠 Стек

- **Vite + React + TypeScript** — фронтенд
- **Tailwind CSS** — стилизация
- **Framer Motion** — анимации
- **Zustand** — глобальное состояние (auth + заявки)
- **Supabase** — БД (PostgreSQL) + Auth + RLS
- **Vercel** — деплой

## 🚀 Быстрый старт

### 1. Установите зависимости
```bash
npm install
```

### 2. Настройте Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Выполните `supabase-schema.sql` в SQL Editor
3. Скопируйте URL и anon key из Settings → API

### 3. Настройте Telegram бота

1. Напишите [@BotFather](https://t.me/BotFather) → `/newbot`
2. Сохраните токен бота
3. Добавьте бота в группу или запустите его личку, получите Chat ID через `getUpdates`

### 4. Создайте `.env`

```bash
cp .env.example .env
```

Заполните все переменные:
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_TELEGRAM_BOT_TOKEN=1234567890:AAF...
VITE_TELEGRAM_CHAT_ID=-100123456789
```

### 5. Запустите локально
```bash
npm run dev
```

### 6. Создайте администратора

1. Зарегистрируйтесь на сайте с нужным email
2. В Supabase SQL Editor выполните:
```sql
UPDATE profiles SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@your.email');
```

## 🌐 Деплой на Vercel

```bash
npm install -g vercel
vercel --prod
```

Добавьте переменные окружения в Vercel Dashboard → Project → Settings → Environment Variables.

## 📁 Структура проекта

```
src/
├── components/
│   ├── admin/      # Компоненты панели админа
│   ├── auth/       # Protected route
│   ├── client/     # Форма и карточки заявок
│   ├── layout/     # Navbar
│   └── ui/         # LoadingScreen
├── lib/
│   ├── supabase.ts  # Supabase client
│   └── telegram.ts  # Telegram API
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ClientPage.tsx
│   └── AdminPage.tsx
├── store/
│   ├── authStore.ts         # Zustand: авторизация
│   └── applicationsStore.ts # Zustand: заявки
└── types/
    └── index.ts
```

## 🎨 Дизайн-система

- **Цвета:** Rose (акцент), Nude (фон/нейтральный), Charcoal (текст)
- **Типографика:** Playfair Display (заголовки) + Inter (текст)
- **Анимации:** Framer Motion — fade-up, spring transitions, hover effects
- **Стиль:** Glassmorphism, gradient overlays, floating orbs
