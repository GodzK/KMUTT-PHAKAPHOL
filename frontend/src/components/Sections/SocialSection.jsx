import React from 'react';
import { socialLinks } from '../../../data/Data';
import SocialCard from '../UI/SocialCard';


const SocialSection = () => {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
      {socialLinks.map(profile => (
        <SocialCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default SocialSection; 