# Weather App with Glassmorphic Design 

A beautiful React weather application that displays current weather, historical weather, and marine weather data using the Weatherstack API.

## Features

- **Current Weather**: Get real-time weather data for any location
- **Historical Weather**: View past weather data by selecting a date
- **Marine Weather**: Access marine forecasts with tide information using latitude/longitude coordinates
- **Glassmorphic UI**: Modern, elegant design with glass-effect styling
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

### Current Weather
1. Click on the "Current Weather" tab
2. Enter a city name (e.g., "New York", "London", "Tokyo")
3. Click "Search" or press Enter
4. View temperature, humidity, wind speed, and more

### Historical Weather
1. Click on the "Historical Weather" tab
2. Enter a city name
3. Select a date from the date picker
4. Click "Search" to view historical weather data
5. Note: Historical data requires a Standard plan or higher on Weatherstack

### Marine Weather
1. Click on the "Marine Weather" tab
2. Enter latitude (e.g., 45.00)
3. Enter longitude (e.g., -2.00)
4. Click "Search" to view marine forecasts including tide information
5. Note: Marine weather requires a Standard plan or higher on Weatherstack

## API Key

The app uses the Weatherstack API with the key: `63efd05109cb95e414e50f8c164413a0`

If you want to use your own API key, replace it in `src/App.jsx`:
```javascript
const API_KEY = 'your_api_key_here'
```

## Technologies Used

- React 18
- Vite
- Weatherstack API
- CSS3 (Glassmorphism effects)

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Note

Some features like Historical Weather and Marine Weather require a paid Weatherstack plan. The free plan only supports Current Weather lookups.


## Deployed url
(https://vercel.com/disha-vs-projects/weather-app/ANivGFhZXNFXMA5Fa7tvk1tjXa2R)
