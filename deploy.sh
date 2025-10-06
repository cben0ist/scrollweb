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
DEPLOY_PATH="/opt/${PROJECT_NAME}"
GIT_REPO="https://gitea.128l.org/sandbox/scrollweb.git"

echo -e "${GREEN}🚀 Starting deployment of ${PROJECT_NAME}...${NC}"

# Step 1: SSH into server and deploy
ssh ${SERVER} << ENDSSH
set -e

echo -e "${YELLOW}📦 Checking deployment directory...${NC}"
if [ ! -d "${DEPLOY_PATH}" ]; then
    echo "Creating deployment directory..."
    mkdir -p ${DEPLOY_PATH}
    cd ${DEPLOY_PATH}
    echo "Cloning repository..."
    git clone ${GIT_REPO} .
else
    echo "Deployment directory exists, pulling latest changes..."
    cd ${DEPLOY_PATH}
    git pull origin master
fi

echo -e "${YELLOW}🐳 Building and deploying with Docker Compose...${NC}"
docker-compose down || true
docker-compose build --no-cache
docker-compose up -d

echo -e "${GREEN}✅ Deployment complete!${NC}"

# Show logs
echo -e "${YELLOW}📋 Recent logs:${NC}"
docker-compose logs --tail=50 scrollweb

ENDSSH

echo -e "${GREEN}✨ Deployment successful!${NC}"
echo -e "${GREEN}🌐 Your site should be live at: https://scrollweb.thatparkdalerv.ca${NC}"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "  - View logs: ssh ${SERVER} 'cd ${DEPLOY_PATH} && docker-compose logs -f'"
echo "  - Restart: ssh ${SERVER} 'cd ${DEPLOY_PATH} && docker-compose restart'"
echo "  - Stop: ssh ${SERVER} 'cd ${DEPLOY_PATH} && docker-compose down'"
