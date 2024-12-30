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
  const gotoproject = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
function Project() {
  return (
    <div className="project" data-aos="fade-up" >
    <h1 className="main-title">
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
          <div className='project-header'>
    <h2>{item.projectname}</h2>
    <a href={item.link} target="_blank">{gotoproject}</a>
</div>
       
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