import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Perform some logic
    // Navigate to a different page
    navigate('/path-to-your-page');
  };

  return (
    <div>
      <button onClick={handleClick}>Navigate</button>
    </div>
  );
};

export default MyComponent;
