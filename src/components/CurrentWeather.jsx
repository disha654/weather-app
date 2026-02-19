import { useState } from 'react'
import './Weather.css'

function CurrentWeather({ apiKey }) {
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError('Please enter a location')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(location)}`
      )
      const data = await response.json()

      if (data.error) {
        setError(data.error.info || 'Failed to fetch weather data')
        setWeather(null)
      } else {
        setWeather(data)
      }
    } catch (err) {
      setError('Network error. Please try again.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="weather-component">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weather && (
        <div className="weather-display">
          <div className="location-info">
            <h2>{weather.location.name}</h2>
            <p>{weather.location.country} - {weather.location.region}</p>
            <p className="local-time">{weather.location.localtime}</p>
          </div>

          <div className="weather-main">
            <img src={weather.current.weather_icons[0]} alt="weather icon" className="weather-icon" />
            <div className="temperature">{weather.current.temperature}°C</div>
            <div className="description">{weather.current.weather_descriptions[0]}</div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="label">Feels Like</span>
              <span className="value">{weather.current.feelslike}°C</span>
            </div>
            <div className="detail-item">
              <span className="label">Humidity</span>
              <span className="value">{weather.current.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="label">Wind Speed</span>
              <span className="value">{weather.current.wind_speed} km/h</span>
            </div>
            <div className="detail-item">
              <span className="label">Wind Direction</span>
              <span className="value">{weather.current.wind_dir}</span>
            </div>
            <div className="detail-item">
              <span className="label">Pressure</span>
              <span className="value">{weather.current.pressure} MB</span>
            </div>
            <div className="detail-item">
              <span className="label">Visibility</span>
              <span className="value">{weather.current.visibility} km</span>
            </div>
            <div className="detail-item">
              <span className="label">UV Index</span>
              <span className="value">{weather.current.uv_index}</span>
            </div>
            <div className="detail-item">
              <span className="label">Cloud Cover</span>
              <span className="value">{weather.current.cloudcover}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrentWeather
