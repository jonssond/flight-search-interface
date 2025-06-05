import { ReactComponent as StarIcon } from '../../assets/icons/star-svgrepo-com.svg';
import { useFavorites } from '../../contexts/FavoritesContext';
import './star-button.css';

interface StarButtonProps {
  flightId: string;
}

export const StarButton = ({ flightId }: StarButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFlightFavorite = isFavorite(flightId);

  const handleClick = () => {
    toggleFavorite(flightId);
  };

  return (
    <button className="star-button" onClick={handleClick}>
      <StarIcon
        fill={isFlightFavorite ? 'gold' : 'none'}
        width="24"
        height="24"
        stroke="gold"
        strokeWidth={2}
      />
    </button>
  );
};
