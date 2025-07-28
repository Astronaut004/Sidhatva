import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Item Detail Page</h1>
        <p className="text-gray-600">Showing details for item with ID: <strong>{id}</strong></p>
        {/* Later, you can fetch details using this ID from an API or data source */}
      </div>
    </div>
  );
};

export default ItemDetail;