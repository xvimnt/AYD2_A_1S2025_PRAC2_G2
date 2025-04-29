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

def get_apparent_temperature():
    """Fetch apparent temperature data from Open-Meteo API"""
    params = {
        "latitude": LATITUDE,
        "longitude": LONGITUDE,
        "current": ["temperature_2m", "apparent_temperature"],
        "timezone": "auto"
    }
    
    try:
        response = requests.get(OPEN_METEO_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}

@app.route('/api/temperature/current', methods=['GET'])
def get_current_temperature():
    """Get current apparent temperature"""
    weather_data = get_apparent_temperature()
    
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
        "temperature": {
            "actual": {
                "value": current.get("temperature_2m"),
                "unit": "°C"
            },
            "apparent": {
                "value": current.get("apparent_temperature"),
                "unit": "°C"
            }
        }
    })

@app.route('/api/temperature/history', methods=['GET'])
def get_temperature_history():
    """Get temperature history for the last 24 hours"""
    return jsonify({
        "message": "Historical data endpoint - To be implemented",
        "status": "not_implemented"
    }), 501

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
