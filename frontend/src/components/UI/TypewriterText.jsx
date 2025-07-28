import React, { useState, useEffect } from 'react';
import './TypewriterText.css';

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

export default TypewriterText; 