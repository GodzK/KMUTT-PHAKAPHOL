import React from "react";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion";

function Contact({ setCurrentPage }) {
  const socialLinks = [
    {
      id: "ig",
      name: "Instagram",
      link: "https://www.instagram.com/pk._tcsk/",
      text: "IG: pk.tcsk",
      color: "#E1306C",
      gradient: "linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
    },
    {
      id: "fb",
      name: "Facebook",
      link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
      text: "FB: Pk Phakaphol Tcsk",
      color: "#4267B2",
      gradient: "linear-gradient(135deg, #3B5998, #4267B2)",
    },
    {
      id: "gh",
      name: "Github",
      link: "https://github.com/GodzK",
      text: "Github Profile",
      color: "#181717",
      gradient: "linear-gradient(135deg, #181717, #333333)",
    },
    {
      id: "bd",
      name: "Borntodev",
      link: "https://www.borntodev.com/author/godzk25gmail-com/",
      text: "Borntodev Devinit#2",
      color: "#FF5722",
      gradient: "linear-gradient(135deg, #FF5722, #FF9800)",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="contact-content min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col py-6 px-4 sm:px-6 md:px-8">
      <motion.div
        className="content w-full max-w-4xl mx-auto flex flex-col flex-grow"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-start mb-4">
          <GoBackButton setCurrentPage={setCurrentPage} />
        </div>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Contact me
        </motion.h1>
        <div className="card-container grid grid-cols-2 gap-4 sm:gap-6 flex-grow">
          {socialLinks.map((social) => (
            <motion.div
              key={social.id}
              className="card rounded-xl shadow-lg overflow-hidden"
              style={{ background: social.gradient }}
              variants={cardVariants}
              whileHover="hover"
            >
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <div className="card-text p-4 sm:p-6 text-center flex flex-col justify-center h-full">
                  <div className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                    {social.name}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base mt-2 text-gray-100">
                    {social.text}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center mt-6 sm:mt-8 text-gray-400 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Press <span className="text-cyan-400 font-semibold">ESC</span> to return to the menu.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Contact;