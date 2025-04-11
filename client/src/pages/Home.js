// pages/Home.js
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../functions/product';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(); // Fetch the products data
        console.log("Fetched response:", response); // Debug: check response structure

        // Check if the response has a 'data' property that is an array
        if (Array.isArray(response)) {
          setProducts(response); // Set the products array if it's valid
          
          // Extract unique categories
          const uniqueCategories = [
            ...new Set(response.map((p) => p.category?.name || 'Unknown')),
          ];
          setCategories(['All', ...uniqueCategories]); // Set the categories
        } else {
          console.error("Unexpected data format:", response);
          setProducts([]); // Reset products if the format is invalid
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]); // Reset products in case of error
      }
    };

    loadProducts(); // Call the load function on component mount
  }, []); // Empty dependency array, so this runs once on mount

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category?.name === selectedCategory);

  return (
    <div className="home-page" style={{ padding: '20px', backgroundColor: '#f8f8f8' }}>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default HomePage;
