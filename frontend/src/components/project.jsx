import React, { useState, useEffect, useRef } from "react";
import { ActivityData, projectdata } from "../../Backend/Data";
import GoBackButton from "./GoBackButton";
import { motion } from "framer-motion";

function Project({ setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0);
  const [filter, setFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isProjectData = projectdata.length > 0;
  const items = isProjectData
    ? projectdata
    : ActivityData[currentSemesterIndex]?.Activity1 || [];
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    setCurrentSlide(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleKeyDown = (event) => {
    if (isModalOpen) {
      if (event.key === "Backspace") closeModal();
      if (event.key === "ArrowDown" && modalContent?.activitypic?.length > 0) {
        setCurrentSlide((prev) =>
          prev === modalContent.activitypic.length - 1 ? 0 : prev + 1
        );
      }
      if (event.key === "ArrowUp" && modalContent?.activitypic?.length > 0) {
        setCurrentSlide((prev) =>
          prev === 0 ? modalContent.activitypic.length - 1 : prev - 1
        );
      }
    } else {
      if (event.key === "ArrowDown") {
        const newIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (event.key === "ArrowUp") {
        const newIndex = Math.max(selectedIndex - 1, 0);
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (event.key === "ArrowRight" && !isProjectData) {
        const newSemesterIndex = (currentSemesterIndex + 1) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedIndex(0);
        setFilter(ActivityData[newSemesterIndex].Semester);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (event.key === "ArrowLeft" && !isProjectData) {
        const newSemesterIndex =
          (currentSemesterIndex - 1 + ActivityData.length) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedIndex(0);
        setFilter(ActivityData[newSemesterIndex].Semester);
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  // เพิ่มการจัดการ Mouse Wheel
  const handleWheel = (event) => {
    if (isModalOpen) return;

    const delta = event.deltaY;
    if (delta > 0) {
      // Scroll down
      const newIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
      setSelectedIndex(newIndex);
      scrollToItem(newIndex);
    } else if (delta < 0) {
      // Scroll up
      const newIndex = Math.max(selectedIndex - 1, 0);
      setSelectedIndex(newIndex);
      scrollToItem(newIndex);
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

  // Touch Gestures สำหรับ Mobile
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX || !touchStartY) return;
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0 && !isProjectData) {
        const newSemesterIndex = (currentSemesterIndex + 1) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedIndex(0);
        setFilter(ActivityData[newSemesterIndex].Semester);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (diffX < 0 && !isProjectData) {
        const newSemesterIndex =
          (currentSemesterIndex - 1 + ActivityData.length) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedIndex(0);
        setFilter(ActivityData[newSemesterIndex].Semester);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setTouchStartX(null);
      setTouchStartY(null);
    } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
      if (diffY > 0) {
        // Swipe up (เลื่อนลง)
        const newIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (diffY < 0) {
        // Swipe down (เลื่อนขึ้น)
        const newIndex = Math.max(selectedIndex - 1, 0);
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      }
      setTouchStartX(null);
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
  }, [isModalOpen, selectedIndex, currentSemesterIndex, items, currentSlide]);

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

  const filteredItems = items.filter((item) =>
    filter === "all" ? true : item.Semester === filter
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-black text-white p-4 sm:p-6 md:p-8 overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
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
        className="w-full max-w-3xl mx-auto flex flex-col gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg sticky top-16 z-10"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          {isProjectData ? "Projects" : "Activities"}
          <p className="text-sm sm:text-base text-gray-300 mt-2 pb-10">
            Scroll, swipe, or press <kbd className="bg-gray-700 px-2 py-1 rounded">↑↓</kbd> to navigate
          </p>
        </motion.h1>

        {!isProjectData && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => {
                const newSemesterIndex =
                  (currentSemesterIndex - 1 + ActivityData.length) % ActivityData.length;
                setCurrentSemesterIndex(newSemesterIndex);
                setSelectedIndex(0);
                setFilter(ActivityData[newSemesterIndex].Semester);
              }}
              className="p-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300"
            >
              <span className="text-white text-xl">←</span>
            </button>
            <select
              className="px-6 py-3 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white rounded-lg shadow-lg border border-gray-600 hover:bg-gray-700 transition-all duration-300"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                const newSemesterIndex = ActivityData.findIndex(
                  (semester) => semester.Semester === e.target.value
                );
                if (newSemesterIndex !== -1) {
                  setCurrentSemesterIndex(newSemesterIndex);
                  setSelectedIndex(0);
                }
              }}
            >
              <option value="all">All Semesters</option>
              {ActivityData.map((semester, idx) => (
                <option key={idx} value={semester.Semester}>
                  {semester.Semester}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                const newSemesterIndex = (currentSemesterIndex + 1) % ActivityData.length;
                setCurrentSemesterIndex(newSemesterIndex);
                setSelectedIndex(0);
                setFilter(ActivityData[newSemesterIndex].Semester);
              }}
              className="p-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300"
            >
              <span className="text-white text-xl">→</span>
            </button>
          </div>
        )}

        <div className="flex flex-col gap-10 w-full mx-auto">
          {filteredItems.slice(0, visibleItems).map((item, idx) => (
            <motion.section
              key={idx}
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-pink-500/50 ${
                selectedIndex === idx ? "border-pink-500 shadow-pink-500/50" : ""
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
              <h1 className="text-3xl font-semibold text-white mb-4 drop-shadow-md">
                {isProjectData ? item.projectname : item.activityTitle}
              </h1>
              <div className="relative flex justify-center overflow-hidden rounded-xl">
                <img
                  src={isProjectData ? item.picture : item.image}
                  alt={isProjectData ? item.projectname : item.activityTitle}
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
              </div>
              <p className="mt-6 text-gray-300 text-lg leading-relaxed">
                {isProjectData ? item.description : ""}
              </p>
              <button
                className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
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
      </motion.div>

      {isModalOpen && (
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
              {modalContent?.projectname || modalContent?.activityTitle}
            </p>

            <div className="text-lg text-gray-700 leading-relaxed mb-10">
              {modalContent?.experience || modalContent?.description}
            </div>

            {modalContent?.techStack && (
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 drop-shadow-sm">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {modalContent.techStack.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-sm text-gray-800 shadow-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 drop-shadow-sm">
                Images
              </h3>
              {modalContent?.activitypic?.length > 0 ? (
                <div className="relative">
                  <div className="overflow-hidden">
                    <div
                      className="flex flex-col transition-transform duration-500"
                      style={{
                        transform: `translateY(-${currentSlide * 100}%)`,
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
                  </div>
                  {modalContent.activitypic.length > 1 && (
                    <>
                      <button
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 p-3 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === 0 ? modalContent.activitypic.length - 1 : prev - 1
                          )
                        }
                      >
                        <span className="text-white text-xl">↑</span>
                      </button>
                      <button
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === modalContent.activitypic.length - 1 ? 0 : prev + 1
                          )
                        }
                      >
                        <span className="text-white text-xl">↓</span>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <img
                  src={modalContent?.picture || modalContent?.image}
                  alt={modalContent?.projectname || modalContent?.activityTitle}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              )}
            </div>

            {modalContent?.link && (
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 drop-shadow-sm">
                  Link
                </h3>
                <a
                  href={modalContent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Visit Link
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Project;