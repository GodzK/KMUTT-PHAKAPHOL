import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import profile from "./assets/profile.jpg";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { projectdata, ActivityData } from "../Backend/Data";

function App() {
  const { scrollYProgress } = useScroll();
  const scrollSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState("light");
  const [contrast, setContrast] = useState(false);
  const [filter, setFilter] = useState("all");
  const popupRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-contrast", contrast ? "high" : "normal");
  }, [theme, contrast]);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    const cursorInner = document.createElement("div");
    cursorInner.className = "custom-cursor-inner";
    cursor.appendChild(cursorInner);
    document.body.appendChild(cursor);
    const updateCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    document.addEventListener("mousemove", updateCursor);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  useEffect(() => {
    if (selectedProject && popupRef.current) {
      popupRef.current.focus();
    }
  }, [selectedProject]);

  const uniqueCategories = [...new Set(projectdata.map((p) => p.category || "Other"))];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="app">
      {/* Background Layers */}
      <motion.div className="background-layer" style={{ scale: useTransform(scrollSpring, [0, 1], [1, 1.1]) }} />
      <div className="overlay" />

      {/* Scroll Progress */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {/* Toggles */}
      <motion.div
        className="toggles"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </motion.button>
        <motion.button
          className="contrast-toggle"
          onClick={() => setContrast(!contrast)}
          whileHover={{ scale: 1.2, rotate: -360 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Toggle ${contrast ? "normal" : "high"} contrast`}
        >
          👁️
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <motion.section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h1
            className="hero-title"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {Array.from("Phakaphol D.").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            className="hero-subtitle-wrapper"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="hero-subtitle">Crafting Digital Excellence</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <Section title="About Me">
        <motion.div className="about-content" variants={containerVariants} initial="hidden" whileInView="show">
          <motion.div variants={itemVariants} className="about-image-wrapper">
            <LazyLoadImage src={profile} alt="Phakaphol" className="about-image" effect="opacity" />
          </motion.div>
          <motion.div className="about-text" variants={itemVariants}>
            <p>
              A 20-year-old Frontend Architect at KMUTT, I weave code into art. With expertise in React, Next.js, and UI/UX design, I create experiences that captivate and inspire. My mission? To redefine the digital landscape with elegance and innovation.
            </p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px var(--glow)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              aria-label="Contact Phakaphol"
            >
              Discover My Journey
            </motion.button>
          </motion.div>
        </motion.div>
      </Section>


      {/* Projects Section */}
      <Section title="Project">
        <motion.div className="filter-container" variants={containerVariants} initial="hidden" whileInView="show">
          {["all", ...uniqueCategories].map((cat) => (
            <motion.button
              key={cat}
              className={`filter-button ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
              variants={itemVariants}
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px var(--glow)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          className="projects-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          {projectdata
            .filter((project) => filter === "all" || (project.category || "Other") === filter)
            .map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px var(--glow)" }}
                transition={{ duration: 0.5 }}
              >
                <LazyLoadImage
                  src={project.picture}
                  alt={project.projectname}
                  className="project-image"
                  effect="opacity"
                />
                <motion.h3 variants={itemVariants}>{project.projectname}</motion.h3>
                <p>{project.description.substring(0, 120)}...</p>
                <motion.div className="tech-stack" variants={containerVariants} initial="hidden" whileInView="show">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="tech-tag"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.button
                  className="see-more-button"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px var(--glow)" }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View details for ${project.projectname}`}
                >
                  Explore
                </motion.button>
              </motion.div>
            ))}
        </motion.div>

        {selectedProject && (
          <motion.div
            className="project-popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="popup-content"
              tabIndex={-1}
              ref={popupRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
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
              <motion.a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                whileHover={{ scale: 1.1 }}
                aria-label={`Visit ${selectedProject.projectname} project`}
              >
                Visit Creation
              </motion.a>
              <motion.button
                className="close-button"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close project details"
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </Section>

      {/* Experience Section */}
      <Section title="Experience">
        <motion.div
          className="experience-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          {[
            {
              title: "QA Specialist",
              company: "SCB TechX",
              period: "Apr 2025 - Present",
              desc: "Architected robust testing pipelines with Cypress, ensuring flawless delivery.",
            },
            {
              title: "Frontend Developer",
              company: "SIT DEV TEAM",
              period: "Feb 2025 - Mar 2025",
              desc: "Crafted pixel-perfect Next.js interfaces for global clients.",
            },
            {
              title: "Hackathon Lead",
              company: "KMUTT IoT Club",
              period: "Oct 2024",
              desc: "Spearheaded AI-driven IoT solutions, securing top honors.",
            },
          ].map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px var(--glow)" }}
              transition={{ duration: 0.5 }}
            >
              <motion.h3 variants={itemVariants}>{exp.title}</motion.h3>
              <p className="company">{exp.company}</p>
              <p className="period">{exp.period}</p>
              <p>{exp.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Legendary Ventures Section */}
      <Section title="Epic Ventures">
        <motion.div
          className="activities-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          {ActivityData.flatMap((sem) => sem.Activity1).map((activity, index) => (
            <motion.div
              key={index}
              className="activity-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px var(--glow)" }}
              transition={{ duration: 0.5 }}
            >
              <LazyLoadImage
                src={activity.image}
                alt={activity.activityTitle}
                className="activity-image"
                effect="opacity"
              />
              <motion.h3 variants={itemVariants}>{activity.activityTitle}</motion.h3>
              <p>{activity.description}</p>
              <motion.div
                className="activity-gallery"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
              >
                {activity.activitypic?.map((pic, i) => (
                  <motion.div
                    key={i}
                    className="gallery-image-wrapper"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.3,
                      rotate: 10,
                      boxShadow: "0 0 50px var(--glow)",
                      zIndex: 10,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <LazyLoadImage
                      src={pic}
                      alt={`${activity.activityTitle} ${i + 1}`}
                      className="gallery-image"
                      effect="opacity"
                    />
                    <motion.div
                      className="gallery-overlay"
                      initial={{ opacity: 0, y: 50 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span>Discover</span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section title="Forge the Future">
        <motion.div
          className="contact-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          <motion.p className="contact-text" variants={itemVariants}>
            Let’s create something extraordinary together.
          </motion.p>
          <motion.a
            href="mailto:godzk25@gmail.com"
            className="contact-email"
            variants={itemVariants}
            whileHover={{ scale: 1.1, textShadow: "0 0 20px var(--glow)" }}
            aria-label="Email Phakaphol"
          >
            godzk25@gmail.com
          </motion.a>
          <motion.div
            className="social-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
          >
            {[
              {
                id: "ig",
                name: "Instagram",
                link: "https://www.instagram.com/pk._tcsk/",
                text: "IG: pk.tcsk",
              },
              {
                id: "fb",
                name: "Facebook",
                link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
                text: "FB: Pk Phakaphol Tcsk",
              },
              {
                id: "gh",
                name: "Github",
                link: "https://github.com/GodzK",
                text: "Github Profile",
              },
              {
                id: "bd",
                name: "Borntodev",
                link: "https://www.borntodev.com/author/godzk25gmail-com/",
                text: "Borntodev Devinit#2",
              },
            ].map((social) => (
              <motion.a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                variants={itemVariants}
                whileHover={{ scale: 1.1, boxShadow: "0 0 40px var(--glow)" }}
                transition={{ duration: 0.5 }}
                aria-label={`Visit ${social.name} profile`}
              >
                <span className="social-text">{social.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}

const Section = React.memo(({ title, children }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <motion.section
      ref={ref}
      className="section snap-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h2
        className="section-title"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
});
Section.displayName = "Section";

export default App;