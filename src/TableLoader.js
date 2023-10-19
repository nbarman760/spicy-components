import React, { useState, useEffect } from 'react';
import './loader.css';
const TableLoader = () => {
  const [loading, setLoading] = useState(true);
  const loaderRows = [1,2,3,4,4,5,6,7,7,8,8,9,9,0,3,45,5,6];
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
        <div className='toolbox'>
            <div className='searchbox'></div>
            <div className='space'></div>
            <div className='button-loader'></div>
            <div className='button-loader'></div>
            <div className='button-loader'></div>
        </div>
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

export default TableLoader;
