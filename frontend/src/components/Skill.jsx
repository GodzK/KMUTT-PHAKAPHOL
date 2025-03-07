import React from "react";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion"; // Adding Framer Motion for animations

function Skill({ setCurrentPage }) {
  const skills = [
    { name: "JavaScript", category: "Frontend", level: "Expert", color: "#F7DF1E" },
    { name: "TypeScript", category: "Frontend", level: "Advanced", color: "#3178C6" },
    { name: "HTML5", category: "Frontend", level: "Expert", color: "#E34F26" },
    { name: "CSS3", category: "Frontend", level: "Expert", color: "#1572B6" },
    { name: "React.js ⚛️", category: "Frontend Framework", level: "Expert", color: "#61DAFB" },
    { name: "Next.js ⚡", category: "Frontend Framework", level: "Expert", color: "#000000" },
    { name: "Vue.js", category: "Frontend Framework", level: "Advanced", color: "#4FC08D" },
    { name: "Angular 🅰️", category: "Frontend Framework", level: "Intermediate", color: "#DD0031" },
    { name: "Tailwind CSS", category: "CSS Framework", level: "Expert", color: "#38B2AC" },
    { name: "Sass/SCSS", category: "CSS Preprocessor", level: "Advanced", color: "#C69" },
    { name: "GSAP", category: "Animation", level: "Expert", color: "#88D8B0" },
    { name: "Lottie", category: "Animation", level: "Advanced", color: "#FFA500" },
    { name: "Anime.js", category: "Animation", level: "Advanced", color: "#BB2B2B" },
    { name: "Framer Motion", category: "Animation", level: "Advanced", color: "#F7F7F7" },
    { name: "Three.js", category: "Animation", level: "Advanced", color: "#000000" },
   
    { name: "Bootstrap", category: "CSS Framework", level: "Expert", color: "#563D7C" },
    { name: "Ant Design", category: "CSS Framework", level: "Basic", color: "red" },
    { name: "Flexbox", category: "CSS Framework", level: "Expert", color: "#0288D1" },
    { name: "Bootstrap", category: "CSS Framework", level: "Expert", color: "#563D7C" },
    { name: "Foundation", category: "CSS Framework", level: "Advanced", color: "#F5F5F5" },
    { name: "Bulma", category: "CSS Framework", level: "Basic", color: "#00D1B2" },
    { name: "Node.js 🟢", category: "Backend", level: "Expert", color: "#339933" },
    { name: "Python", category: "Backend", level: "Expert", color: "#3776AB" },
    { name: "Java ☕", category: "Backend", level: "Advanced", color: "#007396" },
    { name: "Go", category: "Backend", level: "Basic", color: "#00ADD8" },
    { name: "Express.js", category: "Backend Framework", level: "Expert", color: "#000000" },
    { name: "Django", category: "Backend Framework", level: "Advanced", color: "#092E20" },
    { name: "Spring Boot", category: "Backend Framework", level: "Advanced", color: "#6DB33F" },
    { name: "MongoDB", category: "Database", level: "Advanced", color: "#47A248" },
    { name: "PostgreSQL", category: "Database", level: "Advanced", color: "#336791" },
    { name: "MySQL", category: "Database", level: "Advanced", color: "#4479A1" },
    { name: "GraphQL", category: "Database", level: "Basic", color: "#E10098" },
    { name: "Firebase", category: "Database", level: "Intermediate", color: "#FFCA28" },
    { name: "Docker", category: "DevOps", level: "Basic", color: "#2496ED" },
    { name: "Github", category: "DevOps", level: "Expert", color: "#0000" },
    { name: "Kubernetes ☸️", category: "DevOps", level: "Basic", color: "#326CE5" },
    { name: "AWS ☁️", category: "Cloud", level: "Basic", color: "#FF9900" },
    { name: "AZURE ☁️", category: "Cloud", level: "Basic", color: "#4285F4" },
  ];

  const categories = [...new Set(skills.map((skill) => skill.category))];

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } },
  };

  return (
    <div className="skill-content px-6 py-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-black min-h-screen text-white">
      <GoBackButton setCurrentPage={setCurrentPage} />
      <h1 className="skill-title text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        My Tech Universe
      </h1>
      <div className="skill-categories max-w-6xl mx-auto">
        {categories.map((category) => (
          <motion.div
            key={category}
            className="skill-category mb-12"
            initial="hidden"
            animate="visible"
            variants={categoryVariants}
          >
            <h2 className="category-title text-3xl font-semibold mb-6 border-b-2 border-cyan-500 inline-block pb-2">
              {category}
            </h2>
            <div className="skill-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card rounded-xl shadow-lg overflow-hidden cursor-pointer"
                    style={{ backgroundColor: skill.color }}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <div className="skill-card-content p-4 text-center">
                      <div
                        className={`skill-name text-lg font-bold ${
                          skill.color === "#000000" || skill.color === "#000"
                            ? "text-gray-black"
                            : "text-white"
                        }`}
                      >
                        {skill.name}
                      </div>
                      <div
                        className={`skill-level text-sm mt-2 px-2 py-1 rounded-full inline-block ${
                          skill.level === "Expert"
                            ? "bg-green-500"
                            : skill.level === "Advanced"
                            ? "bg-blue-500"
                            : skill.level === "Intermediate"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } text-white`}
                      >
                        {skill.level}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="skill-footer text-center mt-10 text-gray-400">
        Press <span className="text-cyan-400 font-semibold">ESC</span> to return to the menu.
      </p>
    </div>
  );
}

export default Skill;