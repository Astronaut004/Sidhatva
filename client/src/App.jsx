// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Component/Navbar';
import Loader from './ui/Loader'; // used as fallback
import './App.css';

const Home = lazy(() => import('./Pages/Home'));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;