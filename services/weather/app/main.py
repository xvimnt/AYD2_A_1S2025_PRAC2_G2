from flask import Flask, jsonify
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Open-Meteo API base URL
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

# Guatemala City coordinates
LATITUDE = 14.6349
LONGITUDE = -90.5069

def get_weather_data():
    """Fetch weather data from Open-Meteo API"""
    params = {
        "latitude": LATITUDE,
        "longitude": LONGITUDE,
        "current": ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m", "weather_code"],
        "timezone": "auto"
    }
    
    try:
        response = requests.get(OPEN_METEO_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}

@app.route('/api/weather/current', methods=['GET'])
def get_current_weather():
    """Get current weather conditions"""
    weather_data = get_weather_data()
    
    if "error" in weather_data:
        return jsonify({"error": weather_data["error"]}), 500
        
    current = weather_data.get("current", {})
    
    return jsonify({
        "timestamp": datetime.utcnow().isoformat(),
        "location": {
            "city": "Guatemala City",
            "latitude": LATITUDE,
            "longitude": LONGITUDE
        },
        "weather": {
            "temperature": {
                "value": current.get("temperature_2m"),
                "unit": "°C"
            },
            "humidity": {
                "value": current.get("relative_humidity_2m"),
                "unit": "%"
            },
            "precipitation": {
                "value": current.get("precipitation"),
                "unit": "mm"
            },
            "wind_speed": {
                "value": current.get("wind_speed_10m"),
                "unit": "km/h"
            },
            "weather_code": current.get("weather_code")
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
