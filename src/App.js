import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Menu from "./component/menu/Menu";
import { useEffect, useState } from "react";

import img from "./assert/logo.png";
import React from "react";
const Preloader = () => {
  return (
    <div className="preloader fade-out">
      <img src={img} alt="Logo" className="logo" />
    </div>
  );
};
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>

        {loading ? (
          <Preloader />
        ) : (
              <Menu />
        )}
    </BrowserRouter>
  );
}

export default App;
