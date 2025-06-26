Сервис для сокращения ссылок. Frontend - React Backend - Python (uvicorn, fastapi, sqlalchemy) DB server - Postgres доки по умолчанию доступны по localhost:8000 приложение localhost:3000 Для того, чтобы запустить серви:

1) Установите зависимости из файла requirements.txt

2) Запустите на вм Postgresql-13, создайте бд с таблицей urls

3) Укажите данные базы данных с сервера Postgres в файле .env

4) перейдите в папку backend
        в терминале введите uvicorn app.main:app --reload
5) перейдите в папку frontend
        в терминале введите npm start