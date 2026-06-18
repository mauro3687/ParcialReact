import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem('posts_favorites');
    
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('posts_favorites', JSON.stringify(favorites || []));
  }, [favorites]);

  const toggleFavorite = (postId) => {
    setFavorites((prevFavs) => {
    
      const currentFavs = Array.isArray(prevFavs) ? prevFavs : [];
      if (currentFavs.includes(postId)) {
        return currentFavs.filter((id) => id !== postId);
      } else {
        return [...currentFavs, postId];
      }
    });
  };


  const isFavorite = (postId) => {
    return Array.isArray(favorites) ? favorites.includes(postId) : false;
  };

  return (
    <FavoritesContext.Provider value={{ favorites: favorites || [], toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  return context;
};