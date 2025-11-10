import { useState, useEffect } from "react";
import "../style/Size.css";

export const FontSize = () => {
  const fontSizes = ["12px", "16px", "20px", "24px", "28px"];
  const [selectedFontSize, setSelectedFontSize] = useState(
    localStorage.getItem("font-size") || "16px"
  );
  const handleFontSizeChange = (size) => {
    setSelectedFontSize(size);
    localStorage.setItem("font-size", size);
  };

  return (
    <div className="container-full">
      <div className="theme-items">
        <h1 className="page-title">Font Size</h1>
        <div className="font-size-options">
          {fontSizes.map((size) => (
            <button
              key={size}
              style={{
                fontSize: size,
                padding: "8px 16px",
                margin: "5px",
                backgroundColor: selectedFontSize === size ? "#007bff" : "#ddd",
                color: selectedFontSize === size ? "white" : "black",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => handleFontSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <p className="sample" style={{ fontSize: selectedFontSize }}>
          This is the sample captions
        </p>
      </div>
    </div>
  );
};
