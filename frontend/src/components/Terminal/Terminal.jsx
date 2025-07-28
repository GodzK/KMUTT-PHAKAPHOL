import React, { useRef, useEffect } from 'react';
import TerminalHeader from '../Header/TerminalHeader';
import LoadingDots from '../UI/LoadingDots';
import './Terminal.css';

const Terminal = ({ 
  currentSection, 
  isLoading, 
  handleSectionChange, 
  renderSection, 
  handleKeyCommand 
}) => {
  const terminalRef = useRef(null);

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

  return (
    <div className="terminal" ref={terminalRef} role="region" aria-label="Portfolio Terminal">
      <TerminalHeader />
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
              placeholder="Type(projects, skills)..."
              onKeyPress={handleKeyCommand}
              spellCheck="false"
              style={{fontFamily:"Bitcount Grid Double, system-ui"}}
              autoComplete="off"
              aria-label="Enter command to navigate portfolio"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Terminal; 