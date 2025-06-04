import './header.css';
import { ReactComponent as StarIcon } from '../../assets/icons/star-svgrepo-com.svg';

export const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <p>SearchFlight</p>
      </div>
      <div className="header-favorites">
        <span className="star-icon">
          <StarIcon
            fill="gold"
            width="48"
            height="48"
            stroke="gold"
            strokeWidth={1}
          />
        </span>
      </div>
    </header>
  );
};
