import React from 'react';
import TypewriterText from '../UI/TypewriterText';
import SkillsDisplay from './SkillsDisplay';
import './AboutSection.css';

const AboutSection = ({ handleSectionChange }) => {
  const skills = [
    'React', 'Next.js', 'Cypress', 'JavaScript', 'TypeScript',
    'Tailwind CSS', 'Jest', 'RESTful APIs', 'Git', 'Webpack'
  ];

  return (
    <div className="output typewriter">
      <p className="intro-line">
        Hello, I'm{' '}
        <TypewriterText
          text="Phakaphol Dherachaisuphakij"
          delay={50}
        />
      </p>
      <p>A passionate QA Specialist and Frontend Developer</p>
      <p>Currently at SCB TechX, building robust testing pipelines</p>
      <p>Skilled in React, Next.js, and Cypress</p>
      <SkillsDisplay skills={skills} />
      <p className="navigation-hint">
        Type{' '}
        <a href="#projects" onClick={() => handleSectionChange('projects')}>
          [projects]
        </a>{' '}
        or{' '}
        <a href="#experience" onClick={() => handleSectionChange('experience')}>
          [experience]
        </a>{' '}
        to know more
      </p>
    </div>
  );
};

export default AboutSection; 