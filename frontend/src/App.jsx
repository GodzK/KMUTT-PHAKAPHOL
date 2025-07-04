import React, { useState, useEffect, useRef } from 'react';

import { projectdata, ActivityData, socialLinks ,accordionItems} from '../Backend/Data';
import "./App.css"
import { div } from 'framer-motion/client';

    const MatrixRain = () => {
      const canvasRef = useRef(null);
      const animationRef = useRef(null);

      useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });

        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        resizeCanvas();

        const fontSize = window.innerWidth < 768 ? 12 : 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);
        const matrix = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const isLowEndDevice = () => window.matchMedia('(max-device-width: 768px), (prefers-reduced-motion: reduce)').matches;

        const draw = () => {
          ctx.fillStyle = "rgba(0, 10, 0, 0.12)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#33ff33";
          ctx.font = `${fontSize}px 'Fira Code', monospace`;

          for (let i = 0; i < drops.length; i++) {
            if (isLowEndDevice() && i % 2 === 1) continue;
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }

          animationRef.current = requestAnimationFrame(draw);
        };

        if (!isLowEndDevice()) {
          animationRef.current = requestAnimationFrame(draw);
        }

        let resizeTimeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(resizeCanvas, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          cancelAnimationFrame(animationRef.current);
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      return <canvas ref={canvasRef} className="matrix-bg" aria-hidden="true" />;
    };

    const TypewriterText = ({ text, delay = 50, onComplete }) => {
      const [displayText, setDisplayText] = useState('');

      useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
          setDisplayText(text.slice(0, index + 1));
          index++;
          if (index >= text.length) {
            clearInterval(interval);
            onComplete?.();
          }
        }, delay);

        return () => clearInterval(interval);
      }, [text, delay, onComplete]);

      return (
        <span>
          {displayText}
          <span className="cursor" aria-hidden="true">_</span>
        </span>
      );
    };

    const LoadingDots = () => (
      <div className="loading" aria-label="Loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

    const SkillsDisplay = ({ skills }) => (
      <div className="h-screen font-poppins text-white overflow-hidden">
      <ul className="c-accordion flex h-full list-none p-0 m-0">
        {accordionItems.map((item) => (
          <li
            key={item.id}
            id={item.id}
            className="c-accordion__item relative flex-1 h-full min-w-[2.05rem] transition-all duration-300 ease-in-out bg-cover bg-center hover:flex-[2] hover:w-1/2 hover:bg-transparent group"
            style={{
              backgroundImage: `url(${item.cover}), linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, #111111 100%)`,
              backgroundColor: '#3E66A0',
            }}
          >
            <a
              href={`#${item.id}`}
              className="c-accordion__action absolute inset-0 flex justify-center bg-gradient-to-b from-transparent to-[#111111] bg-opacity-75 no-underline"
            >
              <div className="c-accordion__content w-[55%] text-left pt-96 pl-32 pr-18 -left-[50rem] font-['Roboto_Condensed']">
                <h2 className="c-accordion__title c-accordion__title--hero text-6xl font-bold uppercase -ml-[145px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  {item.title}
                </h2>
                <p className="c-accordion__description font-medium leading-tight -ml-[145px] w-[85%] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  {item.description}
                </p>
              </div>
              <div className="c-accordion__aside absolute right-4 bottom-0 h-full flex items-center flex-nowrap whitespace-nowrap [writing-mode:vertical-rl] rotate-180 before:content-['+'] before:text-3xl before:mb-4 before:inline-block after:flex-1 after:w-px after:mt-4 after:bg-white/20">
                <h2 className="c-accordion__title font-['Roboto_Condensed'] max-h-full group-hover:max-h-0 group-hover:opacity-0 transition-all duration-300 ease-in-out">
                  {item.title}
                </h2>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
    );

    const App = () => {
      const [currentSection, setCurrentSection] = useState('about');
      const [isLoading, setIsLoading] = useState(false);
      const terminalRef = useRef(null);

      const skills = [
        'React', 'Next.js', 'Cypress', 'JavaScript', 'TypeScript',
        'Tailwind CSS', 'Jest', 'RESTful APIs', 'Git', 'Webpack'
      ];

      useEffect(() => {
        const handleReducedMotion = () => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            terminalRef.current?.style.setProperty('transition', 'none');
          }
        };
        handleReducedMotion();
        window.addEventListener('change', handleReducedMotion);
        return () => window.removeEventListener('change', handleReducedMotion);
      }, []);

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
                <p className="intro-line">
                  Hello, I'm{' '}
                  <TypewriterText
                    text="Phakaphol Dherachaisuphakij"
                    delay={50}
                  />
                </p>
                <p>A passionate QA Specialist and Frontend Developer</p>
                <p>Currently at SCB TechX, building robust testing pipelines</p>
                <p>Skilled in React, Next.js, and Cypress</p>
                <SkillsDisplay skills={skills} />
                <p className="navigation-hint">
                  Type{' '}
                  <a href="#projects" onClick={() => handleSectionChange('projects')}>
                    [projects]
                  </a>{' '}
                  or{' '}
                  <a href="#experience" onClick={() => handleSectionChange('experience')}>
                    [experience]
                  </a>{' '}
                  to know more
                </p>
              </div>
            );
          case 'projects':
            return (
              <div className="output">
                <p className="section-title">
                  <span className="command-prompt">></span> My Projects
                </p>
                {projectdata.map((project, index) => (
                  <div key={index} className="project-item" style={{ '--animation-order': index }}>
                    <div className="project-text">
                      <p className="project-title">{project.projectname}</p>
                      <p className="project-desc">Description: {project.description}</p>
                      <p className="tech-stack">Tech Stack: {project.techStack.join(', ')}</p>
                      <p className="project-link">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="glowing-link">
                          [View Project]
                        </a>
                      </p>
                    </div>
                    <div className="image-container">
                      <picture>
                        <source srcSet={project.pictureWebp || project.picture} type="image/webp" />
                        <img
                          src={project.picture}
                          alt={project.projectname}
                          className="project-image"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  </div>
                ))}
                <p className="back-link">
                  Type <a href="#about" onClick={() => handleSectionChange('about')}>
                    [about]
                  </a> to return
                </p>
              </div>
            );
          case 'experience':
            return (
              <div className="output">
                <p className="section-title">
                  <span className="command-prompt"></span> My Experience
                </p>
                <div className="timeline">
                  <div className="timeline-item">
                    <p className="position"  style={{color:"white" ,paddingBottom:"10%"
                
                    }}>
                      QA Specialist @ SCB TechX <br /><span className="date">(Apr 2025 - Present)</span>
                    </p>
                    <p className="responsibility">- Architected robust testing pipelines with Cypress</p>
                    <p className="responsibility">- Implemented automated UI and API testing frameworks</p>
                    <p className="responsibility">- Collaborated with development teams to ensure code quality</p>
                  </div>
                  <div className="timeline-item">
                    <p className="position"  style={{color:"white" ,paddingBottom:"10%"
                
                    }}>
                      Blogger Borntodev <br /><span className="date">2024</span>
                    </p>
                    <p className="responsibility">- Writing a blog about Frontend Developer Content</p>
                    <p className="responsibility">- Explore and Learn Fundamental and theory about UX/UI</p>
                    <p className="responsibility">- Real work , pressure , and Teach me a lot of creativity</p>
                  </div>
                  <div className="timeline-item">
                    <p className="position" style={{color:"white" ,paddingBottom:"10%"}} >
                      Frontend Developer @ SIT DEV TEAM <span className="date">(Feb 2025 - Mar 2025)</span>
                    </p>
                    <p className="responsibility">- Crafted pixel-perfect Next.js interfaces</p>
                    <p className="responsibility">- Developed responsive and accessible web applications</p>
                    <p className="responsibility">- Optimized performance using modern React practices</p>
                  </div>
                  <div className="timeline-item">
                    <p className="position" style={{color:"white" ,paddingBottom:"10%"}} >
                      Hackathon Lead @ KMUTT IoT Club <span className="date">(Oct 2024)</span>
                    </p>
                    <p className="responsibility">- Led AI-driven IoT solutions, securing top honors</p>
                    <p className="responsibility">- Managed a team of 5 developers to create innovative solutions</p>
                    <p className="responsibility">- Presented technical concepts to non-technical judges</p>
                  </div>
                </div>
                <p className="next-link">
                  Type <a href="#activities" onClick={() => handleSectionChange('activities')}>
                    [activities]
                  </a> for more
                </p>
              </div>
            );
          case 'activities':
            return (
              <div className="output">
                <p className="section-title">
                  <span className="command-prompt">></span> My Activities
                </p>
                {ActivityData.map((semester, index) => (
                  semester.Activity1.length > 0 && (
                    <div key={index} className="semester-container">
                      <p className="semester-title">{semester.Semester}</p>
                      {semester.Activity1.map((activity, idx) => (
                        <div key={idx} className="activity-item" style={{ '--animation-order': idx }}>
                          <div className="activity-text">
                            <p className="activity-title">{activity.activityTitle}</p>
                            <p className="activity-desc">{activity.description}</p>
                          </div>
                          <div className="image-container">
                            <picture>
                              <source srcSet={activity.imageWebp || activity.image} type="image/webp" />
                              <img
                                src={activity.image}
                                alt={activity.activityTitle}
                                className="activity-image"
                                loading="lazy"
                              />
                            </picture>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ))}
                <p className="back-link">
                  Type <a href="#about" onClick={() => handleSectionChange('about')}>
                    [about]
                  </a> to return
                </p>
              </div>
            );
          case 'social':
            return (
              
              <div className="center">
          <div id="social-test">
            <ul className="social">
              {socialLinks.map((link, index) => (
                <li key={index}>
  <a
    href={link.link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit my ${link.text} profile`}
    className={`social-link ${link.id}`} 
  >
    <i className={`fa ${link.icon}`} aria-hidden="true"></i>
  </a>
</li>

              ))}
            </ul>
           
          </div>
        </div>
            );
          case 'skills':
            return (
              <div className="output">
                <p className="section-title">
                  <span className="command-prompt">></span> My Technical Skills
                </p>
                <div className="skills-categories">
                  <div className="skill-category">
                    <p className="category-title">Frontend Development</p>
                    <div className="skill-progress-container">
                      <div className="skill-bar">
                        <span className="skill-name">React</span>
                        <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress" style={{ width: '90%' }}></div>
                        </div>
                        <span className="percentage">90%</span>
                      </div>
                      <div className="skill-bar">
                        <span className="skill-name">Next.js</span>
                        <div className="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress" style={{ width: '85%' }}></div>
                        </div>
                        <span className="percentage">85%</span>
                      </div>
                      <div className="skill-bar">
                        <span className="skill-name">TypeScript</span>
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress" style={{ width: '80%' }}></div>
                        </div>
                        <span className="percentage">80%</span>
                      </div>
                      <div className="skill-bar">
                        <span className="skill-name">Tailwind CSS</span>
                        <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress" style={{ width: '95%' }}></div>
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
                        <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress" style={{ width: '95%' }}></div>
                        </div>
                        <span className="percentage">95%</span>
                      </div>
                      <div className="skill-bar">
                        <span className="skill-name">Jest</span>
                        <div className="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress" style={{ width: '85%' }}></div>
                        </div>
                        <span className="percentage">85%</span>
                      </div>
                      <div className="skill-bar">
                        <span className="skill-name">Testing Library</span>
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress" style={{ width: '80%' }}></div>
                        </div>
                        <span className="percentage">80%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="back-link">
                  Type <a href="#about" onClick={() => handleSectionChange('about')}>
                    [about]
                  </a> to return
                </p>
              </div>
            );
          default:
            return null;
        }
      };

      const handleKeyCommand = (e) => {
        if (e.key === 'Enter') {
          const command = e.target.value.toLowerCase().trim();
          const sections = ['about', 'projects', 'experience', 'activities', 'social', 'skills'];
          const section = sections.find((s) => command.includes(s)) || 'about';
          handleSectionChange(section);
          e.target.value = '';
        }
      };

      return (
        <div className="app-container">
          <MatrixRain />
          <div className="noise"></div>
          <div className="overlay"></div>
          <div className="terminal" ref={terminalRef} role="region" aria-label="Portfolio Terminal">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close" aria-hidden="true"></span>
                <span className="terminal-button minimize" aria-hidden="true"></span>
                <span className="terminal-button maximize" aria-hidden="true"></span>
              </div>
              <div className="terminal-title">Phakaphol.exe</div>
            </div>
            <h1>
              Phakaphol.<span className="errorcode">CMD</span>
            </h1>
            {isLoading && (
              <div className="boot-sequence">
                <p>Initializing system...</p>
                <p>Loading modules...</p>
                <p>Starting portfolio.exe...</p>
                <LoadingDots />
              </div>
            )}
            {!isLoading && (
              <>
                <div className="output welcome-message">
                  <p>Welcome to my portfolio terminal</p>
                  <p>Navigate using commands or click below:</p>
                </div>
                <nav className="nav-links" role="navigation" aria-label="Main navigation">
                  {['about', 'projects', 'experience', 'activities', 'skills', 'social'].map((section) => (
                    <a
                      key={section}
                      href={`#${section}`}
                      onClick={() => handleSectionChange(section)}
                      role="button"
                      aria-current={currentSection === section ? 'page' : undefined}
                    >
                      [{section}]
                    </a>
                  ))}
                </nav>
                {renderSection()}
                <div className="command-input-container">
                  <label htmlFor="command-input" className="prompt">
                    guest@portfolio:~$
                  </label>
                  <input
                    id="command-input"
                    type="text"
                    className="command-input"
                    placeholder="Type a command (e.g., projects, skills)..."
                    onKeyPress={handleKeyCommand}
                    spellCheck="false"
                    autoComplete="off"
                    aria-label="Enter command to navigate portfolio"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      );
    };

export default App;