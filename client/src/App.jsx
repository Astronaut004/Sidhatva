// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Loader from './ui/Loader'; // used as fallback
import Reset from './ui/Reset';
import './App.css';

const Home = lazy(() => import('./Pages/Home'));
const Furniture = lazy(() => import('./Pages/furniture'));
const About = lazy(() => import('./Pages/About'));
const Electronics = lazy(() => import('./Pages/Electronics'));
const Contact = lazy(() => import('./Pages/Contact'));
const HomeDecor = lazy(()=> import('./Pages/HomeDecor'));
const Register = lazy(() => import('./Pages/Auth/Register'));
const Login = lazy(() => import('./Pages/Auth/Login'));
const Cart = lazy(() => import('./Pages/Cart'));
const Wishlist = lazy(() => import('./Pages/Wishlist'));
const ItemDetail = lazy(() => import('./Pages/ItemDetail'));
const Admin = lazy(() => import('./adminPanel/AdminHome'));
const ProductCategory = lazy(() => import('./adminPanel/Category/ProductCategory'));
const ShowAllCategories = lazy(() => import('./adminPanel/Category/ShowAllCategory'));

const App = () => {
  return (
    <Router>
      <Reset />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/About" element={<About />} />
          <Route path="/Electronics" element={<Electronics />} />
          <Route path='decor' element ={<HomeDecor />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist/>} />
          <Route path='/item-detail/:id' element={<ItemDetail/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/productCategory' element={<ProductCategory/>} />
          <Route path='/Show-Categories' element={<ShowAllCategories/>} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
        <Footer/>
      </Suspense>
    </Router>
  );
};

export default App;


// import HomeDecor from './Pages/HomeDecor'; // no lazy()