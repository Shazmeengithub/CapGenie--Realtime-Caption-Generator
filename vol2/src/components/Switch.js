import React from "react";
import "../style/Switch.css";

function ToggleSwitch({ isToggled }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} readOnly />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;
