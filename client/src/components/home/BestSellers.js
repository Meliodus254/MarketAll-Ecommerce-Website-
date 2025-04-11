import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product"; // Import fetch functions
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(false); // Track loading state
  const [productsCount, setProductsCount] = useState(0); // Store total count of products
  const [page, setPage] = useState(1); // Track current page
  const productsPerPage = 3; // Products per page

  // Fetch products whenever the page changes
  useEffect(() => {
    loadAllProducts();
  }, [page]);

  // Fetch total products count for pagination
  useEffect(() => {
    getProductsCount()
      .then((res) => {
        setProductsCount(res.data); // Set the total count
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Fetch products with sorting
  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold", "desc", page)
      .then((res) => {
        console.log("BestSellers Products Response:", res); // Debugging log
        const productsData = res.data;
        if (Array.isArray(productsData) && productsData.length > 0) {
          setProducts(productsData); // Set products to the state
        } else {
          setProducts([]); // Set empty array if no products are returned
        }
        setLoading(false); // Hide loading skeleton
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching products:", err);
        setProducts([]); // Handle error case by setting products as empty array
      });
  };

  // Pagination slicing
  const currentProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} /> // Show loading skeleton while data is loading
        ) : (
          <div className="row">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product._id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={productsCount}
            pageSize={productsPerPage}
            onChange={(value) => setPage(value)} // Update page state
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
