import React, { useState, useEffect, useRef } from "react";
import { ActivityData } from "../../Backend/Data";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion";

function Activity({ setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [autoSlideIndex, setAutoSlideIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  const activityRefs = useRef([]);
  const modalIntervalRef = useRef(null);
  const containerRef = useRef(null);

  const openModal = (content, index) => {
    setModalContent(content);
    setIsModalOpen(true);
    setAutoSlideIndex(0);
    setSelectedActivityIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    clearInterval(modalIntervalRef.current);
  };

  // ปรับ handleKeyDown ให้รองรับเฉพาะการเลื่อนใน Modal และการเลือก Activity
  const handleKeyDown = (event) => {
    if (isModalOpen) {
      if (event.key === "Backspace") closeModal();
      if (event.key === "ArrowDown" && modalContent?.activitypic?.length > 0) {
        setAutoSlideIndex((prev) =>
          prev === modalContent.activitypic.length - 1 ? 0 : prev + 1
        );
      }
      if (event.key === "ArrowUp" && modalContent?.activitypic?.length > 0) {
        setAutoSlideIndex((prev) =>
          prev === 0 ? modalContent.activitypic.length - 1 : prev - 1
        );
      }
    } else {
      const allActivities = ActivityData.flatMap((semester) => semester.Activity1 || []);
      if (event.key === "ArrowDown") {
        const newIndex = Math.min(selectedActivityIndex + 1, allActivities.length - 1);
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex);
      } else if (event.key === "ArrowUp") {
        const newIndex = Math.max(selectedActivityIndex - 1, 0);
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex);
      } else if (event.key === "Enter") {
        const flatIndex = allActivities[selectedActivityIndex];
        openModal(flatIndex, selectedActivityIndex);
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

  // จัดการ Mouse Wheel
  const handleWheel = (event) => {
    if (isModalOpen) return;

    const delta = event.deltaY;
    const allActivities = ActivityData.flatMap((semester) => semester.Activity1 || []);
    if (delta > 0) {
      const newIndex = Math.min(selectedActivityIndex + 1, allActivities.length - 1);
      setSelectedActivityIndex(newIndex);
      scrollToActivity(newIndex);
    } else if (delta < 0) {
      const newIndex = Math.max(selectedActivityIndex - 1, 0);
      setSelectedActivityIndex(newIndex);
      scrollToActivity(newIndex);
    }
  };

  // Infinite Scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setVisibleItems((prev) => prev + 5);
    }
  };

  const autoSlide = () => {
    if (modalContent?.activitypic?.length > 0) {
      setAutoSlideIndex((prevIndex) => (prevIndex + 1) % modalContent.activitypic.length);
    }
  };

  // Touch Gestures สำหรับ Mobile
  const [touchStartY, setTouchStartY] = useState(null);
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStartY) return;
    const touchEndY = e.touches[0].clientY;
    const diffY = touchStartY - touchEndY;

    const allActivities = ActivityData.flatMap((semester) => semester.Activity1 || []);
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        // Swipe up (เลื่อนลง)
        const newIndex = Math.min(selectedActivityIndex + 1, allActivities.length - 1);
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex);
      } else if (diffY < 0) {
        // Swipe down (เลื่อนขึ้น)
        const newIndex = Math.max(selectedActivityIndex - 1, 0);
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex);
      }
      setTouchStartY(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isModalOpen, selectedActivityIndex]);

  useEffect(() => {
    if (isModalOpen && modalContent?.activitypic?.length > 0) {
      modalIntervalRef.current = setInterval(autoSlide, 3000);
    }
    return () => clearInterval(modalIntervalRef.current);
  }, [isModalOpen, modalContent, autoSlideIndex]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.03, rotate: 1, transition: { duration: 0.3 } },
    selected: { scale: 1.05, borderColor: "#ff6b6b", boxShadow: "0 0 20px rgba(255, 107, 107, 0.5)" },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  // สร้างลิสต์ของทุก Activity แบบแบนราบและคำนวณดัชนี
  const flatActivities = ActivityData.flatMap((semester) => semester.Activity1 || []);
  let globalIndex = 0;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-black text-white overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        fontFamily: "'Inter', sans-serif",
        scrollBehavior: "smooth",
        touchAction: "pan-y",
      }}
    >
      <motion.div
  className="fixed top-4 left-4 z-50" // ใช้ fixed เพื่อให้ติดมุมขวาบนตลอด
  initial={{ opacity: 0, x: 50 }} // เริ่มต้นจากนอกจอด้านขวา
  animate={{ opacity: 1, x: 0 }} // เลื่อนเข้ามาด้วยความนุ่มนวล
  transition={{ duration: 0.5, ease: "easeOut" }} // อนิเมชันลื่นไหล
  whileHover={{ scale: 1.1 }} // ขยายเล็กน้อยเมื่อ hover
>
  <GoBackButton setCurrentPage={setCurrentPage} />
</motion.div>
      <motion.div
        className="w-full max-w-2xl mx-auto flex flex-col gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* แสดงทุก Semester และ Activities โดยแบ่งด้วย Heading */}
        {ActivityData.map((semester, semesterIndex) => {
          const activities = semester.Activity1 || [];
          if (activities.length === 0) return null;

          return (
            <div key={semesterIndex} className="flex flex-col gap-10">
              {/* Heading สำหรับแต่ละ Semester */}
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg sticky top-16 z-10"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {semester.Semester}
                <p className="text-sm sm:text-base text-gray-300 mt-2 pb-10">
                  Scroll or swipe to navigate
                </p>
              </motion.h1>

              {/* Activities ของ Semester นั้น ๆ */}
              <div className="flex flex-col gap-10 w-full mx-auto">
                {activities.slice(0, visibleItems).map((activity, idx) => {
                  const currentGlobalIndex = globalIndex;
                  globalIndex++;

                  return (
                    <motion.div
                      key={currentGlobalIndex}
                      className={`relative bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-pink-500/50 ${
                        selectedActivityIndex === currentGlobalIndex
                          ? "border-pink-500 shadow-pink-500/50"
                          : ""
                      }`}
                      variants={itemVariants}
                      whileHover="hover"
                      animate={
                        selectedActivityIndex === currentGlobalIndex
                          ? "selected"
                          : "visible"
                      }
                      ref={(el) => (activityRefs.current[currentGlobalIndex] = el)}
                      onClick={() => {
                        setSelectedActivityIndex(currentGlobalIndex);
                        openModal(activity, currentGlobalIndex);
                      }}
                    >
                      <h3 className="text-3xl font-semibold text-white mb-4 drop-shadow-md">
                        {activity.activityTitle}
                      </h3>
                      <div className="relative flex justify-center overflow-hidden rounded-xl">
                        <img
                          src={activity.image}
                          alt={activity.activityTitle}
                          className="w-full h-64 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                      </div>
                      <p className="mt-6 text-gray-300 text-lg leading-relaxed">
                        {activity.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </motion.div>

      {isModalOpen && modalContent && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-start justify-center z-50 p-4 overflow-y-auto"
          initial="hidden"
          animate="visible"
          variants={modalVariants}
          onClick={closeModal}
        >
          <motion.div
            className="relative bg-gradient-to-b from-white to-gray-100 bg-opacity-95 backdrop-blur-xl rounded-3xl p-10 max-w-2xl w-full mx-auto text-left my-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
              onClick={closeModal}
            >
              ✕
            </button>

            <p className="text-4xl font-bold text-gray-900 mb-8 drop-shadow-md">
              {modalContent.activityTitle}
            </p>

            <div className="text-lg text-gray-700 leading-relaxed mb-10">
              {modalContent.description}
            </div>

            {modalContent?.activitypic?.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 drop-shadow-sm">
                  Images
                </h3>
                <div className="relative overflow-hidden">
                  <div
                    className="flex flex-col transition-transform duration-500"
                    style={{
                      transform: `translateY(-${autoSlideIndex * 100}%)`,
                    }}
                  >
                    {modalContent.activitypic.map((pic, idx) => (
                      <div key={idx} className="min-h-[400px] w-full">
                        <img
                          src={pic}
                          alt={`Slide ${idx}`}
                          className="w-full h-96 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    ))}
                  </div>
                  {modalContent.activitypic.length > 1 && (
                    <>
                      <button
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 p-3 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
                        onClick={() =>
                          setAutoSlideIndex((prev) =>
                            prev === 0 ? modalContent.activitypic.length - 1 : prev - 1
                          )
                        }
                      >
                        <span className="text-white text-xl">↑</span>
                      </button>
                      <button
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
                        onClick={() =>
                          setAutoSlideIndex((prev) =>
                            prev === modalContent.activitypic.length - 1 ? 0 : prev + 1
                          )
                        }
                      >
                        <span className="text-white text-xl">↓</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Activity;