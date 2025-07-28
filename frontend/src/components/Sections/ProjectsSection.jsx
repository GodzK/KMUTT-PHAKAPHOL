import React from 'react';
import { projectdata } from '../../../data/Data';
import './ProjectsSection.css';

const ProjectsSection = ({ handleSectionChange }) => {
  return (
    <div className="output">
      <p className="section-title">
        <span className="command-prompt text-[--primary] mr-3">></span> My Projects
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
};

export default ProjectsSection; 