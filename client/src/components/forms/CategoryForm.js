// src/components/forms/CategoryForm.js
import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label style={{ fontSize: "16px", fontWeight: "600" }}>Category Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #d9d9d9",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      />
      <br />
      <button
        className="btn"
        style={{
          width: "100%",
          padding: "12px 20px",
          fontSize: "18px",
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#40a9ff"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#1890ff"}
        onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
        onMouseUp={(e) => e.target.style.transform = "scale(1)"}
      >
        Save
      </button>
    </div>
  </form>
);

export default CategoryForm;
