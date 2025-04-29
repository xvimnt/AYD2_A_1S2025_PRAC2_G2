import { useQuery } from '@tanstack/react-query'

interface WeatherData {
  temperature: number
  conditions: string
}

interface TemperatureData {
  apparentTemperature: number
}

interface AQIData {
  aqi: number
  quality: string
}

function App() {
  const weather = useQuery<WeatherData>({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/weather')
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      return response.json()
    },
  })

  const temperature = useQuery<TemperatureData>({
    queryKey: ['temperature'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3002/temperature')
      if (!response.ok) {
        throw new Error('Failed to fetch temperature data')
      }
      return response.json()
    },
  })

  const aqi = useQuery<AQIData>({
    queryKey: ['aqi'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3003/aqi')
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
                <div className="text-4xl font-bold mb-2 text-gray-800">
                  {weather.data?.temperature}°C
                </div>
                <div className="text-gray-600">
                  Conditions: {weather.data?.conditions}
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
                <div className="text-4xl font-bold mb-2 text-gray-800">
                  {temperature.data?.apparentTemperature}°C
                </div>
                <div className="text-gray-600">
                  Feels like
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
                  {aqi.data?.aqi}
                </div>
                <div className="text-gray-600">
                  Quality: {aqi.data?.quality}
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
