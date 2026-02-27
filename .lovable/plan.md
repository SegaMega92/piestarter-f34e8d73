

## Plan: Комбинированный редактор графиков (таблица + импорт XLS)

### Что делаем

Превращаем захардкоженный `FinancialSection` в управляемый блок с тремя наборами данных (доход, стоимость, оборот), редактируемыми через табличный интерфейс в админке с возможностью импорта из XLS.

### Структура данных в `content` блока `FinancialSection`

```text
content: {
  income_data:   [{ month: "янв. 25", value: 200 }, ...],
  value_data:    [{ month: "фев. 25", value: 500 }, ...],
  turnover_data: [{ month: "мар. 25", value: 100 }, ...],
  buy_url:       "https://...",
  contact_url:   "https://..."
}
```

### Шаги реализации

**1. Установить библиотеку `xlsx` (SheetJS)**
- Нужна для парсинга загруженных XLS/XLSX файлов на клиенте.

**2. Создать компонент `ChartDataEditor`** (`src/components/admin/ChartDataEditor.tsx`)
- Табличный редактор с колонками "Месяц" и "Значение"
- Кнопки: "Добавить строку", "Удалить строку" (иконка корзины у каждой строки)
- Кнопка "Импорт из XLS" — открывает file input, парсит первые две колонки файла как month/value, заполняет таблицу
- Три вкладки (Tabs): "Доход на пай", "Стоимость пая", "Оборот паев" — каждая со своим набором данных
- Используем существующие UI-компоненты: `Input`, `Button`, `Tabs`, `Table`

**3. Добавить case `FinancialSection` в `BlockEditorForm`**
- Рендерит `ChartDataEditor` с тремя наборами данных
- Поля для `buy_url` и `contact_url` (ссылки на кнопках)

**4. Обновить компонент `FinancialSection`**
- Принимает `content` через пропсы (как остальные блоки)
- Читает `income_data`, `value_data`, `turnover_data` из `content`
- Fallback на текущие захардкоженные данные, если `content` пуст (обратная совместимость)
- Переключение вкладок показывает данные соответствующего набора

**5. Обновить `PropertyPage.tsx`**
- Передать `content` в `FinancialSection`: `<FinancialSection content={getContent("FinancialSection")} />`

**6. Добавить блок `FinancialSection` на существующие страницы**
- Выполнить SQL: вставить записи `FinancialSection` в `page_blocks` для всех существующих страниц, у которых его ещё нет.

