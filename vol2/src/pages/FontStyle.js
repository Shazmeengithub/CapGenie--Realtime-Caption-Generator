import { useState, useEffect } from "react";
import "../style/Style.css";

export const FontStyle = () => {
  // Initialize fontStyle state with the value from localStorage (if available)
  const savedFontStyle = localStorage.getItem("font-style");

  const [fontStyle, setFontStyle] = useState(savedFontStyle || "Arial");

  useEffect(() => {
    localStorage.setItem("font-style", fontStyle);
    document.body.style.fontFamily = fontStyle;
  }, [fontStyle]);

  // Handle font style change
  const handleFontStyleChange = (event) => {
    setFontStyle(event.target.value);
  };

  return (
    <div className="container-full">
      <div className="theme-items">
        <h1 className="font-style-page-title">Font Style</h1>
        <select
          id="fontStyle"
          value={fontStyle}
          onChange={handleFontStyleChange}
          className="font-style-selector"
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
        </select>
        <p className="style-sample" style={{ fontFamily: fontStyle }}>
          This is the sample captions
        </p>
      </div>
    </div>
  );
};
