import { useQuery } from '@tanstack/react-query'

interface WeatherData {
  location: {
    city: string
    latitude: number
    longitude: number
  }
  timestamp: string
  weather: {
    humidity: {
      unit: string
      value: number
    }
    precipitation: {
      unit: string
      value: number
    }
    temperature: {
      unit: string
      value: number
    }
    weather_code: number
    wind_speed: {
      unit: string
      value: number
    }
  }
}

interface TemperatureData {
  location: {
    city: string
    latitude: number
    longitude: number
  }
  temperature: {
    actual: {
      unit: string
      value: number
    }
    apparent: {
      unit: string
      value: number
    }
  }
  timestamp: string
}

interface AQIData {
  air_quality: {
    aqi: number
    categoria: string
    descripcion: string
  }
  location: {
    city: string
    latitude: number
    longitude: number
  }
  timestamp: string
}

function App() {
  const weather = useQuery<WeatherData>({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/weather/current')
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      return response.json()
    },
  })

  const temperature = useQuery<TemperatureData>({
    queryKey: ['temperature'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/temperature/current')
      if (!response.ok) {
        throw new Error('Failed to fetch temperature data')
      }
      return response.json()
    },
  })

  const aqi = useQuery<AQIData>({
    queryKey: ['aqi'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5002/api/air-quality/current')
      if (!response.ok) {
        throw new Error('Failed to fetch AQI data')
      }
      return response.json()
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Weather Information Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weather Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Weather</h2>
            {weather.isPending ? (
              <div className="text-gray-600">Loading...</div>
            ) : weather.error ? (
              <div className="text-red-600 text-sm">
                Error: {weather.error.message}
                <button 
                  onClick={() => weather.refetch()} 
                  className="block mt-2 text-blue-600 hover:text-blue-800"
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <div className="text-4xl font-bold text-gray-800">
                      {weather.data?.weather.temperature.value}{weather.data?.weather.temperature.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      Temperatura
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-700">
                        {weather.data?.weather.humidity.value}{weather.data?.weather.humidity.unit}
                      </div>
                      <div className="text-gray-600">Humedad</div>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-gray-700">
                        {weather.data?.weather.wind_speed.value} {weather.data?.weather.wind_speed.unit}
                      </div>
                      <div className="text-gray-600">Viento</div>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-gray-700">
                        {weather.data?.weather.precipitation.value} {weather.data?.weather.precipitation.unit}
                      </div>
                      <div className="text-gray-600">Precipitación</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 pt-2">
                    {weather.data?.location.city}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Apparent Temperature Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              Apparent Temperature
            </h2>
            {temperature.isPending ? (
              <div className="text-gray-600">Loading...</div>
            ) : temperature.error ? (
              <div className="text-red-600 text-sm">
                Error: {temperature.error.message}
                <button 
                  onClick={() => temperature.refetch()} 
                  className="block mt-2 text-blue-600 hover:text-blue-800"
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <div className="text-4xl font-bold text-gray-800">
                      {temperature.data?.temperature.actual.value}{temperature.data?.temperature.actual.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      Temperatura actual
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-700">
                      {temperature.data?.temperature.apparent.value}{temperature.data?.temperature.apparent.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      Sensación térmica
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 pt-2">
                    {temperature.data?.location.city}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* AQI Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              Air Quality Index
            </h2>
            {aqi.isPending ? (
              <div className="text-gray-600">Loading...</div>
            ) : aqi.error ? (
              <div className="text-red-600 text-sm">
                Error: {aqi.error.message}
                <button 
                  onClick={() => aqi.refetch()} 
                  className="block mt-2 text-blue-600 hover:text-blue-800"
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="text-4xl font-bold mb-2 text-gray-800">
                  {aqi.data?.air_quality.aqi}
                </div>
                <div className="text-gray-600 mb-2">
                  {aqi.data?.air_quality.categoria}
                </div>
                <div className="text-sm text-gray-500">
                  {aqi.data?.air_quality.descripcion}
                </div>
                <div className="mt-3 text-xs text-gray-400">
                  {aqi.data?.location.city}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
