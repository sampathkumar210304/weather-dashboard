import React, { useState } from 'react';
import './App.css';
import Search from './components/search';
import WeatherDisplay from './components/weatherdisplay';
import FavoriteCities from './components/favcities';
import Contact from './components/contact';
import { getWeatherData } from './services/weatherService';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>
        <span className="weather-icon-left">🌤️</span>
        Weather Dashboard
        <span className="weather-icon-right">🌦️</span>
      </h1>
      <div className="dashboard-container">
        <div className="search-section">
          <Search onSearch={handleSearch} />
          {loading && <div className="loading">Loading weather data...</div>}
          {error && <div className="error">{error}</div>}
        </div>
        <div className="favorites-section">
          <FavoriteCities onSelectCity={handleSearch} />
        </div>
      </div>
      <WeatherDisplay weatherData={weatherData} />
      <Contact />
    </div>
  );
}

export default App;
