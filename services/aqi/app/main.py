from flask import Flask, jsonify
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {"origins": ["http://localhost:5173", "http://frontend:5173"]}
})

# Open-Meteo Air Quality API base URL
AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality"

# Guatemala City coordinates
LATITUDE = 14.6349
LONGITUDE = -90.5069

# AQI categories in Spanish
AQI_CATEGORIES = {
    (0, 50): "Buena",
    (51, 100): "Moderada",
    (101, 150): "Dañina para grupos sensibles",
    (151, 200): "Dañina",
    (201, 300): "Muy dañina",
    (301, float('inf')): "Peligrosa"
}

def get_aqi_category(aqi):
    """Determine AQI category based on value"""
    if aqi is None:
        return "Desconocida"
    
    for (min_val, max_val), category in AQI_CATEGORIES.items():
        if min_val <= aqi <= max_val:
            return category
    return "Fuera de rango"

def get_air_quality_data():
    """Fetch air quality data from Open-Meteo API"""
    params = {
        "latitude": LATITUDE,
        "longitude": LONGITUDE,
        "current": ["us_aqi", "pm10", "pm2_5", "carbon_monoxide", "nitrogen_dioxide", "ozone"],
        "timezone": "auto"
    }
    
    try:
        response = requests.get(AIR_QUALITY_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}

@app.route('/api/air-quality/current', methods=['GET'])
def get_current_air_quality():
    """Get current air quality index and category"""
    air_data = get_air_quality_data()
    
    if "error" in air_data:
        return jsonify({"error": air_data["error"]}), 500
        
    current = air_data.get("current", {})
    aqi = current.get("us_aqi")
    
    return jsonify({
        "timestamp": datetime.utcnow().isoformat(),
        "location": {
            "city": "Guatemala City",
            "latitude": LATITUDE,
            "longitude": LONGITUDE
        },
        "air_quality": {
            "aqi": aqi,
            "categoria": get_aqi_category(aqi),
            "descripcion": "Basado en el Índice de Calidad del Aire de EE.UU. (US AQI)"
        }
    })

@app.route('/api/air-quality/pollutants', methods=['GET'])
def get_pollutants():
    """Get detailed pollutant information"""
    air_data = get_air_quality_data()
    
    if "error" in air_data:
        return jsonify({"error": air_data["error"]}), 500
        
    current = air_data.get("current", {})
    
    return jsonify({
        "timestamp": datetime.utcnow().isoformat(),
        "location": {
            "city": "Guatemala City",
            "latitude": LATITUDE,
            "longitude": LONGITUDE
        },
        "contaminantes": {
            "pm2_5": {
                "valor": current.get("pm2_5"),
                "unidad": "µg/m³",
                "descripcion": "Partículas finas (PM2.5)"
            },
            "pm10": {
                "valor": current.get("pm10"),
                "unidad": "µg/m³",
                "descripcion": "Partículas gruesas (PM10)"
            },
            "co": {
                "valor": current.get("carbon_monoxide"),
                "unidad": "µg/m³",
                "descripcion": "Monóxido de carbono"
            },
            "no2": {
                "valor": current.get("nitrogen_dioxide"),
                "unidad": "µg/m³",
                "descripcion": "Dióxido de nitrógeno"
            },
            "o3": {
                "valor": current.get("ozone"),
                "unidad": "µg/m³",
                "descripcion": "Ozono"
            }
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
