import { useState } from 'react'
import './Weather.css'

function MarineWeather({ apiKey }) {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMarineWeather = async () => {
    if (!latitude.trim() || !longitude.trim()) {
      setError('Please enter both latitude and longitude')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.weatherstack.com/marine?access_key=${apiKey}&latitude=${latitude}&longitude=${longitude}&tide=yes`
      )
      const data = await response.json()

      if (data.error) {
        setError(data.error.info || 'Failed to fetch marine weather data')
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
          type="number"
          step="any"
          placeholder="Latitude (e.g., 45.00)"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude (e.g., -2.00)"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchMarineWeather} className="search-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weather && weather.forecast && (
        <div className="weather-display">
          <div className="location-info">
            <h2>Marine Weather Forecast</h2>
            <p>{weather.request.query}</p>
          </div>

          <div className="marine-forecast">
            {weather.forecast.slice(0, 3).map((day) => (
              <div key={day.date} className="marine-day">
                <h3 className="date-title">{day.date}</h3>
                
                <div className="weather-details">
                  <div className="detail-item">
                    <span className="label">Min Temp</span>
                    <span className="value">{day.mintemp}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Max Temp</span>
                    <span className="value">{day.maxtemp}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Avg Temp</span>
                    <span className="value">{day.avgtemp}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">UV Index</span>
                    <span className="value">{day.uv_index}</span>
                  </div>
                </div>

                {day.astro && (
                  <div className="astro-info">
                    <h4>Astronomical Data</h4>
                    <div className="weather-details">
                      <div className="detail-item">
                        <span className="label">Sunrise</span>
                        <span className="value">{day.astro.sunrise}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Sunset</span>
                        <span className="value">{day.astro.sunset}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Moon Phase</span>
                        <span className="value">{day.astro.moon_phase}</span>
                      </div>
                    </div>
                  </div>
                )}

                {day.tides && day.tides.length > 0 && (
                  <div className="tide-info">
                    <h4>Tide Information</h4>
                    <div className="tide-list">
                      {day.tides.map((tide, index) => (
                        <div key={index} className="tide-item">
                          <span className="tide-time">{tide.tideTime}</span>
                          <span className="tide-type">{tide.tide_type}</span>
                          <span className="tide-height">{tide.tideHeight_mt}m</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {day.hourly && day.hourly.length > 0 && (
                  <div className="marine-hourly">
                    <h4>Marine Conditions (First Reading)</h4>
                    <div className="weather-details">
                      <div className="detail-item">
                        <span className="label">Water Temp</span>
                        <span className="value">{day.hourly[0].water_temp}°C</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Wave Height</span>
                        <span className="value">{day.hourly[0].sig_height_m}m</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Swell Height</span>
                        <span className="value">{day.hourly[0].swell_height}m</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Swell Direction</span>
                        <span className="value">{day.hourly[0].swell_dir_16_point}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Wind Speed</span>
                        <span className="value">{day.hourly[0].wind_speed} km/h</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Visibility</span>
                        <span className="value">{day.hourly[0].visibility} km</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MarineWeather
