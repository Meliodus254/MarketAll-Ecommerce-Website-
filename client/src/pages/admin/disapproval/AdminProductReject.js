import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchApprovedProducts, rejectProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import { Card, Button, Spin, Image, Tag, Modal } from "antd";

const AdminProductReject = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReject, setLoadingReject] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const state = useSelector((state) => state);
  const { user } = state;

  // Helper function to get token
  const getToken = () => {
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      toast.error("❌ User not authenticated. Please log in.");
    }
    return token;
  };

  // Fetch approved products
  const fetchApprovedProductsList = useCallback(async () => {
    try {
      const approved = await fetchApprovedProducts();
      setApprovedProducts(approved.products || []);

      if (approved.products.length === 0) {
        toast.info("✨ No approved products available.");
      }
    } catch (err) {
      console.error("Error fetching approved products:", err);
      toast.error("❌ Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovedProductsList();
  }, [fetchApprovedProductsList]);

  // Handle product rejection
  const handleReject = async (productId) => {
    setLoadingReject(true);
    const token = getToken();
    if (!token) return;

    try {
      const response = await rejectProduct(productId, token);
      toast.success(`❌ Product "${response.title}" rejected.`);
      fetchApprovedProductsList();
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error rejecting product:", error);
      toast.error("❌ Failed to reject product.");
    } finally {
      setLoadingReject(false);
    }
  };

  // Show reject confirmation modal
  const showRejectModal = (product) => {
    setSelectedProduct(product);
  };

  // Cancel modal
  const handleCancel = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <AdminNav />
      </div>
      <div style={styles.mainContent}>
        <Card title={<h2 style={styles.title}>Approved Products</h2>} bordered={false} style={styles.card}>
          {loading ? (
            <Spin size="large" tip="Fetching products..." />
          ) : approvedProducts.length === 0 ? (
            <p>No approved products available.</p>
          ) : (
            approvedProducts.map((product) => (
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

                {/* Reject Button */}
                <div style={styles.buttonContainer}>
                  <Button
                    danger
                    onClick={() => showRejectModal(product)}
                    style={styles.rejectButton}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))
          )}
        </Card>

        {/* Reject Confirmation Modal */}
        <Modal
          title={`Reject Product - ${selectedProduct?.title}`}
          visible={!!selectedProduct}
          onOk={() => handleReject(selectedProduct?._id)}
          onCancel={handleCancel}
          confirmLoading={loadingReject}
          okText="Confirm Reject"
          cancelText="Cancel"
        >
          <p>Are you sure you want to reject the product "{selectedProduct?.title}"?</p>
          <p><strong>Description:</strong> {selectedProduct?.description}</p>
          <p><strong>Price:</strong> KSH{selectedProduct?.price}</p>
          <p><strong>Quantity:</strong> {selectedProduct?.quantity}</p>
          <p><strong>Shipping:</strong> {selectedProduct?.shipping}</p>
          <p>This action is irreversible.</p>
        </Modal>
      </div>
    </div>
  );
};

// Styles for the AdminProductReject component
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
    background: "#fff",
  },
  productCard: {
    marginBottom: "10px",
    borderRadius: "8px",
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
    justifyContent: "flex-end",
  },
  rejectButton: {
    backgroundColor: "#ff4d4f",
    borderColor: "#ff4d4f",
  },
};

export default AdminProductReject;
