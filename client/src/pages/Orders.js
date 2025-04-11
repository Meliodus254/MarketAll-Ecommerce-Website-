import React, { useState, useEffect } from "react"; 
import { Button, Card, Row, Col, Typography, Divider, List } from "antd";
import { ShoppingOutlined, CreditCardOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const Order = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);  // Access the user from Redux state
  
  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Sample order data (you can replace this with dynamic data)
  const orderData = {
    orderId: "ORD123456",
    items: [
      {
        id: 1,
        name: "Product 1",
        price: 20.0,
        quantity: 2,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Product 2",
        price: 35.0,
        quantity: 1,
        image: "https://via.placeholder.com/150",
      },
    ],
    shippingAddress: "123 Market Street, City, Country",
    paymentMethod: "Credit Card",
    orderStatus: "Pending",
    totalPrice: 75.0,
  };

  const [orderStatus, setOrderStatus] = useState(orderData.orderStatus);

  const handleConfirmOrder = () => {
    setOrderStatus("Confirmed");
    alert("Your order has been confirmed!");
  };

  const handleCancelOrder = () => {
    setOrderStatus("Cancelled");
    alert("Your order has been cancelled!");
  };

  return (
    <div style={styles.orderContainer}>
      <Title level={2}>Order Summary</Title>

      <Card style={styles.orderCard}>
        <Title level={4}>Order ID: {orderData.orderId}</Title>

        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Shipping Address:</Text>
            <p>{orderData.shippingAddress}</p>
          </Col>
          <Col span={12}>
            <Text strong>Payment Method:</Text>
            <p>{orderData.paymentMethod}</p>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Order Items</Title>
        <List
          itemLayout="horizontal"
          dataSource={orderData.items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<img src={item.image} alt={item.name} style={styles.itemImage} />}
                title={item.name}
                description={`Price: $${item.price} | Quantity: ${item.quantity}`}
              />
            </List.Item>
          )}
        />

        <Divider />

        <Row justify="space-between">
          <Col>
            <Title level={4}>Total Price: ${orderData.totalPrice}</Title>
          </Col>
          <Col>
            <Text strong>Status: {orderStatus}</Text>
          </Col>
        </Row>

        <Divider />

        <div style={styles.buttonsContainer}>
          {orderStatus === "Pending" ? (
            <>
              <Button
                type="primary"
                size="large"
                icon={<CheckCircleOutlined />}
                onClick={handleConfirmOrder}
                style={styles.button}
              >
                Confirm Order
              </Button>
              <Button
                type="danger"
                size="large"
                icon={<ShoppingOutlined />}
                onClick={handleCancelOrder}
                style={styles.button}
              >
                Cancel Order
              </Button>
            </>
          ) : (
            <Button
              type="default"
              size="large"
              icon={<CreditCardOutlined />}
              disabled
              style={styles.button}
            >
              {orderStatus === "Confirmed" ? "Order Confirmed" : "Order Cancelled"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

const styles = {
  orderContainer: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  orderCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
  },
  itemImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    width: "48%",
  },
};

export default Order;
