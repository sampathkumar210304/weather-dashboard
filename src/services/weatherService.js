import { API_CONFIG } from '../config/api';

const { BASE_URL, API_KEY, ENDPOINTS } = API_CONFIG.WEATHER;

const fetchWeatherData = async (endpoint, params) => {
  const queryParams = new URLSearchParams({
    ...params,
    units: 'metric',
    appid: API_KEY
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('City not found');
  }

  return response.json();
};

export const getCurrentWeather = async (city) => {
  try {
    const data = await fetchWeatherData(ENDPOINTS.CURRENT_WEATHER, { q: city });
    
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      feelsLike: Math.round(data.main.feels_like),
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getForecast = async (city) => {
  try {
    const data = await fetchWeatherData(ENDPOINTS.FORECAST, { q: city });
    
    // Group forecast by day and get min/max temperatures
    const dailyForecast = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!dailyForecast[day]) {
        dailyForecast[day] = {
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          description: item.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        };
      } else {
        dailyForecast[day].high = Math.max(dailyForecast[day].high, Math.round(item.main.temp_max));
        dailyForecast[day].low = Math.min(dailyForecast[day].low, Math.round(item.main.temp_min));
      }
    });

    // Convert to array format
    return Object.entries(dailyForecast).map(([day, data]) => ({
      day,
      ...data
    })).slice(0, 5); // Get only next 5 days
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getWeatherData = async (city) => {
  try {
    const [current, forecast] = await Promise.all([
      getCurrentWeather(city),
      getForecast(city)
    ]);

    return {
      current,
      forecast
    };
  } catch (error) {
    throw new Error(error.message);
  }
}; 