// components/CategoryList.js
import React from 'react';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div
      className="category-list"
      style={{
        display: 'flex',
        overflowX: 'auto',
        marginBottom: '20px',
        backgroundColor: '#fff',
        padding: '10px 0',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: selectedCategory === category ? '#ff4d4d' : '#f0f0f0',
            color: selectedCategory === category ? '#fff' : '#333',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
