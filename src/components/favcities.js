import React, { useState, useEffect } from 'react';
import '../styles/favcities.css';

const FavoriteCities = ({ onSelectCity }) => {
  const [favorites, setFavorites] = useState([]);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
  }, []);

  const saveFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  const addFavorite = (e) => {
    e.preventDefault();
    if (newCity.trim() && !favorites.includes(newCity.trim())) {
      const updatedFavorites = [...favorites, newCity.trim()];
      saveFavorites(updatedFavorites);
      setNewCity('');
    }
  };

  const removeFavorite = (cityToRemove) => {
    const updatedFavorites = favorites.filter(city => city !== cityToRemove);
    saveFavorites(updatedFavorites);
  };

  return (
    <div className="favorite-cities">
      <h3>Favorite Cities</h3>
      
      <form onSubmit={addFavorite} className="add-favorite-form">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Add a city to favorites"
          className="favorite-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>

      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p className="no-favorites">No favorite cities yet</p>
        ) : (
          favorites.map((city) => (
            <div key={city} className="favorite-item">
              <button 
                className="city-button"
                onClick={() => onSelectCity(city)}
              >
                {city}
              </button>
              <button 
                className="remove-button"
                onClick={() => removeFavorite(city)}
                title="Remove from favorites"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteCities;
