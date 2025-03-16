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
  const [visibleItems, setVisibleItems] = useState(100);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isProjectData = projectdata.length > 0;
  const items = isProjectData
    ? projectdata
    : ActivityData[currentSemesterIndex]?.Activity1 || [];
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  // กำหนดค่าเริ่มต้นให้ itemRefs เพื่อป้องกัน undefined
  useEffect(() => {
    itemRefs.current = [];
  }, [items]);

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
      if (event.key === "Backspace" || event.key === "Escape") closeModal();
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
      if (event.key === "Escape") {
        setCurrentPage("home");
      } else if (event.key === "ArrowDown") {
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
      const topPosition =
        itemRefs.current[index].getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topPosition - window.innerHeight / 2 + 100, // เลื่อนให้ item อยู่ใกล้กลางหน้าจอ
        behavior: "smooth",
      });
    }
  };

  const handleWheel = (event) => {
    if (isModalOpen) return;

    const delta = event.deltaY;
    if (delta > 0) {
      const newIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
      setSelectedIndex(newIndex);
      scrollToItem(newIndex);
    } else if (delta < 0) {
      const newIndex = Math.max(selectedIndex - 1, 0);
      setSelectedIndex(newIndex);
      scrollToItem(newIndex);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setVisibleItems((prev) => prev + 5);
    }
  };

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
        const newIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (diffY < 0) {
        const newIndex = Math.max(selectedIndex - 1, 0);
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      }
      setTouchStartX(null);
      setTouchStartY(null);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
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

  const titleVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 0px 25px rgba(149, 128, 255, 0.4)",
      transition: { duration: 0.3 } 
    },
    selected: { 
      scale: 1.05, 
      borderColor: "#9580ff", 
      boxShadow: "0px 0px 30px rgba(149, 128, 255, 0.6)" 
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5, 
        ease: [0.19, 1.0, 0.22, 1.0] 
      } 
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 15px rgba(149, 128, 255, 0.6)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.4, 
      transition: { 
        duration: 0.5, 
        repeat: Infinity, 
        repeatType: "reverse" 
      } 
    },
  };

  const filteredItems = items.filter((item) =>
    filter === "all" ? true : item.Semester === filter
  );

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="fixed inset-0 w-full h-full overflow-y-auto outline-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <GoBackButton setCurrentPage={setCurrentPage} />
      {/* Neon Grid Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-black pointer-events-none"></div>

    
     

      {/* Main Content */}
      <motion.div
        className="w-full max-w-5xl mx-auto flex flex-col gap-12 z-10 relative pt-8 pb-16 px-4 sm:px-6 md:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] mt-6"
          variants={titleVariants}
          whileHover={{ scale: 1.05, textShadow: "0px 0px 30px rgba(255, 255, 255, 0.8)" }}
        >
          {isProjectData ? "Projects" : "Activities"}
          <motion.div
            className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isProjectData ? "Explore my digital creations" : "Discover my involvement"}
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Use <kbd className="bg-gray-700 px-2 py-1 rounded">↑↓</kbd> to navigate
            </p>
          </motion.div>
        </motion.h1>

        {/* Semester Navigation (for Activities) */}
        {!isProjectData && (
          <motion.div
            className="flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                const newSemesterIndex =
                  (currentSemesterIndex - 1 + ActivityData.length) % ActivityData.length;
                setCurrentSemesterIndex(newSemesterIndex);
                setSelectedIndex(0);
                setFilter(ActivityData[newSemesterIndex].Semester);
              }}
              className="p-3 bg-white/5 backdrop-blur-sm rounded-full shadow-lg border border-purple-500/30 hover:border-purple-500/70 transition-all duration-300"
            >
              <span className="text-purple-300 text-xl">←</span>
            </motion.button>

            <motion.select
              className="px-6 py-3 bg-white/5 backdrop-blur-md text-purple-300 rounded-full shadow-lg border border-purple-500/30 hover:border-purple-500/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
              whileHover={{ scale: 1.05 }}
            >
              <option value="all">All Semesters</option>
              {ActivityData.map((semester, idx) => (
                <option key={idx} value={semester.Semester}>
                  {semester.Semester}
                </option>
              ))}
            </motion.select>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                const newSemesterIndex = (currentSemesterIndex + 1) % ActivityData.length;
                setCurrentSemesterIndex(newSemesterIndex);
                setSelectedIndex(0);
                setFilter(ActivityData[newSemesterIndex].Semester);
              }}
              className="p-3 bg-white/5 backdrop-blur-sm rounded-full shadow-lg border border-purple-500/30 hover:border-purple-500/70 transition-all duration-300"
            >
              <span className="text-purple-300 text-xl">→</span>
            </motion.button>
          </motion.div>
        )}

        {/* Items List */}
        <div className="flex flex-col gap-10 w-full mx-auto">
          {filteredItems.slice(0, visibleItems).map((item, idx) => (
            <motion.section
              key={idx}
              className={`relative bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 shadow-xl cursor-pointer transition-all duration-500 ${
                selectedIndex === idx ? "border-purple-500 shadow-purple-500/50" : ""
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
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg"
                onClick={() => openModal(item)}
              >
                {isProjectData
                  ? item.link
                    ? "Visit Project"
                    : "Learn More"
                  : "Watch More"}
              </motion.button>
            </motion.section>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-start justify-center z-50 p-4 overflow-y-auto"
          initial="hidden"
          animate="visible"
          variants={modalVariants}
          onClick={closeModal}
        >
          <motion.div
            className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 max-w-2xl w-full mx-auto text-left my-10 shadow-2xl border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            <p className="text-4xl font-bold text-white mb-8 drop-shadow-md">
              {modalContent?.projectname || modalContent?.activityTitle}
            </p>

            <div className="text-lg text-gray-300 leading-relaxed mb-10">
              {modalContent?.experience || modalContent?.description}
            </div>

            {modalContent?.techStack && (
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-sm">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {modalContent.techStack.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="px-4 py-2 bg-purple-500/20 rounded-full text-sm text-purple-300 shadow-md"
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
              <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-sm">
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
                      <motion.button
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 p-3 bg-purple-500/50 rounded-full hover:bg-purple-500/75 transition-all duration-300"
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === 0 ? modalContent.activitypic.length - 1 : prev - 1
                          )
                        }
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-white text-xl">↑</span>
                      </motion.button>
                      <motion.button
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-purple-500/50 rounded-full hover:bg-purple-500/75 transition-all duration-300"
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === modalContent.activitypic.length - 1 ? 0 : prev + 1
                          )
                        }
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-white text-xl">↓</span>
                      </motion.button>
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
                <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-sm">
                  Link
                </h3>
                <motion.a
                  href={modalContent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit Link
                </motion.a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Project;