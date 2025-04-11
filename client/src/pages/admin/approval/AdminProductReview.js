import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUnapprovedProducts, approveProduct, rejectProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import { Card, Button, Spin, Image, Tag } from "antd";

const AdminProductReview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const state = useSelector((state) => state);
  const { user } = state;

  // Helper function to retrieve token
  const getToken = () => {
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      toast.error("❌ User not authenticated. Please log in.");
    }
    return token;
  };

  // Fetch unapproved products
  const fetchUnapproved = useCallback(async () => {
    try {
      const response = await fetchUnapprovedProducts();
      const productsList = response?.products || [];
      if (productsList.length === 0) {
        toast.info("✨ No unapproved products available.");
      }
      setProducts(productsList);
    } catch (err) {
      console.error("Error fetching unapproved products:", err);
      toast.error("❌ Failed to fetch unapproved products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUnapproved();
  }, [fetchUnapproved]);

  // Approve product
  const handleApprove = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await approveProduct(productId, token);
      toast.success(`✨ Product "${response.title}" approved.`);
      fetchUnapproved();
    } catch (error) {
      console.error("Error approving product:", error);
      toast.error("❌ Failed to approve product.");
    }
  };

  // Reject product
  const handleReject = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await rejectProduct(productId, token);
      toast.success(`❌ Product "${response.title}" rejected.`);
      fetchUnapproved();
    } catch (error) {
      console.error("Error rejecting product:", error);
      toast.error("❌ Failed to reject product.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <AdminNav />
      </div>
      <div style={styles.mainContent}>
        <Card
          title={<h2 style={styles.title}>Review Unapproved Products</h2>}
          bordered={false}
          style={styles.card}
        >
          {loading ? (
            <Spin size="large" tip="Fetching products..." />
          ) : !products || products.length === 0 ? (
            <p>No unapproved products available.</p>
          ) : (
            (products || []).map((product) => (
              <Card key={product._id} style={styles.productCard}>
                <h3 style={styles.productTitle}>{product.title}</h3>
                <p style={styles.productDescription}>{product.description}</p>

                {/* Display images */}
                {product.images?.length > 0 ? (
                  <Image.PreviewGroup>
                    {product.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image.url}
                        alt={product.title}
                        style={styles.productImage}
                      />
                    ))}
                  </Image.PreviewGroup>
                ) : (
                  <p>No images available.</p>
                )}

                {/* Display other product details */}
                <p><strong>Price:</strong> KSH{product.price}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Shipping:</strong> {product.shipping}</p>
                <p><strong>Color:</strong> {product.color}</p>
                <p><strong>Brand:</strong> {product.brand}</p>

                {/* Display categories and subs as tags */}
                <div style={styles.tagContainer}>
                  {product.categories?.map((category, index) => (
                    <Tag key={index} color="blue">{category.name}</Tag>
                  ))}
                  {product.subs?.map((sub, index) => (
                    <Tag key={index} color="green">{sub.name}</Tag>
                  ))}
                </div>

                {/* Approve/Reject buttons */}
                <div style={styles.buttonContainer}>
                  <Button
                    type="primary"
                    onClick={() => handleApprove(product._id)}
                    style={styles.approveButton}
                  >
                    Approve
                  </Button>
                  <Button
                    danger
                    onClick={() => handleReject(product._id)}
                    style={styles.rejectButton}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))
          )}
        </Card>
      </div>
    </div>
  );
};

// Styles for the AdminProductReview component
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f5f5",
  },
  sidebar: {
    flex: "0 0 250px",
    background: "#ffffff",
    borderRight: "1px solid #e0e0e0",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    padding: "16px",
  },
  mainContent: {
    flex: "1",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    maxWidth: "800px",
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
    background: "#fff",
  },
  productCard: {
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #f0f0f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    background: "#fafafa",
    padding: "10px",
  },
  productTitle: {
    fontSize: "18px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  productDescription: {
    marginBottom: "15px",
    color: "#555",
  },
  productImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginRight: "10px",
    borderRadius: "5px",
  },
  tagContainer: {
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  rejectButton: {
    borderRadius: "5px",
    backgroundColor: "#ff4d4f",
    borderColor: "#ff4d4f",
    transition: "background-color 0.3s ease",
  },
};

export default AdminProductReview;
