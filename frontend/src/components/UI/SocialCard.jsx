import React from 'react';
import './SocialCard.css';

const SocialCard = ({ profile }) => {
  return (
    <div className="card-container">
      <div className="upper-container">
        <div className="image-container">
          <i className={`fa ${profile.icon}`} style={{fontSize: '72px', color: '#000'}} aria-hidden="true"></i>
        </div>
      </div>

      <div className="lower-container">
        <div>
          <h3>{profile.name}</h3>
          <h4>{profile.text}</h4>
        </div>
        <div>
          <p>{profile.description}</p>
        </div>
        <div>
          <a href={profile.link} className="btn" target="_blank" rel="noopener noreferrer" aria-label={`Visit my ${profile.text} profile`}>
            View profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialCard; 