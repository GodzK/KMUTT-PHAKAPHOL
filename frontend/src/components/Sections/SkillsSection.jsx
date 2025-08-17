import React from 'react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaAws, FaGitAlt, FaPython, FaJava, FaDocker, FaDatabase, FaCogs } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, SiGraphql, SiSpring, SiTailwindcss, SiSvelte, SiVuedotjs, SiRedis, SiKubernetes, SiJest, SiCypress, SiTestinglibrary, SiSelenium, SiFigma, SiAdobe, SiSketch, SiFastapi, SiVite, SiAngular } from 'react-icons/si';
import './SkillsSection.css';

const SkillsSection = ({ handleSectionChange, showFull = false }) => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 85 },
        { name: 'Svelte', level: 80 },
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js (Express)', level: 90 },
        { name: 'Java (Spring)', level: 85 },
        { name: 'Python (FastAPI)', level: 88 },
        { name: 'GraphQL', level: 82 },
        { name: 'REST API', level: 95 },
        { name: 'MySQL', level: 85 },
      ]
    },
    {
      title: 'Testing',
      skills: [
        { name: 'Cypress', level: 95 },
        { name: 'Robot Framework', level: 90 },
        { name: 'Jest', level: 92 },
        { name: 'Testing Library', level: 88 },
        { name: 'Selenium', level: 85 },
        { name: 'Python Testing', level: 87 },
      ]
    },
    {
      title: 'DevOps & Others',
      skills: [
        { name: 'Docker', level: 90 },
        { name: 'Kubernetes', level: 85 },
        { name: 'AWS', level: 88 },
        { name: 'CI/CD', level: 92 },
        { name: 'Git', level: 95 },
        { name: 'Agile Methodologies', level: 90 },
      ]
    }
  ];

  const iconMap = {
    'React': <FaReact title="React" color="#61DBFB" />,
    'Next.js': <SiNextdotjs title="Next.js" />,
    'TypeScript': <SiTypescript title="TypeScript" />,
    'Tailwind CSS': <SiTailwindcss title="Tailwind CSS" />,
    'Vue.js': <SiVuedotjs title="Vue.js" />,
    'Svelte': <SiSvelte title="Svelte" />,
    'Angular': <SiAngular title="Angular" />,
    'WebGL': <FaJs title="WebGL" />,
    'Vite': <SiVite title="Vite" />,
    'Go (Fiber)': <FaCogs title="Go (Fiber)" />,
    'Node.js (Express)': <FaNodeJs title="Node.js" />,
    'Java (Spring)': <SiSpring title="Spring" />,
    'Python (FastAPI)': <SiFastapi title="FastAPI" />,
    'GraphQL': <SiGraphql title="GraphQL" />,
    'REST API': <FaJs title="REST API" />,
    'MySQL': <FaDatabase title="MySQL" />,
    'MongoDB': <SiMongodb title="MongoDB" />,
    'PostgreSQL': <SiPostgresql title="PostgreSQL" />,
    'Neo4j': <FaDatabase title="Neo4j" />,
    'Redis': <SiRedis title="Redis" />,
    'Figma': <SiFigma title="Figma" />,
    'Adobe XD': <SiAdobe title="Adobe XD" />,
    'Sketch': <SiSketch title="Sketch" />,
    'Wireframing': <FaCss3Alt title="Wireframing" />,
    'Prototyping': <FaCss3Alt title="Prototyping" />,
    'User Research': <FaHtml5 title="User Research" />,
    'Cypress': <SiCypress title="Cypress" />,
    'Robot Framework': <FaPython title="Robot Framework" />,
    'Jest': <SiJest title="Jest" />,
    'Testing Library': <SiTestinglibrary title="Testing Library" />,
    'Selenium': <SiSelenium title="Selenium" />,
    'Python Testing': <FaPython title="Python Testing" />,
    'Docker': <FaDocker title="Docker" />,
    'Kubernetes': <FaCogs title="Kubernetes" />,
    'AWS': <FaAws title="AWS" />,
    'CI/CD': <FaGitAlt title="CI/CD" />,
    'Git': <FaGitAlt title="Git" />,
    'Agile Methodologies': <FaJs title="Agile" />,
  };

  const topSkills = [
    { name: 'React', level: 95, icon: iconMap['React'] },
    { name: 'Cypress', level: 95, icon: iconMap['Cypress'] },
    { name: 'Git', level: 95, icon: iconMap['Git'] },
    { name: 'Next.js', level: 90, icon: iconMap['Next.js'] },
    { name: 'TypeScript', level: 88, icon: iconMap['TypeScript'] },
    { name: 'Tailwind CSS', level: 92, icon: iconMap['Tailwind CSS'] },
  ];

  if (!showFull) {
    return (
      <div className="skills-preview">
        <div className="skills-stats">
          <div className="stat-card">
            <span className="stat-number">{skillCategories.length}</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}</span>
            <span className="stat-label">Skills</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">90%</span>
            <span className="stat-label">Average</span>
          </div>
        </div>
        
        <div className="top-skills">
          <h4>Top Skills</h4>
          <div className="skills-grid">
            {topSkills.map((skill, index) => (
              <div key={index} className="skill-preview-card">
                <div className="skill-preview-icon">
                  {skill.icon}
                </div>
                <div className="skill-preview-info">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-level">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="see-more-btn"
          onClick={() => handleSectionChange('social')}
        >
          See All Skills →
        </button>
      </div>
    );
  }

  return (
    <div className="skills-full">
      <div className="skills-categories">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="skill-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="skill-list">
              {category.skills.map(skill => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <div className="skill-icon">
                      {iconMap[skill.name] || <FaCogs />}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="skills-navigation">
        <button 
          className="action-btn"
          onClick={() => handleSectionChange('social')}
        >
          Connect With Me
        </button>
      </div>
    </div>
  );
};

export default SkillsSection; 