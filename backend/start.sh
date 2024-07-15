#!/bin/bash

# This script sets up the necessary Kubernetes resources, installs NGINX Ingress and Kafka using Helm,
# creates secrets, and starts Skaffold in dev mode.

# Define colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$0")

# Step 1: Create the namespace
echo -e "${GREEN}Step 1: Creating namespaces...${NC}"
kubectl apply -f "$SCRIPT_DIR/infra/k8s/namespaces.yml"
echo ""

sleep 1

# Step 2: Create MongoDB Atlas secrets
echo -e "${GREEN}Step 2: Creating MongoDB Atlas secrets...${NC}"
kubectl create secret generic mongodb-atlas-auth \
    --from-literal=MONGO_URL='...' \
    --namespace app
echo ""

sleep 1

kubectl create secret generic mongodb-atlas-profile \
    --from-literal=MONGO_URL='...' \
    --namespace app
echo ""

sleep 1

# Step 3: Create AWS S3 secrets
echo -e "${GREEN}Step 3: Creating AWS S3 secrets...${NC}"
kubectl create secret generic aws-s3 \
    --from-literal=AWS_ACCESS_KEY_ID='...' \
    --from-literal=AWS_SECRET_ACCESS_KEY='...' \
    --from-literal=AWS_BUCKET='...' \
    --from-literal=AWS_REGION='...' \
    --namespace app
echo ""

sleep 1

kubectl create secret generic aws-s3 \
    --from-literal=AWS_ACCESS_KEY_ID='...' \
    --from-literal=AWS_SECRET_ACCESS_KEY='...' \
    --from-literal=AWS_BUCKET='...' \
    --from-literal=AWS_REGION='...' \
    --namespace upload
echo ""

sleep 1

# Step 4: Create Node-Mailer secret
echo -e "${GREEN}Step 4: Creating Node-Mailer secret...${NC}"
kubectl create secret generic node-mailer \
    --from-literal=NODE_MAILER_PASS='...' \
    --namespace app
echo ""

sleep 1

# Step 5: Install NGINX Ingress using Helm
echo -e "${GREEN}Step 5: Installing NGINX Ingress...${NC}"
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm upgrade --install ingress-nginx ingress-nginx \
    --repo https://kubernetes.github.io/ingress-nginx \
    --namespace ingress-nginx --create-namespace
echo ""

sleep 5

# Step 6: Install Kafka using Helm
echo -e "${GREEN}Step 6: Installing Kafka...${NC}"
helm install my-kafka oci://registry-1.docker.io/bitnamicharts/kafka \
    --set listeners.client.protocol=PLAINTEXT \
    --set listeners.controller.protocol=PLAINTEXT \
    --namespace kafka --create-namespace
echo ""

sleep 2

# Step 7: Create key-pair secrets
echo -e "${GREEN}Step 7: Creating key-pair secrets...${NC}"
kubectl create secret generic key-pair \
    --from-file="$SCRIPT_DIR/keys/ticketing.pem" \
    --from-file="$SCRIPT_DIR/keys/ticketing_pub.pem" \
    --namespace app
echo ""

sleep 2

# Step 8: Run Skaffold in dev mode
echo -e "${GREEN}Step 8: Starting Skaffold in dev mode...${NC}"
skaffold dev -f "$SCRIPT_DIR/skaffold-docker.yml"
echo ""
