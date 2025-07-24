import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Component/Navbar';

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

