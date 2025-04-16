import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectdata, ActivityData } from "../Backend/Data";
import white from "./assets/white.png";
import black from "./assets/black.png";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const filterRef = useRef(null);
  const sectionsRef = useRef([]);
  const cursorRef = useRef(null); // Ref for cursor element
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

  // Cursor logic
  useEffect(() => {
    const cursorItem = cursorRef.current;
    const cursorParagraph = cursorItem.querySelector("p");
    const targets = document.querySelectorAll("[data-cursor]");
    let xOffset = 6;
    let yOffset = 50;
    let cursorIsOnRight = false;
    let currentTarget = null;
    let lastText = "";

    // Position cursor relative to actual cursor position
    gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset });

    // GSAP quickTo for smooth cursor movement
    const xTo = gsap.quickTo(cursorItem, "x", { ease: "power3" });
    const yTo = gsap.quickTo(cursorItem, "y", { ease: "power3" });

    // Mousemove handler
    const handleMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const cursorX = e.clientX;
      const cursorY = e.clientY + scrollY;

      let xPercent = xOffset;
      let yPercent = yOffset;

      // Adjust X offset for right side
      if (cursorX > windowWidth * 0.66) {
        cursorIsOnRight = true;
        xPercent = -100;
      } else {
        cursorIsOnRight = false;
      }

      // Adjust Y offset for bottom
      if (cursorY > scrollY + windowHeight * 0.9) {
        yPercent = -120;
      }

      if (currentTarget) {
        let newText = currentTarget.getAttribute("data-cursor");
        if (
          currentTarget.hasAttribute("data-easteregg") &&
          cursorIsOnRight
        ) {
          newText = currentTarget.getAttribute("data-easteregg");
        }

        if (newText !== lastText) {
          cursorParagraph.innerHTML = newText;
          lastText = newText;
        }
      }

      gsap.to(cursorItem, {
        xPercent: xPercent,
        yPercent: yPercent,
        duration: 0.9,
        ease: "power3",
      });
      xTo(cursorX);
      yTo(cursorY - scrollY);
    };

    // Mouseenter handler for targets
    targets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        currentTarget = target;
        let newText = target.hasAttribute("data-easteregg")
          ? target.getAttribute("data-easteregg")
          : target.getAttribute("data-cursor");

        if (newText !== lastText) {
          cursorParagraph.innerHTML = newText;
          lastText = newText;
        }
      });

      target.addEventListener("mouseleave", () => {
        currentTarget = null;
        cursorParagraph.innerHTML = "Learn more";
        lastText = "Learn more";
      });
    });

    // Add mousemove listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", () => {});
        target.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

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

  // Image slideshow for activity cards
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
    }, 1000);

    return () => clearInterval(interval);
  };

  const stopSlideshow = () => {
    setCurrentImages({});
  };

  return (
    <div className="app">
      {/* Cursor Element */}
      <div className="cursor" ref={cursorRef}>
        <p>Learn more</p>
      </div>

      <h1>Phakaphol</h1>
      <div className="container">
        <div className="image-wrapper">
          <img id="black" src={black} alt="Mask" className="mask-image" />
          <img id="white" src={white} alt="Mask" className="mask-image" />
        </div>
      </div>
      <div className="toggle-container" style={{ position: "relative" }}  data-cursor="try toggle!">
        <div className="toggle-switch" >
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

      <div className="content"  >
        {/* Who is Me Section */}
        <section
          className="section"
          ref={(el) => (sectionsRef.current[0] = el)} data-cursor="Know Me more 😊"
        >
          <div className="section-inner">
            <h2 className={`section-title ${isInverted ? "inverted" : ""}`}>
              Who is Me
            </h2>
            <div className="section-content">
              <div className={`text-container ${isInverted ? "inverted" : ""}`} >
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
                      cursorText: "Visit my GitHub",
                      easterEgg: "Code with me!",
                    },
                    {
                      id: "ig",
                      name: "Instagram",
                      link: "https://www.instagram.com/pk._tcsk/",
                      text: "Instagram",
                      cursorText: "Follow me on IG",
                      easterEgg: "See my posts!",
                    },
                    {
                      id: "Borntodev",
                      name: "Borntodev",
                      link: "https://www.borntodev.com/author/godzk25gmail-com/",
                      text: "Borntodev",
                      cursorText: "Explore Borntodev",
                      easterEgg: "Learn coding!",
                    },
                    {
                      id: "Facebook",
                      name: "Facebook",
                      link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
                      text: "Facebook",
                      cursorText: "Connect on FB",
                      easterEgg: "Friend me!",
                    },
                  ].map((social) => (
                    <a
                      key={social.id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor={social.cursorText}
                      data-easteregg={social.easterEgg}
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
           data-cursor="What experience i have ??"
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
                  <div className={`text-container`}>
                    <h3 style={{ color: "white" }}>{exp.title}</h3>
                    <p style={{ color: "white" }}>
                      {exp.company} | {exp.period}
                    </p>
                    <p style={{ color: "gray" }}>{exp.desc}</p>
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
           data-cursor="This is some cool project that i have "
        >
          <div className="section-inner">
            <h2 className={`section-title`} style={{ color: "white" }}>
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
                  <div className={`project-details`}>
                    <h3 style={{ color: "white" }}>{project.projectname}</h3>
                    <p style={{ color: "gray" }}>{project.description}</p>
                    <p style={{ color: "gray" }}>
                      <strong>Tech Stack:</strong>{" "}
                      {project.techStack.join(", ")}
                    </p>
                    <p style={{ color: "gray" }}>{project.experience}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="View this project"
                      data-easteregg="Dive in!"
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
            <h2 className={`section-title`} style={{ color: "white" }}>
              Activities
            </h2>
            <div className="section-content activity-grid">
              {ActivityData.map((semester, index) => (
                <div key={index} className="semester-item">
                  <h3
                    className={`text-container`}
                    style={{ color: "white" }}
                  >
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
                      data-cursor="Explore activity"
                      data-easteregg="Check it out!"
                    >
                      <img
                        src={
                          currentImages[`${index}-${idx}`]?.src ||
                          activity.activitypic[0]
                        }
                        alt={activity.activityTitle}
                        className="activity-image"
                      />
                      <div
                        className={`activity-details `}
                      >
                        <h4 style={{ color: "white" }}>
                          {activity.activityTitle}
                        </h4>
                        <p style={{ color: "gray" }}>{activity.description}</p>
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