import { useState } from 'react'
import './App.css'
import CurrentWeather from './components/CurrentWeather'
import HistoricalWeather from './components/HistoricalWeather'
import MarineWeather from './components/MarineWeather'

const API_KEY = '63efd05109cb95e414e50f8c164413a0'

function App() {
  const [activeTab, setActiveTab] = useState('current')

  return (
    <div className="app">
      <div className="glass-container">
        <h1 className="app-title">Weather Dashboard</h1>
        
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Weather
          </button>
          <button 
            className={`tab-btn ${activeTab === 'historical' ? 'active' : ''}`}
            onClick={() => setActiveTab('historical')}
          >
            Historical Weather
          </button>
          <button 
            className={`tab-btn ${activeTab === 'marine' ? 'active' : ''}`}
            onClick={() => setActiveTab('marine')}
          >
            Marine Weather
          </button>
        </div>

        <div className="content">
          {activeTab === 'current' && <CurrentWeather apiKey={API_KEY} />}
          {activeTab === 'historical' && <HistoricalWeather apiKey={API_KEY} />}
          {activeTab === 'marine' && <MarineWeather apiKey={API_KEY} />}
        </div>
      </div>
    </div>
  )
}

export default App
