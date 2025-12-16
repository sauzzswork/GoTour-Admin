import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTours, deleteTour } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await getTours();
      setTours(response.data || []);
    } catch (err) {
      setError('Failed to fetch tours');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await deleteTour(id);
        setTours((prev) => prev.filter((tour) => tour._id !== id));
      } catch (err) {
        setError('Failed to delete tour');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="dashboard-left">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back
          </button>
          <h1>Admin Dashboard</h1>
        </div>

        <Link to="/admin/create" className="create-btn">
          + Create New Tour
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* EMPTY STATE */}
      {tours.length === 0 ? (
        <div className="no-tours">
          <p>No tours available</p>
          <Link to="/admin/create">Create your first tour</Link>
        </div>
      ) : (
        /* TOURS TABLE */
        <div className="tours-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Destination</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tours.map((tour) => (
                <tr key={tour._id}>
                  <td>{tour.title}</td>
                  <td>{tour.destination}</td>
                  <td>${tour.price}</td>
                  <td>{tour.duration} days</td>
                  <td>
                    {new Date(tour.startDate).toLocaleDateString()}
                  </td>
                  <td className="actions">
                    <Link
                      to={`/admin/edit/${tour._id}`}
                      className="btn-edit"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(tour._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
