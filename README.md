# CRM Система

Небольшая CRM система с богатым функционалом, разработанная на современных веб-технологиях. Проект демонстрирует возможности управления задачами, пользователями и группами проектов в удобном и интуитивно понятном интерфейсе.

## 🚀 Возможности

### Аутентификация
- Регистрация и авторизация пользователей.
- Безопасная аутентификация через Appwrite.

### Управление задачами
- **Создание задач**: Возможность добавить задачу с параметрами:
  - Название
  - Описание
  - Группа проекта
  - Срок выполнения
  - Статус
  - Метка "Важная"
- **Редактирование задач**
- **Канбан-доска**: Задачи распределяются по категориям:
  - Просроченные
  - На сегодня
  - На этой неделе
  - На следующей неделе
- **Комментарии к задачам**:
  - Добавление комментариев к задачам.
  - Возможность пометить комментарий как "Результат."
- **Фильтры**:
  - По статусу задач.
  - Отображение задач текущего пользователя.

### Управление пользователями
- **Список пользователей**: Представлен в виде таблицы с:
  - Возможностью сортировки.
  - Поиском.

### Управление группами проектов
- **Список групп**:
  - Просмотр всех групп проектов.
  - Редактирование названия, описания и ссылки на проект.

### Личный кабинет пользователя
  - Возможность редактирования личных данных.
  - Кастомизация интерфейса.

## 🛠️ Стек технологий

- ![Nuxt Logo](https://img.shields.io/badge/Nuxt-%5E3.11.2-green?logo=nuxt.js&logoColor=white)
- ![Pinia Logo](https://img.shields.io/badge/Pinia-%5E2.1.7-orange?logo=vue.js&logoColor=white)
- ![Appwrite Logo](https://img.shields.io/badge/Appwrite-%5E14.0.0-red?logo=appwrite&logoColor=white)
- ![Nuxt UI Logo](https://img.shields.io/badge/Nuxt_UI-%5E2.15.2-green?logo=nuxt.js&logoColor=white)
- ![TanStack Query Logo](https://img.shields.io/badge/TanStack_Query-%5E5.29.0-purple?logo=tanstack&logoColor=white)
- ![TypeScript Logo](https://img.shields.io/badge/TypeScript-%5E5.0-blue?logo=typescript&logoColor=white)
- ![Tailwind CSS Logo](https://img.shields.io/badge/Tailwind_CSS-%5E3.0-teal?logo=tailwindcss&logoColor=white)








## 📂 Структура проекта

- `pages/`: Все маршруты приложения.
- `stores/`: Управление состоянием через Pinia.
- `components/`: Повторно используемые UI-компоненты, кастомные хуки.

## 🏁 Быстрый старт

### Предварительные требования
- **Node.js**: Убедитесь, что у вас установлен Node.js.
- **Appwrite**: Настройте экземпляр Appwrite.

### Установка

1. Клонируйте репозиторий:
  ```bash
  git clone https://github.com/BulakhovAlexey/CRM-System.git
  cd crm-system
  ```

2. Установите зависимости:
  ```bash
  npm install
  ```

3. Dev mode
  ```bash
  npm run dev
  ```

4. Production mode
  ```bash
  npm run build
  ```

5. Preview Production Build
  ```bash
  npm run preview
  ```