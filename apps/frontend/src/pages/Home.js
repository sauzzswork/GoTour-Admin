import React, { useEffect, useState } from 'react';
import { getTours } from '../services/api';
import TourCard from '../components/TourCard';
import HeroSlider from '../components/HeroSlider';

import './Home.css';

const Home = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await getTours();
      setTours(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO SLIDER */}
      <HeroSlider>

    </HeroSlider>

    
      {/* WHY US */}


      {/* RECOMMENDED TOURS */}
      <section className="tours-section">
        <h2>Recommended Tours</h2>

        {loading ? (
          <p>Loading tours...</p>
        ) : tours.length === 0 ? (
          <div className="empty-state">
            <p>No tours available yet</p>
          </div>
        ) : (
          <div className="tours-grid">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
