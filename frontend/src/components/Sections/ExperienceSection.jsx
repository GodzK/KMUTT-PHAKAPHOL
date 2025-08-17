import React, { useState } from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import './ExperienceSection.css';

const ExperienceSection = ({ handleSectionChange, showFull = false }) => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalExpIndex, setModalExpIndex] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const experiences = [
    {
      position: "QA Specialist",
      company: "SCB TechX",
      date: "2023 - Present",
      location: "Bangkok, Thailand",
      responsibilities: [
        "Develop and maintain automated testing pipelines using Cypress",
        "Perform manual testing and bug reporting",
        "Collaborate with development teams for quality assurance"
      ],
      images: [],
      recommend: []
    },
    {
      position: "Frontend Developer",
      company: "Freelance",
      date: "2022 - 2023",
      location: "Remote",
      responsibilities: [
        "Built responsive web applications using React and Next.js",
        "Implemented modern UI/UX designs with Tailwind CSS",
        "Optimized performance and user experience"
      ],
      images: [],
      recommend: []
    },
    {
      position: "Student Developer",
      company: "KMUTT",
      date: "2021 - 2023",
      location: "Bangkok, Thailand",
      responsibilities: [
        "Developed full-stack projects for academic requirements",
        "Learned modern web technologies and best practices",
        "Participated in hackathons and coding competitions"
      ],
      images: [],
      recommend: []
    }
  ];

  const openModal = (expIndex, imgIndex) => {
    setModalExpIndex(expIndex);
    setModalImageIndex(imgIndex);
    setModalImage(experiences[expIndex].images[imgIndex]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevImage = (expIndex, e) => {
    e.stopPropagation();
    const currentIndex = currentImageIndexes[expIndex] || 0;
    const newIndex = currentIndex === 0 ? experiences[expIndex].images.length - 1 : currentIndex - 1;
    setCurrentImageIndexes(prev => ({ ...prev, [expIndex]: newIndex }));
  };

  const nextImage = (expIndex, e) => {
    e.stopPropagation();
    const currentIndex = currentImageIndexes[expIndex] || 0;
    const newIndex = currentIndex === experiences[expIndex].images.length - 1 ? 0 : currentIndex + 1;
    setCurrentImageIndexes(prev => ({ ...prev, [expIndex]: newIndex }));
  };

  const prevModalImage = () => {
    const newIndex = modalImageIndex === 0 ? experiences[modalExpIndex].images.length - 1 : modalImageIndex - 1;
    setModalImageIndex(newIndex);
    setModalImage(experiences[modalExpIndex].images[newIndex]);
  };

  const nextModalImage = () => {
    const newIndex = modalImageIndex === experiences[modalExpIndex].images.length - 1 ? 0 : modalImageIndex + 1;
    setModalImageIndex(newIndex);
    setModalImage(experiences[modalExpIndex].images[newIndex]);
  };

  if (!showFull) {
    return (
      <div className="experience-preview">
        <div className="experience-stats">
          <div className="stat-card">
            <span className="stat-number">{experiences.length}</span>
            <span className="stat-label">Positions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2</span>
            <span className="stat-label">Companies</span>
          </div>
        </div>
        
        <div className="featured-experiences">
          {experiences.slice(0, 2).map((exp, index) => (
            <div key={index} className="experience-preview-card">
              <div className="experience-preview-icon">
                <FaBriefcase />
              </div>
              <div className="experience-preview-info">
                <h4>{exp.position}</h4>
                <span className="experience-company">{exp.company}</span>
                <span className="experience-date">{exp.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="see-more-btn"
          onClick={() => handleSectionChange('activities')}
        >
          See All Experience →
        </button>
      </div>
    );
  }

  return (
    <div className="experience-full">
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-header">
              <div className="experience-icon">
                <FaBriefcase />
              </div>
              <div className="experience-meta">
                <h3 className="experience-title">{exp.position}</h3>
                <div className="experience-details">
                  <span className="company-name">{exp.company}</span>
                  <span className="experience-date">
                    <FaCalendar /> {exp.date}
                  </span>
                  <span className="experience-location">
                    <FaMapMarkerAlt /> {exp.location}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="experience-content">
              <div className="responsibilities">
                <h4>Key Responsibilities:</h4>
                <ul>
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
              
              {exp.recommend && exp.recommend.length > 0 && (
                <div className="recommendations">
                  <h4>Recommendations:</h4>
                  <ul>
                    {exp.recommend.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="experience-navigation">
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

export default ExperienceSection; 