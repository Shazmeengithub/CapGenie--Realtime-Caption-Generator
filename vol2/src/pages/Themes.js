import "../style/Pages.css";
import Switch from "../components/Switch.js";

export const Themes = ({ selectedTheme, setSelectedTheme }) => {
  const handleToggle = (mode) => {
    setSelectedTheme(mode);
  };

  return (
    <div className="container-full">
      <div className="theme-items">
        <button className="action-button" onClick={() => handleToggle("dark")}>
          <div className="text">Dark</div>
          <div className="image-container">
            <Switch isToggled={selectedTheme === "dark"} />
          </div>
        </button>
        <button className="action-button" onClick={() => handleToggle("light")}>
          <div className="text">Light</div>
          <div className="image-container">
            <Switch isToggled={selectedTheme === "light"} />
          </div>
        </button>
      </div>
    </div>
  );
};
