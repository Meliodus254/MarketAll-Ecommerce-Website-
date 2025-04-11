import React, { useState } from "react";
import { Button, Card, Row, Col, Typography, InputNumber, Divider } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Cart = () => {
  // Sample cart data (you can replace this with dynamic data)
  const initialCartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 20.0,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 35.0,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (value, productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: value } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div style={styles.cartContainer}>
      <Title level={2}>Shopping Cart</Title>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <Row gutter={16}>
            {cartItems.map((item) => (
              <Col span={8} key={item.id}>
                <Card
                  hoverable
                  cover={<img alt={item.name} src={item.image} />}
                  actions={[
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <Title level={4}>{item.name}</Title>
                  <Text>Price: ${item.price}</Text>
                  <div style={styles.quantityContainer}>
                    <Text>Quantity:</Text>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => handleQuantityChange(value, item.id)}
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider />

          <div style={styles.cartSummary}>
            <Title level={3}>Cart Summary</Title>
            <Text>Total Price: ${getTotalPrice().toFixed(2)}</Text>
            <div style={styles.checkoutContainer}>
              <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  cartContainer: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  quantityContainer: {
    marginTop: "10px",
  },
  cartSummary: {
    marginTop: "20px",
  },
  checkoutContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
};

export default Cart;
