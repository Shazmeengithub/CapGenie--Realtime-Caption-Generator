import { useState, useEffect } from "react";
import "../style/Opacity.css";

export const Opacitylink = () => {
  const [backgroundOpacity, setBackgroundOpacity] = useState(
    localStorage.getItem("background-opacity") || 1
  );

  useEffect(() => {
    localStorage.setItem("background-opacity", backgroundOpacity);
  }, [backgroundOpacity]);

  const handleOpacityChange = (event) => {
    setBackgroundOpacity(event.target.value);
  };

  return (
    <div className="container-full">
      <div className="theme-items">
        <h1 className="opacity-page-title">Background Opacity</h1>
        <label htmlFor="opacity-slider" className="opacity-indicator">
          Background Opacity: {backgroundOpacity}
        </label>
        <input
          id="opacity-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={backgroundOpacity}
          onChange={handleOpacityChange}
        />
        <div
          className="sample-caption"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
            color: "white",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "8px",
          }}
        >
          This is a sample caption with dynamic background opacity.
        </div>
      </div>
    </div>
  );
};
