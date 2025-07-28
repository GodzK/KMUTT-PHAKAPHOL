import React, { useState, useEffect } from 'react';
import './ExperienceSection.css';
import { loadDevinitImages, loadIT3KImages, loadIOTImages, loadITStarterpackImages } from '../../utils/imageLoader';

const ExperienceSection = ({ handleSectionChange }) => {
  const experiences = [
    {
      position: "QA Specialist @ SCB TechX",
      date: "(Apr 2025 - Present)",
      responsibilities: [
        "- Architected robust testing pipelines with Cypress",
        "- Implemented automated UI and API testing frameworks",
        "- Collaborated with development teams to ensure code quality"
      ],
      images: loadIOTImages() // Using IOT images as placeholder
    },
    {
      position: "Blogger Borntodev",
      date: "2024",
      responsibilities: [
        "- Writing a blog about Frontend Developer Content",
        "- Explore and Learn Fundamental and theory about UX/UI",
        "- Real work , pressure , and Teach me a lot of creativity"
      ],
      images: loadDevinitImages()
    },
    {
      position: "Frontend Developer @ SIT DEV TEAM",
      date: "(Feb 2025 - Mar 2025)",
      responsibilities: [
        "- Crafted pixel-perfect Next.js interfaces",
        "- Developed responsive and accessible web applications",
        "- Optimized performance using modern React practices"
      ],
      images: loadIT3KImages()
    },
    {
      position: "Hackathon Lead @ KMUTT IoT Club",
      date: "(Oct 2024)",
      responsibilities: [
        "- Led AI-driven IoT solutions, securing top honors",
        "- Managed a team of 5 developers to create innovative solutions",
        "- Presented technical concepts to non-technical judges"
      ],
      images: loadIOTImages()
    },
    {
      position: "IT STARTERPACK and the Head of IT Fundamental",
      date: "(May - July 2025)",
      responsibilities: [
        "- Designed the course curriculum and structure",
        "- Strategically planned key topics such as computer fundamentals and computational thinking to help participants build a strong IT foundation",
        "- Led the organizing team and provided guidance and support to all speakers",
        "- Coordinated speaker preparation, sent timely reminders, and ensured smooth and engaging sessions",
        "- Oversaw logistics, managed rehearsal bookings, and ensured flawless execution of all sessions"
      ],
      images: loadITStarterpackImages()
    }
  ];

  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalExpIndex, setModalExpIndex] = useState(null);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const intervals = {};
    
    experiences.forEach((exp, expIndex) => {
      if (exp.images && exp.images.length > 1) {
        intervals[expIndex] = setInterval(() => {
          setCurrentImageIndexes(prev => ({
            ...prev,
            [expIndex]: (prev[expIndex] || 0 + 1) % exp.images.length
          }));
        }, 4000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, []);

  const openModal = (expIndex, imageIndex) => {
    setModalExpIndex(expIndex);
    setModalImage(experiences[expIndex].images[imageIndex]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
    setModalExpIndex(null);
  };

  const nextImage = (expIndex, e) => {
    e.stopPropagation();
    const currentIndex = currentImageIndexes[expIndex] || 0;
    const nextIndex = (currentIndex + 1) % experiences[expIndex].images.length;
    setCurrentImageIndexes(prev => ({
      ...prev,
      [expIndex]: nextIndex
    }));
  };

  const prevImage = (expIndex, e) => {
    e.stopPropagation();
    const currentIndex = currentImageIndexes[expIndex] || 0;
    const prevIndex = currentIndex === 0 ? experiences[expIndex].images.length - 1 : currentIndex - 1;
    setCurrentImageIndexes(prev => ({
      ...prev,
      [expIndex]: prevIndex
    }));
  };

  const nextModalImage = () => {
    if (modalExpIndex !== null) {
      const currentIndex = currentImageIndexes[modalExpIndex] || 0;
      const nextIndex = (currentIndex + 1) % experiences[modalExpIndex].images.length;
      setCurrentImageIndexes(prev => ({
        ...prev,
        [modalExpIndex]: nextIndex
      }));
      setModalImage(experiences[modalExpIndex].images[nextIndex]);
    }
  };

  const prevModalImage = () => {
    if (modalExpIndex !== null) {
      const currentIndex = currentImageIndexes[modalExpIndex] || 0;
      const prevIndex = currentIndex === 0 ? experiences[modalExpIndex].images.length - 1 : currentIndex - 1;
      setCurrentImageIndexes(prev => ({
        ...prev,
        [modalExpIndex]: prevIndex
      }));
      setModalImage(experiences[modalExpIndex].images[prevIndex]);
    }
  };

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowRight') {
          nextModalImage();
        } else if (e.key === 'ArrowLeft') {
          prevModalImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, modalExpIndex]);

  return (
    <div className="output">
      <p className="section-title">
        <span className="command-prompt text-[--primary] mr-3">></span> My Experience
      </p>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item" style={{ '--animation-order': index }}>
            <div className="experience-header">
              <div className="experience-text">
                <p className="position">
                  {exp.position} <br />
                  <span className="date">{exp.date}</span>
                </p>
              </div>
              {exp.images && exp.images.length > 0 && (
                <div className="experience-image-container">
                  <div className="experience-image-wrapper">
                    <img 
                      src={exp.images[currentImageIndexes[index] || 0]} 
                      alt={`${exp.position} experience`}
                      className="experience-image"
                      onClick={() => openModal(index, currentImageIndexes[index] || 0)}
                    />
                    {exp.images.length > 1 && (
                      <div className="image-indicators">
                        {exp.images.map((_, imgIndex) => (
                          <span 
                            key={imgIndex} 
                            className={`indicator ${(currentImageIndexes[index] || 0) === imgIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndexes(prev => ({ ...prev, [index]: imgIndex }))}
                          />
                        ))}
                      </div>
                    )}
                    {exp.images.length > 1 && (
                      <>
                        <button 
                          className="nav-btn prev-btn"
                          onClick={(e) => prevImage(index, e)}
                        >
                          &lsaquo;
                        </button>
                        <button 
                          className="nav-btn next-btn"
                          onClick={(e) => nextImage(index, e)}
                        >
                          &rsaquo;
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="responsibilities">
              {exp.responsibilities.map((resp, idx) => (
                <p key={idx} className="responsibility">{resp}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="next-link">
        Type <a href="#activities" onClick={() => handleSectionChange('activities')}>
          [activities]
        </a> for more
      </p>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img 
              src={modalImage} 
              alt="Experience full view" 
              className="modal-image"
            />
            {experiences[modalExpIndex]?.images.length > 1 && (
              <>
                <button className="modal-nav prev" onClick={prevModalImage}>
                  &lsaquo;
                </button>
                <button className="modal-nav next" onClick={nextModalImage}>
                  &rsaquo;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection; 