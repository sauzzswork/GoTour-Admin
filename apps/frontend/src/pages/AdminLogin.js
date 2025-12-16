import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoading(true);
      const response = await loginAdmin(email, password);
      login(response.data.token, response.data.admin);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* LOGO */}
      <div className="logo-container">
        <img src="/logo.png" alt="GoTour Logo" />
      </div>

      {/* LOGIN CARD */}
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <span>Use your admin email & password</span>

          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* TEST CREDENTIALS (KEPT) */}
          <div className="test-credentials">
            <p>Test Credentials</p>
            <small>Email: admin@tripzsearch.com</small>
            <br />
            <small>Password: Admin@123</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
