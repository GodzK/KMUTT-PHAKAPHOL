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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        className="w-full max-w-3xl flex flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Go Back Button */}
        <div className="flex justify-start ">
          <GoBackButton setCurrentPage={setCurrentPage} />
        </div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Hi, I'm Phakaphol Dherachaisuphakij!
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-200 text-base sm:text-lg md:text-xl text-center leading-relaxed"
          variants={itemVariants}
        >
          A passionate <strong className="text-cyan-400">developer</strong>,{" "}
          <strong className="text-purple-400">blogger</strong>, and{" "}
          <strong className="text-pink-400">dreamer</strong>. I love building
          web projects that blend creativity and technology. JavaScript is my
          main language, and I’m obsessed with Front-End development while
          diving into Back-End—super excited!
        </motion.p>

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
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-xl shadow-lg border-4 border-cyan-500"
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
    </div>
  );
}

export default About;