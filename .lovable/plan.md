

## Улучшение админ-панели

### Что будет сделано

**1. Загрузка медиафайлов (фото) в блоках**
- Добавляется компонент `ImageUploader` -- кнопка выбора файла с превью загруженного изображения
- Файлы загружаются в уже существующее хранилище `page-images` (bucket уже создан и публичный)
- В JSONB-контент блока сохраняется только URL загруженного файла
- Загрузка фото добавляется в блоки: PropertyHero (фон баннера), PhotoGallery (массив фотографий), LocationSection (фото карточек)

**2. Все блоки видны сразу (без кликов)**
- Убирается текущая логика "выбери блок -- увидь форму". Вместо этого все блоки отображаются подряд в виде аккордеона (Collapsible-секции), каждый раскрыт по умолчанию
- Левая колонка с выбором блоков убирается; весь редактор -- единый список секций, прокручиваемый вертикально
- Drag-and-drop порядок блоков и переключатель включения/выключения сохраняются

**3. Базовое форматирование текста (WYSIWYG)**
- Устанавливается легковесная библиотека `tiptap` (самый популярный WYSIWYG для React, маленький бандл)
- Добавляется компонент `RichTextEditor` с тулбаром: жирный, курсив, маркированный список, нумерованный список
- Контент хранится как HTML-строка в JSONB
- Применяется к текстовым полям блоков (описания в PropertyDetails, LocationSection, FAQ и т.д.)
- На публичной странице HTML рендерится через `dangerouslySetInnerHTML` с санитизацией

---

### Техническая часть

**Новые зависимости:**
- `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-bold`, `@tiptap/extension-italic`, `@tiptap/extension-bullet-list`, `@tiptap/extension-ordered-list`, `@tiptap/extension-list-item` -- WYSIWYG-редактор

**Новые компоненты:**
- `src/components/admin/ImageUploader.tsx` -- загрузка файла в storage + превью
- `src/components/admin/RichTextEditor.tsx` -- tiptap-обертка с тулбаром

**Изменяемые файлы:**
- `src/pages/AdminPageEditor.tsx` -- полная переработка: убрать двухколоночный макет, показать все блоки подряд как аккордеон, интегрировать ImageUploader и RichTextEditor в формы блоков
- `src/components/PropertyHero.tsx` -- принимать URL фонового изображения из `content.image`
- `src/components/PhotoGallery.tsx` -- принимать массив URL изображений из `content.images[]`
- `src/components/PropertyDetails.tsx` -- рендерить HTML из `content.description_html`
- `src/components/LocationSection.tsx` -- рендерить HTML из `content.description_html`, принимать URL изображений карточек

**Структура загрузки изображений:**
- Путь в storage: `page-images/{page_id}/{block_id}/{filename}`
- RLS: нужно добавить политику INSERT/UPDATE для авторизованных админов на `storage.objects` для bucket `page-images`

**Структура контента блоков после обновления (примеры JSONB):**
```
PropertyHero: { title, subtitle, rating, image: "https://...url" }
PhotoGallery: { images: ["url1", "url2", ...] }
PropertyDetails: { price, presentation_url, description_html: "<p>текст...</p>" }
LocationSection: { title, address, description_html, card1_image, card2_image }
```

