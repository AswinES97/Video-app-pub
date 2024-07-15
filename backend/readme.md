# Backend Setup Instructions
Welcome to the backend of our project! Follow the steps below to set up the necessary components for a smooth development experience.

<br>

## Create a Key Pair using OpenSSL

<br>

To create a key pair, run the following commands:

```bash
openssl genpkey -algorithm RSA -out ticketing.pem -aes256
openssl rsa -pubout -in ticketing.pem -out ticketing_pub.pem
```

If you already have a generated key pair, place them in a keys folder. Ensure you have a running Kubernetes cluster, then apply the start.sh file directly.

<br>

## Run Kafka without PLAINTEXT using Helm
<br>


To install Kafka with Helm, use the following command:

```bash
helm install my-kafka oci://registry-1.docker.io/bitnamicharts/kafka \
  --set listeners.client.protocol=PLAINTEXT \
  --set listeners.controller.protocol=PLAINTEXT \
  --namespace kafka --create-namespace
```

<br>

## Clean Up Kafka Resources
<br>


To clean up the resources and uninstall the release, use:

```bash
helm uninstall my-kafka -n kafka && kubectl delete namespace kafka
```
<br>

## Install Nginx Ingress Controller
<br>


If your Kubernetes cluster does not have ingress-nginx, install it using Helm:

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

<br>

## Clean Up Nginx Ingress Resources
<br>


To clean up the resources and uninstall the release, use:

```bash
helm uninstall ingress-nginx -n ingress-nginx && kubectl delete namespace  ingress-nginx
```

<br>

## Add Key Pair as Secrets in the Cluster
<br>


Add the private and public keys as secrets in your cluster and reference their paths in your deployment:

```bash
kubectl create secret generic key-pair --from-file=./ticketing.pem --from-file=./ticketing_pub.pem -n app
```

<br>

Add the Mongodb urls if its in atlas or just add MONGO_URL in auth and profile config

```bash
kubectl create secret generic mongodb-atlas-auth \
    --from-literal=MONGO_URL='...' \
    --namespace app
```

<br>

Add the AWS credentials in the secrets as well

```bash
kubectl create secret generic aws-s3 \
    --from-literal=AWS_ACCESS_KEY_ID='...' \
    --from-literal=AWS_SECRET_ACCESS_KEY='...' \
    --from-literal=AWS_BUCKET='...' \
    --from-literal=AWS_REGION='...' \
    --namespace app
```

<br>
Also in upload
<br>

```bash
kubectl create secret generic aws-s3 \
    --from-literal=AWS_ACCESS_KEY_ID='...' \
    --from-literal=AWS_SECRET_ACCESS_KEY='...' \
    --from-literal=AWS_BUCKET='...' \
    --from-literal=AWS_REGION='...' \
    --namespace upload
```
<br>

Add the Node-Mailer Secrets in also
```bash
kubectl create secret generic node-mailer \
    --from-literal=NODE_MAILER_PASS='...' \
    --namespace app
```

<br>

## Kubernetes Dashboard in a Cluster (Not in Minikube)
<br>


Install Kubernetes Dashboard
If you want to run the Kubernetes dashboard, apply the YAML files and Helm chart:

```bash
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm upgrade --install kubernetes-dashboard  kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace kubernetes-dashboard
```

Refer to the Kubernetes Dashboard Access Control Guide for detailed instructions.

<br>

## Disable Kong Admin if Port 8444 is Occupied
<br>


If port 8444 is occupied by Minikube or you encounter errors creating the dashboard-kong, disable Kong admin:

```bash
helm upgrade --install kubernetes-dashboard  kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace kubernetes-dashboard --set kong.admin.tls.enabled=false
```

<br>

## Port-Forward to Access Dashboard
<br>

After creating a port-forward, follow the instructions in the Kubernetes Dashboard Access Guide:

```bash
kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443
```

<br>

## Monitoring the Cluster
<br>


You can also use the K9s application for monitoring the cluster.
