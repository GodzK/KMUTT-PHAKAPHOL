import React, { useState, useEffect } from "react";

const Terminal = ({ onCommand }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const inputRef = React.useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const result = onCommand(input);
      setOutput([...output, { command: `$ ${input}`, result }]);
      setInput("");
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-button red"></span>
        <span className="terminal-button yellow"></span>
        <span className="terminal-button green"></span>
      </div>
      <div className="terminal-body">
        {output.map((entry, index) => (
          <div key={index}>
            <p>{entry.command}</p>
            <p>{entry.result}</p>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <span className="prompt">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            aria-label="Terminal command input"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;