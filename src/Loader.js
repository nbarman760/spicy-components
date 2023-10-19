import React, { useState, useEffect } from 'react';
import './loader.css';
const Loader = () => {
  const [loading, setLoading] = useState(true);
  const loaderRows = [];
  useEffect(() => {
    // Simulate loading with a delay
    for (let i = 0; i < 15; i++) {
      loaderRows.push('');
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div classNameName={`loading-spinner ${loading ? 'show' : 'hide'}`}>
      <div className="wrapper">
        <div className='full-header'></div>
        {
          loaderRows.map((row) => (<div className="wrapper-cell">
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
            <div className='cell'></div>
          </div>))
        }
      </div>
    </div>
  );
};

export default Loader;
