import React, { useState, useEffect, useMemo, useCallback } from 'react';
import '../styles/weatherdisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  // State for loading animation
  const [isLoading, setIsLoading] = useState(false);

  // Memoized weather condition class
  const getWeatherConditionClass = useCallback((description) => {
    const desc = description.toLowerCase();
    if (desc.includes('sun') || desc.includes('clear')) return 'sunny';
    if (desc.includes('cloud')) return 'cloudy';
    if (desc.includes('rain') || desc.includes('drizzle')) return 'rainy';
    if (desc.includes('storm') || desc.includes('thunder')) return 'stormy';
    if (desc.includes('snow') || desc.includes('sleet')) return 'snowy';
    return 'sunny';
  }, []);

  // Memoized time formatter
  const formatTime = useCallback((timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

  // Effect for loading state
  useEffect(() => {
    if (weatherData) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [weatherData]);

  // Memoized weather condition
  const weatherCondition = useMemo(() => {
    if (!weatherData) return 'default';
    return getWeatherConditionClass(weatherData.current.description);
  }, [weatherData, getWeatherConditionClass]);

  if (!weatherData) {
    return (
      <div className="weather-display">
        <div className="weather-placeholder">
          <p>Search for a city to see weather information</p>
        </div>
      </div>
    );
  }

  const { current, forecast } = weatherData;

  return (
    <div className={`weather-display ${weatherCondition} ${isLoading ? 'loading' : ''}`}>
      <div className="weather-container">
        <div className="current-weather">
          <div className="weather-header">
            <h2>{current.city}</h2>
            <p className="weather-date">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          
          <div className="weather-main">
            <div className="temperature">
              <span className="temp-value">{current.temperature}°C</span>
              <span className="weather-description">{current.description}</span>
              <div className="feels-like">
                Feels like {current.feelsLike}°C
              </div>
            </div>
            <div className="weather-icon">
              <img src={current.icon} alt={current.description} />
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{current.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{current.windSpeed} km/h</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{current.pressure} hPa</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{current.visibility / 1000} km</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Sunrise</span>
              <span className="detail-value">{formatTime(current.sunrise)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Sunset</span>
              <span className="detail-value">{formatTime(current.sunset)}</span>
            </div>
          </div>
        </div>

        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-cards">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p className="forecast-day">{day.day}</p>
                <img src={day.icon} alt={day.description} className="forecast-icon" />
                <p className="forecast-description">{day.description}</p>
                <div className="forecast-temps">
                  <span className="forecast-high">{day.high}°</span>
                  <span className="forecast-low">{day.low}°</span>
                </div>
                <div className="forecast-details">
                  <span className="forecast-wind">🌬️ {day.windSpeed} km/h</span>
                  <span className="forecast-humidity">💧 {day.humidity}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
