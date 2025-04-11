import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Search categories"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
      style={{
        padding: "12px 20px",
        fontSize: "16px",
        borderRadius: "50px",  // Rounded corners for a modern look
        border: "1px solid #d9d9d9",  // Light border
        outline: "none",  // Remove outline on focus
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        width: "100%",
        maxWidth: "400px",  // Limit the max width for better responsiveness
        margin: "0 auto",  // Center-align input
        transition: "all 0.3s ease-in-out", // Smooth transition for all changes
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "#1890ff"; // Focus effect with border color change
        e.target.style.boxShadow = "0 4px 12px rgba(24, 144, 255, 0.2)"; // Glow effect on focus
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#d9d9d9"; // Default border color
        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Subtle shadow when unfocused
      }}
    />
  );
};

export default LocalSearch;
