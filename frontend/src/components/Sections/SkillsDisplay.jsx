import React from 'react';
import { accordionItems } from '../../../data/Data';
import './SkillsDisplay.css';

const SkillsDisplay = ({ skills = [] }) => {
  // If skills array is provided, use it; otherwise use accordion items
  const displayItems = skills.length > 0 ? skills : accordionItems.map(item => item.title);

  return (
    <div className="skills-display">
      {skills.length > 0 ? (
        // Display skills as tags
        <div className="skills-tags">
          {displayItems.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      ) : (
        // Display accordion items as cards
        <div className="skills-cards">
          {accordionItems.map((item) => (
            <div key={item.id} className="skill-card">
              <div className="skill-image">
                <img src={item.cover} alt={item.title} />
              </div>
              <div className="skill-content">
                <h3 className="skill-title">{item.title}</h3>
                <p className="skill-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsDisplay; 