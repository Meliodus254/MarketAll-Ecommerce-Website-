import React from "react";
import { NavLink } from "react-router-dom";

const SellNav = () => {
  const navStyle = {
    container: {
      padding: "1rem",
      background: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    navItem: {
      marginBottom: "0.5rem",
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem 1rem",
      color: "#555",
      textDecoration: "none",
      borderRadius: "4px",
      transition: "background 0.3s, color 0.3s",
    },
    navLinkActive: {
      background: "#007bff",
      color: "#fff",
      fontWeight: "bold",
    },
    icon: {
      marginRight: "0.5rem",
      fontSize: "1.2rem",
    },
  };

  return (
    <nav style={navStyle.container}>
      <ul className="nav flex-column">
        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/user/product"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-plus-circle" style={navStyle.icon}></i> Create Product
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/seller/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-box-open" style={navStyle.icon}></i> View Products
          </NavLink>
        </li>

        {/* Additional helpful links */}
        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/seller/help"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-question-circle" style={navStyle.icon}></i> Help
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SellNav;
