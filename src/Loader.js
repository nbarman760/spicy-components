import React, { useState, useEffect } from 'react';
import './loader.css';
const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`loading-spinner ${loading ? 'show' : 'hide'}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
