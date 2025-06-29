# travelmate-frontend-backend-k8s

# Travelmate App 🌍

A simple travel recommendation system using Angular frontend, Flask backend, Docker containers, and Kubernetes deployments.

## Tech Stack
- Angular (Frontend)
- Flask (Backend – 2 services: User-Service & Recommender-Service)
- Docker
- Kubernetes

make sure to enable Kubernetes in Docker Desktop!

## Quickstart

```bash
# Clone this repository
git clone https://github.com/yoojihyuna24/travelmate-frontend-backend-k8s.git
cd travelmate-frontend-backend-k8s
```

## Project Structure

| Folder               | Description                                  |
|----------------------|----------------------------------------------|
| frontend/            | Angular Frontend                             |
| user-serivce/        | Flask User-Service                           |
| recommender-service/ | Flask Recommender-Service                    |
| k8s/                 | Kubernetes manifests (deployments & services)|

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

# Building and pushing Docker Images

Replace <dockerhub-username> with your Docker Hub username:
Replace <your-username> in all .yaml Files!!!

```bash
# Frontend
cd frontend
docker build -t <dockerhub-username>/frontend:latest .
docker push <dockerhub-username>/frontend:latest

# User Service (Backend)
cd ..
cd user-service
docker build -t <dockerhub-username>/user-service:latest .
docker push <dockerhub-username>/user-service:latest

# Recommender Service
cd ..
cd recommender-service
docker build -t <dockerhub-username>/recommender-service:latest .
docker push <dockerhub-username>/recommender-service:latest
```

## Deploying to Kubernetes

```bash
# Apply all manifests:
kubectl apply -f k8s
# Check pod and service status:
kubectl get pods
kubectl get svc
# Accessing the Services Locally via Port-Forward
kubectl port-forward svc/frontend-service 4200:80
kubectl port-forward svc/user-service 5001:80
kubectl port-forward svc/recommender-service 5002:80
```

Frontend UI: http://localhost:4200

User Service API: http://localhost:5001

Recommender Service API: http://localhost:5002