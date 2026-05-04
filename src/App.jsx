import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Hero from "./components/Hero"
import Journey from "./components/Journey"
import WorkSection from "./components/WorkSection"


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
        "button, a, input, .work-card, .case-modal, .resume-button"
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
          focused on turning complex ideas into clear and intuitive experiences.</p>
          <button
          className="resume-button"
          onClick={() => setIsCvOpen(true)}>View Resume <span>→</span>
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
            <button
              className="close-btn"
              onClick={() => setIsCaseOpen(false)}
            >
              ×
            </button>

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
            className="case-modal cv-modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <button
              className="close-btn"
              onClick={() => setIsCvOpen(false)}
            >
              ×
            </button>

            <p className="eyebrow">RESUME / EXPERIENCE</p>

            <h2>Maria Utkina</h2>

            <p className="case-intro">
              Junior UX/UI Designer focused on creating clear, user-centered
              digital experiences. Skilled in Figma, wireframing, prototyping,
              Webflow and basic front-end development.
            </p>

            <div className="case-grid">
              <div>
                <h3>Design</h3>
                <p>
                  Figma, Wireframing, User Flows, Prototyping, Responsive Design
                </p>
              </div>

              <div>
                <h3>Front-End Basics</h3>
                <p>HTML, CSS, JavaScript, React, Vite, Webflow</p>
              </div>

              <div>
                <h3>Experience</h3>
                <p>Altshuler Shaham, Meitav, HaMeshak Boutique</p>
              </div>

              <div>
                <h3>Looking For</h3>
                <p>
                  Junior UX/UI roles, internships, and creative product/design
                  teams.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default App