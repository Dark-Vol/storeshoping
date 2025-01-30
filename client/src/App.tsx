import { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";

import Navigate from './components/headers/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MainLoader from "./components/MainLoader"


const ErrorPage = lazy(
  () => import(/* webpackChunkName: "ErrorPage"*/ "./pages/error")
);
const App: React.FC = () => {
  return (
    <>
      <Navigate />
      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  )
};

export default App;