import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { Button, Input, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) {
      navigate("/"); // Redirect if already logged in
    }
    const emailFromStorage = window.localStorage.getItem("emailForRegistration");
    if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      navigate("/register");
    }
  }, [user, navigate]);

  const validatePassword = (password) => password.length >= 6;

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setLoading(false);
      console.error("Email is required");
      return;
    }

    if (!validatePassword(password)) {
      setLoading(false);
      console.error("Password must be at least 6 characters");
      return;
    }

    try {
      const auth = getAuth();
      const result = await signInWithEmailLink(auth, email, window.location.href);

      if (result.user.emailVerified) {
        // Remove email from localStorage
        window.localStorage.removeItem("emailForRegistration");

        // Update user password
        await updatePassword(result.user, password);

        // Get ID token
        const idTokenResult = await result.user.getIdTokenResult();

        // Save or update user in backend
        const userData = await createOrUpdateUser(idTokenResult.token);

        // Update Redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: userData.name,
            email: userData.email,
            token: idTokenResult.token,
            role: userData.role,
            _id: userData._id,
          },
        });

        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.header}>Complete Registration</h2>
        {loading && <Spin size="large" style={styles.spinner} />}
        <form onSubmit={handleSubmit} style={styles.form}>
          <Input
            type="email"
            value={email}
            placeholder="Your email"
            prefix={<MailOutlined />}
            size="large"
            style={styles.input}
            disabled
          />
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            prefix={<LockOutlined />}
            size="large"
            style={styles.input}
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            disabled={!email || !validatePassword(password)}
            style={styles.button}
          >
            Complete Registration
          </Button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1d3c6c, #ff5f00)",
    fontFamily: "'Arial', sans-serif",
  },
  box: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff5f00",
    marginBottom: "20px",
  },
  input: {
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#ff5f00",
    borderColor: "#ff5f00",
    color: "#fff",
    fontWeight: "bold",
  },
  spinner: {
    marginBottom: "20px",
  },
};

export default RegisterComplete;
