import React, { useState, useEffect, useRef } from "react";
import GoBackButton from "./GoBackButton";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer"; // เพิ่มการตรวจจับเมื่ออยู่ในมุมมอง
import "./activity.css"
function Skill({ setCurrentPage }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);

  const skills = [
    { name: "JavaScript", category: "Frontend", level: "Expert", color: "#F7DF1E", icon: "💻" },
    { name: "TypeScript", category: "Frontend", level: "Advanced", color: "#3178C6", icon: "📘" },
    { name: "HTML5", category: "Frontend", level: "Expert", color: "#E34F26", icon: "🌐" },
    { name: "CSS3", category: "Frontend", level: "Expert", color: "#1572B6", icon: "🎨" },
    { name: "React.js ⚛️", category: "Frontend Framework", level: "Expert", color: "#61DAFB", icon: "⚛️" },
    { name: "Next.js ⚡", category: "Frontend Framework", level: "Expert", color: "#000000", icon: "⚡" },
    { name: "Vue.js", category: "Frontend Framework", level: "Advanced", color: "#4FC08D", icon: "🌿" },
    { name: "Angular 🅰️", category: "Frontend Framework", level: "Intermediate", color: "#DD0031", icon: "🅰️" },
    { name: "Tailwind CSS", category: "CSS Framework", level: "Expert", color: "#38B2AC", icon: "🎨" },
    { name: "Sass/SCSS", category: "CSS Preprocessor", level: "Advanced", color: "#CC6699", icon: "💅" },
    { name: "GSAP", category: "Animation", level: "Expert", color: "#88D8B0", icon: "🎬" },
    { name: "Lottie", category: "Animation", level: "Advanced", color: "#FFA500", icon: "🎞️" },
    { name: "Anime.js", category: "Animation", level: "Advanced", color: "#BB2B2B", icon: "🖼️" },
    { name: "Framer Motion", category: "Animation", level: "Advanced", color: "#F7F7F7", icon: "🎥" },
    { name: "Three.js", category: "Animation", level: "Advanced", color: "#000000", icon: "🧊" },
    { name: "Bootstrap", category: "CSS Framework", level: "Expert", color: "#563D7C", icon: "🧩" },
    { name: "Ant Design", category: "CSS Framework", level: "Basic", color: "#FF0000", icon: "🖌️" },
    { name: "Flexbox", category: "CSS Layout", level: "Expert", color: "#0288D1", icon: "📏" },
    { name: "Foundation", category: "CSS Framework", level: "Advanced", color: "#F5F5F5", icon: "🏛️" },
    { name: "Bulma", category: "CSS Framework", level: "Basic", color: "#00D1B2", icon: "🛠️" },
    { name: "Node.js 🟢", category: "Backend", level: "Expert", color: "#339933", icon: "🖥️" },
    { name: "Python", category: "Backend", level: "Expert", color: "#3776AB", icon: "🐍" },
    { name: "Java ☕", category: "Backend", level: "Advanced", color: "#007396", icon: "☕" },
    { name: "Go", category: "Backend", level: "Basic", color: "#00ADD8", icon: "🐹" },
    { name: "Express.js", category: "Backend Framework", level: "Expert", color: "#000000", icon: "🚀" },
    { name: "Django", category: "Backend Framework", level: "Advanced", color: "#092E20", icon: "🌍" },
    { name: "Spring Boot", category: "Backend Framework", level: "Advanced", color: "#6DB33F", icon: "🌱" },
    { name: "MongoDB", category: "Database", level: "Advanced", color: "#47A248", icon: "🍃" },
    { name: "PostgreSQL", category: "Database", level: "Advanced", color: "#336791", icon: "🐘" },
    { name: "MySQL", category: "Database", level: "Advanced", color: "#4479A1", icon: "🐬" },
    { name: "GraphQL", category: "API", level: "Basic", color: "#E10098", icon: "🔗" },
    { name: "Firebase", category: "Database", level: "Intermediate", color: "#FFCA28", icon: "🔥" },
    { name: "Docker", category: "DevOps", level: "Basic", color: "#2496ED", icon: "🐳" },
    { name: "GitHub", category: "DevOps", level: "Expert", color: "#000000", icon: "🐙" },
    { name: "Kubernetes ☸️", category: "DevOps", level: "Basic", color: "#326CE5", icon: "☸️" },
    { name: "AWS ☁️", category: "Cloud", level: "Basic", color: "#FF9900", icon: "☁️" },
    { name: "Azure ☁️", category: "Cloud", level: "Basic", color: "#4285F4", icon: "☁️" },
  ];

  const categories = [...new Set(skills.map((skill) => skill.category))];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: {
      scale: 1.1,
      rotate: 3,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8, transition: { duration: 1, repeat: Infinity, repeatType: "reverse" } },
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
    <div
      ref={containerRef}
      className="skill-content relative px-6 py-10 min-h-screen text-white overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #1a1a3d 0%, #0d0d24 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Cosmic Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* Go Back Button */}
      <motion.div
        className="self-start sticky top-4 z-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GoBackButton setCurrentPage={setCurrentPage} />
      </motion.div>

      {/* Title Section */}
      <motion.h1
        className="skill-title text-5xl sm:text-7xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        My Tech Universe
        <motion.div
          className="text-sm sm:text-lg text-gray-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Explore the skills that power my creations
        </motion.div>
      </motion.h1>

      {/* Categories and Skills */}
      <motion.div
        className="skill-categories max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => {
          const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

          return (
            <motion.div
              key={category}
              ref={ref}
              className="skill-category mb-16"
              variants={categoryVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* Category Title */}
              <motion.h2
                className="category-title text-3xl sm:text-4xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.h2>

              {/* Skill Cards */}
              <div className="skill-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => {
                    const isHovered = hoveredSkill === skill.name;
                    const textColor =
                      skill.color === "#000000" || skill.color === "#000"
                        ? "#ffffff"
                        : skill.color;

                    return (
                      <motion.div
                        key={skill.name}
                        className="skill-card relative rounded-xl overflow-hidden cursor-pointer"
                        style={{
                          background: `linear-gradient(145deg, ${skill.color}, #1a1a3d)`,
                          border: `2px solid ${skill.color}40`,
                        }}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                      >
                        {/* Glow Effect */}
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 bg-white opacity-20 blur-lg"
                            variants={glowVariants}
                            initial="hidden"
                            animate="visible"
                          />
                        )}

                        <div className="skill-card-content p-6 text-center relative z-10">
                          {/* Skill Icon */}
                          <motion.div
                            className="text-4xl mb-4"
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {skill.icon}
                          </motion.div>

                          {/* Skill Name */}
                          <div
                            className="skill-name text-lg font-bold"
                            style={{ color: textColor }}
                          >
                            {skill.name}
                          </div>

                          {/* Skill Level */}
                          <motion.div
                            className={`skill-level text-sm mt-3 px-3 py-1 rounded-full inline-block font-semibold ${
                              skill.level === "Expert"
                                ? "bg-green-500"
                                : skill.level === "Advanced"
                                ? "bg-blue-500"
                                : skill.level === "Intermediate"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            } text-white`}
                            animate={{ scale: isHovered ? 1.2 : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {skill.level}
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.p
        className="skill-footer text-center mt-16 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Press <span className="text-cyan-400 font-semibold">ESC</span> to return to the menu
      </motion.p>
    </div>
  );
}

export default Skill;