# PieStarter — Документация проекта

> Платформа для управления и публикации страниц инвестиционных объектов недвижимости с админ-панелью.

**Продакшн URL:** https://piestarter.lovable.app  
**Стек:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Lovable Cloud (Supabase)

---

## Оглавление

1. [Структура проекта](#1-структура-проекта)
2. [Маршрутизация](#2-маршрутизация)
3. [База данных](#3-база-данных)
4. [Авторизация и роли](#4-авторизация-и-роли)
5. [Публичная часть](#5-публичная-часть)
6. [Админ-панель](#6-админ-панель)
7. [CMS-система (блоки страниц)](#7-cms-система-блоки-страниц)
8. [Глобальные настройки (FAQ, Контакты)](#8-глобальные-настройки-faq-контакты)
9. [Загрузка изображений](#9-загрузка-изображений)
10. [WYSIWYG-редактор](#10-wysiwyg-редактор)
11. [Edge Functions](#11-edge-functions)
12. [Дизайн-система](#12-дизайн-система)
13. [Ассеты](#13-ассеты)
14. [Полезные заметки](#14-полезные-заметки)

---

## 1. Структура проекта

```
src/
├── App.tsx                     # Корневой компонент, маршруты
├── main.tsx                    # Точка входа
├── index.css                   # Глобальные стили, CSS-переменные
├── contexts/
│   └── AuthContext.tsx          # Контекст авторизации (user, isAdmin, signIn, signOut)
├── pages/
│   ├── Index.tsx                # Главная страница (статический шаблон)
│   ├── PropertyPage.tsx         # Динамическая страница объекта (/objects/:slug)
│   ├── AdminLogin.tsx           # Форма входа в админку
│   ├── AdminPages.tsx           # Список страниц (CRUD)
│   ├── AdminPageEditor.tsx      # Редактор страницы (блоки аккордеоном)
│   ├── AdminFAQ.tsx             # Управление FAQ (глобальное)
│   ├── AdminContactForm.tsx     # Настройки контактной формы (глобальное)
│   └── NotFound.tsx             # 404
├── components/
│   ├── Header.tsx               # Шапка сайта
│   ├── Footer.tsx               # Подвал сайта
│   ├── PropertyHero.tsx         # Баннер объекта (заголовок, рейтинг, фон)
│   ├── PropertyStats.tsx        # Блок статистики (4 показателя)
│   ├── PhotoGallery.tsx         # Фотогалерея объекта
│   ├── PropertyDetails.tsx      # Детали объекта (цена, описание, презентация)
│   ├── LocationSection.tsx      # Секция локации (карта Яндекс, адрес, координаты)
│   ├── FinancialSection.tsx     # Финансовый раздел (графики)
│   ├── SimilarProperties.tsx    # Похожие объекты
│   ├── FAQSection.tsx           # Секция FAQ (загружает из site_settings)
│   ├── ContactForm.tsx          # Контактная форма (загружает из site_settings)
│   ├── NavLink.tsx              # Навигационная ссылка
│   ├── admin/
│   │   ├── AdminLayout.tsx      # Layout админки (навбар, проверка роли, Outlet)
│   │   ├── BlockEditorForm.tsx  # Формы редактирования для каждого типа блока
│   │   ├── ImageUploader.tsx    # Загрузка одного/нескольких изображений в storage
│   │   └── RichTextEditor.tsx   # WYSIWYG-редактор на tiptap
│   └── ui/                      # shadcn/ui компоненты (не трогать без необходимости)
├── integrations/supabase/
│   ├── client.ts                # Supabase SDK клиент (НЕ РЕДАКТИРОВАТЬ — автогенерация)
│   └── types.ts                 # Типы БД (НЕ РЕДАКТИРОВАТЬ — автогенерация)
├── hooks/
│   ├── use-mobile.tsx           # Определение мобильного viewport
│   └── use-toast.ts             # Хук для тостов
├── lib/
│   ├── utils.ts                 # cn() и утилиты
│   └── copyToClipboard.ts      # Копирование в буфер обмена
└── assets/                      # Статические ассеты (SVG-иконки, PNG-изображения)

supabase/
├── config.toml                  # Конфигурация Supabase (НЕ РЕДАКТИРОВАТЬ)
└── functions/
    └── create-admin/
        └── index.ts             # Edge function для создания админа
```

---

## 2. Маршрутизация

Определена в `src/App.tsx`:

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | `Index` | Главная страница (статический шаблон-витрина) |
| `/objects/:slug` | `PropertyPage` | Динамическая страница объекта (данные из БД) |
| `/admin/login` | `AdminLogin` | Форма входа администратора |
| `/admin` | `AdminLayout > AdminPages` | Список всех страниц объектов |
| `/admin/pages/:id` | `AdminLayout > AdminPageEditor` | Редактор конкретной страницы |
| `/admin/faq` | `AdminLayout > AdminFAQ` | Управление FAQ |
| `/admin/contact` | `AdminLayout > AdminContactForm` | Настройки контактной формы |
| `*` | `NotFound` | 404 |

**AdminLayout** (`src/components/admin/AdminLayout.tsx`) — layout-обёртка для всех админских маршрутов. Проверяет авторизацию и роль `admin` через `useAuth()`. Если пользователь не авторизован или не админ — редирект на `/admin/login`.

---

## 3. База данных

### Таблицы

#### `pages`
Страницы объектов недвижимости.

| Колонка | Тип | Описание |
|---------|-----|----------|
| `id` | uuid (PK) | Уникальный ID |
| `title` | text | Название страницы |
| `slug` | text | URL-slug (используется в `/objects/:slug`) |
| `status` | text | `'draft'` или `'published'` |
| `created_at` | timestamptz | Дата создания |
| `updated_at` | timestamptz | Дата обновления |

**RLS-политики:**
- Админы могут всё (CRUD)
- Все могут читать страницы со статусом `published`

#### `page_blocks`
Блоки контента привязанные к страницам. Каждый блок — это секция на публичной странице.

| Колонка | Тип | Описание |
|---------|-----|----------|
| `id` | uuid (PK) | Уникальный ID |
| `page_id` | uuid (FK → pages) | Ссылка на страницу |
| `block_type` | text | Тип блока (см. ниже) |
| `sort_order` | integer | Порядок отображения |
| `enabled` | boolean | Включён/выключен |
| `content` | jsonb | Содержимое блока (произвольная структура) |
| `created_at` | timestamptz | Дата создания |
| `updated_at` | timestamptz | Дата обновления |

**RLS-политики:**
- Админы могут всё (CRUD)
- Все могут читать блоки опубликованных страниц

#### `site_settings`
Глобальные настройки сайта (FAQ, контактная форма).

| Колонка | Тип | Описание |
|---------|-----|----------|
| `key` | text (PK) | Уникальный ключ настройки |
| `value` | jsonb | Значение (произвольная структура) |
| `updated_at` | timestamptz | Дата обновления |

**Существующие ключи:**
- `faq_items` — массив `{ question, answer }`
- `faq_settings` — `{ title, description }`
- `contact_form` — `{ title, subtitle, telegram_url, email, fields: [{ name, label, type, enabled }] }`

**RLS-политики:**
- Админы могут всё
- Все могут читать

#### `user_roles`
Роли пользователей.

| Колонка | Тип | Описание |
|---------|-----|----------|
| `id` | uuid (PK) | ID |
| `user_id` | uuid | ID пользователя из auth.users |
| `role` | app_role (enum) | `'admin'` или `'user'` |

**RLS-политики:**
- Пользователи могут читать только свои роли

### Функции БД

- `has_role(_user_id uuid, _role app_role)` — SECURITY DEFINER функция для проверки роли (используется в RLS-политиках)
- `update_updated_at_column()` — триггерная функция для автообновления `updated_at`

### Хранилище (Storage)

- **Bucket:** `page-images` (публичный)
- **Путь файлов:** `{page_id}/{block_id}/{timestamp}.{ext}`
- Используется для загрузки фотографий объектов через админку

---

## 4. Авторизация и роли

**Файл:** `src/contexts/AuthContext.tsx`

### Как работает

1. `AuthProvider` оборачивает всё приложение в `App.tsx`
2. При инициализации вызывается `supabase.auth.getSession()` для восстановления сессии
3. Подписка на `onAuthStateChange` отслеживает изменения авторизации
4. После получения сессии проверяется роль через запрос к `user_roles`
5. Контекст предоставляет: `user`, `session`, `isAdmin`, `loading`, `signIn()`, `signOut()`

### Вход в админку

- URL: `/admin/login`
- Email + пароль
- После успешного входа — проверка роли `admin` в `user_roles`
- Если роль не найдена — перенаправление обратно на `/admin/login`

### Создание админа

Через edge function `create-admin`:
```bash
# Вызов через API
POST /functions/v1/create-admin
Body: { "email": "admin@example.com", "password": "your-password" }
```
Функция создаёт пользователя с подтверждённым email и назначает роль `admin`.

---

## 5. Публичная часть

### Главная страница (`/`)

**Файл:** `src/pages/Index.tsx`

Статическая страница-витрина с захардкоженными данными. Состоит из секций:
Header → PropertyHero → PropertyStats → PhotoGallery → PropertyDetails → LocationSection → FinancialSection → SimilarProperties → FAQSection → ContactForm → Footer

### Динамическая страница объекта (`/objects/:slug`)

**Файл:** `src/pages/PropertyPage.tsx`

1. По `slug` из URL загружает страницу из таблицы `pages` (только `published`)
2. Загружает связанные блоки из `page_blocks`, сортируя по `sort_order`
3. Фильтрует только `enabled` блоки
4. Рендерит соответствующие компоненты, передавая `content` из JSONB как пропсы

**Компоненты принимают опциональный проп `content`:**
- Если `content` передан — используют данные из него (динамическая страница)
- Если нет — используют захардкоженные дефолтные данные (главная страница `/`)

### FAQ и Контактная форма

Эти секции **глобальные** — одинаковые на всех страницах. Данные загружаются из таблицы `site_settings`.

---

## 6. Админ-панель

### Доступ
URL: `/admin` → требуется авторизация с ролью `admin`.

### Навигация (AdminLayout)
- **Страницы** (`/admin`) — CRUD страниц объектов
- **FAQ** (`/admin/faq`) — управление вопросами и ответами
- **Контакты** (`/admin/contact`) — настройки контактной формы

### Список страниц (AdminPages)

**Файл:** `src/pages/AdminPages.tsx`

- Таблица со всеми страницами
- Действия: создать, редактировать, дублировать, удалить, просмотреть
- При создании страницы автоматически создаются все 7 типов блоков с пустым контентом

### Редактор страницы (AdminPageEditor)

**Файл:** `src/pages/AdminPageEditor.tsx`

- Все блоки отображаются подряд в виде аккордеона (Collapsible), каждый раскрыт по умолчанию
- Drag-and-drop для изменения порядка блоков
- Switch для включения/выключения каждого блока
- Редактирование названия, slug, статуса (черновик/опубликован)
- Липкая панель сохранения внизу с индикатором несохранённых изменений
- Предупреждение при попытке закрыть страницу с несохранёнными данными (`beforeunload`)

---

## 7. CMS-система (блоки страниц)

### Типы блоков

Определены в `AdminPages.tsx` (массив `BLOCK_TYPES`) и рендерятся через `BlockEditorForm.tsx`.

| block_type | Название в UI | Поля JSONB content |
|------------|--------------|-------------------|
| `PropertyHero` | Главный баннер | `title`, `subtitle`, `rating`, `image` (URL) |
| `PropertyStats` | Статистика | `stat_label_0..3`, `stat_value_0..3` |
| `PhotoGallery` | Фотогалерея | `images` — массив `{ url, caption }` |
| `PropertyDetails` | Детали объекта | `price`, `presentation_url`, `description_html` |
| `LocationSection` | Локация | `title`, `address`, `coordinates` ("lat, lon"), `description_html`, `card1_image`, `card2_image` |
| `FinancialSection` | Финансы | `title`, `description_html` |
| `SimilarProperties` | Похожие объекты | `title`, `description_html` |

### Как работает редактирование

**Файл:** `src/components/admin/BlockEditorForm.tsx`

- Компонент получает `block`, `pageId` и callback `onUpdate(field, value)`
- В зависимости от `block_type` рендерит нужные поля (Input, ImageUploader, RichTextEditor)
- Изменения сохраняются в state родительского компонента (AdminPageEditor)
- Фактическое сохранение в БД происходит по нажатию кнопки "Сохранить"

---

## 8. Глобальные настройки (FAQ, Контакты)

### FAQ (`/admin/faq`)

**Файл:** `src/pages/AdminFAQ.tsx`

- Заголовок и описание секции (`faq_settings`)
- Список вопросов-ответов (`faq_items`) с drag-and-drop сортировкой
- Добавление/удаление вопросов

### Контактная форма (`/admin/contact`)

**Файл:** `src/pages/AdminContactForm.tsx`

- Заголовок, подзаголовок
- Ссылка на Telegram, email
- Управление полями формы (вкл/выкл, редактирование подписей)

Оба раздела сохраняют данные в таблицу `site_settings` с соответствующими ключами.

---

## 9. Загрузка изображений

**Файл:** `src/components/admin/ImageUploader.tsx`

### Одиночная загрузка (ImageUploader)
- Загружает файл в Storage bucket `page-images`
- Путь: `{pageId}/{blockId}/{timestamp}.{ext}`
- Показывает превью загруженного изображения
- Кнопка удаления (крестик)

### Множественная загрузка (MultiImageUploader)
- Для галереи фотографий
- Поддержка drag-and-drop сортировки фотографий
- Подпись к каждому фото (caption)
- Поддержка двух форматов: старый `string[]` и новый `{ url, caption }[]`

---

## 10. WYSIWYG-редактор

**Файл:** `src/components/admin/RichTextEditor.tsx`

- Построен на **tiptap** (`@tiptap/react` + `@tiptap/starter-kit`)
- Тулбар: жирный, курсив, маркированный список, нумерованный список
- Контент хранится как HTML-строка в JSONB
- На публичных страницах HTML рендерится через `dangerouslySetInnerHTML`

---

## 11. Edge Functions

### `create-admin`

**Файл:** `supabase/functions/create-admin/index.ts`

- Создаёт нового пользователя с подтверждённым email
- Назначает роль `admin` в таблице `user_roles`
- Использует `SUPABASE_SERVICE_ROLE_KEY` (автоматически доступен)
- Вызов: `POST /functions/v1/create-admin` с `{ email, password }`

---

## 12. Дизайн-система

### Шрифты
- **Onest** — основной шрифт (заголовки, текст)
- **Inter** — вспомогательный

Подключены через Google Fonts в `index.css`.

### Цвета

Семантические токены в `index.css` (HSL формат):
- `--primary: 213 80% 50%` — основной синий
- `--background: 0 0% 99%`
- `--foreground: 210 20% 4%`
- и другие стандартные shadcn-токены

Кастомные цвета в `tailwind.config.ts`:
- `p-blue` (#abe4f5), `blue-second` (#397fff)
- `azure-4`, `azure-13`, `cyan-2` — тёмные тона
- `grey-30..96` — серая палитра
- `bg-main` (#fcfcfc) — фон страницы

### Контейнер контента
```css
.content-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px / 32px / 70px; /* адаптивно */
}
```

---

## 13. Ассеты

Все статические ассеты лежат в `src/assets/`:

| Файл | Назначение |
|------|-----------|
| `logo_pie.svg` | Логотип |
| `image-card1..3.png` | Карточки похожих объектов |
| `image-slide1..5.png` | Слайды галереи |
| `image-hub.png`, `image-map.png`, `image-warehouse.png` | Иллюстрации |
| `play-btn.svg` | Кнопка воспроизведения |
| `price-bg.svg` | Фон секции цены |
| `svg-search.svg`, `svg-user.svg` и т.д. | UI-иконки |
| `telegram.svg`, `telegram-2.svg` | Иконки Telegram |
| `graph.svg`, `graph1.svg` | Графики |

---

## 14. Полезные заметки

### Файлы которые НЕЛЬЗЯ редактировать
- `src/integrations/supabase/client.ts` — автогенерация
- `src/integrations/supabase/types.ts` — автогенерация
- `supabase/config.toml` — автогенерация
- `.env` — автогенерация
- `package.json` — только через инструменты Lovable

### Секреты (уже настроены)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — доступ к БД
- `SUPABASE_DB_URL` — прямое подключение к БД
- `SUPABASE_PUBLISHABLE_KEY` — публичный ключ
- `LOVABLE_API_KEY` — ключ для AI-функций

### Зависимости (ключевые)
- `react-router-dom` — маршрутизация
- `@tanstack/react-query` — подключён, но пока мало используется
- `@supabase/supabase-js` — работа с БД
- `@tiptap/react` + `@tiptap/starter-kit` — WYSIWYG-редактор
- `sonner` — тосты/уведомления
- `lucide-react` — иконки
- shadcn/ui (radix) — UI-компоненты

### Карта Яндекс
В `LocationSection` используется iframe Яндекс.Карт:
- Координаты задаются одним полем: `"56.757702, 60.752964"`
- Парсятся и подставляются в URL: `ll={lon},{lat}&pt={lon},{lat},pm2blm`
- Дефолт: Екатеринбург

### Что стоит доделать (по состоянию плана)
- Storage RLS: добавить политику INSERT/UPDATE для админов на `storage.objects` для bucket `page-images`
- FinancialSection и SimilarProperties пока не подключены к динамическим данным из БД
- Публичная главная `/` — статическая, можно сделать каталогом опубликованных объектов
