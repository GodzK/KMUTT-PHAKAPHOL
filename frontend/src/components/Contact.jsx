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
    },
    {
      id: "fb",
      name: "Facebook",
      link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
      text: "FB: Pk Phakaphol Tcsk",
    },
    {
      id: "gh",
      name: "Github",
      link: "https://github.com/GodzK",
      text: "Github Profile",
    },
    {
      id: "bd",
      name: "Borntodev",
      link: "https://www.borntodev.com/author/godzk25gmail-com/",
      text: "Borntodev Devinit#2",
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
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        className="w-full max-w-4xl flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Go Back Button */}
        <div className="flex justify-start">
          <GoBackButton setCurrentPage={setCurrentPage} />
        </div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Get in Touch
        </motion.h1>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socialLinks.map((social) => (
            <motion.div
              key={social.id}
              className={`rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${
                social.id === "ig"
                  ? "from-pink-500 via-purple-600 to-red-500"
                  : social.id === "fb"
                  ? "from-blue-600 to-blue-400"
                  : social.id === "gh"
                  ? "from-gray-800 to-gray-600"
                  : "from-orange-500 to-yellow-500"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 text-center text-white hover:bg-opacity-90 transition-colors duration-300"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {social.name}
                </h2>
                <p className="mt-2 text-sm sm:text-base md:text-lg opacity-90">
                  {social.text}
                </p>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.p
          className="text-center text-gray-300 text-sm sm:text-base mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Press <span className="text-cyan-400 font-semibold">ESC</span> to
          return to the menu.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Contact;