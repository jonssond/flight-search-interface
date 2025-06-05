import './header.css';
import { ReactComponent as StarIcon } from '../../assets/icons/star-svgrepo-com.svg';

interface HeaderProps {
  onFavoritesClick: () => void;
  showingFavorites: boolean;
}

export const Header = ({ onFavoritesClick, showingFavorites }: HeaderProps) => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <p>SearchFlight</p>
      </div>
      <div className="header-favorites">
        <button
          className={`favorites-button ${showingFavorites ? 'active' : ''}`}
          onClick={onFavoritesClick}
          title={
            showingFavorites
              ? 'Mostrar todos os voos'
              : 'Mostrar apenas favoritos'
          }
        >
          <StarIcon
            fill={showingFavorites ? 'gold' : 'none'}
            width="48"
            height="48"
            stroke="gold"
            strokeWidth={1}
          />
        </button>
      </div>
    </header>
  );
};
