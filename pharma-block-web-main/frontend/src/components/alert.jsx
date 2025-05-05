import React from "react";

export default function StyledAlert({ message, onClose }) {
  const alertStyle = {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "1rem 1.5rem",
    border: "1px solid #f5c6cb",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "100px",
    right: "20px",
    zIndex: 999,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    color: "#721c24",
    cursor: "pointer",
  };

  const keyframesStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={alertStyle}>
        <span>{message}</span>
        <button style={buttonStyle} onClick={onClose}>✖</button>
      </div>
    </>
  );
}
