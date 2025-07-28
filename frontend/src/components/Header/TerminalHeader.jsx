import React from 'react';
import './TerminalHeader.css';

const TerminalHeader = () => {
  return (
    <div className="terminal-header">
      <div className="terminal-buttons">
        <span className="terminal-button close" aria-hidden="true"></span>
        <span className="terminal-button minimize" aria-hidden="true"></span>
        <span className="terminal-button maximize" aria-hidden="true"></span>
      </div>
      <div className="terminal-title">Phakaphol.exe</div>
    </div>
  );
};

export default TerminalHeader; 