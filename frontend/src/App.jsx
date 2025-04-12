import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { projectdata, ActivityData } from "../Backend/Data";
import Terminal from "./components/Terminal";
import RepoCard from "./components/RepoCard";
import ActivityCard from "./components/ActivityCard";
import profile from "./assets/profile.jpg";

function App() {
  const [theme, setTheme] = useState("dark");
  const [contrast, setContrast] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");
  const popupRef = useRef(null);
  const sectionRefs = {
    about: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    activities: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-contrast", contrast ? "high" : "normal");
  }, [theme, contrast]);

  useEffect(() => {
    if (selectedProject && popupRef.current) {
      popupRef.current.focus();
    }
  }, [selectedProject]);

  const handleCommand = (command) => {
    const normalized = command.toLowerCase().trim();
    if (normalized === "ls" || normalized === "dir") {
      return Object.keys(sectionRefs).join("  ");
    } else if (normalized.startsWith("cd ")) {
      const section = normalized.split(" ")[1];
      if (sectionRefs[section]) {
        sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
        return `Navigated to ${section}`;
      }
      return "Section not found";
    } else if (normalized === "cat about.md") {
      sectionRefs.about.current.scrollIntoView({ behavior: "smooth" });
      return "Displaying about.md";
    } else if (normalized === "open contact") {
      sectionRefs.contact.current.scrollIntoView({ behavior: "smooth" });
      return "Opening contact";
    } else {
      return "Command not found. Try 'ls', 'cd <section>', 'cat about.md', or 'open contact'.";
    }
  };

  const uniqueCategories = [...new Set(projectdata.map((p) => p.category || "Other"))];

  return (
    <div className="app">
      {/* Terminal Header */}
      <Terminal onCommand={handleCommand} />

      {/* Theme & Contrast Toggles */}
      <div className="toggles">
        <motion.button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
        <motion.button
          className="contrast-toggle"
          onClick={() => setContrast(!contrast)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Toggle ${contrast ? "normal" : "high"} contrast`}
        >
          👁️
        </motion.button>
      </div>

      {/* About Section */}
      <section ref={sectionRefs.about} className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="prompt">$</span> whoami
        </motion.h2>
        <div className="about-content">
          <LazyLoadImage src={profile} alt="Phakaphol" className="about-image" effect="opacity" />
          <p>
            A 20-year-old Frontend Architect at KMUTT, weaving code into art. Skilled in React, Next.js, and UI/UX design, I create captivating digital experiences. My mission: redefine the web with elegance and innovation.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="prompt">$</span> ls projects
        </motion.h2>
        <div className="filter-container">
          {["all", ...uniqueCategories].map((cat) => (
            <motion.button
              key={cat}
              className={`filter-button ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
        <div className="projects-container">
          {projectdata
            .filter((project) => filter === "all" || (project.category || "Other") === filter)
            .map((project, index) => (
              <RepoCard
                key={index}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
        </div>

        {selectedProject && (
          <motion.div
            className="project-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="popup-content" ref={popupRef} tabIndex={-1}>
              <h3>{selectedProject.projectname}</h3>
              <LazyLoadImage
                src={selectedProject.picture}
                alt={selectedProject.projectname}
                className="popup-image"
                effect="opacity"
              />
              <p>{selectedProject.description}</p>
              <div className="tech-stack">
                {selectedProject.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <p><strong>Experience:</strong> {selectedProject.experience}</p>
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                Visit Project
              </a>
              <motion.button
                className="close-button"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Experience Section */}
      <section ref={sectionRefs.experience} className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="prompt">$</span> history
        </motion.h2>
        <div className="experience-container">
          {[
            {
              title: "QA Specialist",
              company: "SCB TechX",
              period: "Apr 2025 - Present",
              desc: "Architected robust testing pipelines with Cypress.",
            },
            {
              title: "Frontend Developer",
              company: "SIT DEV TEAM",
              period: "Feb 2025 - Mar 2025",
              desc: "Crafted pixel-perfect Next.js interfaces.",
            },
            {
              title: "Hackathon Lead",
              company: "KMUTT IoT Club",
              period: "Oct 2024",
              desc: "Led AI-driven IoT solutions, securing top honors.",
            },
          ].map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}</p>
              <p className="period">{exp.period}</p>
              <p>{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section ref={sectionRefs.activities} className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span class="prompt">$</span> ls activities
        </motion.h2>
        <div className="activities-container">
          {ActivityData.flatMap((sem) => sem.Activity1).map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="prompt">$</span> contact
        </motion.h2>
        <div className="contact-container">
          <p>Let’s build something extraordinary.</p>
          <a href="mailto:godzk25@gmail.com" className="contact-email">
            godzk25@gmail.com
          </a>
          <div className="social-cards">
            {[
              { id: "github", name: "Github", link: "https://github.com/GodzK", text: "Github" },
              { id: "ig", name: "Instagram", link: "https://www.instagram.com/pk._tcsk/", text: "Instagram" },
              { id: "Borntodev", name: "Instagram", link: "https://www.borntodev.com/author/godzk25gmail-com/", text: "Borntodev" },
              { id: "Facebook", name: "Facebook", link: "https://www.facebook.com/phakaphol.dherachaisuphakij/", text: "Facebook" },

            ].map((social) => (
              <motion.a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                whileHover={{ scale: 1.05 }}
              >
                {social.text}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;