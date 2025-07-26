// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Component/Navbar';
import Loader from './ui/Loader'; // used as fallback
import './App.css';

const Home = lazy(() => import('./Pages/Home'));
const Furniture = lazy(() => import('./Pages/furniture'));
const About = lazy(() => import('./Pages/About'));
const Sofa = lazy(() => import('./Pages/Sofa'));
const Contact = lazy(() => import('./Pages/Contact'));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/About" element={<About />} />
          <Route path="/Sofa" element={<Sofa />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;