import { useState } from 'react';

const SkillsDisplay = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="skills-container">
      {skills.map((category, catIndex) => (
        <div key={catIndex} className="skill-category">
          <p className="category-title">{category.category}</p>
          <div className="skill-grid">
            {category.items.map((skill, index) => (
              <div
                key={index}
                className="skill-card"
                style={{ '--animation-order': index }}
                onMouseEnter={() => setHoveredSkill(`${catIndex}-${index}`)}
                onMouseLeave={() => setHoveredSkill(null)}
                role="button"
                tabIndex={0}
                aria-label={`${skill.name}: ${skill.description}`}
              >
                <div className="skill-card-inner">
                  <div className="skill-card-front">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-progress-bar">
                      <div className="skill-progress" style={{ width: skill.progress }}></div>
                    </div>
                    <span className="skill-percentage">{skill.progress}</span>
                  </div>
                  {hoveredSkill === `${catIndex}-${index}` && (
                    <div className="skill-tooltip">
                      <p>{skill.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsDisplay;