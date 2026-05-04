import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Hero from "./components/Hero"
import Journey from "./components/Journey"
import WorkSection from "./components/WorkSection"
import SkillBridgePhone from "./components/SkillBridgePhone"

function App() {
  const [lights, setLights] = useState([])
  const lastPosition = useRef({ x: 0, y: 0 })

  const [isCaseOpen, setIsCaseOpen] = useState(false)
  const [isCvOpen, setIsCvOpen] = useState(false)
  const [hideLight, setHideLight] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--y", `${e.clientY}px`)

      const interactive = e.target.closest(
        "button, a, input, .work-card, .case-modal, .cv-modal, .resume-button"
      )

      setHideLight(!!interactive)

      const deltaX = e.clientX - lastPosition.current.x
      const deltaY = e.clientY - lastPosition.current.y
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      lastPosition.current = { x: e.clientX, y: e.clientY }

      setLights((prev) => [
        ...prev.slice(-10),
        {
          x: e.clientX,
          y: e.clientY,
          angle,
          id: `${Date.now()}-${Math.random()}`,
        },
      ])
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <main>
      <div className={`cursor-light ${hideLight ? "light-hidden" : ""}`}></div>

      {!hideLight &&
        lights.map((light) => (
          <span
            key={light.id}
            className="light-trail"
            style={{
              left: light.x,
              top: light.y,
              rotate: `${light.angle}deg`,
            }}
          />
        ))}

      <Hero />

      <Journey />

      <section className="burn-section">
        <motion.div
          className="burn-reveal"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow">THE IDEA</p>

          <h2>
            Light does not erase the dark.
            <br />
            It helps us understand it.
          </h2>

          <p>
            My design process is about noticing details, asking deeper questions,
            and creating products that help people move forward.
          </p>
        </motion.div>
      </section>

      <section className="cv-section">
        <motion.div
          className="cv-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow">Profile</p>

          <h2>A quick look at my design background.</h2>

          <p>
            I’m a junior UX/UI designer with a visual and technical mindset,
            focused on turning complex ideas into clear and intuitive experiences.
          </p>

          <button
            className="resume-button"
            onClick={() => setIsCvOpen(true)}
          >
            View Resume <span>→</span>
          </button>
        </motion.div>
      </section>

      <WorkSection setIsCaseOpen={setIsCaseOpen} />

      <footer>
        <p>Currently looking for junior or internship UX/UI opportunities.</p>

        <div className="footer-links">
          <a href="mailto:mariutkka@gmail.com">mariutkka@gmail.com</a>
          <a href="tel:0558865261">055-8865261</a>
        </div>
      </footer>

      {isCaseOpen && (
        <div className="case-overlay">
          <motion.div
            className="case-modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <button className="close-btn" onClick={() => setIsCaseOpen(false)}>
              ×
            </button>
            <div className="case-phone-preview">
            <div className="phone-mockup">
            <SkillBridgePhone />
            </div>
            </div>

            <p className="eyebrow">CASE STUDY / SKILLBRIDGE</p>
            <h2>Helping job seekers understand what skills they need next.</h2>

            <p className="case-intro">
              SkillBridge is a mobile app concept designed to help students and
              junior professionals compare their current skills with real job
              requirements, identify gaps, and follow a clear learning path
              toward their career goals.
            </p>

            <div className="case-grid">
              <div>
                <h3>Problem</h3>
                <p>
                  Many junior job seekers feel overwhelmed when reading job
                  descriptions. They often know where they want to go, but not
                  which skills are missing or how to improve.
                </p>
              </div>

              <div>
                <h3>Goal</h3>
                <p>
                  Create a simple experience that turns uncertainty into a clear
                  next step: what the user already has, what is missing, and what
                  to learn next.
                </p>
              </div>

              <div>
                <h3>UX Direction</h3>
                <p>
                  The flow focuses on reducing cognitive load: upload a CV, paste
                  a job description, receive a match score, and view the missing
                  skills in a visual, easy-to-understand way.
                </p>
              </div>

              <div>
                <h3>Solution</h3>
                <p>
                  SkillBridge gives users a personalized match percentage,
                  highlights missing skills, and turns them into a guided
                  learning plan instead of leaving users confused.
                </p>
              </div>
            </div>

            <div className="case-result">
              <h3>Final Outcome</h3>
              <p>
                The final concept transforms the job search from a stressful
                guessing process into a structured path that helps users
                understand where they are and what to do next.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {isCvOpen && (
        <div className="case-overlay">
          <motion.div
            className="cv-modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <button className="close-btn" onClick={() => setIsCvOpen(false)}>
              ×
            </button>

            <p className="eyebrow">RESUME / PROFILE</p>
            <h2>Maria Utkina</h2>

            <p className="case-intro">
              UX/UI Designer focused on creating clear and user-centered digital experiences.
              Skilled in Figma and user-centered design processes.
              Familiar with Webflow and basic front-end (HTML, CSS, JS).
              Fast learner with strong attention to detail and a collaborative mindset.
            </p>

            <div className="case-grid">
              <div>
                <h3>Contact</h3>
                <p>
                  Kfar Saba<br /><br />
                  mariutkka@gmail.com<br /><br />
                  055-8865261
                </p>
              </div>

              <div>
                <h3>Education</h3>
                <p>
                  UI Design Studies at Netcraft Academy<br /><br />
                  Google UX Design Certificate<br /><br />
                  Front-End Development Studies at Appleseeds
                </p>
              </div>

              <div>
                <h3>Skills</h3>
                <p>
                  Figma<br />
                  Wireframing<br />
                  User Flows<br />
                  User Research<br />
                  Prototyping
                </p>
              </div>

              <div>
                <h3>Basic Knowledge</h3>
                <p>
                  HTML<br />
                  CSS<br />
                  JavaScript<br />
                  Photoshop<br />
                  Illustrator
                </p>
              </div>

              <div>
                <h3>Languages</h3>
                <p>
                  Hebrew — Fluent<br /><br />
                  Russian — Fluent<br /><br />
                  English — Proficient
                </p>
              </div>

              <div>
                <h3>Currently Exploring</h3>
                <p>
                  React & Interactive Interfaces<br /><br />
                  Motion Design<br /><br />
                  Creative Front-End Experiences
                </p>
              </div>

              <div className="experience-row">
                <div className="experience-card">
                  <div className="experience-text">
                    <h3>Work Experience</h3>

                    <p>
                      <strong>HaMeshak Food Boutique, Hod HaSharon</strong><br />
                      Sales Associate | 2024–2025<br /><br />
                      Delivered customer service with empathy and clear communication.<br />
                      Managed payments and inventory.<br />
                      Adapted quickly to changing priorities and fast-paced settings.

                      <br /><br /><br />

                      <strong>Altshuler Shaham</strong><br />
                      Back Office | 2023–2024<br /><br />
                      Maintained sensitive documents and data security.<br />
                      Organized tasks in a dynamic, multitasking environment.<br />
                      Maintained accuracy and attention to detail under pressure.

                      <br /><br /><br />

                      <strong>Assistant to Head of Control Department</strong><br />
                      Meitav | 2021–2023<br /><br />
                      Managed data and processes with CRM systems.<br />
                      Coordinated candidate placements and information.<br />
                      Conducted quality control and process improvements.
                    </p>
                  </div>

                  <div className="experience-lights">
                    <span className="star star-one"></span>
                    <span className="star star-two"></span>
                    <span className="star star-three"></span>
                    <span className="star star-four"></span>
                    <span className="star star-five"></span>

                    <span className="flow flow-one"></span>
                    <span className="flow flow-two"></span>
                    <span className="flow flow-three"></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default App