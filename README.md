# travelmate-frontend-backend-k8s

# Travelmate App 🌍

A simple travel recommendation system using Angular frontend, Flask backend, Docker containers, and Kubernetes deployments.

## Tech Stack
- Angular (Frontend)
- Flask (Backend – 2 services: User-Service & Recommender-Service)
- Docker
- Kubernetes

## Quickstart

```bash
# Clone this repository
git clone https://github.com/your-username/travelmate-app.git
cd travelmate-app
```

## Project Structure

frontend/           # Angular Frontend
backend/            # Flask User-Service
recommender/        # Flask Recommender-Service
k8s/                # Kubernetes manifests (deployments & services)

## Prerequisites

Node.js (recommended version 20.x)

Docker & Docker Hub account

kubectl configured to access your Kubernetes cluster

Kubernetes cluster (Docker Desktop Kubernetes, Minikube, or cloud provider)

# Running Locally

## Frontend
```bash
cd frontend
npm install
npm start
```

## Backend & Recommender

Refer to README in backend/ and recommender/ folders for details on running locally.

# Building and pushing Docker Images

Replace <dockerhub-username> with your Docker Hub username:

```bash
# Frontend
docker build -t <dockerhub-username>/frontend:latest ./frontend
docker push <dockerhub-username>/frontend:latest

# User Service (Backend)
docker build -t <dockerhub-username>/user-service:latest ./backend
docker push <dockerhub-username>/user-service:latest

# Recommender Service
docker build -t <dockerhub-username>/recommender-service:latest ./recommender
docker push <dockerhub-username>/recommender-service:latest
```

## Deploying to Kubernetes

```bash
# Apply all manifests:
kubectl apply -f k8s/
# Check pod and service status:
kubectl get pods
kubectl get svc
# Accessing the Services Locally via Port-Forward
kubectl port-forward svc/frontend-service 4200:80
kubectl port-forward svc/user-service 5001:80
kubectl port-forward svc/recommender-service 5002:80
```

Frontend UI: http://localhost:4200

User Service API: http://localhost:5001/users

Recommender Service API: http://localhost:5002