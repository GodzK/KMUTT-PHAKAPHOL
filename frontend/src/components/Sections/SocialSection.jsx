import React from 'react';
import { FaGithub, FaInstagram, FaBold, FaFacebook } from 'react-icons/fa';
import './SocialSection.css';

const iconMap = {
  'fa-github': <FaGithub size={24} />,
  'fa-instagram': <FaInstagram size={24} />,
  'fa-bold': <FaBold size={24} />,
  'fa-facebook': <FaFacebook size={24} />,
};

const SocialSection = () => {
  const socialLinks = [
    { id: "github", name: "Github", link: "https://github.com/GodzK", text: "Github", icon: 'fa-github', color: '#333' },
    { id: "ig", name: "Instagram", link: "https://www.instagram.com/pk._tcsk/", text: "Instagram", icon: 'fa-instagram', color: '#E4405F' },
    { id: "Borntodev", name: "Borntodev", link: "https://www.borntodev.com/author/godzk25gmail-com/", text: "Borntodev", icon: 'fa-bold', color: '#ffc354ff' },
    { id: "Facebook", name: "Facebook", link: "https://www.facebook.com/phakaphol.dherachaisuphakij/", text: "Facebook", icon: 'fa-facebook', color: '#1877F2' },
  ];

  return (
    <div className="social-content">
      <div className="social-intro">
        <div className="social-emoji"></div>
        <h3>Let's Connect!</h3>
        <p>Follow me on social media</p>
      </div>
      
      <div className="social-grid">
        {socialLinks.map(profile => (
          <a
            key={profile.id}
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
            style={{ '--social-color': profile.color }}
          >
            <div className="social-icon">
              {iconMap[profile.icon]}
            </div>
            <span className="social-name">{profile.text}</span>
          </a>
        ))}
      </div>
      
      <div className="social-footer">
        <p>Feel free to reach out! 🚀</p>
      </div>
    </div>
  );
};

export default SocialSection;
