import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { projectdata, ActivityData } from "../Backend/Data"; // สมมติว่าคุณมีไฟล์นี้
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
    document.documentElement.setAttribute(
      "data-contrast",
      contrast ? "high" : "normal"
    );
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

  const uniqueCategories = [
    ...new Set(projectdata.map((p) => p.category || "Other")),
  ];

  return (
    <>
     <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="parallax-layer parallax-layer--bg" />
        <div className="parallax-layer parallax-layer--shapes">
          <div className="shape hexagon" />
          <div className="shape triangle" />
          <div className="shape circle" />
        </div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 className="hero-title">
            {"PhakapholDherachaisuphakij".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Q/A Frontend Ux/Ui Desingner
          </motion.p>
        </motion.div>
      </section>

      {/* Terminal Header */}
      <Terminal onCommand={handleCommand} />

      {/* Theme & Contrast Toggles */}
      <div className="toggles">
        <motion.button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
        <motion.button
          className="contrast-toggle"
          onClick={() => setContrast(!contrast)}
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Toggle ${contrast ? "normal" : "high"} contrast`}
        >
          👁️
        </motion.button>
      </div>

      {/* About Section */}
      <section ref={sectionRefs.about} className="section about">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="prompt">$</span> whoisme
        </motion.h2>
        <div className="about-content">
          <motion.div
            className="about-image-container"
            whileHover={{ rotateY: 10, scale: 1.05 }}
          >
            <LazyLoadImage
              src={profile}
              alt="Phakaphol"
              className="about-image"
              effect="opacity"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            A 20-year-old Frontend Developer and Creative Technologist from KMUTT,
            passionate about building seamless user experiences through code and
            design. With hands-on experience in React, Next.js, and real-time AI
            integrations, I specialize in crafting interactive web applications
            that blend functionality with aesthetic precision.
          </motion.p>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="section projects">
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
            .filter(
              (project) =>
                filter === "all" || (project.category || "Other") === filter
            )
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
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <p>
                <strong>Experience:</strong> {selectedProject.experience}
              </p>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
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
      <section ref={sectionRefs.experience} className="section timeline"
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="prompt">$</span> ls experience
        </motion.h2>
        <div className="timeline">
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
              initial={{ x: index % 2 ? 100 : -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
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
          <span className="prompt">$</span> ls activities
        </motion.h2>
        <div className="activities-container">
          {ActivityData.flatMap((sem) => sem.Activity1).map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} className="section contact">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="prompt">$</span> contact
        </motion.h2>
        <div className="contact-container">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Let’s build something extraordinary.
          </motion.p>
          <motion.a
            href="mailto:godzk25@gmail.com"
            className="contact-email"
            whileHover={{ scale: 1.05 }}
          >
            godzk25@gmail.com
          </motion.a>
          <div className="social-cards">
  {[
    { id: "github", name: "Github", link: "https://github.com/GodzK", text: "Github" },
    { id: "ig", name: "Instagram", link: "https://www.instagram.com/pk._tcsk/", text: "Instagram" },
    { id: "Borntodev", name: "Borntodev", link: "https://www.borntodev.com/author/godzk25gmail-com/", text: "Borntodev" },
    { id: "Facebook", name: "Facebook", link: "https://www.facebook.com/phakaphol.dherachaisuphakij/", text: "Facebook" },
  ].map((social) => (
    <motion.a
      key={social.id}
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-card ${
        social.id === "github"
          ? "bg-black text-white"
          : social.id === "ig"
          ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
          : social.id === "Borntodev"
          ? "bg-yellow-400 text-black"
          : social.id === "Facebook"
          ? "bg-blue-600 text-white"
          : ""
      }`}
      whileHover={{ scale: 1.05 }}
    >
      {social.text}
    </motion.a>
  ))}
</div>
        </div>
      </section>
    </div>
    </>
   
  );
}

export default App;