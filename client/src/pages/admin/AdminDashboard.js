import React from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "#f8f9fa",
  };

  const sidebarStyle = {
    flex: "0 0 250px",
    background: "#ffffff",
    padding: "1rem",
    borderRight: "1px solid #ddd",
  };

  const contentStyle = {
    flex: "1",
    padding: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <AdminNav />
      </div>
      <div style={contentStyle}>
        <h2>Admin Dashboard</h2>
        <p>Select an option from the navigation to manage categories, subcategories, or approve user-created products.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;