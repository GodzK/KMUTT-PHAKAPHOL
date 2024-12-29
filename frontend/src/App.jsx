import './App.css';
import Background from "./assets/bg.mp4";
import { useState, useEffect } from 'react';
import IG from "./assets/ig.png"
function App() {
  const [currentPage, setCurrentPage] = useState('menu');
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const menuItems = [
    { page: 'about', label: 'About Me' },
    { page: 'projects', label: 'Projects' },
    { page: 'skills', label: 'Skills' },
    { page: 'contact', label: 'Contact' },
  ];

  const handleKeyDown = (event) => {
    if (currentPage === 'menu') {
      if (event.key === 'ArrowDown') {
        setSelectedMenuIndex((selectedMenuIndex + 1) % menuItems.length);
      } else if (event.key === 'ArrowUp') {
        setSelectedMenuIndex((selectedMenuIndex - 1 + menuItems.length) % menuItems.length);
      } else if (event.key === 'Enter') {
        setCurrentPage(menuItems[selectedMenuIndex].page);
      }
    } else if (event.key === 'Escape') {
      setCurrentPage('menu');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMenuIndex, currentPage]);

  return (
    <div className="start" tabIndex="0">
      <video className="background-video" src={Background} autoPlay loop muted></video>
      {currentPage === 'menu' && (
        <div className="content">
          <h1 className="game-title">Phakaphol Portfolio</h1>
          <ul className="menu">
            {menuItems.map((item, index) => (
              <li
                key={item.page}
                className={`menu-item ${selectedMenuIndex === index ? 'selected' : ''}`}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <p className="instructions">Use Arrow Keys to Navigate and Enter to Select</p>
        </div>
      )}
      {currentPage === 'about' && (
        <div className="content">
          <h1>About Me</h1>
          <p>This is the about page. Press ESC to return to the menu.</p>
        </div>
      )}
      {currentPage === 'projects' && (
        <div className="content">
          <h1>Projects</h1>
          <p>This is the projects page. Press ESC to return to the menu.</p>
        </div>
      )}
      {currentPage === 'skills' && (
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
              <div className="skill-name" style={{color:"white"}}>Python</div>
              <div className="skill-bar-fill python"></div>
            </div>
            <div className="skill-bar">
              <div className="skill-name">Node.js</div>
              <div className="skill-bar-fill node"></div>
            </div>
            <div className="skill-bar">
              <div className="skill-name" style={{color:"white"}}>MongoDB</div>
              <div className="skill-bar-fill mongo"></div>
            </div>
            
          </div>
          <p>Press ESC to return to the menu.</p>
        </div>
      )}
      {currentPage === 'contact' && (
        <div className="content">
          <h1>Contact</h1>
          <div className="card-container">
    <div className="card" id='ig'>
        <div className="card-image">
            <img src={"https://via.placeholder.com/100"} alt="Image 1"/>
        </div>
        <div className="card-text">
            <a href="https://www.instagram.com/pk._tcsk/" target="_blank">IG: pk.tcsk</a>
        </div>
    </div>
    <div className="card" id='fb'>
        <div className="card-image">
            <img src="https://via.placeholder.com/100" alt="Image 2"/>
        </div>
        <div className="card-text">
            <a href="https://www.facebook.com/phakaphol.dherachaisuphakij/" target="_blank">FB: Pk Phakaphol Tcsk </a>
        </div>
    </div>
    <div className="card" id='li'>
        <div className="card-image">
            <img src="https://via.placeholder.com/100" alt="Image 3"/>
        </div>
        <div className="card-text">
            <a href="https://www.linkedin.com/in/phakaphol-dherachaisuprakij-1092ab256/" target="_blank">LinkedIn: Phakaphol</a>
        </div>
    </div>
    <div className="card" id='bd'>
        <div className="card-image">
            <img src="https://via.placeholder.com/100" alt="Image 4"/>
        </div>
        <div className="card-text">
            <a href="https://www.borntodev.com/author/godzk25gmail-com/" target="_blank" style={{color:"black"}}>Borntodev Devinit#2</a>
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
