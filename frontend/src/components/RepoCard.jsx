import React from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";

const RepoCard = ({ project, onClick }) => {
  return (
    <motion.div
      className="repo-card"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <LazyLoadImage
        src={project.picture}
        alt={project.projectname}
        className="repo-image"
        effect="opacity"
      />
      <h3>{project.projectname}</h3>
      <p>{project.description.substring(0, 100)}...</p>
      <div className="tech-stack">
        {project.techStack.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="repo-meta">
        <span>⭐ {Math.floor(Math.random() * 100)}</span>
        <span>🍴 {Math.floor(Math.random() * 50)}</span>
      </div>
    </motion.div>
  );
};

export default RepoCard;