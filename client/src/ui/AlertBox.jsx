import React, { useEffect } from 'react';

const AlertBox = ({ alert, setAlert }) => {
  // Auto-hide after 3 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.show, setAlert]);

  return (
    <div
      className={`fixed top-25 right-5 w-80 z-50 transition-all duration-300 ease-in-out ${
        alert.show
          ? 'transform translate-x-0 opacity-100'
          : 'transform translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative rounded-lg shadow-lg p-4 ${
          alert.type === 'success'
            ? 'bg-green-50 border-l-4 border-green-500 text-green-800'
            : 'bg-red-50 border-l-4 border-red-500 text-red-800'
        }`}
      >
        {/* Progress bar */}
        <div
          className={`absolute top-0 left-0 h-1 rounded-t-lg ${
            alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{
            width: alert.show ? '100%' : '0%',
            transition: alert.show ? 'width 3s linear' : 'none',
          }}
        ></div>

        <div className="flex items-center gap-3">
          <div>
            <strong className="font-semibold">
              {alert.type === 'success' ? 'Success!' : 'Error!'}
            </strong>
            <span className="ml-2">{alert.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
