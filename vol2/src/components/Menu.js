// Menu.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/Menu.css";
import Logo2 from "../assets/Logo-2.png";
import Arrow from "../assets/Arrow.png";
import FontSize from "../assets/Font size.png";
import FontStyle from "../assets/Font style.png";
import Theme from "../assets/Theme.png";
import Opacity from "../assets/Opacity.png";

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="menu-container">
      <div className="nav-container">
        <img src={Logo2} alt="logo" className="logo-main" />
      </div>

      <div className="items">
        {/* <button className="action-button" onClick={() => navigate("/themes")}>
          <div
            className={location.pathname === "/themes" ? "active text" : "text"}
          >
            Themes
          </div>
          <div className="image-container">
            <img src={Theme} alt="" className="img title-img" />
            <img src={Arrow} alt="" className="img arrow-img" />
          </div>
        </button> */}
        <button
          className="action-button"
          onClick={() => navigate("/font-style")}
        >
          <div
            className={
              location.pathname === "/font-style" ? "active text" : "text"
            }
          >
            Font Style
          </div>
          <div className="image-container">
            <img src={FontStyle} alt="" className="img title-img" />
            <img src={Arrow} alt="" className="img arrow-img" />
          </div>
        </button>
        <button
          className="action-button"
          onClick={() => navigate("/font-size")}
        >
          <div
            className={
              location.pathname === "/font-size" ? "active text" : "text"
            }
          >
            Font Size
          </div>
          <div className="image-container">
            <img src={FontSize} alt="" className="img title-img" />
            <img src={Arrow} alt="" className="img arrow-img" />
          </div>
        </button>
        <button className="action-button" onClick={() => navigate("/opacity")}>
          <div
            className={
              location.pathname === "/opacity" ? "active text" : "text"
            }
          >
            Opacity
          </div>
          <div className="image-container">
            <img src={Opacity} alt="" className="img title-img" />
            <img src={Arrow} alt="" className="img arrow-img" />
          </div>
        </button>
        <button className="action-button" onClick={() => navigate("/about")}>
          <div
            className={location.pathname === "/about" ? "active text" : "text"}
          >
            About
          </div>
          <div className="image-container">
            <img src={Arrow} alt="" className="img arrow-img" />
          </div>
        </button>
        <button
          className="action-button video-button"
          onClick={() => navigate("/video")}
        >
          <div
            className={
              location.pathname === "/video"
                ? "video-active-text"
                : "video-text"
            }
          >
            Video
          </div>
          <div className="image-container">
            <img src={Arrow} alt="" className="img arrow-img" />
          </div>
        </button>
      </div>
    </div>
  );
};
