import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigate from './components/Navigate';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Navigate />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
};

export default App;