# Frontend - Weather Dashboard

This is the frontend application for the Weather Dashboard, built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Running with Docker

1. Build and run the container:
```bash
# Build the image
docker build -t weather-dashboard-frontend .

# Run the container
docker run -p 5173:5173 weather-dashboard-frontend
```

2. Access the application at [http://localhost:5173](http://localhost:5173)

### Running with Docker Compose

The frontend is part of a microservices architecture. To run the complete application:

```bash
# From the root directory
docker-compose up --build

# To stop all services
docker-compose down
```

This will start:
- Frontend at [http://localhost:5173](http://localhost:5173)
- Weather Service at [http://localhost:5000](http://localhost:5000)
- Temperature Service at [http://localhost:5001](http://localhost:5001)
- AQI Service at [http://localhost:5002](http://localhost:5002)

## 🛠️ Development

### Local Development (without Docker)

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Access the application at [http://localhost:5173](http://localhost:5173)

### Environment Variables

The following environment variables are used:
- `VITE_WEATHER_API_URL`: Weather service URL (default: http://localhost:5000)
- `VITE_TEMPERATURE_API_URL`: Temperature service URL (default: http://localhost:5001)
- `VITE_AQI_API_URL`: AQI service URL (default: http://localhost:5002)

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🧪 Testing

```bash
npm run test
```

## 🔧 Technologies Used

- React
- TypeScript
- Vite
- Docker
- React Query for API calls
