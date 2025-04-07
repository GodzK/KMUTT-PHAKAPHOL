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
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
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
              I’m a 20-year-old{" "}
              <motion.strong
                className="text-red-600 font-bold"
                whileHover={{ scale: 1.1, color: "#ff4040" }}
                transition={{ duration: 0.3 }}
              >
                first-year university student
              </motion.strong>{" "}
              with a burning passion for{" "}
              <span className="text-cyan-400 font-semibold">IT and coding</span>. I kicked off my journey at Sarasas Pittaya School in the Science-Math program, and now I’m exploring the universe of tech as a full-stack enthusiast. My toolkit includes{" "}
              <motion.span
                className="text-yellow-400 font-semibold"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                React
              </motion.span>
              ,{" "}
              <span className="text-green-400 font-semibold">Python</span>,{" "}
              <span className="text-blue-400 font-semibold">MySQL</span>, and{" "}
              <span className="text-purple-400 font-semibold">PHP</span>, with a sprinkle of{" "}
              <motion.span
                className="text-orange-400 font-semibold"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                YOLO AI
              </motion.span>{" "}
              for cutting-edge projects. Right now, I’m building an{" "}
              <span className="text-teal-400 font-semibold">AI-powered web app</span> for my faculty using React and YOLO to detect objects—pretty exciting stuff! I love creating{" "}
              <span className="text-pink-400 font-semibold">dynamic solutions</span> and tackling challenges, whether it’s coding solo or collaborating with a team. When I’m not coding, you might catch me playing the{" "}
              <span className="text-indigo-400 font-semibold">double bass</span> (I won a gold medal in 2019!) or brushing up my English skills (2nd place in a spelling bee in 2023). I’m all about growth, creativity, and launching{" "}
              <span className="text-cyan-400 font-semibold">stellar projects</span>!
            </motion.p>
          </motion.div>

          {/* Quote */}
          <motion.p
            className="text-gray-300 text-sm sm:text-base md:text-lg text-center italic bg-gray-800 bg-opacity-50 p-4 rounded-lg"
            variants={itemVariants}
          >
            "Hard work beats talent when talent doesn’t work hard."
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
              ✉️ Contact me at{" "}
              <a
                href="mailto:godzk25@gmail.com"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300"
              >
                godzk25@gmail.com
              </a>{" "}
              or check out my{" "}
              <a
                href="https://github.com/Godzk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300"
              >
                GitHub
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
      </div>
    </>
  );
}

export default About;
