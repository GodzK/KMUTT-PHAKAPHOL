import "./App.css";
import Background from "./assets/bg.mp4";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./components/Contact";
import Skill from "./components/Skill";
import Project from "./components/project";
import Activity from "./components/Activity";
import About from "./components/About";
AOS.init();
const AboutMe = ({ currentPage }) => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
};
const getTechColor = (tech) => {
  const colors = {
    React: "#30C7FF",
    "Express.JS": "yellow",
    "Node.js": "green",
    MongoDB: "white",
    Css: "blue",
  };
  return colors[tech] || "gray";
};
function App() {
  const [currentPage, setCurrentPage] = useState("menu");
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const menuItems = [
    { page: "about", label: "About Me" },
    { page: "projects", label: "Projects" },
    { page: "activity", label: "Activity" },
    { page: "skills", label: "Skills" },
    { page: "contact", label: "Contact" },
  ];
  const handleKeyDown = (event) => {
    if (currentPage === "menu") {
      if (event.key === "ArrowDown") {
        setSelectedMenuIndex((selectedMenuIndex + 1) % menuItems.length);
      } else if (event.key === "ArrowUp") {
        setSelectedMenuIndex(
          (selectedMenuIndex - 1 + menuItems.length) % menuItems.length
        );
      } else if (event.key === "Enter") {
        setCurrentPage(menuItems[selectedMenuIndex].page);
      }
    } else if (event.key === "Escape") {
      setCurrentPage("menu");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMenuIndex, currentPage]);
  return (
    <div className="start" tabIndex="0">
      <video
        className="background-video"
        src={Background}
        autoPlay
        loop
        muted
      ></video>
      {currentPage === "menu" && (
        <div className="content">
          <h1 className="game-title">Phakaphol Portfolio</h1>
          <ul className="menu">
            {menuItems.map((item, index) => (
              <li
                key={item.page}
                className={`menu-item ${
                  selectedMenuIndex === index ? "selected" : ""
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <p className="instructions">
            Use Arrow Keys to Navigate and Enter to Select
          </p>
        </div>
      )}
      {currentPage === "about" && (<About/>)}
      {currentPage === "activity" && (<Activity/>)}
      {currentPage === "projects" && <Project />}
      {currentPage === "skills" && <Skill />}
      {currentPage === "contact" && <Contact />}
    </div>
  );
}
export default App;
