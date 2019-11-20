python /scripts/wait_for_db.py --service-name postgres --ip postgres --port 5432
python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
gunicorn --bind 0.0.0.0:8000 backend.wsgi -w 2
