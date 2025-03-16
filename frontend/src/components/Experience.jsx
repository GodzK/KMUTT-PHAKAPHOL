import React, { useState, useEffect, useRef } from "react";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Experience({ setCurrentPage }) {
  const [activeExp, setActiveExp] = useState(null);
  const containerRef = useRef(null);

  const experiences = [
    {
      id: "exp1",
      title: "Quality Assurance Specialist",
      company: "SCB TechX Company",
      period: "April 2025 - Present",
      description:
        "Implemented Cypress for end-to-end automated testing and performed comprehensive manual testing to ensure web application quality. Developed detailed test cases, identified defects efficiently, and collaborated with developers to resolve issues. Enhanced quality assurance processes through thorough documentation and maintained smooth CI/CD pipeline integration.",
      skills: ["Cypress", "Manual Testing", "JIRA", "TestRail", "Postman"],
      accentColor: "#D8BFD8", // Light purple for SCB
      bgGradient: "from-purple-900 to-indigo-900",
    },
    {
      id: "exp2",
      title: "Frontend Developer - IT3K Project",
      company: "SIT DEV TEAM (KMUTT)",
      period: "Jun 2020 - Dec 2021",
      description:
        "Developed a responsive tournament bracket system using Next.js, utilizing both SSR and SSG for optimal performance. Designed an intuitive user interface with Tailwind CSS for badminton and table tennis tournament management. Collaborated with the SIT development team to create an effective admin panel and implement real-time match updates.",
      skills: ["Next.js", "Tailwind CSS", "React", "JavaScript", "Vercel"],
      accentColor: "#FF6347", // Tomato red for KMUTT
      bgGradient: "from-red-900 to-orange-900",
    },
    {
      id: "exp3",
      title: "Frontend Developer & Content Creator",
      company: "BORNTODEV",
      period: "25 Feb 2023 - 17 May 2024",
      description:
        "Created educational GSAP animation tutorials for beginners to enhance their frontend development skills. Published comprehensive guides on JSX implementation and developed advanced CSS hover effect demonstrations. Produced engaging technical content that improved frontend development practices and techniques.",
      skills: ["GSAP", "CSS", "JSX", "React", "Content Creation"],
      accentColor: "#FFD700", // Gold for BORNTODEV
      bgGradient: "from-yellow-400 to-orange-900",
    },
    {
      id: "exp4",
      title: "Web Development Consultant",
      company: "Freelance Projects",
      period: "Jan 2022 - Jan 2023",
      description:
        "Provided expert frontend development consultation for multiple clients across various industries. Implemented responsive design solutions using modern frameworks and optimized web performance for enhanced user experience. Conducted code reviews and offered technical recommendations to improve development workflows and maintainability.",
      skills: ["React", "Vue.js", "Performance Optimization", "UI/UX", "Responsive Design"],
      accentColor: "#4682B4", // Steel Blue for Freelance
      bgGradient: "from-blue-900 to-indigo-900",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
      transition: { duration: 0.3 },
    },
    active: {
      scale: 1.05,
      boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.4, transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } },
  };

  // Handle ESC key to go back
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCurrentPage("home");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCurrentPage]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      <GoBackButton setCurrentPage={setCurrentPage} />
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-black pointer-events-none"></div>

      {/* Main Content */}
      <motion.div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto flex flex-col gap-12 z-10 relative pt-8 pb-16 px-4 sm:px-6 md:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
   
        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          variants={titleVariants}
          whileHover={{ scale: 1.05, textShadow: "0px 0px 30px rgba(255, 255, 255, 0.8)" }}
        >
          Professional Experience
          <motion.div
            className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            My career development and technical expertise
          </motion.div>
        </motion.h1>

        {/* Experience Cards */}
        <div className="flex flex-col gap-8">
          {experiences.map((exp) => {
            const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
            const isActive = activeExp === exp.id;

            return (
              <motion.div
                key={exp.id}
                ref={ref}
                className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${exp.bgGradient} border-2`}
                style={{ borderColor: isActive ? exp.accentColor : "transparent" }}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveExp(isActive ? null : exp.id)}
              >
                {/* Subtle Glow Effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 opacity-0 blur-xl"
                    style={{ background: exp.accentColor }}
                    variants={glowVariants}
                    initial="hidden"
                    animate="visible"
                  />
                )}

                <div className="p-6 sm:p-8 text-white relative z-10">
                  {/* Title with Clear Contrast */}
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
                    style={{ color: exp.accentColor }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {exp.title}
                  </motion.h2>

                  {/* Company & Period */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 tracking-wider">
                    {exp.company} | <span className="text-gray-400">{exp.period}</span>
                  </p>

                  {/* Description */}
                  <motion.p
                    className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={
                      isActive
                        ? { opacity: 1, height: "auto" }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    {exp.description}
                  </motion.p>

                  {/* Skills */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {exp.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-1 bg-white/10 rounded-full text-sm font-semibold border"
                        style={{ borderColor: exp.accentColor, color: exp.accentColor }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-gray-400 text-sm sm:text-base mt-8 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Press <span className="text-cyan-400 font-semibold">ESC</span> to return to home page
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Experience;