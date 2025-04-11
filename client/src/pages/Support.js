import React, { useState } from "react";
import { Button, Input, Form, Typography, Divider, Space, Modal } from "antd";
import { SendOutlined, InfoCircleOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const Support = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Handles the submit form to send a support ticket
  const handleSubmit = (values) => {
    console.log("Submitted ticket:", values);
    // You can replace this with an API call to send the support request to the backend

    // Show a success message to the user
    toast.success("Your support request has been submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    form.resetFields();
  };

  // Handles showing FAQ modal
  const handleFAQ = () => {
    setModalVisible(true);
  };

  // Handles closing the FAQ modal
  const handleCloseFAQ = () => {
    setModalVisible(false);
  };

  return (
    <div style={styles.container}>
      <Title style={styles.title}>Need Help? Contact Us!</Title>
      <Text style={styles.description}>
        If you have any questions or issues, feel free to reach out to us through any of the following channels:
      </Text>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Contact Info Section */}
        <div style={styles.contactSection}>
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            style={styles.contactButton}
            onClick={() => window.location.href = "tel:+1234567890"}
          >
            Call Us
          </Button>
          <Button
            type="default"
            icon={<MailOutlined />}
            style={styles.contactButton}
            onClick={() => window.location.href = "mailto:support@marketit.com"}
          >
            Email Us
          </Button>
        </div>

        <Divider />

        {/* Submit Support Ticket Form */}
        <div style={styles.formContainer}>
          <Title level={4}>Submit a Support Ticket</Title>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{ message: "" }}
            style={styles.form}
          >
            <Form.Item
              name="message"
              label="Describe your issue"
              rules={[{ required: true, message: "Please describe your issue!" }]}
            >
              <Input.TextArea rows={6} placeholder="Describe the issue you're facing..." />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
                style={styles.submitButton}
              >
                Submit Ticket
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Divider />

        {/* FAQ Button */}
        <Button
          type="link"
          icon={<InfoCircleOutlined />}
          style={styles.faqButton}
          onClick={handleFAQ}
        >
          Frequently Asked Questions (FAQ)
        </Button>
      </Space>

      {/* FAQ Modal */}
      <Modal
        title="Frequently Asked Questions"
        visible={modalVisible}
        onCancel={handleCloseFAQ}
        footer={null}
        width={600}
      >
        <div style={styles.faqContent}>
          <Title level={5}>How do I place an order?</Title>
          <Text>
            To place an order, browse our marketplace, select your desired items, add them to your cart, and proceed to checkout.
          </Text>
          <Divider />
          <Title level={5}>What payment methods are accepted?</Title>
          <Text>
            We accept all major credit and debit cards, as well as PayPal and other secure payment options.
          </Text>
          <Divider />
          <Title level={5}>How can I track my order?</Title>
          <Text>
            You can track your order status directly from your profile page after you've placed the order.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: "20px 40px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#283593",
  },
  description: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#555",
  },
  contactSection: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  contactButton: {
    width: "200px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#283593",
    fontWeight: "bold",
  },
  faqButton: {
    fontSize: "16px",
    color: "#283593",
    textAlign: "center",
  },
  faqContent: {
    maxHeight: "400px",
    overflowY: "auto",
    paddingRight: "10px",
  },
};

export default Support;
