import React, { useState, useEffect, useRef } from "react";
import { ActivityData, projectdata } from "../../Backend/Data";
import "../App.css";
import GoBackButton from "./GoBackButton";
function Project({ setCurrentPage }) {
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
    <GoBackButton setCurrentPage={setCurrentPage} />
      <div id="project" data-aos="fade-up" >
        <h1 data-aos="fade-up" className="main-title" style={{color:"white",fontSize:"5rem"}}>
          {isProjectData ? "Projects" : "Activities"}
        </h1>
        {items.map((item, idx) => (
          <section
            key={idx}
            className="semester-section"
            style={{width:"50%"}}
          >
            <div
              className={`activity-item ${selectedIndex === idx ? "selected" : ""}`}
              style={{background:"transparent",width:"100%",height:"100%"}}
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <h1 style={{color:"white"}}>{isProjectData ? item.projectname : item.activityTitle}</h1>
              <div className="image-container">
                <img
                  src={isProjectData ? item.picture : item.image}
                  alt={isProjectData ? item.projectname : item.activityTitle}
                  id="project-image"
                />
              </div>
              <h6 style={{fontSize:"1.3rem"}}>{isProjectData ? item.experience : item.description}</h6>
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
          </section>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalContent?.projectname || modalContent?.activityTitle}</p>
            <h2>{modalContent?.experience || modalContent?.description}</h2>
            <div className="modal-image-container">
            <img
              src={modalContent?.picture || modalContent?.image}
              alt={modalContent?.projectname || modalContent?.activityTitle}
              className="modal-image"
            />
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

export default Project;
