import { Header } from './components/header/Header';
import { useFavoritesToggle } from './hooks/useFavoritesToggle';
import { FlightSearchPage } from './pages/FlighSearchPage';
import './styles/global.css';

export const App = () => {
  const { showingFavorites, handleFavoritesClick, setShowingFavorites } =
    useFavoritesToggle();

  return (
    <div className="App">
      <div className="main-container">
        <Header
          onFavoritesClick={handleFavoritesClick}
          showingFavorites={showingFavorites}
        />
        <FlightSearchPage
          showingFavorites={showingFavorites}
          onShowingFavoritesChange={setShowingFavorites}
        />
      </div>
    </div>
  );
};
