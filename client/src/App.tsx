import React from 'react';
import { Routes, Route } from "react-router-dom";

import Navigate from './components/headers/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <>
      <Navigate />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
};

export default App;