import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './component/home/Home';
import FavooriteFood from './component/favorite/FavooriteFood';

import React, { useState, useEffect } from "react";
import "./App.css";
import img from "./assert/logo.png"
const Preloader = () => {
  return (
    <div className="preloader fade-out">
      <img src={img} alt="Logo" className="logo" />
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? <Preloader /> : <>  <div className='app'>
        <Home />
        <FavooriteFood /> </div>
      </>}

    </BrowserRouter>
  );
}

export default App;
