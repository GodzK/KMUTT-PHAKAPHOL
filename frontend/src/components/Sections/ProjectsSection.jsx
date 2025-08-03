import React from 'react';
import { projectdata } from '../../../data/Data';
import './ProjectsSection.css';
// เพิ่มไอคอนที่ต้องใช้
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaAws, FaGitAlt, FaPython, FaJava, FaDocker, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, SiGraphql, SiSpring, SiTailwindcss, SiSvelte, SiVuedotjs, SiRedis, SiKubernetes, SiJest, SiCypress, SiTestinglibrary, SiSelenium, SiFigma, SiAdobe, SiSketch, SiFastapi, SiSupabase, SiGnubash,   SiGatsby } from 'react-icons/si';

const iconMap = {
  'React': <FaReact color="#61DBFB" title="React" />,
  'Next.JS': <SiNextdotjs color="#000" title="Next.js" />,
  'Node.js': <FaNodeJs color="#3C873A" title="Node.js" />,
  'Express.js': <FaNodeJs color="#3C873A" title="Express.js" />,
  'TypeScript': <SiTypescript color="#007ACC" title="TypeScript" />,
  'JavaScript': <FaJs color="#F7DF1E" title="JavaScript" />,
  'HTML': <FaHtml5 color="#E34F26" title="HTML" />,
  'CSS': <FaCss3Alt color="#1572B6" title="CSS" />,
  'MongoDB': <SiMongodb color="#47A248" title="MongoDB" />,
  'PostgreSQL': <SiPostgresql color="#336791" title="PostgreSQL" />,
  'MySQL': <FaDatabase color="#00758F" title="MySQL" />,
  'GraphQL': <SiGraphql color="#E10098" title="GraphQL" />,
  'Spring': <SiSpring color="#6DB33F" title="Spring" />,
  'Java': <FaJava color="#007396" title="Java" />,
  'Python': <FaPython color="#3776AB" title="Python" />,
  'FastAPI': <SiFastapi color="#009688" title="FastAPI" />,
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
  
  // เพิ่มเติมตามต้องการ
};

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
            <div className="tech-stack flex gap-2 items-center">
              {project.techStack.map((tech, i) => (
                <span key={i} className="tech-icon" title={tech} style={{ fontSize: 28 }}>
                  {iconMap[tech] || <span>{tech}</span>}
                </span>
              ))}
            </div>
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