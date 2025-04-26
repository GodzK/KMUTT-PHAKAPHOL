
import React, { useState, useEffect, useRef } from 'react';
import { projectdata, ActivityData, socialLinks } from '../Backend/Data';
import './App.css';

const MatrixRain = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    
    const matrix = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    function draw() {
      ctx.fillStyle = "rgba(0, 10, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#33ff33";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }
    
    const matrixInterval = setInterval(draw, 60);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(matrixInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="matrix-bg"></canvas>;
};

const TypewriterText = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay]);
  
  return <span>{displayText}<span className="cursor">_</span></span>;
};

const LoadingDots = () => {
  return (
    <div className="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const SkillsDisplay = ({ skills }) => {
  return (
    <div className="skills-container">
      {skills.map((skill, index) => (
        <div key={index} className="skill-item" style={{ '--delay': `${index * 0.1}s` }}>
          {skill}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const terminalRef = useRef(null);
  
  const skills = [
    'React', 'Next.js', 'Cypress', 'JavaScript', 'TypeScript', 
    'Tailwind CSS', 'Jest', 'RESTful APIs', 'Git', 'Webpack'
  ];
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Add 3D tilt effect
    const terminal = terminalRef.current;
    
    const handleMouseMove = (e) => {
      if (!terminal) return;
      
      const rect = terminal.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = 1; // Smaller tilt angle
      const tiltY = -1; // Smaller tilt angle
      
      terminal.style.transform = `perspective(1500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };
    
    const handleMouseLeave = () => {
      if (!terminal) return;
      terminal.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg)';
    };
    
    if (terminal) {
      terminal.addEventListener('mousemove', handleMouseMove);
      terminal.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (terminal) {
        terminal.removeEventListener('mousemove', handleMouseMove);
        terminal.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [terminalRef.current]);
  
  const handleSectionChange = (section) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsLoading(false);
    }, 300);
  };

  const renderSection = () => {
    if (isLoading) {
      return (
        <div className="output loading-section">
          <p>Loading data<LoadingDots /></p>
        </div>
      );
    }
    
    switch (currentSection) {
      case 'about':
        return (
          <div className="output typewriter">
            <p className="intro-line"> Hello, I'm <span className="highlight">Phakaphol Dherachaisuphakij</span></p>
            <p> A passionate QA Specialist and Frontend Developer</p>
            <p> Currently at SCB TechX, building robust testing pipelines</p>
            <p> Skilled in React, Next.js, and Cypress</p>
            
            <SkillsDisplay skills={skills} />
            
            <p className="navigation-hint"> Type <a href="#projects" onClick={() => handleSectionChange('projects')}>[projects]</a> or <a href="#experience" onClick={() => handleSectionChange('experience')}>[experience]</a> to know more</p>
          </div>
        );
      case 'projects':
        return (
          <div className="output">
            <p className="section-title"> <span className="command-prompt">&gt;</span> My Projects</p>
            {projectdata.map((project, index) => (
              <div key={index} className="project-item" style={{ '--animation-order': index }}>
                <p className="project-title"> {project.projectname}</p>
                <p className="project-desc">  Description: {project.description}</p>
                <p className="tech-stack">  Tech Stack: {project.techStack.join(', ')}</p>
                <p className="project-link">  <a href={project.link} target="_blank" rel="noopener noreferrer" className="glowing-link">[View Project]</a></p>
                <div className="image-container">
                  <img src={project.picture} alt={project.projectname} className="project-image" loading="lazy" />
                  <div className="image-overlay"></div>
                </div>
              </div>
            ))}
            <p className="back-link"> Type <a href="#about" onClick={() => handleSectionChange('about')}>[about]</a> to return</p>
          </div>
        );
      case 'experience':
        return (
          <div className="output">
            <p className="section-title"> <span className="command-prompt">&gt;</span> My Experience</p>
            <div className="timeline">
              <div className="timeline-item">
                <p className="position"> QA Specialist @ SCB TechX <span className="date">(Apr 2025 - Present)</span></p>
                <p className="responsibility">  - Architected robust testing pipelines with Cypress</p>
                <p className="responsibility">  - Implemented automated UI and API testing frameworks</p>
                <p className="responsibility">  - Collaborated with development teams to ensure code quality</p>
              </div>
              
              <div className="timeline-item">
                <p className="position"> Frontend Developer @ SIT DEV TEAM <span className="date">(Feb 2025 - Mar 2025)</span></p>
                <p className="responsibility">  - Crafted pixel-perfect Next.js interfaces</p>
                <p className="responsibility">  - Developed responsive and accessible web applications</p>
                <p className="responsibility">  - Optimized performance using modern React practices</p>
              </div>
              
              <div className="timeline-item">
                <p className="position"> Hackathon Lead @ KMUTT IoT Club <span className="date">(Oct 2024)</span></p>
                <p className="responsibility">  - Led AI-driven IoT solutions, securing top honors</p>
                <p className="responsibility">  - Managed a team of 5 developers to create innovative solutions</p>
                <p className="responsibility">  - Presented technical concepts to non-technical judges</p>
              </div>
            </div>
            <p className="next-link"> Type <a href="#activities" onClick={() => handleSectionChange('activities')}>[activities]</a> for more</p>
          </div>
        );
      case 'activities':
        return (
          <div className="output">
            <p className="section-title"> <span className="command-prompt">&gt;</span> My Activities</p>
            {ActivityData.map((semester, index) => (
              semester.Activity1.length > 0 && (
                <div key={index} className="semester-container">
                  <p className="semester-title"> {semester.Semester}</p>
                  {semester.Activity1.map((activity, idx) => (
                    <div key={idx} className="activity-item" style={{ '--animation-order': idx }}>
                      <p className="activity-title"> {activity.activityTitle}</p>
                      <p className="activity-desc">  {activity.description}</p>
                      <div className="image-container">
                        <img src={activity.image} alt={activity.activityTitle} className="activity-image" loading="lazy" />
                        <div className="image-overlay"></div>
                      </div></div>
                  ))}
                </div>
              )
            ))}
            <p className="back-link"> Type <a href="#about" onClick={() => handleSectionChange('about')}>[about]</a> to return</p>
          </div>
        );
      case 'social':
        return (
          <div className="output">
            <p className="section-title"> <span className="command-prompt">&gt;</span> Connect with me</p>
            <div className="social-links-container">
              {socialLinks.map((link, index) => (
                <p key={index} className="social-link" style={{ '--animation-order': index }}>
                  <a href={link.link} target="_blank" rel="noopener noreferrer" className="social-button">
                    [{link.text}]
                  </a>
                </p>
              ))}
            </div>
            <p className="back-link"> Type <a href="#about" onClick={() => handleSectionChange('about')}>[about]</a> to return</p>
          </div>
        );
      case 'skills':
        return (
          <div className="output">
            <p className="section-title"> <span className="command-prompt">&gt;</span> My Technical Skills</p>
            
            <div className="skills-categories">
              <div className="skill-category">
                <p className="category-title">Frontend Development</p>
                <div className="skill-progress-container">
                  <div className="skill-bar">
                    <span className="skill-name">React</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '90%'}}></div>
                    </div>
                    <span className="percentage">90%</span>
                  </div>
                  <div className="skill-bar">
                    <span className="skill-name">Next.js</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '85%'}}></div>
                    </div>
                    <span className="percentage">85%</span>
                  </div>
                  <div className="skill-bar">
                    <span className="skill-name">TypeScript</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '80%'}}></div>
                    </div>
                    <span className="percentage">80%</span>
                  </div>
                  <div className="skill-bar">
                    <span className="skill-name">Tailwind CSS</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '95%'}}></div>
                    </div>
                    <span className="percentage">95%</span>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <p className="category-title">Testing</p>
                <div className="skill-progress-container">
                  <div className="skill-bar">
                    <span className="skill-name">Cypress</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '95%'}}></div>
                    </div>
                    <span className="percentage">95%</span>
                  </div>
                  <div className="skill-bar">
                    <span className="skill-name">Jest</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '85%'}}></div>
                    </div>
                    <span className="percentage">85%</span>
                  </div>
                  <div className="skill-bar">
                    <span className="skill-name">Testing Library</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '80%'}}></div>
                    </div>
                    <span className="percentage">80%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="back-link"> Type <a href="#about" onClick={() => handleSectionChange('about')}>[about]</a> to return</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  const handleKeyCommand = (e) => {
    if (e.key === 'Enter') {
      const command = e.target.value.toLowerCase().trim();
      
      if (command.includes('about')) {
        handleSectionChange('about');
      } else if (command.includes('projects')) {
        handleSectionChange('projects');
      } else if (command.includes('experience')) {
        handleSectionChange('experience');
      } else if (command.includes('activities')) {
        handleSectionChange('activities');
      } else if (command.includes('social')) {
        handleSectionChange('social');
      } else if (command.includes('skills')) {
        handleSectionChange('skills');
      } else if (command.includes('help')) {
        handleSectionChange('about');
      } else if (command === 'clear') {
        // Handle clear command
      } else {
        // Handle unknown command
      }
      
      e.target.value = '';
    }
  };

  return (
    <>
      <MatrixRain />
      <div className="terminal" ref={terminalRef}>
        <div className="noise"></div>
        <div className="overlay"></div>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">Phakaphol.exe</div>
        </div>
        
        <h1>Phakaphol.<span className="errorcode">CMD</span></h1>
        
        <div className="boot-sequence">
          {isLoading && (
            <>
              <p>Initializing system...</p>
              <p>Loading modules...</p>
              <p>Starting portfolio.exe...</p>
              <LoadingDots />
            </>
          )}
        </div>
        
        {!isLoading && (
          <>
            <div className="output welcome-message">
              <p> Welcome to my portfolio terminal</p>
              <p> Navigate using commands:</p>
            </div>
            
            <div className="nav-links">
              <a href="#about" onClick={() => handleSectionChange('about')}>[about]</a>
              <a href="#projects" onClick={() => handleSectionChange('projects')}>[projects]</a>
              <a href="#experience" onClick={() => handleSectionChange('experience')}>[experience]</a>
              <a href="#activities" onClick={() => handleSectionChange('activities')}>[activities]</a>
              <a href="#skills" onClick={() => handleSectionChange('skills')}>[skills]</a>
              <a href="#social" onClick={() => handleSectionChange('social')}>[social]</a>
            </div>
            
            {renderSection()}
            
            <div className="command-input-container">
              <span className="prompt">guest@portfolio:~$</span>
              <input
                type="text"
                className="command-input"
                placeholder="Type a command..."
                onKeyPress={handleKeyCommand}
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;