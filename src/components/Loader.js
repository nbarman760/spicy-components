import React, { useState, useEffect } from 'react';
import './loader.css';
const Loader = () => {
  return (
    <div className={`loading-spinner`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;