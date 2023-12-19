

import React, { useState, useEffect } from 'react';
import './Carousel.css';

const images = [
  require('./image9.jpg'),
 require("./image10.jpg"),

 require('./image12.jpg'),
 require('./image14.jpg'),
 require('./image15.jpg')
];

function Carous() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 5000); // Change image every 5 seconds (adjust as needed)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-card ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <button className="prev-button" onClick={handlePrevClick}>
        &lt;
      </button>
      <button className="next-button" onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  );
}

export default Carous;
