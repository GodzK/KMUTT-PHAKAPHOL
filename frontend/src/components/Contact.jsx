import React, { useState, useEffect, useRef } from "react";
import GoBackButton from "./GoBackButton";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer"; // เพิ่มเพื่อตรวจจับเมื่ออยู่ในมุมมอง

function Contact({ setCurrentPage }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

  const socialLinks = [
    {
      id: "ig",
      name: "Instagram",
      link: "https://www.instagram.com/pk._tcsk/",
      text: "IG: pk.tcsk",
      icon: "📸",
      gradient: "from-pink-500 via-purple-600 to-red-500",
    },
    {
      id: "fb",
      name: "Facebook",
      link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
      text: "FB: Pk Phakaphol Tcsk",
      icon: "📘",
      gradient: "from-blue-600 via-blue-500 to-blue-400",
    },
    {
      id: "gh",
      name: "Github",
      link: "https://github.com/GodzK",
      text: "Github Profile",
      icon: "🐙",
      gradient: "from-gray-800 via-gray-700 to-gray-600",
    },
    {
      id: "bd",
      name: "Borntodev",
      link: "https://www.borntodev.com/author/godzk25gmail-com/",
      text: "Borntodev Devinit#2",
      icon: "💻",
      gradient: "from-orange-500 via-yellow-600 to-yellow-500",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      rotate: 3,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7, transition: { duration: 1, repeat: Infinity, repeatType: "reverse" } },
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
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >  <GoBackButton setCurrentPage={setCurrentPage} />
      {/* Cosmic Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-5xl flex flex-col gap-8 z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
      

        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg"
          variants={titleVariants}
          whileHover={{ scale: 1.05 }}
        >
          Let's Connect
          <motion.div
            className="text-sm sm:text-lg text-gray-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Reach out to me across the digital universe
          </motion.div>
        </motion.h1>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socialLinks.map((social) => {
            const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
            const isHovered = hoveredCard === social.id;

            return (
              <motion.div
                key={social.id}
                ref={ref}
                className={`rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${social.gradient} relative`}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredCard(social.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Glow Effect on Hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 bg-white opacity-20 blur-lg"
                    variants={glowVariants}
                    initial="hidden"
                    animate="visible"
                  />
                )}

                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 text-center text-white hover:bg-opacity-90 transition-colors duration-300 relative z-10"
                >
                  {/* Icon */}
                  <motion.div
                    className="text-4xl sm:text-5xl mb-4"
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {social.icon}
                  </motion.div>

                  {/* Name */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{social.name}</h2>

                  {/* Text */}
                  <motion.p
                    className="mt-3 text-sm sm:text-base md:text-lg opacity-90"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {social.text}
                  </motion.p>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Text */}
        <motion.p
          className="text-center text-gray-300 text-sm sm:text-base mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Press <span className="text-cyan-400 font-semibold">ESC</span> to return to the menu
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Contact;