import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
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
            to="/admin/category"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-folder-plus" style={navStyle.icon}></i> Create Category
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/admin/sub"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-folder-open" style={navStyle.icon}></i> Create Subcategory
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/admin/approveproducts"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-check-circle" style={navStyle.icon}></i> Approve Products
          </NavLink>
        </li>

        <li className="nav-item" style={navStyle.navItem}>
          <NavLink
            to="/admin/disapproveproducts"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={({ isActive }) =>
              isActive
                ? { ...navStyle.navLink, ...navStyle.navLinkActive }
                : navStyle.navLink
            }
          >
            <i className="fas fa-times-circle" style={navStyle.icon}></i> Disapprove Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
