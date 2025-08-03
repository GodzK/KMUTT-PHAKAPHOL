import React from 'react';
import { FaGithub, FaInstagram, FaBold, FaFacebook } from 'react-icons/fa';

const iconMap = {
  'fa-github': <FaGithub size={28} />,
  'fa-instagram': <FaInstagram size={28} />,
  'fa-bold': <FaBold size={28} />,
  'fa-facebook': <FaFacebook size={28} />,
};

const SocialSection = () => {
  const socialLinks = [
    { id: "github", name: "Github", link: "https://github.com/GodzK", text: "Github", icon: 'fa-github' },
    { id: "ig", name: "Instagram", link: "https://www.instagram.com/pk._tcsk/", text: "Instagram", icon: 'fa-instagram' },
    { id: "Borntodev", name: "Borntodev", link: "https://www.borntodev.com/author/godzk25gmail-com/", text: "Borntodev", icon: 'fa-bold' },
    { id: "Facebook", name: "Facebook", link: "https://www.facebook.com/phakaphol.dherachaisuphakij/", text: "Facebook", icon: 'fa-facebook' },
  ];

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "20px",
     
    }}>
      {socialLinks.map(profile => (
        <a
          key={profile.id}
          href={profile.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            width: "160px",
            padding: "20px",
            borderRadius: "16px",
            textDecoration: "none",
            backgroundColor: "#a5d6a7", // soft green
            color: "#1b5e20", // dark green text
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease, background-color 0.2s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.backgroundColor = "#81c784"; // darker on hover
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.backgroundColor = "#a5d6a7";
          }}
        >
          {iconMap[profile.icon]}
          <span style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            textAlign: "center"
          }}>{profile.text}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialSection;
