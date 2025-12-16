import { useEffect, useState } from "react";
import "./HeroSlider.css";

const slides = [
  {
    title: "Adventure is Worthwhile",
    subtitle: "Explore the world with GoTour",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Discover Iconic Places",
    subtitle: "Handpicked destinations for you",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
];

const HeroSlider = ({ children }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <img src={slides[index].image} alt="slide" />

      <div className="overlay">
        <h1>{slides[index].title}</h1>
        <p>{slides[index].subtitle}</p>

        {/* 👇 SEARCH GOES HERE */}
        {children}

        <button className="hero-btn">Explore Tours</button>
      </div>
    </div>
  );
};

export default HeroSlider;
