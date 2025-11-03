# TTIBU-TTIBU-CHAT

Chat application with Spring Boot, React, and PostgreSQL

## Architecture

```
Internet (HTTPS)
      ↓
┌─────────────────────────────┐
│ Nginx Container             │  ← SSL/TLS (certbot)
│ - Reverse Proxy             │
│ - Ports: 80, 443            │
└─────────────────────────────┘
   ↓                    ↓
Frontend            Backend
Container           Container
(React)            (Spring Boot)
   ↓
PostgreSQL
Container
```

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Spring Boot 3.x + JPA
- **Database**: PostgreSQL 16
- **Reverse Proxy**: Nginx
- **Container**: Docker + Docker Compose
- **CI/CD**: GitHub Actions → Docker Hub → EC2

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Java 17+ (for local development)

### Local Development

```bash
# Backend
cd backend
./gradlew bootRun

# Frontend
cd frontend
npm install
npm run dev
```

### Docker Compose

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Deployment Guide

### 1. GitHub Secrets Setup

Repository → Settings → Secrets and variables → Actions

| Secret | Description | Example |
|--------|-------------|---------|
| `DOCKER_USERNAME` | Docker Hub username | `your-username` |
| `DOCKER_PASSWORD` | Docker Hub access token | `dckr_pat_xxxxx` |
| `EC2_HOST` | EC2 IP or domain | `k13c103.p.ssafy.io` |
| `EC2_USER` | SSH username | `ubuntu` |
| `EC2_SSH_KEY` | SSH private key | `-----BEGIN RSA...` |

### 2. EC2 Initial Setup

```bash
# Connect to EC2
ssh -i ~/.ssh/your-key.pem ubuntu@k13c103.p.ssafy.io

# Install Docker
sudo apt update
sudo apt install -y docker.io docker-compose

# Add user to docker group
sudo usermod -aG docker ubuntu
newgrp docker

# Create deployment directory
mkdir -p ~/tibutibu
cd ~/tibutibu

# Certbot SSL certificates should be in:
# ~/tibutibu/certs/live/k13c103.p.ssafy.io/fullchain.pem
# ~/tibutibu/certs/live/k13c103.p.ssafy.io/privkey.pem
```

### 3. Deploy

```bash
# Push to main branch triggers auto-deployment
git add .
git commit -m "deploy: update application"
git push origin main

# GitHub Actions will:
# 1. Build Docker images
# 2. Push to Docker Hub
# 3. SSH to EC2
# 4. Pull latest images
# 5. Restart containers
```

## Project Structure

```
TTIBU-TTIBU-CHAT-WEB/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── build.gradle
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf              # Reverse proxy config
├── docker-compose.yml
└── README.md
```

## Environment Configuration

### Backend

- **Local**: `application-local.yml`
  - DB: `localhost:5432`
- **Docker**: `application-docker.yml`
  - DB: `db:5432` (container name)

### Database

- **Database**: `ttibu`
- **Username**: `tibutibu`
- **Password**: `tibutibu`

## Ports

| Service | Port | Description |
|---------|------|-------------|
| Nginx | 80 | HTTP (→ HTTPS redirect) |
| Nginx | 443 | HTTPS |
| Frontend | 80 (internal) | React app |
| Backend | 8080 (internal) | Spring Boot API |
| PostgreSQL | 5432 (internal) | Database |

## Useful Commands

```bash
# View running containers
docker ps

# View logs
docker logs ttibu-nginx
docker logs ttibu-backend
docker logs ttibu-frontend
docker logs ttibu-db

# Restart specific service
docker restart ttibu-backend

# Access database
docker exec -it ttibu-db psql -U tibutibu -d ttibu

# Clean up
docker image prune -a
docker container prune
```

## Troubleshooting

### Check container status
```bash
docker-compose ps
```

### View logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart all services
```bash
docker-compose down
docker-compose up -d
```

### SSL Certificate Issues
```bash
# Check certificate files exist
ls -la ~/tibutibu/certs/live/k13c103.p.ssafy.io/

# Certbot should have created:
# - fullchain.pem
# - privkey.pem
```

## API Endpoints

- **Frontend**: `https://k13c103.p.ssafy.io/`
- **Backend API**: `https://k13c103.p.ssafy.io/api/`

## License

MIT