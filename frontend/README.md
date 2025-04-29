# Frontend Application

This is the frontend web application for the environmental monitoring system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Docker

To build and run with Docker:

```bash
docker build -t env-monitor-frontend .
docker run -p 3000:3000 env-monitor-frontend
```
