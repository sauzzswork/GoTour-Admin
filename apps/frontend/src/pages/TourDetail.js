import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTourById } from '../services/api';
import './TourDetail.css';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tour details
  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getTourById(id);
        setTour(response.data);
      } catch (err) {
        setError('Failed to fetch tour details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return <div className="loading">Fetching tour details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!tour) {
    return <div className="error">Tour not found</div>;
  }

  return (
    <div className="tour-detail">
      <button
        className="back-btn"
        onClick={() => navigate('/')}
      >
        ← Back to Tours
      </button>

      <div className="detail-container">
        <div className="detail-image">
          <img
            src={tour.imageUrl}
            alt={tour.title}
          />
        </div>

        <div className="detail-content">
          <h1>{tour.title}</h1>
          <p className="destination">
            📍 Destination: {tour.destination}
          </p>

          <div className="tour-details-grid">
            <div className="detail-item">
              <span className="label">Price</span>
              <span className="value">${tour.price}</span>
            </div>

            <div className="detail-item">
              <span className="label">Duration</span>
              <span className="value">{tour.duration} days</span>
            </div>

            <div className="detail-item">
              <span className="label">Start Date</span>
              <span className="value">
                {tour.startDate
                  ? new Date(tour.startDate).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
          </div>

          <div className="description">
            <h3>About this tour</h3>
            <p>{tour.description || 'Amazing tour experience'}</p>
          </div>

          <button className="book-btn">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
