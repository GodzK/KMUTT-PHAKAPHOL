import React, { useEffect, useState } from "react";
import "./App.css";
import Background from "./assets/bg.mp4";
import profile from "./assets/profile.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projectdata, ActivityData } from "../Backend/Data";

function App() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Custom Cursor (Optimized for performance)
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="app">
      <motion.video
        className="background-video"
        src={Background}
        autoPlay
        loop
        muted
        playsInline
        style={{ y: parallaxY }}
        aria-hidden="true"
      />
      <div className="overlay" />

      {/* Hero Section */}
      <motion.section className="hero" style={{ opacity: opacityHero }}>
        <motion.div
          className="hero-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="hero-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Phakaphol D.
          </motion.h1>
          <motion.div
            className="hero-subtitle-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="hero-subtitle">
              FrontEnd Developer & UX/UI Designer
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <Section title="Visionary Coder">
        <motion.div className="about-content">
          <motion.img
            src={profile}
            alt="Phakaphol's profile"
            className="about-image"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              A 20-year-old Frontend Developer at KMUTT | Year 1. I’m obsessed
              with crafting pixel-perfect UIs using React, animations that pop,
              and responsive designs that shine on any device. Fluent in HTML,
              CSS, and JavaScript, I focus on performance and seamless UX.
            </p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="Contact Phakaphol"
            >
              Let’s Talk
            </motion.button>
          </motion.div>
        </motion.div>
      </Section>

      {/* Skills Section */}
      <Section title="Tech Mastery">
        <motion.div className="skills-container">
          {[
            { name: "React", color: "#61DAFB" },
            { name: "Python", color: "#3776AB" },
            { name: "Next.js", color: "#000000" },
            { name: "CSS", color: "#1572B6" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "Node.js", color: "#68A063" },
          ].map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-orb"
              style={{ backgroundColor: skill.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              role="listitem"
              aria-label={`Skill: ${skill.name}`}
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Projects Section */}
      <Section title="Creations">
        <motion.div className="projects-container">
          {projectdata.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={project.picture}
                alt={`${project.projectname} preview`}
                className="project-image"
                loading="lazy"
              />
              <h3>{project.projectname}</h3>
              <p>{project.description.substring(0, 80)}...</p>
              <motion.button
                className="see-more-button"
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View details for ${project.projectname}`}
              >
                See More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Pop-up */}
        {selectedProject && (
          <motion.div
            className="project-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-labelledby="popup-title"
          >
            <div className="popup-content">
              <h3 id="popup-title">{selectedProject.projectname}</h3>
              <img
                src={selectedProject.picture}
                alt={`${selectedProject.projectname} preview`}
                className="popup-image"
                loading="lazy"
              />
              <p>{selectedProject.description}</p>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label={`Visit ${selectedProject.projectname} project`}
              >
                Visit Project
              </a>
              <motion.button
                className="close-button"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1 }}
                aria-label="Close project details"
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        )}
      </Section>

      {/* Experience Section */}
      <Section title="Milestones">
        <motion.div className="experience-container">
          {[
            {
              title: "QA Specialist",
              company: "SCB TechX",
              period: "Apr 2025 - Present",
              desc: "Mastered Cypress automation",
            },
            {
              title: "Frontend Dev",
              company: "SIT DEV TEAM",
              period: "Feb 2025 - March 2025",
              desc: "Crafted Next.js brilliance",
            },
          ].map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
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
      <Section title="Adventures">
        <motion.div className="activities-container">
          {ActivityData.flatMap((sem) => sem.Activity1).map((activity, index) => (
            <motion.div
              key={index}
              className="activity-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={activity.image}
                alt={`${activity.activityTitle} image`}
                className="activity-image"
                loading="lazy"
              />
              <h3>{activity.activityTitle}</h3>
              <p>{activity.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section title="Get In Touch">
        <motion.div className="contact-container">
          <motion.p
            className="contact-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Unleash the Future with Me
          </motion.p>
          <motion.a
            href="mailto:godzk25@gmail.com"
            className="contact-email"
            whileHover={{ scale: 1.05 }}
            aria-label="Email Phakaphol"
          >
            godzk25@gmail.com
          </motion.a>
          <motion.div
            className="social-cards"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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

function Section({ title, children }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      className="section"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-labelledby={`section-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <motion.h2
        className="section-title"
        id={`section-${title.toLowerCase().replace(/\s/g, "-")}`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
}

export default App;