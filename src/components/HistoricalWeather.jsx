import { useState } from 'react'
import './Weather.css'

function HistoricalWeather({ apiKey }) {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchHistoricalWeather = async () => {
    if (!location.trim() || !date) {
      setError('Please enter both location and date')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.weatherstack.com/historical?access_key=${apiKey}&query=${encodeURIComponent(location)}&historical_date=${date}`
      )
      const data = await response.json()

      if (data.error) {
        setError(data.error.info || 'Failed to fetch historical weather data')
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
          className="search-input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="search-input"
          max={new Date().toISOString().split('T')[0]}
        />
        <button onClick={fetchHistoricalWeather} className="search-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weather && weather.historical && (
        <div className="weather-display">
          <div className="location-info">
            <h2>{weather.location.name}</h2>
            <p>{weather.location.country} - {weather.location.region}</p>
          </div>

          {Object.entries(weather.historical).map(([dateKey, dayData]) => (
            <div key={dateKey} className="historical-day">
              <h3 className="date-title">{dateKey}</h3>
              
              <div className="weather-details">
                <div className="detail-item">
                  <span className="label">Min Temp</span>
                  <span className="value">{dayData.mintemp}°C</span>
                </div>
                <div className="detail-item">
                  <span className="label">Max Temp</span>
                  <span className="value">{dayData.maxtemp}°C</span>
                </div>
                <div className="detail-item">
                  <span className="label">Avg Temp</span>
                  <span className="value">{dayData.avgtemp}°C</span>
                </div>
                <div className="detail-item">
                  <span className="label">Sun Hours</span>
                  <span className="value">{dayData.sunhour}h</span>
                </div>
                <div className="detail-item">
                  <span className="label">UV Index</span>
                  <span className="value">{dayData.uv_index}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total Snow</span>
                  <span className="value">{dayData.totalsnow} cm</span>
                </div>
              </div>

              {dayData.astro && (
                <div className="astro-info">
                  <h4>Astronomical Data</h4>
                  <div className="weather-details">
                    <div className="detail-item">
                      <span className="label">Sunrise</span>
                      <span className="value">{dayData.astro.sunrise}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Sunset</span>
                      <span className="value">{dayData.astro.sunset}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Moon Phase</span>
                      <span className="value">{dayData.astro.moon_phase}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Moon Illumination</span>
                      <span className="value">{dayData.astro.moon_illumination}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoricalWeather
