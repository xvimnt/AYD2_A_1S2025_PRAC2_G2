# Weather Service

Microservice for weather data monitoring.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run service:
```bash
python app/main.py
```

## Docker

Build and run with Docker:

```bash
docker build -t weather-service .
docker run -p 5000:5000 weather-service
```
