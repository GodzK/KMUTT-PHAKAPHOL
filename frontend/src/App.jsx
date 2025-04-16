import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { gsap } from "https://cdn.skypack.dev/gsap@3.11.0";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap@3.11.0/ScrollTrigger";
import { projectdata, ActivityData } from "../Backend/Data";
import white from "./assets/white.png";
import black from "./assets/black.png";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const filterRef = useRef(null);
  const sectionsRef = useRef([]);
  const [currentImages, setCurrentImages] = useState({});
  const [isInverted, setIsInverted] = useState(false);

  // Theme toggle functionality
  const toggleRotation = () => {
    const filter = filterRef.current;
    const currentRotation = filter.style.transform.includes("180") ? 180 : 0;
    const newRotation = currentRotation === 0 ? 180 : 0;
    filter.style.transition = "transform 1s ease-in-out";
    filter.style.transform = `rotate(${newRotation}deg)`;
    setIsInverted(!isInverted);
  };

  // GSAP animations for sections
  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      const title = section.querySelector(".section-title");
      const content = section.querySelector(".section-content");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        })
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.2,
          },
          0
        );
    });
  }, []);

  // Image slideshow for activity cards on hover
  const startSlideshow = (activityId, images) => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImages((prev) => {
        const currentIndex = prev[activityId]
          ? (prev[activityId].index + 1) % images.length
          : 1;
        return {
          ...prev,
          [activityId]: { src: images[currentIndex], index: currentIndex },
        };
      });
    }, 1000); // Change image every 1 second

    return () => clearInterval(interval);
  };

  const stopSlideshow = () => {
    setCurrentImages({});
  };

  return (
    <div className="app">
      <h1>Phakaphol</h1>
      <div className="container">
        <div className="image-wrapper">
          <img id="white" src={white} alt="Mask" className="mask-image" />
          <img id="black" src={black} alt="Mask" className="mask-image" />
        </div>
      </div>
      <div className="toggle-container" style={{ position: "relative" }}>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="toggle"
            className="toggle-input"
            onChange={toggleRotation}
            checked={isInverted}
          />
          <label htmlFor="toggle" className="toggle-label"></label>
        </div>
      </div>
      <div className="filter" ref={filterRef}></div>

      <div className="content">
        {/* Who is Me Section */}
        <section
          className="section"
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <div className="section-inner">
            <h2 className={`section-title ${isInverted ? "inverted" : ""}`}>
              Who is Me
            </h2>
            <div className="section-content">
              <div className={`text-container ${isInverted ? "inverted" : ""}`}>
                <p style={{ width: "30%" }} id="content-para">
                  My name is Phakaphol Dherachaisuphakij, a 20-year-old Frontend
                  Developer and Creative Technologist from KMUTT, passionate
                  about building seamless user experiences through code and
                  design. With hands-on experience in React, Next.js, and
                  real-time AI integrations, I specialize in crafting
                  interactive web applications that blend functionality with
                  aesthetic precision.
                </p>

                <div className="social-links">
                  {[
                    {
                      id: "github",
                      name: "Github",
                      link: "https://github.com/GodzK",
                      text: "Github",
                    },
                    {
                      id: "ig",
                      name: "Instagram",
                      link: "https://www.instagram.com/pk._tcsk/",
                      text: "Instagram",
                    },
                    {
                      id: "Borntodev",
                      name: "Borntodev",
                      link: "https://www.borntodev.com/author/godzk25gmail-com/",
                      text: "Borntodev",
                    },
                    {
                      id: "Facebook",
                      name: "Facebook",
                      link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
                      text: "Facebook",
                    },
                  ].map((social) => (
                    <a
                      key={social.id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          className="section"
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <div className="section-inner">
          <h2 className={`section-title ${isInverted ? "inverted" : ""}`}>
              Experience
            </h2>
            <div className="section-content experience-grid">
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
                <div key={index} className="experience-card">
                  <div className={`text-container `}>
                    <h3 style={{color:"white"}}>{exp.title}</h3>
                    <p style={{color:"white"}}> {exp.company} | {exp.period}</p>
                    <p style={{color:"gray"}}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          className="section"
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <div className="section-inner">
            <h2 className={`section-title `} style={{color:"white"}}>
              Projects
            </h2>
            <div className="section-content project-grid">
              {projectdata.map((project, index) => (
                <div key={index} className="project-card">
                  <img
                    src={project.picture}
                    alt={project.projectname}
                    className="project-image"
                  />
                  <div className={`project-details `}>
                    <h3 style={{color:"white"}}>{project.projectname}</h3>
                    <p style={{color:"gray"}}>{project.description}</p>
                    <p style={{color:"gray"}}><strong>Tech Stack:</strong> {project.techStack.join(", ")}</p>
                    <p style={{color:"gray"}}>{project.experience}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section
          className="section"
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <div className="section-inner">
            <h2 className={`section-title `} style={{color:"white"}}>
              Activities
            </h2>
            <div className="section-content activity-grid">
              {ActivityData.map((semester, index) => (
                <div key={index} className="semester-item">
                  <h3 className={`text-container ${isInverted ? "inverted" : ""}`} style={{color:"white"}}>
                    {semester.Semester}
                  </h3>
                  {semester.Activity1.map((activity, idx) => (
                    <div
                      key={idx}
                      className="activity-card"
                      onMouseEnter={() =>
                        startSlideshow(`${index}-${idx}`, activity.activitypic)
                      }
                      onMouseLeave={stopSlideshow}
                    >
                      <img
                        src={
                          currentImages[`${index}-${idx}`]?.src ||
                          activity.activitypic[0]
                        }
                        alt={activity.activityTitle}
                        className="activity-image"
                      />
                      <div className={`activity-details ${isInverted ? "inverted" : ""}`}>
                        <h4 style={{color:"white"}}>{activity.activityTitle}</h4>
                        <p style={{color:"gray"}}>{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p className={`text-container ${isInverted ? "inverted" : ""}`}>
          Phakaphol Dherachaisuphakij - Portfolio 2025
        </p>
      </footer>
    </div>
  );
};

export default App;