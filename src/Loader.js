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
    <div classNameName={`loading-spinner ${loading ? 'show' : 'hide'}`}>
      <div className="wrapper">
        <div className="wrapper-cell">
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
        </div>
        <div className="wrapper-cell">
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
        </div>
        <div className="wrapper-cell">
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
        </div>
        <div className="wrapper-cell">
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
        </div>
        <div className="wrapper-cell">
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
             <div className='cell'></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
