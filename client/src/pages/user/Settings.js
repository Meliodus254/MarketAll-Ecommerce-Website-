import React from "react";
import SettingsNav from "../../components/nav/SettingsNav";

const Settings = () => {
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
        <SettingsNav />
      </div>
      <div style={contentStyle}>
        <h2>User History</h2>
        <p>This is the user history page where you can view your past activities.</p>
      </div>
    </div>
  );
};

export default Settings;
