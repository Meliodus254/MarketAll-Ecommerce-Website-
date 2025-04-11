import React from "react";
import { Button, Typography, List, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import SellNav from "../../components/nav/SellNav";

const { Title, Paragraph } = Typography;

const SellerHelp = () => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("/user/product");
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SellNav />
      </div>
      <div style={styles.mainContent}>
        <Title level={2} style={styles.title}>Seller Help Center</Title>
        <Paragraph style={styles.paragraph}>
          Welcome to the Seller Help Center! 🚀 Whether you're just starting or need help navigating, we've got you covered!
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="How to Create a Product" style={styles.card}>
              <Paragraph>
                Posting a product is simple! Click on the "Create Product" button, fill in the details, and your product will be live for buyers to see.
              </Paragraph>
              <Button
                type="primary"
                onClick={handleCreateProduct}
                style={styles.createButton}
              >
                Create New Product
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="How to View Your Products" style={styles.card}>
              <Paragraph>
                All your products will appear here. You can view, edit, or remove them at any time.
              </Paragraph>
              <Button
                type="default"
                onClick={() => navigate("/seller/products")}
                style={styles.viewButton}
              >
                View My Products
              </Button>
            </Card>
          </Col>
        </Row>

        <Title level={3} style={styles.subTitle}>Frequently Asked Questions</Title>
        <List
          bordered
          dataSource={faqData}
          renderItem={(item) => (
            <List.Item>
              <Title level={4}>{item.question}</Title>
              <Paragraph>{item.answer}</Paragraph>
            </List.Item>
          )}
          style={styles.faqList}
        />
      </div>
    </div>
  );
};

// Sample FAQ data
const faqData = [
  {
    question: "How do I upload product images?",
    answer: "Simply click the 'Add Image' button when creating or editing your product to upload product images."
  },
  {
    question: "How do I set the price for my product?",
    answer: "While creating or editing a product, you'll see a field for price. Enter the amount in your preferred currency."
  },
  {
    question: "Can I edit or delete my products?",
    answer: "Yes! You can edit any product's details, including the title, description, price, and images. To delete, click on the trash icon next to the product."
  },
];

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
  title: {
    fontSize: "28px",
    fontWeight: "600",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  card: {
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  createButton: {
    marginTop: "10px",
  },
  viewButton: {
    marginTop: "10px",
  },
  subTitle: {
    fontSize: "22px",
    fontWeight: "500",
    marginTop: "20px",
  },
  faqList: {
    marginTop: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
};

export default SellerHelp;
