import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ image, name, price, details }) => {
  const navigate = useNavigate(); 
  const [showMore, setShowMore] = useState(false);

  const handleBooking = () => {
    navigate('/appointment');
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }} className="menuItemImage"></div>
      <h1>{name}</h1>
      <p>{price} MKD</p>
      <button onClick={handleBooking} className="bookingButton">Закажи</button>
      <button onClick={toggleShowMore} className="toggleButton">
        {showMore ? 'Покажи помалку' : 'Покажи повеќе'}
      </button>
      {showMore && (
        <p className="moreText">{details}</p>
      )}
    </div>
  );
};

export default MenuItem;
