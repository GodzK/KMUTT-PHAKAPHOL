import React, { useState, useEffect, useRef } from "react";
import { ActivityData } from "../../Backend/Data";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion";

function Activity({ setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0);
  const [autoSlideIndex, setAutoSlideIndex] = useState(0);

  const activities = ActivityData[currentSemesterIndex]?.Activity1 || [];
  const activityRefs = useRef([]);
  const modalIntervalRef = useRef(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    clearInterval(modalIntervalRef.current);
  };

  const handleKeyDown = (event) => {
    if (isModalOpen) {
      if (event.key === "Backspace") closeModal();
    } else {
      if (event.key === "ArrowDown") {
        const newIndex = (selectedActivityIndex + 1) % activities.length;
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex);
      } else if (event.key === "ArrowUp") {
        const newIndex =
          (selectedActivityIndex - 1 + activities.length) % activities.length;
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex);
      } else if (event.key === "ArrowRight") {
        const newSemesterIndex = (currentSemesterIndex + 1) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedActivityIndex(0);
      } else if (event.key === "ArrowLeft") {
        const newSemesterIndex =
          (currentSemesterIndex - 1 + ActivityData.length) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedActivityIndex(0);
      } else if (event.key === "Enter") {
        openModal(activities[selectedActivityIndex]);
      }
    }
  };

  const scrollToActivity = (index) => {
    if (activityRefs.current[index]) {
      activityRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const autoSlide = () => {
    if (modalContent?.activitypic?.length > 0) {
      setAutoSlideIndex((prevIndex) => (prevIndex + 1) % modalContent.activitypic.length);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedActivityIndex, currentSemesterIndex, activities]);

  useEffect(() => {
    if (isModalOpen && modalContent?.activitypic?.length > 0) {
      modalIntervalRef.current = setInterval(autoSlide, 3000);
    }
    return () => clearInterval(modalIntervalRef.current);
  }, [isModalOpen, modalContent]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02 },
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

        {/* Header */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          {ActivityData[currentSemesterIndex]?.Semester}
          <span className="block text-xl sm:text-2xl text-gray-400 mt-2">
            ({currentSemesterIndex + 1} of {ActivityData.length})
          </span>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            Press <kbd className="bg-gray-700 px-2 py-1 rounded">Enter</kbd> to see details
          </p>
          <p className="text-sm sm:text-base text-gray-300 mt-1 flex justify-center gap-2">
            <kbd className="bg-gray-700 px-2 py-1 rounded">←</kbd>
            <kbd className="bg-gray-700 px-2 py-1 rounded">→</kbd> to switch semesters
          </p>
        </motion.h1>

        {/* Activities */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 mx-auto">
          {activities.map((activity, idx) => (
            <motion.div
              key={idx}
              className={`bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-lg cursor-pointer hover:bg-opacity-20 ${
                selectedActivityIndex === idx ? "border-red-500" : ""
              }`}
              variants={itemVariants}
              whileHover="hover"
              animate={selectedActivityIndex === idx ? "selected" : "visible"}
              ref={(el) => (activityRefs.current[idx] = el)}
              onClick={() => {
                setSelectedActivityIndex(idx);
                openModal(activity);
              }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {activity.activityTitle}
              </h3>
              <p className="mt-2 text-gray-300 text-base sm:text-lg">
                {activity.description}
              </p>
              <div className="mt-4 flex justify-center">
                <img
                  src={activity.image}
                  alt={activity.activityTitle}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  onClick={() => openModal(activity)}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Hint (Bottom) */}
        <motion.p
          className="text-sm sm:text-base text-gray-300 flex justify-center gap-2"
          variants={itemVariants}
        >
          <kbd className="bg-gray-700 px-2 py-1 rounded">←</kbd>
          <kbd className="bg-gray-700 px-2 py-1 rounded">→</kbd> to switch semesters
        </motion.p>

        {/* Modal */}
        {isModalOpen && modalContent && (
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
                {modalContent.activityTitle}
              </p>
              <h2 className="mt-2 text-lg text-gray-600">
                {modalContent.description}
              </h2>
              <div className="mt-4">
                {modalContent.activitypic?.length > 0 && (
                  <img
                    src={modalContent.activitypic[autoSlideIndex]}
                    alt={modalContent.activityTitle}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                )}
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

export default Activity;