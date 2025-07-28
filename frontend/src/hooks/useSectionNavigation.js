import { useState } from 'react';

export const useSectionNavigation = (initialSection = 'about') => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [isLoading, setIsLoading] = useState(false);

  const handleSectionChange = (section) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsLoading(false);
    }, 300);
  };

  const handleKeyCommand = (e) => {
    if (e.key === 'Enter') {
      const command = e.target.value.toLowerCase().trim();
      const sections = ['about', 'projects', 'experience', 'activities', 'social', 'skills'];
      const section = sections.find((s) => command.includes(s)) || 'about';
      handleSectionChange(section);
      e.target.value = '';
    }
  };

  return {
    currentSection,
    isLoading,
    handleSectionChange,
    handleKeyCommand
  };
}; 