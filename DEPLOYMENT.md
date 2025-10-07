# Deployment Guide for Hetzner with Docker & Traefik

This guide covers deploying the scrollweb application to your Hetzner server using Docker and Traefik.

## Server Folder Structure

- **Project code**: `/opt/data/scrollweb/` - Git repository with application code
- **Docker stack**: `/opt/stacks/scrollweb/` - Docker Compose and configuration files

## Prerequisites

- Hetzner server with Docker and Docker Compose installed
- Traefik running with external network named `traefik`
- SSH access to your server (with key-based authentication recommended)
- DNS record pointing `scrollweb.thatparkdalerv.ca` to your Hetzner server IP
- `rsync` installed on your local machine (pre-installed on macOS/Linux)

## Initial Setup (One-time)

### 1. Prepare your Hetzner server

SSH into your server and ensure Traefik network exists:

```bash
ssh root@your-hetzner-ip

# Check if traefik network exists
docker network ls | grep traefik

# If not, create it (skip if already exists)
docker network create traefik
```

### 2. Optional: Keep code in Gitea for version control

While the server doesn't need Gitea access, you can still push to Gitea for version control:

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

## Deployment Methods

### Method 1: Using the deploy script (Recommended)

```bash
# Edit deploy.sh and set your server details, or pass as argument
./deploy.sh root@your-hetzner-ip
```

This script will:
- Use **rsync** to sync your local files to server at `/opt/data/scrollweb/`
- Automatically exclude `node_modules`, `.next`, `.git`, etc.
- Create docker-compose.yml in `/opt/stacks/scrollweb/`
- Build the Docker image on the server
- Start the container with docker-compose
- Show recent logs

**Note**: rsync transfers only changed files, making updates fast and efficient!

### Method 2: Manual deployment with rsync

1. **Create directories on server:**

```bash
ssh root@your-hetzner-ip "mkdir -p /opt/data/scrollweb /opt/stacks/scrollweb"
```

2. **Sync files from your local machine:**

```bash
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.claude' \
  ./ root@your-hetzner-ip:/opt/data/scrollweb/
```

3. **Set up docker-compose on server:**

```bash
# SSH into server
ssh root@your-hetzner-ip

# Create docker-compose.yml in stack directory
cat > /opt/stacks/scrollweb/docker-compose.yml << 'EOF'
version: '3.8'

services:
  scrollweb:
    build:
      context: /opt/data/scrollweb
      dockerfile: Dockerfile
    container_name: scrollweb
    restart: unless-stopped
    networks:
      - traefik
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.scrollweb.rule=Host(\`scrollweb.thatparkdalerv.ca\`)"
      - "traefik.http.routers.scrollweb.entrypoints=websecure"
      - "traefik.http.routers.scrollweb.tls=true"
      - "traefik.http.routers.scrollweb.tls.certresolver=letsencrypt"
      - "traefik.http.services.scrollweb.loadbalancer.server.port=3000"
      - "traefik.http.routers.scrollweb-http.rule=Host(\`scrollweb.thatparkdalerv.ca\`)"
      - "traefik.http.routers.scrollweb-http.entrypoints=web"
      - "traefik.http.routers.scrollweb-http.middlewares=https-redirect"
      - "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https"
    environment:
      - NODE_ENV=production

networks:
  traefik:
    external: true
EOF
```

4. **Build and start the container:**

```bash
cd /opt/stacks/scrollweb

# Stop existing container
docker-compose down

# Build image (use --no-cache for fresh build)
docker-compose build --no-cache

# Start container
docker-compose up -d
```

5. **Check logs:**

```bash
cd /opt/stacks/scrollweb
docker-compose logs -f scrollweb
```

## Updating Your Site

After making changes locally:

```bash
# Optional: Commit to Gitea for version control
git add .
git commit -m "Your update message"
git push origin master

# Deploy to server (rsync + rebuild)
./deploy.sh root@your-hetzner-ip
```

The deploy script uses rsync which only transfers changed files, making updates very fast!

## Troubleshooting

### Check if container is running:
```bash
ssh root@your-hetzner-ip 'docker ps | grep scrollweb'
```

### View logs:
```bash
ssh root@your-hetzner-ip 'cd /opt/stacks/scrollweb && docker-compose logs -f'
```

### Rebuild from scratch:
```bash
ssh root@your-hetzner-ip 'cd /opt/stacks/scrollweb && docker-compose down && docker-compose build --no-cache && docker-compose up -d'
```

### Sync files without rebuilding:
```bash
rsync -avz --delete --exclude 'node_modules' --exclude '.next' --exclude '.git' ./ root@your-hetzner-ip:/opt/data/scrollweb/
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
ssh root@your-hetzner-ip 'cd /opt/stacks/scrollweb && docker-compose logs -f'

# Restart
ssh root@your-hetzner-ip 'cd /opt/stacks/scrollweb && docker-compose restart'

# Stop
ssh root@your-hetzner-ip 'cd /opt/stacks/scrollweb && docker-compose down'

# Rebuild
ssh root@your-hetzner-ip 'cd /opt/stacks/scrollweb && docker-compose down && docker-compose build --no-cache && docker-compose up -d'

# Sync files only (no rebuild)
rsync -avz --delete --exclude 'node_modules' --exclude '.next' --exclude '.git' ./ root@your-hetzner-ip:/opt/data/scrollweb/
```

## Folder Structure on Server

```
/opt/
├── data/
│   └── scrollweb/          # Project code (synced via rsync)
│       ├── app/
│       ├── Dockerfile
│       ├── package.json
│       └── ...
└── stacks/
    └── scrollweb/          # Docker Compose (stack)
        └── docker-compose.yml
```

## How rsync Works

The deployment uses `rsync` to efficiently sync files:
- **First deploy**: Copies all files to server
- **Updates**: Only transfers changed files (much faster!)
- **Auto-excludes**: Skips `node_modules`, `.next`, `.git` automatically
- **Delete flag**: Removes files on server that don't exist locally (keeps it clean)

## Next Steps: CI/CD

For future automated deployments, consider:
1. **Gitea Actions** - Set up automated builds on git push
2. **Webhooks** - Trigger deployments automatically
3. **Docker Registry** - Push built images to a registry
4. **Watchtower** - Auto-update containers when new images are available

Let me know when you're ready to set up CI/CD!
