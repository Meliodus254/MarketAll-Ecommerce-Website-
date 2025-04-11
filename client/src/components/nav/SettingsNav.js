import React from "react";
import { NavLink } from "react-router-dom";

const SettingsNav = () => {
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
            to="/user/personal-information"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-user" style={navStyle.icon}></i> Personal Information
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/user/history"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-history" style={navStyle.icon}></i> History
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/user/password"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-lock" style={navStyle.icon}></i> Password
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/user/wishlist"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-heart" style={navStyle.icon}></i> Wishlist
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/user/change-language"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-globe" style={navStyle.icon}></i> Change Language
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/logout"
            className="nav-link"
            style={navStyle.navLink}
          >
            <i className="fas fa-sign-out-alt" style={navStyle.icon}></i> Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SettingsNav;
