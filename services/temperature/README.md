# Temperature Service

Microservice for temperature monitoring.

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
docker build -t temperature-service .
docker run -p 5001:5001 temperature-service
```
