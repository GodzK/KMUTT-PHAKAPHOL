import React, { useState, useEffect, useRef } from "react";
import { ActivityData, projectdata } from "../../Backend/Data";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion";

function Project({ setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0);

  const isProjectData = projectdata.length > 0;
  const items = isProjectData
    ? projectdata
    : ActivityData[currentSemesterIndex]?.Activity1 || [];
  const itemRefs = useRef([]);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleKeyDown = (event) => {
    if (isModalOpen) {
      if (event.key === "Backspace") closeModal();
    } else {
      if (event.key === "ArrowDown") {
        const newIndex = (selectedIndex + 1) % items.length;
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (event.key === "ArrowUp") {
        const newIndex = (selectedIndex - 1 + items.length) % items.length;
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (event.key === "ArrowRight") {
        const newSemesterIndex = (currentSemesterIndex + 1) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedIndex(0);
      } else if (event.key === "ArrowLeft") {
        const newSemesterIndex =
          (currentSemesterIndex - 1 + ActivityData.length) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedIndex(0);
      } else if (event.key === "Enter") {
        openModal(items[selectedIndex]);
      }
    }
  };

  const scrollToItem = (index) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedIndex, currentSemesterIndex, items]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    selected: { scale: 1.05, borderColor: "#ef4444" },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        className="w-full max-w-3xl flex flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Go Back Button */}
        <div className="self-start">
          <GoBackButton setCurrentPage={setCurrentPage} />
        </div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          {isProjectData ? "Projects" : "Activities"}
        </motion.h1>

        {/* Items */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 mx-auto">
          {items.map((item, idx) => (
            <motion.section
              key={idx}
              className={`bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-lg cursor-pointer hover:bg-opacity-20 ${
                selectedIndex === idx ? "border-red-500" : ""
              }`}
              variants={itemVariants}
              whileHover="hover"
              animate={selectedIndex === idx ? "selected" : "visible"}
              ref={(el) => (itemRefs.current[idx] = el)}
              onClick={() => {
                setSelectedIndex(idx);
                openModal(item);
              }}
            >
              <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                {isProjectData ? item.projectname : item.activityTitle}
              </h1>
              <div className="mt-4 flex justify-center">
                <img
                  src={isProjectData ? item.picture : item.image}
                  alt={isProjectData ? item.projectname : item.activityTitle}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <p className="mt-4 text-gray-300 text-lg sm:text-xl">
                {isProjectData ? item.experience : item.description}
              </p>
              <button
                className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                onClick={() => openModal(item)}
              >
                {isProjectData
                  ? item.link
                    ? "Visit Project"
                    : "Learn More"
                  : "Watch More"}
              </button>
            </motion.section>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            variants={modalVariants}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl p-6 max-w-lg w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xl font-semibold text-gray-800">
                {modalContent?.projectname || modalContent?.activityTitle}
              </p>
              <h2 className="mt-2 text-lg text-gray-600">
                {modalContent?.experience || modalContent?.description}
              </h2>
              <div className="mt-4">
                <img
                  src={modalContent?.picture || modalContent?.image}
                  alt={modalContent?.projectname || modalContent?.activityTitle}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <button
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                onClick={closeModal}
              >
                Close (Backspace)
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Project;