import "./App.css";
import Background from "./assets/bg.mp4";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import tpr from "./assets/tprport.png"
import profile from "./assets/profile.jpg"
AOS.init();


 const AboutMe = ({ currentPage }) => {
    useEffect(() => {
      AOS.init({ duration: 1200 });
    }, []);}

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
      {currentPage === "about" && (
        <div className="content">
          <h1 data-aos="fade-up">Hi, I'm Phakaphol Dherachaisuphakij!</h1>
          <p data-aos="fade-right" className="about-description">
            A passionate <strong>developer</strong>, <strong>Blogger</strong>, and <strong>dreamer</strong>.  
            I love building web projects that blend creativity and technology. i love coding, my main language is Javascript, i love FrontEnd Developer, but im studying on Backend i very Excited!
          </p>
          <p data-aos="fade-left" className="about-quote">
            <em>"Talent without working hard is nothing"</em>
          </p>
          <div data-aos="zoom-in" className="about-image">
            <img src={profile} alt="About Me" style={{ borderRadius: "10px", maxWidth: "100%" }} />
          </div>
          <p data-aos="flip-up" className="about-cta">
          ✉️Contact for work <a href="https://www.instagram.com/pk._tcsk/" target="_blank">IG DM</a>
          </p>
        </div>
      )}
      {currentPage === "activity" && (
        <div id="activity">
          <h1 data-aos="fade-up" className="main-title">
            Activity
          </h1>

          {/* Semester 1 */}
          <section
            className="semester-section"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2>Semester 1</h2>
            <div className="activity-item">
              <h3>TuePunrak 18th (English Teacher)</h3>
              <div className="image-container">
                <img
                  src={tpr} 
                  alt="TuePunrak 18th"
                  className="activity-image"
                />
              </div>
              <p>
                TuePunrak 18th. The Camp
                promote unity and friendship among students.
              </p>
            </div>
          </section>

          {/* Semester 2 */}
          <section
            className="semester-section"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h2>Semester 2</h2>
            <div className="activity-item">
              <h3>Sports Day</h3>
              <div className="image-container">
                <img
                  src={tpr}
                  alt="Sports Day"
                  className="activity-image"
                />
              </div>
             <p></p>
            </div>
          </section>
           {/* Semester 3 */}
           <section
            className="semester-section"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h2>Semester 3</h2>
            <div className="activity-item">
              <h3>Sports Day</h3>
              <div className="image-container">
                <img
                  src={tpr}
                  alt="Sports Day"
                  className="activity-image"
                />
              </div>
             <p></p>
            </div>
          </section>
          
        </div>
      )}

      {currentPage === "projects" && (
        <div className="content">
          <h1>Projects</h1>
          <p>This is the projects page. Press ESC to return to the menu.</p>
        </div>
      )}
      {currentPage === "skills" && (
        <div className="content">
          <h1>Skills</h1>
          <div className="skill-bar-container">
            <div className="skill-bar">
              <div className="skill-name">JavaScript</div>
              <div className="skill-bar-fill js"></div>
            </div>

            <div className="skill-bar">
              <div className="skill-name">HTML</div>
              <div className="skill-bar-fill html"></div>
            </div>
            <div className="skill-bar">
              <div className="skill-name">CSS</div>
              <div className="skill-bar-fill css"></div>
            </div>
            <div className="skill-bar">
              <div className="skill-name" style={{ color: "white" }}>
                Python
              </div>
              <div className="skill-bar-fill python"></div>
            </div>
            <div className="skill-bar">
              <div className="skill-name">Node.js</div>
              <div className="skill-bar-fill node"></div>
            </div>
            <div className="skill-bar">
              <div className="skill-name" style={{ color: "white" }}>
                MongoDB
              </div>
              <div className="skill-bar-fill mongo"></div>
            </div>
          </div>
          <p>Press ESC to return to the menu.</p>
        </div>
      )}
      {currentPage === "contact" && (
        <div className="content">
          <h1>Contact</h1>
          <div className="card-container">
            <div className="card" id="ig">
              <div className="card-text">
                <a href="https://www.instagram.com/pk._tcsk/" target="_blank">
                  IG: pk.tcsk
                </a>
              </div>
            </div>
            <div className="card" id="fb">
              <div className="card-text">
                <a
                  href="https://www.facebook.com/phakaphol.dherachaisuphakij/"
                  target="_blank"
                >
                  FB: Pk Phakaphol Tcsk{" "}
                </a>
              </div>
            </div>
            <div className="card" id="li">
              <div className="card-text">
                <a
                  href="https://www.linkedin.com/in/phakaphol-dherachaisuprakij-1092ab256/"
                  target="_blank"
                >
                  LinkedIn: Phakaphol
                </a>
              </div>
            </div>
            <div className="card" id="bd">
              <div className="card-text">
                <a
                  href="https://www.borntodev.com/author/godzk25gmail-com/"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Borntodev Devinit#2
                </a>
              </div>
            </div>
          </div>
          <p>Press ESC to return to the menu.</p>
        </div>
      )}
    </div>
  );
}

export default App;
