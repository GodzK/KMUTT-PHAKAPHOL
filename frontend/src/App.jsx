import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import profile from "./assets/profile.jpg";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { projectdata, ActivityData } from "../Backend/Data";

function App() {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollSpring = useSpring(scrollY, { stiffness: 150, damping: 30 });
  const parallaxY = useTransform(scrollSpring, [0, 1000], [0, -600]);
  const parallaxY2 = useTransform(scrollSpring, [0, 1000], [0, -300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState("dark");
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
    const handleHover = () => cursor.classList.add("hover");
    const handleLeave = () => cursor.classList.remove("hover");
    document.querySelectorAll("a, button, [data-tilt]").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });
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

  return (
    <div className="app">
      {/* Background Layers */}
      <motion.div
        className="background-layer"
        style={{ y: parallaxY2 }}
      />
      <div className="overlay" />
      <div className="particles" />

      {/* Scroll Progress */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Toggles */}
      <div className="toggles">
        <motion.button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.8 }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
        <motion.button
          className="contrast-toggle"
          onClick={() => setContrast(!contrast)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.8 }}
          aria-label={`Toggle ${contrast ? "normal" : "high"} contrast`}
        >
          👁️
        </motion.button>
      </div>

      {/* Hero Section */}
      <motion.section className="hero" style={{ opacity: opacityHero }}>
        <motion.div
          className="hero-content"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <motion.h1
            className="hero-title"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 100 }}
          >
            Phakaphol D.
          </motion.h1>
          <motion.div
            className="hero-subtitle-wrapper"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.8 }}
          >
            <span className="hero-subtitle">
              FRONTEND DEVELOPER  UX/UI Designer
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <Section title="Visionary Architect">
        <motion.div className="about-content">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            className="about-image-wrapper"
            data-tilt
          >
            <LazyLoadImage
              src={profile}
              alt="Phakaphol"
              className="about-image"
              effect="opacity"
            />
          </motion.div>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p>
              I am a 20-year-old Frontend Architect at KMUTT, Year 1, driven by an unrelenting passion for crafting digital experiences that redefine excellence. With mastery over React, CSS Grid, and performance optimization, I transform ideas into seamless, captivating interfaces. My work blends precision, innovation, and artistry—fluent in HTML, CSS, JavaScript, and the pursuit of perfection.
            </p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="Contact Phakaphol"
            >
              Forge the Future
            </motion.button>
          </motion.div>
        </motion.div>
      </Section>

      {/* Tech Arsenal Section */}
      <Section title="Tech Arsenal">
        <motion.div
          className="arsenal-container"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="show"
        >
          {[
            { name: "React", color: "#61DAFB" },
            { name: "Next.js", color: "#000000" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "Node.js", color: "#68A063" },
            { name: "CSS", color: "#1572B6" },
            { name: "YOLO AI", color: "#FF5E62" },
            { name: "Express.js", color: "#000000" },
            { name: "MongoDB", color: "#47A248" },
            { name: "Axios", color: "#5A29E4" },
          ].map((tech) => (
            <motion.div
              key={tech.name}
              className="arsenal-poly"
              style={{ "--tech-color": tech.color }}
              variants={{
                hidden: { scale: 0, opacity: 0 },
                show: { scale: 1, opacity: 1 },
              }}
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.8 }}
              data-tilt
            >
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Projects Section */}
      <Section title="Master Creations">
        <div className="filter-container">
          {["all", ...uniqueCategories].map((cat) => (
            <motion.button
              key={cat}
              className={`filter-button ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
        <motion.div
          className="projects-container"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          whileInView="show"
        >
          {projectdata
            .filter((project) => filter === "all" || (project.category || "Other") === filter)
            .map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                data-tilt
              >
                <LazyLoadImage
                  src={project.picture}
                  alt={project.projectname}
                  className="project-image"
                  effect="opacity"
                />
                <h3>{project.projectname}</h3>
                <p>{project.description.substring(0, 100)}...</p>
                <div className="tech-stack">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <motion.button
                  className="see-more-button"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View details for ${project.projectname}`}
                >
                  Discover
                </motion.button>
              </motion.div>
            ))}
        </motion.div>

        {selectedProject && (
          <motion.div
            className="project-popup"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          >
            <div className="popup-content" tabIndex={-1} ref={popupRef}>
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
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label={`Visit ${selectedProject.projectname} project`}
              >
                Visit Creation
              </a>
              <motion.button
                className="close-button"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close project details"
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        )}
      </Section>

      {/* Experience Section */}
      <Section title="Epic Journey">
        <motion.div className="experience-container">
          {[
            {
              title: "QA Specialist",
              company: "SCB TechX",
              period: "Apr 2025 - Present",
              desc: "Orchestrated Cypress automation to ensure flawless testing pipelines.",
            },
            {
              title: "Frontend Developer",
              company: "SIT DEV TEAM",
              period: "Feb 2025 - Mar 2025",
              desc: "Crafted Next.js interfaces with unparalleled precision and performance.",
            },
            {
              title: "Hackathon Lead",
              company: "KMUTT IoT Club",
              period: "Oct 2024",
              desc: "Led a team to triumph in IoT Hackathon with YOLO AI integration.",
            },
          ].map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              initial={{ x: index % 2 === 0 ? -300 : 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              whileHover={{ scale: 1.05 }}
              data-tilt
            >
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}</p>
              <p className="period">{exp.period}</p>
              <p>{exp.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Activities Section */}
      <Section title="Legendary Ventures">
        <motion.div
          className="activities-container"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          whileInView="show"
        >
          {ActivityData.flatMap((sem) => sem.Activity1).map((activity, index) => (
            <motion.div
              key={index}
              className="activity-card"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                show: { scale: 1, opacity: 1 },
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              data-tilt
            >
              <LazyLoadImage
                src={activity.image}
                alt={activity.activityTitle}
                className="activity-image"
                effect="opacity"
              />
              <h3>{activity.activityTitle}</h3>
              <p>{activity.description}</p>
              <div className="activity-gallery">
                {activity.activitypic?.map((pic, i) => (
                  <LazyLoadImage
                    key={i}
                    src={pic}
                    alt={`${activity.activityTitle} ${i + 1}`}
                    className="gallery-image"
                    effect="opacity"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section title="Unite for Greatness">
        <motion.div className="contact-container">
          <motion.p
            className="contact-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Join me in shaping the digital frontier.
          </motion.p>
          <motion.a
            href="mailto:godzk25@gmail.com"
            className="contact-email"
            whileHover={{ scale: 1.1 }}
            aria-label="Email Phakaphol"
          >
            godzk25@gmail.com
          </motion.a>
          <motion.div
            className="social-cards"
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {[
              {
                id: "ig",
                name: "Instagram",
                link: "https://www.instagram.com/pk._tcsk/",
                text: "IG: pk.tcsk",
                gradient: "from-pink-500 via-purple-600 to-red-500",
              },
              {
                id: "fb",
                name: "Facebook",
                link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
                text: "FB: Pk Phakaphol Tcsk",
                gradient: "from-blue-600 via-blue-500 to-blue-400",
              },
              {
                id: "gh",
                name: "Github",
                link: "https://github.com/GodzK",
                text: "Github Profile",
                gradient: "from-gray-800 via-gray-700 to-gray-600",
              },
              {
                id: "bd",
                name: "Borntodev",
                link: "https://www.borntodev.com/author/godzk25gmail-com/",
                text: "Borntodev Devinit#2",
                gradient: "from-orange-500 via-yellow-600 to-yellow-500",
              },
            ].map((social) => (
              <motion.a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-card bg-gradient-to-r ${social.gradient}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6 }}
                data-tilt
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
  const [ref, inView] = useInView({ threshold: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.section
      ref={ref}
      className="section snap-section"
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.h2
        className="section-title"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
      >
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
  
});Section.displayName = "Section";

export default App;