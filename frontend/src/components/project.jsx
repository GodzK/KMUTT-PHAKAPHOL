import React from 'react'
import projectdata from "../../../Backend/Data"
const getTechColor = (tech) => {
    const colors = {
      React: "#30C7FF",
      "Express.JS": "yellow",
      "Node.js": "green",
      MongoDB: "white",
      "Css" : "blue"
    };
    return colors[tech] || "gray"; 
  };
function Project() {
  return (
    <div className="project" >
    <h1   className="main-title">
          Project
        </h1> 
        <p style={{ color: "white" }}>
          This is the projects page. Press ESC to return to the menu.
        </p>
    {projectdata.map((item) => (
      <div className="" key={item.projectname}>
        
        
        <section
          className="semester-section"
        >
          <h2>{item.projectname}</h2>
          <div className="activity-item">
            <h3>{item.description}</h3>
            <h3 style={{ color: "purple" }}>TechStack</h3>
            <div className="tech-stack">
              {item.techStack.map((tech, index) => (
                <h4 key={index} style={{ color: getTechColor(tech) }}>
                  {tech}
                </h4>
              ))}
            </div>
            <div className="project-image-container">
              <img
                src={item.picture}
                alt={item.projectname}
                className="activity-image"
              />
            </div>
            <div className="experience">
              <p>{item.experience}</p>
            </div>
          </div>
        </section>
      </div>
    ))}
   
  </div>
  )
}

export default Project