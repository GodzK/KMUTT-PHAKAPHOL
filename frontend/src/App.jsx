import React, { useState, useEffect , lazy , useCallback } from 'react';
import { Suspense } from 'react';
import LoadingDots from './components/UI/LoadingDots';
import TypewriterText from './components/UI/TypewriterText';
import profile from "../src/assets/profile.jpg"
import { FaUser, FaCode, FaBriefcase, FaStar, FaCog, FaGlobe, FaHome , FaLightbulb} from 'react-icons/fa';
import './styles/layout/AppLayout.css';
import "./loading.css"
const AboutSection = lazy(() => import('./components/Sections/AboutSection'));
const ProjectsSection = lazy(() => import('./components/Sections/ProjectsSection'));
const ExperienceSection = lazy(() => import('./components/Sections/ExperienceSection'));
const ActivitiesSection = lazy(() => import('./components/Sections/ActivitiesSection'));
const SocialSection = lazy(() => import('./components/Sections/SocialSection'));
const SkillsSection = lazy(() => import('./components/Sections/SkillsSection'));
const App = () => {
const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showFullContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry);
          }
        });
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const sections = [
    { id: 'home', icon: <FaHome />, label: 'Home', color: '#6B46C1' },
    { id: 'about', icon: <FaUser />, label: 'About', color: '#7CB342' },
    { id: 'projects', icon: <FaCode />, label: 'Projects', color: '#FFD700' },
    { id: 'experience', icon: <FaBriefcase />, label: 'Experience', color: '#FF6B6B' },
    { id: 'activities', icon: <FaStar />, label: 'Activities', color: '#4ECDC4' },
    { id: 'skills', icon: <FaLightbulb />, label: 'Skills', color: '#45B7D1' },
    { id: 'social', icon: <FaGlobe />, label: 'Connect', color: '#96CEB4' },
  ];

  if (isLoading) {
  return (
    <div id="totalbase">
      <div id="animbase">
        <div id="base">
          <div id="baseshadow"></div>
          <div className="helitop">
            <div className="wingbase">
              <div className="col1"></div>
              <div className="col2"></div>
              <div className="col3"></div>
              <div className="col4"></div>
              <div className="wing1"></div>
              <div className="wing2"></div>
            </div>
          </div>
          <div className="helifront">
            <div className="tailbase">
              <div className="tail1">
                <div className="tail21"></div>
                <div className="tail22"></div>
                <div className="tail23"></div>
                <div className="tail24">
                  <div className="tailwingbase">
                    <div className="tail221"></div>
                    <div className="tail222"></div>
                    <div className="tail223"></div>
                    <div className="tail224"></div>
                    <div className="tailwing1"></div>
                    <div className="tailwing2"></div>
                  </div>
                </div>
              </div>
              <div className="tail25"></div>
              <div className="tail26"></div>
            </div>
          </div>
          <div className="heliback">
            <div className="front1"></div>
            <div className="front2"></div>
            <div className="front3"></div>
            <div className="front4"></div>
            <div className="front5"></div>
          </div>
          <div className="helileft"></div>
          <div className="heliright"></div>
          <div className="helibottom"></div>
        </div>
      </div>
      <div id="towerbase">
        <div id="talkbubble" align="center">
          airport is<br /> loading...<br />please wait..
        </div>
        <div className="tower1left"></div>
        <div className="tower1right"></div>
        <div className="tower2right">
          <div className="tower1window"></div>
        </div>
        <div className="tower1top">
          <div className="front1">
            <div className="col1"></div>
            <div className="col2"></div>
            <div className="col3"></div>
            <div className="col4"></div>
          </div>
          <div className="front2"></div>
          <div className="front3"></div>
        </div>
        <div className="tower2top"></div>
        <div className="tower2left">
          <div className="tower2window"></div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="profile-section">
            <img
              className="profile-avatar"
              src={profile}
              alt="Profile"
              loading="lazy"
            />
            <div className="profile-info">
              <h1 className="profile-name">
                <TypewriterText text="Phakaphol" delay={100} />
              </h1>
              <p className="profile-title">QA & Frontend Dev</p>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section id="home" className={`content-section ${activeSection === 'home' ? 'active' : ''}`}>
          <div className="welcome-card">
            <h2>Welcome to my Portfolio!</h2>
            <p>Tap any icon below to explore</p>
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">12+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>
          </div>
        </section>

        <section className="navigation-section">
          <div className="nav-grid">
            {sections.slice(1).map((section) => (
              <button
                key={section.id}
                className={`nav-card ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
                style={{ '--card-color': section.color }}
              >
                <div className="nav-icon">{section.icon}</div>
                <span className="nav-label">{section.label}</span>
              </button>
            ))}
          </div>
        </section>

        <Suspense fallback={<div className="loading-card"><LoadingDots /></div>}>
          <section id="about" className={`content-section ${activeSection === 'about' ? 'active' : ''}`}>
            <div className="content-card">
              <div className="card-header">
                <FaUser className="card-icon" />
                <h2>About Me</h2>
              </div>
              <div className="card-content">
                <AboutSection handleSectionChange={scrollToSection} showFull={showFullContent} />
              </div>
            </div>
          </section>

          <section id="projects" className={`content-section ${activeSection === 'projects' ? 'active' : ''}`}>
            <div className="content-card">
              <div className="card-header">
                <FaCode className="card-icon" />
                <h2>Projects</h2>
              </div>
              <div className="card-content">
                <ProjectsSection handleSectionChange={scrollToSection} showFull={showFullContent} />
              </div>
            </div>
          </section>

          <section id="experience" className={`content-section ${activeSection === 'experience' ? 'active' : ''}`}>
            <div className="content-card">
              <div className="card-header">
                <FaBriefcase className="card-icon" />
                <h2>Experience</h2>
              </div>
              <div className="card-content">
                <ExperienceSection handleSectionChange={scrollToSection} showFull={showFullContent} />
              </div>
            </div>
          </section>

          <section id="activities" className={`content-section ${activeSection === 'activities' ? 'active' : ''}`}>
            <div className="content-card">
              <div className="card-header">
                <FaStar className="card-icon" />
                <h2>Activities</h2>
              </div>
              <div className="card-content">
                <ActivitiesSection handleSectionChange={scrollToSection} showFull={showFullContent} />
              </div>
            </div>
          </section>

          <section id="skills" className={`content-section ${activeSection === 'skills' ? 'active' : ''}`}>
            <div className="content-card">
              <div className="card-header">
                <FaCog className="card-icon" />
                <h2>Skills</h2>
              </div>
              <div className="card-content">
                <SkillsSection handleSectionChange={scrollToSection} showFull={showFullContent} />
              </div>
            </div>
          </section>

          <section id="social" className={`content-section ${activeSection === 'social' ? 'active' : ''}`}>
            <div className="content-card">
              <div className="card-header">
                <FaGlobe className="card-icon" />
                <h2>Connect</h2>
              </div>
              <div className="card-content">
                <SocialSection />
              </div>
            </div>
          </section>
        </Suspense>
      </main>

     <nav className="bottom-nav">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
          style={{ '--active-color': section.color }}
          onClick={() => scrollToSection(section.id)}
        >
          {section.icon}
       
        </button>
      ))}
    </nav>
    </div>
  );
};

export default App;