import React from "react";
import GoBackButton from "./GoBackButton";

function Skill({ setCurrentPage }) {
  const skills = [
    { name: 'JavaScript ', category: 'Frontend', level: 'Expert', color: '#F7DF1E' }, // JavaScript Yellow
    { name: 'TypeScript ', category: 'Frontend', level: 'Advanced', color: '#3178C6' }, // TypeScript Blue
    { name: 'HTML5 ', category: 'Frontend', level: 'Expert', color: '#E34F26' }, // HTML5 Red-Orange
    { name: 'CSS3 ', category: 'Frontend', level: 'Expert', color: '#1572B6' }, // CSS3 Blue
    { name: 'React.js ⚛️', category: 'Frontend Framework', level: 'Expert', color: '#61DAFB' }, // React Cyan
    { name: 'Next.js ⚡', category: 'Frontend Framework', level: 'Advanced', color: '#000000' }, // Next.js Black
    { name: 'Vue.js ', category: 'Frontend Framework', level: 'Advanced', color: '#4FC08D' }, // Vue Green
    { name: 'Angular 🅰️', category: 'Frontend Framework', level: 'Intermediate', color: '#DD0031' }, // Angular Red
    { name: 'Tailwind CSS ', category: 'CSS Framework', level: 'Expert', color: '#38B2AC' }, // Tailwind Teal
    { name: 'Sass/SCSS ', category: 'CSS Preprocessor', level: 'Advanced', color: '#C69' }, // Sass Pink
    { name: 'GSAP ', category: 'Animation', level: 'Expert', color: '#88D8B0' }, // GSAP Green
    { name: 'Framer Motion ', category: 'Animation', level: 'Advanced', color: '#F7F7F7' }, // Framer Motion White
    { name: 'Three.js ', category: 'Animation', level: 'Advanced', color: '#000000' }, // Three.js Black
    { name: 'Anime.js ', category: 'Animation', level: 'Advanced', color: '#BB2B2B' }, // Anime.js Red
    { name: 'CSS Grid ', category: 'CSS Framework', level: 'Expert', color: '#FF5722' }, // CSS Grid Orange
    { name: 'Flexbox ', category: 'CSS Framework', level: 'Expert', color: '#0288D1' }, // Flexbox Blue
    { name: 'Bootstrap ', category: 'CSS Framework', level: 'Expert', color: '#563D7C' }, // Bootstrap Purple
    { name: 'Foundation ', category: 'CSS Framework', level: 'Advanced', color: '#F5F5F5' }, // Foundation Light Gray
    { name: 'Bulma ', category: 'CSS Framework', level: 'Intermediate', color: '#00D1B2' }, // Bulma Teal
    { name: 'Materialize ', category: 'CSS Framework', level: 'Intermediate', color: '#00B8D4' }, // Materialize Cyan
    { name: 'Node.js 🟢', category: 'Backend', level: 'Expert', color: '#339933' }, // Node.js Green
    { name: 'Python ', category: 'Backend', level: 'Expert', color: '#3776AB' }, // Python Blue
    { name: 'Java ☕', category: 'Backend', level: 'Advanced', color: '#007396' }, // Java Blue
    { name: 'Go ', category: 'Backend', level: 'Intermediate', color: '#00ADD8' }, // Go Blue
    { name: 'Express.js ️', category: 'Backend Framework', level: 'Expert', color: '#000000' }, // Express Black
    { name: 'Django ️', category: 'Backend Framework', level: 'Advanced', color: '#092E20' }, // Django Dark Green
    { name: 'Spring Boot ', category: 'Backend Framework', level: 'Advanced', color: '#6DB33F' }, // Spring Boot Green
    { name: 'MongoDB ', category: 'Database', level: 'Advanced', color: '#47A248' }, // MongoDB Green
    { name: 'PostgreSQL ', category: 'Database', level: 'Advanced', color: '#336791' }, // PostgreSQL Blue
    { name: 'MySQL ', category: 'Database', level: 'Advanced', color: '#4479A1' }, // MySQL Blue
    { name: 'GraphQL ', category: 'Database', level: 'Intermediate', color: '#E10098' }, // GraphQL Purple
    { name: 'Firebase ', category: 'Database', level: 'Intermediate', color: '#FFCA28' }, // Firebase Yellow
  
    { name: 'Docker ', category: 'DevOps', level: 'Intermediate', color: '#2496ED' }, // Docker Blue
    { name: 'Kubernetes ☸️', category: 'DevOps', level: 'Basic', color: '#326CE5' }, // Kubernetes Blue
    { name: 'AWS ☁️', category: 'Cloud', level: 'Intermediate', color: '#FF9900' }, // AWS Orange
    { name: 'GCP ☁️', category: 'Cloud', level: 'Basic', color: '#4285F4' }, // GCP Blue
    
  ];

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <div className="skill-content">
      <GoBackButton setCurrentPage={setCurrentPage} />
      <h1 className="skill-title">My Teach Stack </h1>
      <div className="skill-categories">
        {categories.map((category) => (
          <div key={category} className="skill-category">
            <h2 className="category-title">{category}</h2>
            <div className="skill-cards">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-card"
                    style={{ backgroundColor: skill.color }}
                  >
                    <div className="skill-card-content">
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-level">{skill.level}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <p className="skill-footer">Press ESC to return to the menu. </p>
    </div>
  );
}

export default Skill;
