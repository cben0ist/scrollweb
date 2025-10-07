#!/bin/bash

# Deployment script for scrollweb to Hetzner server
# Usage: ./deploy.sh [server-user@server-ip]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SERVER=${1:-"root@your-hetzner-ip"}  # Override with argument or set default
PROJECT_NAME="scrollweb"
PROJECT_PATH="/opt/data/${PROJECT_NAME}"
STACK_PATH="/opt/stacks/${PROJECT_NAME}"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${GREEN}🚀 Starting deployment of ${PROJECT_NAME}...${NC}"

# Step 1: Create directories on server
echo -e "${YELLOW}📁 Creating directories on server...${NC}"
ssh ${SERVER} "mkdir -p ${PROJECT_PATH} ${STACK_PATH}"

# Step 2: Sync project files to server using rsync
echo -e "${YELLOW}📦 Syncing project files to server...${NC}"
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.claude' \
  --exclude 'deploy.sh' \
  --exclude 'DEPLOYMENT.md' \
  --exclude 'README.md' \
  ${LOCAL_DIR}/ ${SERVER}:${PROJECT_PATH}/

echo -e "${GREEN}✅ Files synced successfully!${NC}"

# Step 3: SSH into server and deploy
ssh ${SERVER} << ENDSSH
set -e

echo -e "${YELLOW}📁 Setting up stack directory...${NC}"
mkdir -p ${STACK_PATH}

# Verify project files were synced
if [ ! -d "${PROJECT_PATH}" ] || [ ! -f "${PROJECT_PATH}/Dockerfile" ]; then
    echo -e "${RED}❌ Error: Project files not found at ${PROJECT_PATH}${NC}"
    echo "Directory listing:"
    ls -la /opt/data/ || true
    exit 1
fi

echo -e "${GREEN}✅ Project files verified at ${PROJECT_PATH}${NC}"

# Copy docker-compose to stack directory and update context path
cat > ${STACK_PATH}/docker-compose.yml << 'COMPOSE_EOF'
services:
  scrollweb:
    build:
      context: /opt/data/scrollweb
      dockerfile: Dockerfile
    container_name: scrollweb
    restart: unless-stopped
    networks:
      - proxy
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=proxy"
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
  proxy:
    external: true
COMPOSE_EOF

echo -e "${YELLOW}🐳 Building and deploying with Docker Compose...${NC}"
cd ${STACK_PATH}
docker compose down || true
docker compose build --no-cache
docker compose up -d

echo -e "${GREEN}✅ Deployment complete!${NC}"

# Show logs
echo -e "${YELLOW}📋 Recent logs:${NC}"
docker compose logs --tail=50 scrollweb

ENDSSH

echo -e "${GREEN}✨ Deployment successful!${NC}"
echo -e "${GREEN}🌐 Your site should be live at: https://scrollweb.thatparkdalerv.ca${NC}"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "  - View logs: ssh ${SERVER} 'cd ${STACK_PATH} && docker compose logs -f'"
echo "  - Restart: ssh ${SERVER} 'cd ${STACK_PATH} && docker compose restart'"
echo "  - Stop: ssh ${SERVER} 'cd ${STACK_PATH} && docker compose down'"
