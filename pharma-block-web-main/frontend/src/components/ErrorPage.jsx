import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Something went wrong ⚠️</h1>
        <p style={styles.text}>
          An unexpected error occurred. Please try refreshing the page or return to the homepage.
        </p>
        <div style={styles.buttons}>
          <button style={styles.retryBtn} onClick={handleRetry}>
            🔁 Retry
          </button>
          <button style={styles.homeBtn} onClick={() => navigate("/")}>
            ⬅ Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f5fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  card: {
    background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #6E59A5 0%, #9b87f5 100%) border-box",
    border: "4px solid transparent",
    borderRadius: "1.5rem",
    padding: "2.5rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#6E59A5",
    fontWeight: "bold",
  },
  text: {
    fontSize: "1rem",
    color: "#444",
    marginBottom: "2rem",
    lineHeight: "1.6",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  retryBtn: {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(135deg, #ffb703, #ffca28)",
    border: "none",
    color: "#2d2d2d",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    boxShadow: "0 4px 12px rgba(255, 193, 7, 0.4)",
    transition: "transform 0.2s",
  },
  homeBtn: {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(135deg, #6E59A5, #9b87f5)",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    boxShadow: "0 4px 12px rgba(110, 89, 165, 0.4)",
    transition: "transform 0.2s",
  },
};
