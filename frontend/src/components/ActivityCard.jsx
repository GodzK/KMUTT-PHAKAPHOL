import React from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ActivityCard = ({ activity }) => {
  return (
    <motion.div
      className="activity-card"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <LazyLoadImage
        src={activity.image}
        alt={activity.activityTitle}
        className="activity-image"
        effect="opacity"
      />
      <h3>{activity.activityTitle}</h3>
      <p>{activity.description}</p>
      <div className="activity-gallery">
        {activity.activitypic?.map((pic, i) => (
          <motion.div
            key={i}
            className="gallery-image-wrapper"
            whileHover={{ scale: 1.1 }}
          >
            <LazyLoadImage
              src={pic}
              alt={`${activity.activityTitle} ${i + 1}`}
              className="gallery-image"
              effect="opacity"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityCard;