import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Modular imports
import { Button, Input, Spin, message, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // For navigation

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(""); // State for email error message
  const navigate = useNavigate();
  const auth = getAuth();

  // Redirect if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        message.info("You are already logged in."); // Use Ant Design message for immediate feedback
        navigate("/"); // Redirect to home page
      }
    });
    return () => unsubscribe(); // Clean up listener
  }, [auth, navigate]);

  // Validate email syntax
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle email input change and validate email
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Handle password reset logic
  const handleResetPassword = async () => {
    if (!email) {
      message.error("Please enter your email address."); // Show error message using Ant Design message
      return;
    }
    if (!validateEmail(email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email); // Send reset email
      message.success("✨ A reset link has been sent to your email! Please check your inbox and follow the instructions to reset your password.");
      
      // Clear the email input and navigate after showing the success message
      setEmail(""); // Reset the email input after successful submission
      setTimeout(() => navigate("/"), 1500); // Wait for 1.5 seconds before navigating
    } catch (error) {
      console.error("Password reset error:", error);
      message.error(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading spinner once operation is complete
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <Title style={styles.headerText}>Forgot Password?</Title>
        <Text style={styles.description}>
          Enter your email address, and we'll send you a link to reset your password.
        </Text>

        <Input
          type="email"
          value={email}
          onChange={handleEmailChange} // Use the email change handler
          placeholder="Enter your email"
          prefix={<MailOutlined />}
          size="large"
          style={styles.inputField}
        />
        {emailError && (
          <Text type="danger" style={styles.errorText}>
            {emailError} {/* Show error message if email is invalid */}
          </Text>
        )}
        {loading ? (
          <Spin size="large" style={styles.spinner} />
        ) : (
          <Button
            type="primary"
            onClick={handleResetPassword}
            shape="round"
            size="large"
            block
            style={styles.button}
            disabled={!email || emailError} // Disable button if email is invalid or empty
          >
            Send Reset Link
          </Button>
        )}

        <Button
          onClick={() => navigate(-1)} // Go back to the previous page
          type="link"
          style={styles.backButton}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

// Styles for the ForgotPassword component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1d3c6c, #ff5f00)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Arial', sans-serif",
  },
  box: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  headerText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff5f00",
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  inputField: {
    marginBottom: "20px",
    height: "50px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#ff5f00",
    borderColor: "#ff5f00",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  backButton: {
    fontSize: "14px",
    color: "#ff5f00",
  },
  spinner: {
    marginTop: "20px",
  },
  errorText: {
    fontSize: "14px",
    marginTop: "10px",
    display: "block",
  },
};

export default ForgotPassword;
