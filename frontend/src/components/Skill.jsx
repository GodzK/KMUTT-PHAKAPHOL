import React from 'react'
function Skill() {
  return (
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
  )
}

export default Skill