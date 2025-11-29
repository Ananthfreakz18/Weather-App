import { useState } from 'react';
import { Cloud, Search, Droplets, Wind, Eye, Gauge } from 'lucide-react';

// Weather Component - Manages all weather-related functionality
const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '0efe0b956e513b1217ad609add553e0e'; 
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
//   const API_URL = 'https://api.openweathermap.org/data/2.5/weather?&appid=';

  // Handle weather search using native fetch
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      // Dynamic API URL using template literals
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('API key error. Please check your configuration.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again later.');
        }
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather data.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Cloud className="w-12 h-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Weather Report
            </h1>
          </div>
          <p className="text-white text-lg opacity-90">
            Get real-time weather data for any city
          </p>
        </header>

        {/* Search Section */}
        <section className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city name..."
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="City name input"
            />
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
              aria-label="Search weather"
            >
              <Search className="w-5 h-5" />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
        </section>

        {/* Weather Display */}
        {weatherData && (
          <main className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {/* Main Weather Info */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p className="text-gray-600 text-lg capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>

            {/* Temperature Display */}
            <div className="flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="text-7xl md:text-8xl font-bold text-blue-600 mb-2">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <p className="text-gray-600 text-lg">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Humidity */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Droplets className="w-6 h-6 text-blue-600" />
                  <h3 className="text-gray-700 font-semibold text-lg">Humidity</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {weatherData.main.humidity}%
                </p>
              </div>

              {/* Wind Speed */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Wind className="w-6 h-6 text-green-600" />
                  <h3 className="text-gray-700 font-semibold text-lg">Wind Speed</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {weatherData.wind.speed} m/s
                </p>
              </div>

              {/* Pressure */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Gauge className="w-6 h-6 text-purple-600" />
                  <h3 className="text-gray-700 font-semibold text-lg">Pressure</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {weatherData.main.pressure} hPa
                </p>
              </div>

              {/* Visibility */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-6 h-6 text-orange-600" />
                  <h3 className="text-gray-700 font-semibold text-lg">Visibility</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {(weatherData.visibility / 1000).toFixed(1)} km
                </p>
              </div>

              {/* Min Temperature */}
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 flex items-center justify-center text-cyan-600 font-bold">↓</div>
                  <h3 className="text-gray-700 font-semibold text-lg">Min Temp</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {Math.round(weatherData.main.temp_min)}°C
                </p>
              </div>

              {/* Max Temperature */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 flex items-center justify-center text-red-600 font-bold">↑</div>
                  <h3 className="text-gray-700 font-semibold text-lg">Max Temp</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {Math.round(weatherData.main.temp_max)}°C
                </p>
              </div>
            </div>
          </main>
        )}


      </div>
    </div>
  );
};

export default WeatherApp;