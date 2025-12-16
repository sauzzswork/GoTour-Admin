import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTourById, updateTour } from '../services/api';
import './TourForm.css';

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    price: '',
    startDate: '',
    duration: '',
    imageUrl: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch tour data
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await getTourById(id);
        const tour = response.data;

        setFormData({
          title: tour.title || '',
          destination: tour.destination || '',
          price: tour.price || '',
          startDate: tour.startDate
            ? new Date(tour.startDate).toISOString().split('T')[0]
            : '',
          duration: tour.duration || '',
          imageUrl: tour.imageUrl || '',
          description: tour.description || '',
        });
      } catch (err) {
        setError('Failed to fetch tour details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setSubmitting(true);
      await updateTour(id, formData);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update tour');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Fetching tour details...</div>;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Edit Tour</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Destination *</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Duration (days) *</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Tour'}
            </button>

            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTour;
