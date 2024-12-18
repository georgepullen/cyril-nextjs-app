import React from "react";
import "./Overlay.css";

const PageOverlay = () => {
  return (
    <div className="page-overlay">
      <svg
        className="spinning-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="blue"
          strokeWidth="5"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default PageOverlay;
