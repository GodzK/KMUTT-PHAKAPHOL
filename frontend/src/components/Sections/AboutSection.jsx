import React from 'react';
import TypewriterText from '../UI/TypewriterText';
import SkillsDisplay from './SkillsDisplay';
import profile from "../../assets/profile.jpg"
import { FaReact, FaCode, FaGraduationCap, FaHeart } from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = ({ handleSectionChange, showFull = false }) => {
  const skills = [
    'React', 'Next.js', 'Cypress', 'JavaScript', 'TypeScript',
    'Tailwind CSS', 'Jest', 'RESTful APIs', 'Git', 'Webpack'
  ];

  const quickFacts = [
    { icon: <FaCode />, label: 'QA Specialist', value: 'SCB TechX' },
    { icon: <FaReact />, label: 'Frontend Dev', value: 'React Expert' },
    { icon: <FaGraduationCap />, label: 'Education', value: 'KMUTT' },
    { icon: <FaHeart />, label: 'Passion', value: 'Testing & UI' }
  ];

  if (!showFull) {
    return (
      <div className="about-preview">
        <div className="preview-header">
          <div className="preview-avatar"> <img
                        className="profile-avatar"
                        src={profile}
                        alt="Profile"
                        loading="lazy"
                      /></div>
          <div className="preview-info">
            <h3>Phakaphol Dherachaisuphakij</h3>
            <p>QA Specialist & Frontend Developer</p>
          </div>
        </div>
        
        <div className="quick-facts">
          {quickFacts.map((fact, index) => (
            <div key={index} className="fact-item">
              <div className="fact-icon">{fact.icon}</div>
              <div className="fact-content">
                <span className="fact-label">{fact.label}</span>
                <span className="fact-value">{fact.value}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="see-more-btn"
          onClick={() => handleSectionChange('projects')}
        >
          See My Projects →
        </button>
      </div>
    );
  }

  return (
    <div className="about-full">
      <div className="about-intro">
        <div className="intro-avatar"><img
                        className="profile-avatar"
                        src={profile}
                        alt="Profile"
                        loading="lazy"
                      /></div>
        <h3 className="intro-name">
          <TypewriterText text="Phakaphol Dherachaisuphakij" delay={50} />
        </h3>
        <p className="intro-title">QA Specialist & Frontend Developer</p>
        <p className="intro-current">Currently at SCB TechX, building robust testing pipelines</p>
      </div>
      
      <div className="skills-preview">
        <h4>Core Skills</h4>
        <SkillsDisplay skills={skills} />
      </div>
      
      <div className="about-actions">
        <button 
          className="action-btn primary"
          onClick={() => handleSectionChange('projects')}
        >
          View Projects
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => handleSectionChange('experience')}
        >
          See Experience
        </button>
      </div>
    </div>
  );
};

export default AboutSection; 