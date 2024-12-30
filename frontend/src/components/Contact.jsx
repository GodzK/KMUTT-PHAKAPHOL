import React from 'react'
function Contact() {
  return (
    <div className="content">
          <h1>Contact</h1>
          <div className="card-container">
            <div className="card" id="ig">
              <div className="card-text">
                <a href="https://www.instagram.com/pk._tcsk/" target="_blank">
                  IG: pk.tcsk
                </a>
              </div>
            </div>
            <div className="card" id="fb">
              <div className="card-text">
                <a
                  href="https://www.facebook.com/phakaphol.dherachaisuphakij/"
                  target="_blank"
                >
                  FB: Pk Phakaphol Tcsk{" "}
                </a>
              </div>
            </div>
            <div className="card" id="li">
              <div className="card-text">
                <a
                  href="https://www.linkedin.com/in/phakaphol-dherachaisuprakij-1092ab256/"
                  target="_blank"
                >
                  LinkedIn: Phakaphol
                </a>
              </div>
            </div>
            <div className="card" id="bd">
              <div className="card-text">
                <a
                  href="https://www.borntodev.com/author/godzk25gmail-com/"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Borntodev Devinit#2
                </a>
              </div>
            </div>
          </div>
          <p>Press ESC to return to the menu.</p>
        </div>

 

  )
}

export default Contact