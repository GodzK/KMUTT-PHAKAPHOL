import tpr from "../assets/tprport.png";
function Activity() {
  return (
    <div id="activity">
              <h1 data-aos="fade-up" className="main-title">
                Activity
              </h1>
              <p style={{ color: "white" }}>
                This is the projects page. Press ESC to return to the menu.
              </p>
              {/* Semester 1 */}
              <section
                className="semester-section"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2>Semester 1</h2>
                <div className="activity-item">
                  <h3>TuePunrak 18th (English Teacher)</h3>
                  <div className="image-container">
                    <img
                      src={tpr}
                      alt="TuePunrak 18th"
                      className="activity-image"
                    />
                  </div>
                  <p>
                    TuePunrak 18th. The Camp promote unity and friendship among
                    students.
                  </p>
                </div>
              </section>
    
              <section
                className="semester-section"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h2>Semester 2</h2>
                <div className="activity-item">
                  <h3>Sports Day</h3>
                  <div className="image-container">
                    <img src={tpr} alt="Sports Day" className="activity-image" />
                  </div>
                  <p></p>
                </div>
              </section>
              <section className="semester-section">
                <h2>Semester 3</h2>
                <div className="activity-item">
                  <h3>Sports Day</h3>
                  <div className="image-container">
                    <img src={tpr} alt="Sports Day" className="activity-image" />
                  </div>
                  <p></p>
                </div>
              </section>
            </div>
  )
}

export default Activity