# Deployment Guide for Hetzner with Docker & Traefik

This guide covers deploying the scrollweb application to your Hetzner server using Docker and Traefik.

## Prerequisites

- Hetzner server with Docker and Docker Compose installed
- Traefik running with external network named `traefik`
- SSH access to your server
- DNS record pointing `scrollweb.thatparkdalerv.ca` to your Hetzner server IP
- Git push access to `https://gitea.128l.org/sandbox/scrollweb.git`

## Initial Setup (One-time)

### 1. Push your code to Gitea

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Add Gitea remote
git remote add origin https://gitea.128l.org/sandbox/scrollweb.git

# Push to Gitea
git push -u origin master
```

### 2. Prepare your Hetzner server

SSH into your server and ensure Traefik network exists:

```bash
ssh root@your-hetzner-ip

# Check if traefik network exists
docker network ls | grep traefik

# If not, create it (skip if already exists)
docker network create traefik
```

## Deployment Methods

### Method 1: Using the deploy script (Recommended for quick deploys)

```bash
# Edit deploy.sh and set your server details, or pass as argument
./deploy.sh root@your-hetzner-ip
```

This script will:
- SSH into your server
- Clone/pull the latest code from Gitea
- Build the Docker image
- Start the container with docker-compose
- Show recent logs

### Method 2: Manual deployment (More control)

1. **SSH into your Hetzner server:**

```bash
ssh root@your-hetzner-ip
```

2. **Clone the repository (first time only):**

```bash
mkdir -p /opt/scrollweb
cd /opt/scrollweb
git clone https://gitea.128l.org/sandbox/scrollweb.git .
```

3. **Pull latest changes (subsequent deployments):**

```bash
cd /opt/scrollweb
git pull origin master
```

4. **Build and start the container:**

```bash
# Stop existing container
docker-compose down

# Build image (use --no-cache for fresh build)
docker-compose build --no-cache

# Start container
docker-compose up -d
```

5. **Check logs:**

```bash
docker-compose logs -f scrollweb
```

## Updating Your Site

After making changes locally:

```bash
# Commit your changes
git add .
git commit -m "Your update message"

# Push to Gitea
git push origin master

# Deploy to server
./deploy.sh root@your-hetzner-ip
```

## Troubleshooting

### Check if container is running:
```bash
ssh root@your-hetzner-ip 'docker ps | grep scrollweb'
```

### View logs:
```bash
ssh root@your-hetzner-ip 'cd /opt/scrollweb && docker-compose logs -f'
```

### Rebuild from scratch:
```bash
ssh root@your-hetzner-ip 'cd /opt/scrollweb && docker-compose down && docker-compose build --no-cache && docker-compose up -d'
```

### Check Traefik dashboard:
- Access your Traefik dashboard to verify the route is registered
- Check SSL certificate status

### DNS issues:
```bash
# Verify DNS is pointing to your server
dig scrollweb.thatparkdalerv.ca

# Check if Traefik is receiving requests
ssh root@your-hetzner-ip 'docker logs traefik | grep scrollweb'
```

## Docker Compose Configuration

The `docker-compose.yml` includes:
- **Traefik labels** for automatic routing and SSL
- **HTTPS redirect** from HTTP
- **Let's Encrypt** SSL certificates via Traefik
- **Restart policy** for automatic recovery
- **External traefik network** integration

## Files Created for Deployment

- `Dockerfile` - Multi-stage build for optimized Next.js production
- `docker-compose.yml` - Service definition with Traefik labels
- `.dockerignore` - Exclude unnecessary files from Docker build
- `deploy.sh` - Automated deployment script
- `DEPLOYMENT.md` - This file

## Quick Commands Reference

```bash
# Deploy/Update
./deploy.sh root@your-hetzner-ip

# View logs
ssh root@your-hetzner-ip 'cd /opt/scrollweb && docker-compose logs -f'

# Restart
ssh root@your-hetzner-ip 'cd /opt/scrollweb && docker-compose restart'

# Stop
ssh root@your-hetzner-ip 'cd /opt/scrollweb && docker-compose down'

# Rebuild
ssh root@your-hetzner-ip 'cd /opt/scrollweb && docker-compose down && docker-compose build --no-cache && docker-compose up -d'
```

## Next Steps: CI/CD

For future automated deployments, consider:
1. **Gitea Actions** - Set up automated builds on git push
2. **Webhooks** - Trigger deployments automatically
3. **Docker Registry** - Push built images to a registry
4. **Watchtower** - Auto-update containers when new images are available

Let me know when you're ready to set up CI/CD!
