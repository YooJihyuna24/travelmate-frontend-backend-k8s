FROM python:3.10-slim-bullseye

WORKDIR /app

COPY requirements.txt .
RUN pip install flask-cors
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5002", "run:app"]