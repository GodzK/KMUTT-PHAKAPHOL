import React, { useState, useEffect, useRef, act } from "react";
import { ActivityData } from "../../Backend/Data";
import "../App.css";

function Activity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0);

  const activities = ActivityData[currentSemesterIndex]?.Activity1 || [];
  const activityRefs = useRef([]); // เก็บ references ของ Activity แต่ละตัว

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
      if (event.key === "Backspace") {
        closeModal();
      }
    } else {
      if (event.key === "ArrowDown") {
        const newIndex = (selectedActivityIndex + 1) % activities.length;
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex); // เลื่อนไปยัง Activity ที่เลือก
      } else if (event.key === "ArrowUp") {
        const newIndex =
          (selectedActivityIndex - 1 + activities.length) % activities.length;
        setSelectedActivityIndex(newIndex);
        scrollToActivity(newIndex); // เลื่อนไปยัง Activity ที่เลือก
      } else if (event.key === "ArrowRight") {
        const newSemesterIndex =
          (currentSemesterIndex + 1) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedActivityIndex(0); // รีเซ็ต Activity ที่เลือก
      } else if (event.key === "ArrowLeft") {
        const newSemesterIndex =
          (currentSemesterIndex - 1 + ActivityData.length) %
          ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedActivityIndex(0); // รีเซ็ต Activity ที่เลือก
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, selectedActivityIndex, currentSemesterIndex, activities]);

  return (
    <>
      <div id="activity">
        <h1 data-aos="fade-up" className="main-title">
          {ActivityData[currentSemesterIndex]?.Semester}
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
              ref={(el) => (activityRefs.current[idx] = el)} // ตั้งค่า ref
            >
              <h3>{activity.activityTitle}</h3>
              <h2>{activity.Semester}</h2>
              <div className="image-container">
                <img
                  src={activity.image}
                  alt={activity.activityTitle}
                  className="activity-image"
                />
              </div>
              <p>{activity.description}</p>
              <button
                className="btn btn-blue"
                onClick={() => openModal(activity)}
              >
                Click here to watch more
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalContent?.activityTitle}</h2>
            <p>{modalContent?.description}</p>
            <img
              src={modalContent?.image}
              alt={modalContent?.activityTitle}
              className="modal-image"
            />
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
