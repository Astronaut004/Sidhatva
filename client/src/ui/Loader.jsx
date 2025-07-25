import React from 'react';

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      {/* Border wrapper */}
      <div className="relative w-32 h-32 -mt-24">
        {/* Rotating border */}
        <div className="absolute inset-0 rounded-full border-4 border-sky-400 border-b-transparent animate-spin"></div>

        {/* Image inside */}
        <img
          src="/image/logo.png"
          alt="Logo"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Loader;