
# Kubernetes

## Project Structure
├── app/
│   ├── DOOSS/frontend
│   └── DOOSS/backend
├── Dockerfile
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   └── secret.yaml
└── package.json

## Dockerfile - sample
FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY app/ .

EXPOSE 3000
CMD ["node", "index.js"]


## Kurbanets Manifests

### Config Map .yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_MESSAGE: "Hello from ConfigMap!"

### Secret .yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  DB_PASSWORD: bXlzZWNyZXRwYXNzd29yZA==  # base64 for 'mysecretpassword'

### Deployment .yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
      - name: node-app
        image: your-dockerhub-user/node-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: APP_MESSAGE
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: APP_MESSAGE
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: DB_PASSWORD

### Service .yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app-service
spec:
  selector:
    app: node-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP



## Usage & Deployment

### 1. Create ConfigMap and Secret
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

### 2. Deploy the app
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

### 3. Access the app from within the cluster
kubectl port-forward service/node-app-service 8080:80
curl http://localhost:8080

