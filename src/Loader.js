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
      <div class="wrapper">
        <div class="wrapper-cell">
          <div class="image"></div>
          <div class="text">
            <div class="text-line"> </div>
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
          </div>
        </div>
        <div class="wrapper-cell">
          <div class="image"></div>
          <div class="text">
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"> </div>
          </div>
        </div>
        <div class="wrapper-cell">
          <div class="image"></div>
          <div class="text">
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
          </div>
        </div>
        <div class="wrapper-cell">
          <div class="image"></div>
          <div class="text">
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
          </div>
        </div>
        <div class="wrapper-cell">
          <div class="image"></div>
          <div class="text">
            <div class="text-line"> </div>
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
          </div>
        </div>
        <div class="wrapper-cell">
          <div class="image"></div>
          <div class="text">
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
            <div class="text-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
