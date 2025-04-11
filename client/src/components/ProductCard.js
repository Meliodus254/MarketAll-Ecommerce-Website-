import React from 'react';
import { Image } from 'antd'; // Import Image from Ant Design for preview functionality

const ProductCard = ({ product }) => {
  // Fallback in case images are not available
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;

  return (
    <div
      className="product-card"
      style={{
        width: '300px', // Fixed width for all cards
        height: '400px', // Set fixed height for uniform card size
        margin: '10px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensure button, price, and image are spaced evenly
      }}
    >
      {/* Display Image Preview */}
      {imageUrl ? (
        <Image.PreviewGroup>
          <Image
            src={imageUrl} // Use the first image in the array
            alt={product.title}
            style={{
              width: '100%',
              height: '200px', // Fixed height for images to ensure consistency
              borderRadius: '8px',
              objectFit: 'cover',
              transition: 'transform 0.3s',
            }}
          />
        </Image.PreviewGroup>
      ) : (
        <p>No images available.</p> // Fallback message if no image
      )}

      <h3
        style={{
          marginTop: '15px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
          minHeight: '40px', // Ensures titles have consistent height
          overflow: 'hidden', // Hide overflow text
          textOverflow: 'ellipsis', // If text is too long, add ellipsis
          whiteSpace: 'nowrap', // Prevent text from breaking to a new line
        }}
      >
        {product.title}
      </h3>
      <p
        style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#ff4d4d',
          marginBottom: '15px',
          minHeight: '20px', // Ensures price section has a fixed height
        }}
      >
        {product.price} USD
      </p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff4d4d',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '500',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          alignSelf: 'center', // Ensure button is centered
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
