import React from 'react';
import { projectdata } from '../../../data/Data';
import './ProjectsSection.css';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaAws, FaGitAlt, FaPython, FaJava, FaDocker, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, SiGraphql, SiSpring, SiTailwindcss, SiSvelte, SiVuedotjs, SiRedis, SiKubernetes, SiJest, SiCypress, SiTestinglibrary, SiSelenium, SiFigma, SiAdobe, SiSketch, SiFastapi, SiSupabase, SiGnubash, SiGatsby } from 'react-icons/si';

const iconMap = {
  'React': <FaReact color="#61DBFB" title="React" />,
  'Next.JS': <SiNextdotjs color="#000" title="Next.js" />,
  'NextJs': <SiNextdotjs color="#000" title="Next.js" />,
  'Node.js': <FaNodeJs color="#3C873A" title="Node.js" />,
  'Express.js': <FaNodeJs color="#3C873A" title="Express.js" />,
  'TypeScript': <SiTypescript color="#007ACC" title="TypeScript" />,
  'JavaScript': <FaJs color="#F7DF1E" title="JavaScript" />,
  'HTML': <FaHtml5 color="#E34F26" title="HTML" />,
  'CSS': <FaCss3Alt color="#1572B6" title="CSS" />,
  'JS': <FaJs color="#F7DF1E" title="JavaScript" />,
  'MongoDB': <SiMongodb color="#47A248" title="MongoDB" />,
  'PostgreSQL': <SiPostgresql color="#336791" title="PostgreSQL" />,
  'MySQL': <FaDatabase color="#00758F" title="MySQL" />,
  'GraphQL': <SiGraphql color="#E10098" title="GraphQL" />,
  'Spring': <SiSpring color="#6DB33F" title="Spring" />,
  'Java': <FaJava color="#007396" title="Java" />,
  'Python': <FaPython color="#3776AB" title="Python" />,
  'FastAPI': <SiFastapi color="#009688" title="FastAPI" />,
  'Tailwind': <SiTailwindcss color="#38BDF8" title="Tailwind CSS" />,
  'Tailwind CSS': <SiTailwindcss color="#38BDF8" title="Tailwind CSS" />,
  'Svelte': <SiSvelte color="#FF3E00" title="Svelte" />,
  'Vue.js': <SiVuedotjs color="#42B883" title="Vue.js" />,
  'Redis': <SiRedis color="#DC382D" title="Redis" />,
  'Kubernetes': <SiKubernetes color="#326CE5" title="Kubernetes" />,
  'AWS': <FaAws color="#FF9900" title="AWS" />,
  'Docker': <FaDocker color="#2496ED" title="Docker" />,
  'Git': <FaGitAlt color="#F05032" title="Git" />,
  'Supabase': <SiSupabase color="#3ECF8E" title="Supabase" />,
  'Jest': <SiJest color="#C21325" title="Jest" />,
  'Cypress': <SiCypress color="#17202C" title="Cypress" />,
  'Testing Library': <SiTestinglibrary color="#E33332" title="Testing Library" />,
  'Selenium': <SiSelenium color="#43B02A" title="Selenium" />,
  'Figma': <SiFigma color="#F24E1E" title="Figma" />,
  'Adobe XD': <SiAdobe color="#FF61F6" title="Adobe XD" />,
  'Sketch': <SiSketch color="#F7B500" title="Sketch" />,
  'Gsap': <span style={{ color: '#88CE02', fontWeight: 'bold' }}>GSAP</span>,
  'AXIOS': <span style={{ color: '#5A29E4', fontWeight: 'bold' }}>Axios</span>,
  'react-zoom-pan-pinch': <span style={{ color: '#61DBFB', fontWeight: 'bold' }}>Zoom</span>,
  'YOLO AI': <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>YOLO</span>,
};

const ProjectsSection = ({ handleSectionChange, showFull = false }) => {
  const featuredProjects = projectdata.slice(0, 3);
  const allProjects = projectdata;

  if (!showFull) {
    return (
      <div className="projects-preview">
        <div className="projects-stats">
          <div className="stat-card">
            <span className="stat-number">{projectdata.length}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">12+</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years</span>
          </div>
        </div>
        
        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <div key={index} className="project-preview-card">
              <div className="project-preview-image">
                <img src={project.picture} alt={project.projectname} />
              </div>
              <div className="project-preview-info">
                <h4>{project.projectname.split(' ').slice(0, 3).join(' ')}...</h4>
                <div className="project-preview-tech">
                  {project.techStack.slice(0, 2).map((tech, i) => (
                    <span key={i} className="tech-preview">
                      {iconMap[tech] || tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="see-more-btn"
          onClick={() => handleSectionChange('projects')}
        >
          See All Projects →
        </button>
      </div>
    );
  }

  return (
    <div className="projects-full">
      <div className="projects-grid">
        {allProjects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image-container">
              <img
                src={project.picture}
                alt={project.projectname}
                className="project-image"
                loading="lazy"
              />
            </div>
            
            <div className="project-details">
              <h3 className="project-title">{project.projectname}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="tech-stack">
                <h4>Tech Stack:</h4>
                <div className="tech-icons">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-icon" title={tech}>
                      {iconMap[tech] || <span className="tech-text">{tech}</span>}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-actions">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="projects-navigation">
        <button 
          className="action-btn"
          onClick={() => handleSectionChange('skills')}
        >
          View Skills
        </button>
      </div>
    </div>
  );
};

export default ProjectsSection;