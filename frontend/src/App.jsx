import Terminal from './components/Terminal/Terminal';
import AboutSection from './components/Sections/AboutSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import ExperienceSection from './components/Sections/ExperienceSection';
import ActivitiesSection from './components/Sections/ActivitiesSection';
import SocialSection from './components/Sections/SocialSection';
import SkillsSection from './components/Sections/SkillsSection';
import LoadingDots from './components/UI/LoadingDots';
import { useSectionNavigation } from './hooks/useSectionNavigation';
import './styles/layout/AppLayout.css';
import './styles/components/Common.css';

const App = () => {
  const { currentSection, isLoading, handleSectionChange, handleKeyCommand } = useSectionNavigation();

  const renderSection = () => {
    if (isLoading) {
      return (
        <div className="output loading-section">
          <p>Loading data<LoadingDots /></p>
        </div>
      );
    }

    switch (currentSection) {
      case 'about':
        return <AboutSection handleSectionChange={handleSectionChange} />;
      case 'projects':
        return <ProjectsSection handleSectionChange={handleSectionChange} />;
      case 'experience':
        return <ExperienceSection handleSectionChange={handleSectionChange} />;
      case 'activities':
        return <ActivitiesSection handleSectionChange={handleSectionChange} />;
      case 'social':
        return <SocialSection />;
      case 'skills':
        return <SkillsSection handleSectionChange={handleSectionChange} />;
      default:
        return <AboutSection handleSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="app-container">
      <div className="noise"></div>
      <div className="overlay"></div>
      <Terminal
        currentSection={currentSection}
        isLoading={isLoading}
        handleSectionChange={handleSectionChange}
        renderSection={renderSection}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default App;