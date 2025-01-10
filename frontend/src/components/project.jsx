import React, { useState, useEffect, useRef } from "react";
import { ActivityData, projectdata } from "../../Backend/Data";
import "../App.css";

function Project() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0);

  const isProjectData = projectdata.length > 0;
  const items = isProjectData
    ? projectdata
    : ActivityData[currentSemesterIndex]?.Activity1 || [];
  const itemRefs = useRef([]); // Reference for items

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
        const newIndex = (selectedIndex + 1) % items.length;
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (event.key === "ArrowUp") {
        const newIndex =
          (selectedIndex - 1 + items.length) % items.length;
        setSelectedIndex(newIndex);
        scrollToItem(newIndex);
      } else if (event.key === "ArrowRight") {
        const newSemesterIndex =
          (currentSemesterIndex + 1) % ActivityData.length;
        setCurrentSemesterIndex(newSemesterIndex);
        setSelectedIndex(0);
      } else if (event.key === "ArrowLeft") {
        const newSemesterIndex =
          (currentSemesterIndex - 1 + ActivityData.length) %
          ActivityData.length;
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
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, selectedIndex, currentSemesterIndex, items]);

  return (
    <>
      <div id="project">
        <h1 data-aos="fade-up" className="main-title">
          {isProjectData ? "Projects" : "Activities"}
        </h1>
        <section
  className="semester-section"
  data-aos="fade-up"
  data-aos-delay="200"
>
  {items.map((item, idx) => (
    <div
       id="project-container"
      className={`item ${
        selectedIndex === idx ? "selected" : ""
      }`}
      key={idx}
      ref={(el) => (itemRefs.current[idx] = el)}
    >
      <h1>{isProjectData ? item.projectname : item.activityTitle}</h1>
      <div className="image-container">
        <img
          src={isProjectData ? item.picture : item.image}
          alt={isProjectData ? item.projectname : item.activityTitle}
          id="project-image"
        />
      </div>
      <h2>{isProjectData ? item.experience : item.description}</h2>
      {isProjectData ? (
        <button
          className="btn btn-blue"
          onClick={() => openModal(item)}
        >
          {item.link ? "Click here to visit project" : "Learn More"}
        </button>
      ) : (
        <button
          className="btn btn-blue"
          onClick={() => openModal(item)}
        >
          Click here to watch more
        </button>
      )}
    </div>
  ))}
</section>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalContent?.projectname || modalContent?.activityTitle}</h2>
            <p>{modalContent?.experience || modalContent?.description}</p>
            <img
              src={modalContent?.picture || modalContent?.image}
              alt={modalContent?.projectname || modalContent?.activityTitle}
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

export default Project;
