import { useState } from 'react';

export const useFavoritesToggle = () => {
  const [showingFavorites, setShowingFavorites] = useState(false);

  const handleFavoritesClick = () => {
    setShowingFavorites((prev) => !prev);
  };

  const setShowingFavorites2 = (showing: boolean) => {
    setShowingFavorites(showing);
  };

  return {
    showingFavorites,
    handleFavoritesClick,
    setShowingFavorites: setShowingFavorites2,
  };
};
