import React, { useState, useEffect, useCallback } from "react";
import { message, Spin, Button, Card, Row, Col, Image, Tag, Badge } from "antd";
import { useSelector } from "react-redux";
import { fetchSellerProducts } from "../../functions/product";
import { useNavigate } from "react-router-dom";
import SellNav from "../../components/nav/SellNav";
import { selectUser } from "../../reducers/selector";

const SellerProduct = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [unapprovedProducts, setUnapprovedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Retrieve token
  const getToken = useCallback(() => {
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      message.error("❌ User not authenticated. Please log in.");
    }
    return token;
  }, [user]);

  // Fetch products from the server
  const fetchProducts = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetchSellerProducts(token);
      if (response.success) {
        setApprovedProducts(response.products.approved || []);
        setUnapprovedProducts(response.products.unapproved || []);
      } else {
        message.error("❌ Failed to fetch products. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("❌ Server error while fetching products.");
    } finally {
      setLoading(false);
    }
  }, [getToken]); // Dependency array includes `getToken`

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Dependency array includes `fetchProducts`

  // Navigate to edit page using slug
  const handleEdit = (slug) => {
    navigate(`/user/product/${slug}`);
  };

  const handleCreate = () => {
    navigate("/user/product/create");
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SellNav />
      </div>
      <div style={styles.mainContent}>
        <div style={styles.welcomeSection}>
          <h2 style={styles.welcomeTitle}>
            Welcome back, {user?.name || "Seller"}!
          </h2>
          <p style={styles.welcomeMessage}>
            Check out your products and manage them effortlessly.
          </p>
        </div>

        <Card
          title={<h3 style={styles.title}>Your Products</h3>}
          bordered={false}
          style={styles.card}
        >
          <div style={styles.createButtonContainer}>
            <Button
              type="primary"
              onClick={handleCreate}
              style={styles.createButton}
            >
              Create Another Product
            </Button>
          </div>

          {loading ? (
            <Spin size="large" tip="Fetching your products..." />
          ) : (
            <>
              <h3>Approved Products</h3>
              {approvedProducts.length === 0 ? (
                <p>No approved products found.</p>
              ) : (
                <Row gutter={[16, 16]}>
                  {approvedProducts.map((product) => (
                    <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                      <ProductCard
                        product={product}
                        onEdit={handleEdit}
                        status="Approved"
                      />
                    </Col>
                  ))}
                </Row>
              )}

              <h3 style={{ marginTop: "30px" }}>Unapproved Products</h3>
              {unapprovedProducts.length === 0 ? (
                <p>No unapproved products found.</p>
              ) : (
                <Row gutter={[16, 16]}>
                  {unapprovedProducts.map((product) => (
                    <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                      <ProductCard
                        product={product}
                        onEdit={handleEdit}
                        status="Unapproved"
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onEdit, status }) => (
  <Badge.Ribbon text={status} color={status === "Approved" ? "green" : "red"}>
    <Card
      hoverable
      style={styles.productCard}
      cover={
        product.images?.[0]?.url ? (
          <Image
            alt={product.title}
            src={product.images[0].url}
            style={styles.productImage}
          />
        ) : (
          <p>No image available</p>
        )
      }
    >
      <h3 style={styles.productTitle}>{product.title}</h3>
      <p style={styles.productDescription}>{product.description}</p>
      <p>
        <strong>Price:</strong> KSH {product.price}
      </p>
      <p>
        <strong>Quantity:</strong> {product.quantity}
      </p>
      <p>
        <strong>Category:</strong> {product.category?.name || "No Category"}
      </p>
      <p>
        <strong>Brand:</strong> {product.brand || "No Brand"}
      </p>
      <p>
        <strong>Color:</strong> {product.color || "No Color"}
      </p>
      <p>
        <strong>Shipping:</strong> {product.shipping || "No Shipping Info"}
      </p>
      <p>
        <strong>Condition:</strong> {product.condition || "No Condition Info"}
      </p>
      <div style={styles.tagContainer}>
        {product.subs?.map((sub) => (
          <Tag key={sub._id} color="green">
            {sub.name}
          </Tag>
        ))}
      </div>
      <Button
        type="primary"
        onClick={() => onEdit(product.slug)}
        style={styles.editButton}
      >
        Edit
      </Button>
    </Card>
  </Badge.Ribbon>
);


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
    background: "#f5f5f5",
  },
  welcomeSection: {
    textAlign: "center",
    marginBottom: "30px",
  },
  welcomeTitle: {
    fontSize: "28px",
    color: "#2c3e50",
    fontWeight: "600",
  },
  welcomeMessage: {
    color: "#7f8c8d",
    fontSize: "18px",
  },
  title: {
    fontSize: "24px",
    color: "#2c3e50",
  },
  card: {
    maxWidth: "1000px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  createButtonContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  createButton: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
    fontSize: "16px",
    padding: "10px 20px",
    borderRadius: "6px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  productCard: {
    borderRadius: "8px",
    border: "1px solid #f0f0f0",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  productTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50",
  },
  productDescription: {
    color: "#555",
    fontSize: "14px",
    margin: "10px 0",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
};

export default SellerProduct;
