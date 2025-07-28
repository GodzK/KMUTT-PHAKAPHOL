import React from 'react';
import { ActivityData } from '../../../data/Data';
import './ActivitiesSection.css';

const ActivitiesSection = ({ handleSectionChange }) => {
  return (
    <div className="output">
      <p className="section-title">
        <span className="command-prompt text-[--primary] mr-3">></span> My Activities
      </p>
      {ActivityData.map((semester, index) => (
        semester.Activity1.length > 0 && (
          <div key={index} className="semester-container">
            <p className="semester-title">{semester.Semester}</p>
            {semester.Activity1.map((activity, idx) => (
              <div key={idx} className="activity-item" style={{ '--animation-order': idx }}>
                <div className="activity-text">
                  <p className="activity-title">{activity.activityTitle}</p>
                  <p className="activity-desc">{activity.description}</p>
                </div>
                <div className="image-container">
                  <picture>
                    <source srcSet={activity.imageWebp || activity.image} type="image/webp" />
                    <img
                      src={activity.image}
                      alt={activity.activityTitle}
                      className="activity-image"
                      loading="lazy"
                    />
                  </picture>
                </div>
              </div>
            ))}
          </div>
        )
      ))}
      <p className="back-link">
        Type <a href="#about" onClick={() => handleSectionChange('about')}>
          [about]
        </a> to return
      </p>
    </div>
  );
};

export default ActivitiesSection; 