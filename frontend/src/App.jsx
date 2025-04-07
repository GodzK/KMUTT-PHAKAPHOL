import React, { useEffect, useState } from "react"; // เพิ่ม useState สำหรับ Pop-up
import "./App.css";
import Background from "./assets/bg.mp4";
import profile from "./assets/profile.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projectdata, ActivityData } from "../Backend/Data";

function App() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Custom Cursor (ถ้ามี Asset เปลี่ยนได้)
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    return () => document.body.removeChild(cursor);
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
      />
      <div className="overlay" />

      {/* Hero Section */}
      <motion.section className="hero" style={{ opacity: opacityHero }}>
        <motion.div
          className="hero-content"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h1
            className="hero-title"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            Phakaphol D.
          </motion.h1>
          <motion.div
            className="hero-subtitle-wrapper"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <span className="hero-subtitle">
              FrontEnd Developer <br /> UX/UI Designer
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <Section title="Visionary Coder">
        <motion.div className="about-content">
          <motion.img
            src={profile}
            alt="Phakaphol"
            className="about-image"
            initial={{ x: "-100vw" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
          />
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              A 20-year-old Frontend Developer @ KMUTT | Year 1 Passionate
              doesn’t even begin to cover it—I breathe frontend. From
              pixel-perfect UIs with React to animations that feel alive, I
              build experiences, not just websites. Mastering of Grid and
              responsive design, performance tuning, and seamless UX. I use
              HTML, CSS, JS fluently
            </p>
            <motion.button
              className="cta-button"
              whileHover={{
                scale: 1.2,
                rotate: 10,
                background: "var(--secondary)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
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
              style={{
                background: `radial-gradient(circle at 30% 30%, ${skill.color}, transparent)`,
              }}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.3, rotate: 360 }}
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section title="Creations">
        <motion.div className="projects-container">
          {projectdata.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateX: 15, rotateY: 15 }}
            >
              <img
                src={project.picture}
                alt={project.projectname}
                className="project-image"
              />
              <h3>{project.projectname}</h3>
              <p>{project.description.substring(0, 100)}...</p>{" "}
              {/* จำกัดความยาว */}
              <motion.button
                className="see-more-button"
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.1, background: "var(--secondary)" }}
                whileTap={{ scale: 0.9 }}
              >
                See More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Pop-up */}
        {selectedProject && (
          <motion.div
            className="project-popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="popup-content">
              <h3>{selectedProject.projectname}</h3>
              <img
                src={selectedProject.picture}
                alt={selectedProject.projectname}
                className="popup-image"
              />
              <p>{selectedProject.description}</p>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Visit Project
              </a>
              <motion.button
                className="close-button"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.3 }}
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
              period: "Jun 2020 - Dec 2021",
              desc: "Crafted Next.js brilliance",
            },
          ].map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(48, 199, 255, 0.5)",
              }}
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
          {ActivityData.flatMap((sem) => sem.Activity1).map(
            (activity, index) => (
              <motion.div
                key={index}
                className="activity-card"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img
                  src={activity.image}
                  alt={activity.activityTitle}
                  className="activity-image"
                />
                <h3>{activity.activityTitle}</h3>
                <p>{activity.description}</p>
              </motion.div>
            )
          )}
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section title="Get In Touch">
        <motion.div className="contact-container">
          <motion.p
            className="contact-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Unleash the Future with Me
          </motion.p>
          <motion.a
            href="mailto:godzk25@gmail.com"
            className="contact-email"
            whileHover={{ scale: 1.1, textShadow: "0 0 20px var(--primary)" }}
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
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
              
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                }}
              >
                <span className="social-icon">{social.icon}</span>
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
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="section"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="section-title"
        initial={{ scale: 0, rotate: -90 }}
        animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
}

export default App;
