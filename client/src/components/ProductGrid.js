// components/ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  // If products is not an array, show a message
  if (!Array.isArray(products)) {
    return <div>No products available.</div>;
  }

  return (
    <div
      className="product-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
