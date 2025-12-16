import { useNavigate } from 'react-router-dom';
import './TourCard.css';

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  return (
    <div className="tour-card" onClick={() => navigate(`/tours/${tour._id}`)}>
      <img src={tour.imageUrl} alt={tour.title} />
      <div className="tour-info">
        <h3>{tour.title}</h3>
        <p>{tour.destination}</p>
        <span>${tour.price}</span>
      </div>
    </div>
  );
};

export default TourCard;
