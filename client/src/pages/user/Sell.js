import React from "react";
import SellNav from "../../components/nav/SellNav"; // Navigation component
import { useNavigate } from "react-router-dom";  // Navigation hook
import { Button, Typography, Card, Row, Col } from "antd";  // Ant Design components

const { Title, Paragraph } = Typography;

const Sell = () => {
  const navigate = useNavigate();  // Navigation hook

  // Handle creating a product
  const handleCreateProduct = () => {
    navigate("/user/product"); // Navigate to the create product page
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f7fb" }}>
      {/* Sidebar navigation */}
      <div style={{ flex: "0 0 250px", background: "#ffffff", padding: "1.5rem", borderRight: "1px solid #e6e6e6" }}>
        <SellNav />  {/* Navigation component */}
      </div>

      {/* Main content area */}
      <div style={{ flex: "1", padding: "2rem 3rem", background: "#ffffff" }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              title={<Title level={2}>Welcome to Your Seller Dashboard</Title>}
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Informational message about the free marketplace */}
              <Typography>
                <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
                  🚀 Welcome to our Free Marketplace! Here, you can list your products for free and reach a wide audience. 
                  Create, manage, and promote your products with ease. Our platform is designed to connect sellers and buyers 
                  in a seamless way, without any hidden fees or costs. 
                </Paragraph>

                <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
                  🎯 To get started, click the button below to list your product and showcase it to potential buyers. 
                  It's fast, easy, and absolutely free! We’re here to help you grow your business.
                </Paragraph>

                <div style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleCreateProduct}
                    style={{
                      padding: "10px 30px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#28a745",
                      borderColor: "#28a745",
                    }}
                  >
                    Create New Product
                  </Button>
                </div>
              </Typography>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Sell;
