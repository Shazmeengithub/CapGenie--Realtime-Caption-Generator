import "./style/App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Menu } from "./components/Menu";
import { Themes } from "./pages/Themes";
import { FontStyle } from "./pages/FontStyle";
import { FontSize } from "./pages/FontSize";
import { Opacitylink } from "./pages/Opacity";
import { About } from "./pages/About";
import { Video } from "./pages/Video";

const App = () => {
  const location = useLocation();
  const shouldShowMenu = location.pathname === "/";

  const [selectedTheme, setSelectedTheme] = useState("dark");

  useEffect(() => {
    document.body.className = selectedTheme;
  }, [selectedTheme]);

  return (
    <div className="app-container">
      <div className="content main-menu">
        <Menu />
      </div>
      <div className="main-body">
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route
            path="/themes"
            element={
              <Themes
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
            }
          />
          <Route path="/font-style" element={<FontStyle />} />
          <Route path="/font-size" element={<FontSize />} />
          <Route path="/opacity" element={<Opacitylink />} />
          <Route path="/about" element={<About />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </div>
      {/* <div className="main-body"></div> */}
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
