import React, { useState } from "react";
import tpr from "../assets/TPR/tprport.png"; // Make sure the image path is correct
import { ActivityData } from "../../../Backend/Data";

function Activity() {


  return (
    <> 
      {ActivityData.map((item, index) => (
        <div id="activity" key={index}>
          <h1 data-aos="fade-up" className="main-title">
            {item.Semester}
          </h1>
          <section
            className="semester-section"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2>{item.Semester}</h2>
            {item.Activity1.map((activity, idx) => (
              <div className="activity-item" key={idx}>
                <h3>{activity.activityTitle}</h3>
                <div className="image-container">
                  <img
                    src={activity.image} 
                    alt={activity.activityTitle}
                    className="activity-image"
                  />
                </div>
                <p>{activity.description}</p>
                <button >Click here to watch more</button>
              </div>
            ))}
          </section>
        </div>
      ))}


    </>
  );
}

export default Activity;
