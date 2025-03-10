import React from "react";
import profile from "../assets/profile.jpg";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion";

function About({ setCurrentPage }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const zoomVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };


  const cvUrl = "/path/to/your-cv.pdf";

  return (
    <>
        <motion.div
  className="fixed top-4 left-4 z-50" // ใช้ fixed เพื่อให้ติดมุมขวาบนตลอด
  initial={{ opacity: 0, x: 50 }} // เริ่มต้นจากนอกจอด้านขวา
  animate={{ opacity: 1, x: 0 }} // เลื่อนเข้ามาด้วยความนุ่มนวล
  transition={{ duration: 0.5, ease: "easeOut" }} // อนิเมชันลื่นไหล
  whileHover={{ scale: 1.1 }} // ขยายเล็กน้อยเมื่อ hover
>
  <GoBackButton setCurrentPage={setCurrentPage} />
</motion.div>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        className="w-full max-w-3xl flex flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
    

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Hi, I'm Phakaphol Dherachaisuphakij!
        </motion.h1>

        {/* Description */}
        <motion.div
  className="relative text-center text-gray-200 max-w-3xl mx-auto"
  variants={itemVariants}
  initial="hidden"
  animate="visible"
  whileHover={{ scale: 1.02 }}
>
  {/* Background Glow Effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full -z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.5, scale: 1.1 }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
  />

  {/* Text Content */}
  <motion.p
    className="text-base sm:text-lg md:text-xl leading-relaxed relative z-10"
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
  >
    I am a passionate{" "}
    <motion.strong
      className="text-red-600 font-bold"
      whileHover={{ scale: 1.1, color: "#ff4040" }}
      transition={{ duration: 0.3 }}
    >
      full-stack developer
    </motion.strong>{" "}
    with a cosmic curiosity for crafting{" "}
    <span className="text-cyan-400 font-semibold">dynamic</span> and{" "}
    <span className="text-purple-400 font-semibold">interactive</span> web
    applications. My toolkit shines with{" "}
    <motion.span
      className="text-yellow-400 font-semibold"
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      React
    </motion.span>
    ,{" "}
    <motion.span
      className="text-black font-semibold"
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      Next.js
    </motion.span>
    ,{" "}
    <motion.span
      className="text-green-400 font-semibold"
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      Node.js
    </motion.span>
    , and{" "}
    <motion.span
      className="text-green-600 font-semibold"
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      MongoDB
    </motion.span>
    , fused with a flair for{" "}
    <span className="text-blue-400 font-semibold">AI integration</span> through
    projects powered by{" "}
    <motion.span
      className="text-orange-400 font-semibold"
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.3 }}
    >
      YOLO AI
    </motion.span>{" "}
    and{" "}
    <span className="text-indigo-400 font-semibold">IoT solutions</span>. I
    thrive on solving intricate challenges, enhancing{" "}
    <span className="text-pink-400 font-semibold">user experiences</span>, and
    orbiting around new technologies to expand my skill galaxy. Whether coding
    solo or collaborating in a constellation, I’m committed to launching{" "}
    <span className="text-teal-400 font-semibold">high-quality, scalable</span>{" "}
    solutions that leave a stellar impact.
  </motion.p>
</motion.div>

        {/* Quote */}
        <motion.p
          className="text-gray-300 text-sm sm:text-base md:text-lg text-center italic bg-gray-800 bg-opacity-50 p-4 rounded-lg"
          variants={itemVariants}
        >
          "Talent without working hard is nothing"
        </motion.p>

        {/* Profile Image */}
        <motion.div
          className="flex justify-center"
          variants={zoomVariants}
        >
          <img
            src={profile}
            alt="Phakaphol Dherachaisuphakij"
            className="w-40 h-40 sm:w-64 sm:h-64 md:w-40 md:h-40 object-cover rounded-xl shadow-lg border-4 border-cyan-500"
          />
        </motion.div>

        {/* Call to Action & CV Download */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          variants={itemVariants}
        >
          <p className="text-gray-200 text-sm sm:text-base">
            ✉️ Contact me on{" "}
            <a
              href="https://www.instagram.com/pk._tcsk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300"
            >
              IG DM
            </a>
          </p>
          <a
            href={cvUrl}
            download="Phakaphol_CV.pdf"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Download My CV
          </a>
        </motion.div>
      </motion.div>
    </div></>
  );
}

export default About;