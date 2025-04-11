import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  useEffect(() => {
    if (user) {
      setCurrent("home");
    }
  }, [user]);

  const menuItems = [
    {
      key: "home",
      icon: <AppstoreOutlined />,
      label: <Link to="/">Home</Link>,
    },
    user && {
      key: "sell",
      label: (
        <Link
          to="/user/sell"
          style={{
            color: "#fff",
            background: "#1890ff",
            padding: "8px 16px",
            borderRadius: "5px",
            fontWeight: "bold",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Sell
        </Link>
      ),
    },
    {
      key: "cart",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/cart">Cart</Link>,
    },
    !user && {
      key: "register",
      icon: <UserAddOutlined />,
      label: <Link to="/register">Register</Link>,
    },
    !user && {
      key: "login",
      icon: <UserOutlined />,
      label: <Link to="/login">Login</Link>,
    },
    user && {
      key: "account",
      icon: <SettingOutlined />,
      label: `Hello, ${user.displayName ? user.displayName.toUpperCase() : user.email.split("@")[0].toUpperCase()}`,
      children: [
        user.role === "subscriber" && {
          key: "subscriber-dashboard",
          label: <Link to="/user/dashboard">Dashboard</Link>,
        },
        user.role === "admin" && {
          key: "admin-dashboard",
          label: <Link to="/admin/dashboard">Dashboard</Link>,
        },
        {
          key: "orders",
          icon: <OrderedListOutlined />,
          label: <Link to="/orders">Orders</Link>,
        },
        {
          key: "wishlist",
          icon: <HeartOutlined />,
          label: <Link to="/user/wishlist">Wishlist</Link>,
        },
        {
          key: "settings",
          label: <Link to="/user/settings">Settings</Link>,
        },
        {
          key: "support",
          icon: <AppstoreOutlined />,
          label: <Link to="/support">Support</Link>,
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: (
            <span
              onClick={handleLogout}
              style={{
                color: "#1890ff",
                backgroundColor: "transparent",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "normal",
                transition: "background-color 0.3s, color 0.3s",
                display: "inline-block",
                textAlign: "center",
                fontSize: "14px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e6f7ff";
                e.target.style.color = "#0050b3";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#1890ff";
              }}
            >
              Logout
            </span>
          ),
        },
      ].filter(Boolean),
    },
  ].filter(Boolean);

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "10px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            textDecoration: "none",
            fontFamily: "'Poppins', sans-serif",
            padding: "5px 10px",
            borderRadius: "5px",
            background: "linear-gradient(to right, #1890ff, #40a9ff)",
            color: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            letterSpacing: "1px",
          }}
        >
          MARKET<span style={{ color: "#ffc107" }}>IT</span>
        </Link>
      </div>

      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "0 20px",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default Header;
