Сервис для сокращения ссылок. 
Frontend - React
Backend - Python (uvicorn, fastapi, sqlalchemy)
DB server - Postgres
доки по умолчанию доступны по localhost:8000
приложение localhost:3000
Для того, чтобы запустить серви:
1) Запустите на вм Postgresql-13, создайте бд с таблицей urls
2) Укажите данные базы данных с сервера Postgres в файле .env
3) перейдите в папку backend
4) в терминале введите uvicorn app.main:app --reload
5) перейдите в папку frontend
6) в терминале введите npm start
   
