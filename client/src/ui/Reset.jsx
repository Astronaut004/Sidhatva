import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Reset = () => {
    const { pathname } = useLocation();
    useEffect(()=> {
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant', // You can also try 'smooth' if preferred
      });
    }, [pathname]);
  return null;
}

export default Reset;
