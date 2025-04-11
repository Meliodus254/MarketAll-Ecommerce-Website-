import React, { useState, useEffect } from "react";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { Button, Input, Typography, Card, Spin } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import default Toastify CSS

const { Title, Text } = Typography;

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/"); // Redirect if logged in
      } else {
        setLoading(false); // Set loading to false when auth is checked
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;
  }

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setSendingEmail(true);

    if (!email) {
      setEmailError("Email is required.");
      setSendingEmail(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      setSendingEmail(false);
      return;
    }

    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL || "http://localhost:3000/",
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      toast.success(
        `A registration link has been sent to ${email}. Check your inbox to complete the registration.`,
        { autoClose: 5000 }
      );
      window.localStorage.setItem("emailForRegistration", email);
      setEmail("");
    } catch (error) {
      toast.error("Failed to send registration link. Please try again.", { autoClose: 5000 });
      console.error("Error sending email link:", error);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        toast.success(`Welcome, ${user.displayName || user.email}!`, { autoClose: 5000 });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Google registration failed. Please try again.", { autoClose: 5000 });
      console.error("Google registration error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f4f8, #dfe6f2)",
        padding: "30px",
      }}
    >
      <Card
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          padding: "50px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <Title level={3} style={{ color: "#1890ff", marginBottom: "20px", fontSize: "28px" }}>
          Create Your Account
        </Title>
        <Text style={{ display: "block", marginBottom: "20px", fontSize: "16px", color: "#555" }}>
          Join <strong>MARKETIT</strong>, the online marketplace for buyers and sellers. It's quick and free!
        </Text>

        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              size="large"
              style={{
                borderRadius: "12px",
                borderColor: emailError ? "#ff4d4f" : "#d9d9d9",
                padding: "15px",
                fontSize: "16px",
                transition: "border-color 0.3s ease",
              }}
            />
            {emailError && (
              <Text
                type="danger"
                style={{
                  fontSize: "14px",
                  marginTop: "5px",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {emailError}
              </Text>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              width: "100%",
              borderRadius: "12px",
              fontWeight: "bold",
              padding: "16px 0",
              transition: "background-color 0.3s ease",
              fontSize: "16px",
            }}
            disabled={sendingEmail}
          >
            {sendingEmail ? <Spin size="small" /> : "Register with Email"}
          </Button>
        </form>

        <Text style={{ display: "block", margin: "10px 0", color: "#555" }}>OR</Text>

        <Button
          icon={<GoogleOutlined />}
          onClick={handleGoogleRegister}
          size="large"
          style={{
            width: "100%",
            backgroundColor: "#4285F4",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: "bold",
            padding: "16px 0",
            transition: "background-color 0.3s ease",
            fontSize: "16px",
          }}
        >
          Register with Google
        </Button>

        <Text
          style={{
            display: "block",
            marginTop: "30px",
            fontSize: "14px",
            color: "#888",
          }}
        >
          By registering, you agree to our{" "}
          <a
            href="/terms"
            style={{
              color: "#1890ff",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            Terms & Conditions
          </a>
          .
        </Text>
      </Card>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeButton={false}
        theme="colored"
      />
    </div>
  );
};

export default Register;
