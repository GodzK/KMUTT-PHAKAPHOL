import React from 'react';
import './SkillsSection.css';

const SkillsSection = ({ handleSectionChange }) => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 92 },
        { name: 'Tailwind CSS', level: 98 },
        { name: 'Vue.js', level: 88 },
        { name: 'Svelte', level: 85 },
        { name: 'Angular', level: 80 },
        { name: 'WebGL', level: 82 },
        { name: 'Vite', level: 90 },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Go (Fiber)', level: 90 },
        { name: 'Node.js (Express)', level: 92 },
        { name: 'Java (Spring)', level: 85 },
        { name: 'Python (FastAPI)', level: 88 },
        { name: 'GraphQL', level: 87 },
        { name: 'REST API', level: 95 },
      ]
    },
    {
      title: 'Databases',
      skills: [
        { name: 'MySQL', level: 92 },
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'Neo4j', level: 85 },
        { name: 'Redis', level: 87 },
      ]
    },
    {
      title: 'UX/UI Design',
      skills: [
        { name: 'Figma', level: 95 },
        { name: 'Adobe XD', level: 90 },
        { name: 'Sketch', level: 88 },
        { name: 'Wireframing', level: 92 },
        { name: 'Prototyping', level: 90 },
        { name: 'User Research', level: 85 },
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

  return (
    <div className="output px-4">
      <p className="section-title text-2xl font-bold text-white mb-6 flex items-center">
        <span className="command-prompt text-[--primary] mr-3">></span> My Technical Skills
      </p>
      <div className="skills-categories grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="skill-category">
            <p className="category-title text-xl font-semibold text-[--primary-light] mb-4">
              {category.title}
            </p>
            <div className="skill-progress-container">
              {category.skills.map(skill => (
                <div key={skill.name} className="skill-bar">
                  <span className="skill-name">{skill.name}</span>
                  <div className="progress-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <span className="percentage">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="back-link mt-8 text-lg text-[rgba(255,255,255,0.6)] font-['Open_Sans']">
        Type <a href="#about" className="text-[--primary] hover:text-[--primary-light] transition-colors" onClick={() => handleSectionChange('about')}>
          about
        </a> to return
      </p>
    </div>
  );
};

export default SkillsSection; 