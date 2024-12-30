import React from 'react'
import profile from "../assets/profile.jpg";
function About() {
  return (
    <div className="content">
              <h1 data-aos="fade-up">Hi, I'm Phakaphol Dherachaisuphakij!</h1>
              <p data-aos="fade-right" className="about-description">
                A passionate <strong>developer</strong>, <strong>Blogger</strong>,
                and <strong>dreamer</strong>. I love building web projects that
                blend creativity and technology. i love coding, my main language is
                Javascript, i love FrontEnd Developer, but im studying on Backend i
                very Excited!
              </p>
              <p data-aos="fade-left" className="about-quote">
                <em>"Talent without working hard is nothing"</em>
              </p>
              <div data-aos="zoom-in" className="about-image">
                <img
                  src={profile}
                  alt="About Me"
                  style={{ borderRadius: "10px", maxWidth: "100%" }}
                />
              </div>
              <p data-aos="flip-up" className="about-cta">
                ✉️Contact for work{" "}
                <a href="https://www.instagram.com/pk._tcsk/" target="_blank">
                  IG DM
                </a>
              </p>
            </div>
  )
}

export default About