// src/main.jsx
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

import Home from './pages/Home.jsx';               // หน้าแรกใหม่
import ProjectGrid from './pages/ProjectGrid.jsx'; // หน้า Quests เดิม
import CharacterStats from './pages/CharactorStats.jsx';
import ContactPage from './pages/ContactPage.jsx';

// Scroll to top เมื่อเปลี่ยนหน้า
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />               {/* หน้าแรกใหม่ */}
        <Route path="/quests" element={<ProjectGrid />} />
        <Route path="/character" element={<CharacterStats />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);