# TG Binarka Frontend

Frontend часть приложения TG Binarka

---

#### Стек

- TypeScript
- React 18.2.0
- @react-spring/web 9.7.3
- @tma.js/sdk-react ^2.2.2
- axios 1.7.2
- d3 7.9.0
- formik 2.4.6
- react-dom 18.2.0
- react-intl 6.6.8
- react-spinners 0.13.8
- react-transition-group 4.4.5
- yup 1.4.0

## Структура

```
|-- public           - статические файлы
|-- src
|  |-- assets
|  |  |-- icons      - статические файлы с иконками
|  |-- components    - компоненты и виджеты
|  |-- hooks         - универсальные хуки
|  |-- context       - провайдеры контекста
|  |-- utils         - хелпер функции
|  |-- i18n          - мультиязычность
|  |-- interface     - интерфейсы и типы
|  |-- pages         - страницы
|  |-- services      - api
```

---

## Сборка

Рекомендуемая версия Node.js – v22.2.0

Рекомендуемая версия npm – 10.7.0

1. Создать `.env` файл в соответствии с `.env.example`
2. `$ npm run build`

#### Запуск в dev режиме

1. Создать `.env` файл в соответствии с `.env.example`
2. `$ npm run dev`
3. Запуск приложения по адресу http://localhost:3000/

#### Запуск в production режиме

1. Создать `.env` файл в соответствии с `.env.example`
2. `$ npm run build`
3. В качестве точи входа production сборки используется dist/index.html

#### Запуск через Docker

1. `$ docker-compose build`
2. `$ docker-compose up -d`

---

## Конфигурация

Производится посредством переменных окружения. Список ключей указан в файле `/.env.example`.

Для dev и prod создаются соответствующие файлы `.env`

Примечание: dotenv файла

```
VITE_APP_API_URL=
VITE_APP_TOKEN=

VITE_TIME_SECOND=
VITE_COUNT_WIN_OR_LOSE=

VITE_PORT=3000
```
