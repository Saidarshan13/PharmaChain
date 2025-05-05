import React from "react";

export default function Loader() {
  return (
    <div style={styles.container}>
      
      <svg viewBox="0 0 500 100" style={styles.svg}>
        
        {/* Road background */}
        <rect x="0" y="35" width="500" height="30" fill="#555" rx="5" />

        {/* Dashed center line (road stripes) */}
        <line
          x1="0"
          y1="50"
          x2="500"
          y2="50"
          stroke="#fff"
          strokeWidth="2"
          strokeDasharray="10,10"
        />

        {/* Truck image with flip and movement */}
        <image
          href="https://img.icons8.com/emoji/48/delivery-truck.png"
          width="48"
          height="48"
          style={{ transform: "scaleX(-1)" }} // Adjusted vertical position
        >
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href="#road-path" />
          </animateMotion>
        </image>

        {/* Straight path for animation */}
        <path
          id="road-path"
          d="M 0 50 L 500 50"
          fill="transparent"
        />
      </svg>

      <p style={styles.text}>Delivering PharmaChain data...</p>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    backgroundColor: "#f4f6f8",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  svg: {
    width: "80%",
    maxWidth: "600px",
    height: "100px",
  },
  text: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginTop: "20px",
    color: "#0077cc",
    animation: "pulseText 1.5s ease-in-out infinite",
  },
};

// Inject animated text
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes pulseText {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }
`, styleSheet.cssRules.length);
