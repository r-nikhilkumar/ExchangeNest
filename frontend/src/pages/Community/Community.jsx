import React, { useState, useEffect } from "react";
import "./Community.css";
import {
  LeftSidebar,
  MainContent,
  RightSidebar,
} from "../../components/CommunityComponent/CommunityComponent";

const Community = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const settingsMenuToggle = () => {
    const settingsmenu = document.querySelector(".settings-menu");
    settingsmenu.classList.toggle("settings-menu-height");
  };

  const darkModeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <div className="social-container">
        <div className="left-sidebar">
          <LeftSidebar />
        </div>
        <div className="main-content">
          <MainContent />
        </div>
        <div className="right-sidebar">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Community;
