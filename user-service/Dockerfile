# Basis-Image
FROM python:3.10-slim

# Arbeitsverzeichnis setzen
WORKDIR /user_service

# requirements.txt und app.py kopieren
COPY requirements.txt .
COPY app.py .

# Abhängigkeiten installieren
RUN pip install --no-cache-dir -r requirements.txt

# Exponiere Port 5000
EXPOSE 5000

# Starte die Flask-App
CMD ["python", "app.py"]