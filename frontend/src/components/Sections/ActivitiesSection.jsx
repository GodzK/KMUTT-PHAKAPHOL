import React from 'react';
import { ActivityData } from '../../../data/Data';
import { FaStar, FaGraduationCap, FaUsers, FaCode } from 'react-icons/fa';
import './ActivitiesSection.css';

const ActivitiesSection = ({ handleSectionChange, showFull = false }) => {
  const allActivities = ActivityData.flatMap(semester => 
    semester.Activity1.map(activity => ({
      ...activity,
      semester: semester.Semester
    }))
  );

  const featuredActivities = allActivities.slice(0, 3);

  const activityIcons = {
    'BorntoDev': <FaCode />,
    'TuePunRak': <FaUsers />,
    'IOT': <FaCode />,
    'default': <FaStar />
  };

  const getActivityIcon = (title) => {
    if (title.includes('BorntoDev')) return activityIcons.BorntoDev;
    if (title.includes('TuePunRak')) return activityIcons.TuePunRak;
    if (title.includes('IOT')) return activityIcons.IOT;
    return activityIcons.default;
  };

  if (!showFull) {
    return (
      <div className="activities-preview">
        <div className="activities-stats">
          <div className="stat-card">
            <span className="stat-number">{allActivities.length}</span>
            <span className="stat-label">Activities</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">3</span>
            <span className="stat-label">Semesters</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2+</span>
            <span className="stat-label">Years</span>
          </div>
        </div>
        
        <div className="featured-activities">
          {featuredActivities.map((activity, index) => (
            <div key={index} className="activity-preview-card">
              <div className="activity-preview-icon">
                {getActivityIcon(activity.activityTitle)}
              </div>
              <div className="activity-preview-info">
                <h4>{activity.activityTitle.split(' ').slice(0, 3).join(' ')}...</h4>
                <span className="activity-semester">{activity.semester}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="see-more-btn"
          onClick={() => handleSectionChange('skills')}
        >
          See All Activities →
        </button>
      </div>
    );
  }

  return (
    <div className="activities-full">
      <div className="activities-grid">
        {allActivities.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="activity-image-container">
              <img
                src={activity.image}
                alt={activity.activityTitle}
                className="activity-image"
                loading="lazy"
              />
            </div>
            
            <div className="activity-details">
              <div className="activity-header">
                <div className="activity-icon">
                  {getActivityIcon(activity.activityTitle)}
                </div>
                <div className="activity-meta">
                  <h3 className="activity-title">{activity.activityTitle}</h3>
                  <span className="activity-semester">{activity.semester}</span>
                </div>
              </div>
              
              <p className="activity-description">{activity.description}</p>
              
              {activity.activitypic && activity.activitypic.length > 0 && (
                <div className="activity-gallery">
                  <h4>Gallery:</h4>
                  <div className="gallery-images">
                    {activity.activitypic.slice(0, 3).map((pic, i) => (
                      <img key={i} src={pic} alt={`Activity ${i + 1}`} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="activities-navigation">
        <button 
          className="action-btn"
          onClick={() => handleSectionChange('experience')}
        >
          View Experience
        </button>
      </div>
    </div>
  );
};

export default ActivitiesSection; 