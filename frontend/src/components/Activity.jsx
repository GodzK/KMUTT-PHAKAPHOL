import { useState, useEffect, useRef } from "react";
import { ActivityData } from "../../Backend/Data";
import GoBackButton from "./GoBackButton";
import "../App.css";

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
      if (event.key === "Backspace") {
        closeModal();
      }
    } else {
      if (event.key === "ArrowDown") {
        const newIndex = (selectedActivityIndex + 1) % activities.length;
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex); // Scroll to the selected activity
      } else if (event.key === "ArrowUp") {
        const newIndex =
          (selectedActivityIndex - 1 + activities.length) % activities.length;
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex); // Scroll to the selected activity
      } else if (event.key === "ArrowRight") {
        const newSemesterIndex =
          (currentSemesterIndex + 1) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedActivityIndex(0); // Reset selected activity
      } else if (event.key === "ArrowLeft") {
        const newSemesterIndex =
          (currentSemesterIndex - 1 + ActivityData.length) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedActivityIndex(0); // Reset selected activity
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
    if (modalContent && modalContent.activitypic && modalContent.activitypic.length > 0) {
      setAutoSlideIndex((prevIndex) => (prevIndex + 1) % modalContent.activitypic.length);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, selectedActivityIndex, currentSemesterIndex, activities]);

  useEffect(() => {
    if (isModalOpen && modalContent && modalContent.activitypic && modalContent.activitypic.length > 0) {
      modalIntervalRef.current = setInterval(autoSlide, 3000); // Change image every 3 seconds
    } else {
      clearInterval(modalIntervalRef.current); // Clear interval when modal is closed
    }
    return () => clearInterval(modalIntervalRef.current); // Cleanup on unmount
  }, [isModalOpen, modalContent]);

  return (
    <>
      <div id="activity">
      <GoBackButton setCurrentPage={setCurrentPage} />
        <h1 data-aos="fade-up" className="main-title">
          {ActivityData[currentSemesterIndex]?.Semester}
          <p>press enter to see detail</p>
          <p>LEFT AND RIGHT to go next page</p>
        </h1>
        
        <section
          className="semester-section"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {activities.map((activity, idx) => (
            <div
              className={`activity-item ${
                selectedActivityIndex === idx ? "selected" : ""
              }`}
              key={idx}
              ref={(el) => (activityRefs.current[idx] = el)} // Set reference for each activity
            >
              <h3>{activity.activityTitle}</h3>
              <h2>{activity.activityTitle}</h2>
              <div className="image-container">
                <img
                  src={activity.image}
                  alt={activity.activityTitle}
                  className="activity-image"
                  onClick={() => openModal(activity)}
                />
              </div>
              
            </div>
          ))}
          
        </section>
        <p>LEFT AND RIGHT to go next page</p>
      </div>

      {/* Modal */}
      {isModalOpen && modalContent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalContent.activityTitle}</p>
            <h2>{modalContent.description}</h2>
            <div className="modal-image-container">
              {/* Display images based on the autoSlideIndex */}
              {modalContent.activitypic && modalContent.activitypic.length > 0 && (
                <img
                  src={modalContent.activitypic[autoSlideIndex]}
                  alt={modalContent.activityTitle}
                  className="modal-image"
  
                />
              )}
            </div>
            <button className="btn btn-close" onClick={closeModal}>
              Close (Backspace)
            </button>
            
          </div>
        </div>
      )}
    </>
  );
}

export default Activity;
