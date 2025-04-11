import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Button, Input, Spin, message } from "antd";
import {
  MailOutlined,
  GoogleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Function to create or update a user
const createOrUpdateUser = async (authtoken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {}, // Pass an empty object or user data if needed
      {
        headers: {
          Authorization: `Bearer ${authtoken}`,  // Ensure token is included here
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating/updating user:", error.response?.data || error.message);
    throw error;
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) {
      navigate("/"); // Redirect if already logged in
    } else if (user === null) {
      console.log("User logged out");
    }
  }, [user, navigate]);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleLoginResponse = (userData, idToken) => {
    if (userData && userData._id) {
      const { name, email, role, _id } = userData;
      // If name is undefined, set a default value, e.g., "Guest"
      const userName = name || 'Guest';
  
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { name: userName, email, token: idToken, role, _id },
      });
      navigate("/"); // Redirect to home after successful login
    } else {
      console.error("Invalid user data received.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !validateEmail(email)) {
      setLoading(false);
      message.error("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setLoading(false);
      message.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const idTokenResult = await result.user.getIdTokenResult();

      // Create or update the user with the idToken
      const res = await createOrUpdateUser(idTokenResult.token);
      handleLoginResponse(res, idTokenResult.token);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/wrong-password") {
        message.error("Wrong password, please try again.");
      } else if (error.code === "auth/user-not-found") {
        message.error("No account found with this email.");
      } else {
        message.error("Something went wrong, please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idTokenResult = await result.user.getIdTokenResult();

      const res = await createOrUpdateUser(idTokenResult.token);
      handleLoginResponse(res, idTokenResult.token);
    } catch (error) {
      console.error("Google login error:", error);
      message.error("Google login failed. Please try again.");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.headerText}>Welcome to MARKETIT</h2>
        {loading && <Spin size="large" style={styles.loadingSpinner} />}
        <form onSubmit={handleSubmit} style={styles.form}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            prefix={<MailOutlined />}
            size="large"
            style={styles.inputField}
          />
          <Input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            prefix={<MailOutlined />}
            suffix={
              passwordVisible ? (
                <EyeInvisibleOutlined
                  onClick={() => setPasswordVisible(false)}
                  style={styles.eyeIcon}
                />
              ) : (
                <EyeOutlined
                  onClick={() => setPasswordVisible(true)}
                  style={styles.eyeIcon}
                />
              )
            }
            size="large"
            style={styles.inputField}
          />
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            icon={<MailOutlined />}
            size="large"
            block
            disabled={!email || password.length < 6}
            loading={loading}
            style={styles.loginButton}
          >
            Login with Email
          </Button>
        </form>
        <div style={styles.buttonSpacing}>
          <Button
            onClick={handleGoogleLogin}
            type="danger"
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            block
            style={styles.googleButton}
          >
            Login with Google
          </Button>
        </div>
        <div style={styles.registerLink}>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={styles.registerText}
            >
              Register here
            </span>
          </p>
          <p>
            <span
              onClick={() => navigate("/forgot/password")}
              style={styles.forgotPasswordText}
            >
              Forgot Password?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1d3c6c, #ff5f00)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Arial', sans-serif",
  },
  loginBox: {
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
  inputField: {
    marginBottom: "20px",
    height: "50px",
    fontSize: "16px",
  },
  eyeIcon: {
    color: "#aaa",
    cursor: "pointer",
  },
  loginButton: {
    backgroundColor: "#ff5f00",
    borderColor: "#ff5f00",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  googleButton: {
    backgroundColor: "#db4437",
    borderColor: "#db4437",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  buttonSpacing: {
    marginTop: "15px",
  },
  registerLink: {
    marginTop: "20px",
    fontSize: "14px",
  },
  registerText: {
    color: "#ff5f00",
    fontWeight: "bold",
    cursor: "pointer",
  },
  forgotPasswordText: {
    color: "#ff5f00",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loadingSpinner: {
    marginBottom: "20px",
  },
};

export default Login;
