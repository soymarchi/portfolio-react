
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Hero from "./components/Hero"
import Journey from "./components/Journey"
import WorkSection from "./components/WorkSection"

function App() {
  const [lights, setLights] = useState([])
  const lastPosition = useRef({ x: 0, y: 0 })
  const [isCaseOpen, setIsCaseOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--y", `${e.clientY}px`)

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
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main>
      <div className="cursor-light"></div>

      {lights.map((light) => (
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

      <WorkSection setIsCaseOpen={setIsCaseOpen} />

      <section className="cv-section">
        <motion.div
          className="cv-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow">ABOUT / CV</p>

          <h2>
            Junior UX/UI Designer looking for internship or junior opportunities.
          </h2>

          <p>
            UX/UI Designer focused on creating clear and user-centered digital experiences.
            Skilled in Figma, wireframing, user flows, prototyping, Webflow and basic
            front-end development.
          </p>

          <div className="cv-grid">
            <div>
              <h3>Design</h3>
              <p>Figma</p>
              <p>Wireframing</p>
              <p>User Flows</p>
              <p>Prototyping</p>
            </div>

            <div>
              <h3>Basic Front-End</h3>
              <p>HTML</p>
              <p>CSS</p>
              <p>JavaScript</p>
              <p>Webflow</p>
            </div>

            <div>
              <h3>Experience</h3>
              <p>Altshuler Shaham</p>
              <p>Meitav</p>
              <p>HaMeshak Boutique</p>
            </div>
          </div>

          <a className="cv-button" href="/Maria_Utkina_CV.pdf" target="_blank">
            Open CV
          </a>
        </motion.div>
      </section>

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
            <button className="close-btn" onClick={() => setIsCaseOpen(false)}>×</button>

            <p className="eyebrow">CASE STUDY / SKILLBRIDGE</p>
            <h2>Helping job seekers understand what is missing.</h2>

            <div className="case-grid">
              <div>
                <h3>Problem</h3>
                <p>
                  Students and junior professionals often feel lost when applying for jobs.
                  They do not always know which skills they are missing.
                </p>
              </div>

              <div>
                <h3>Goal</h3>
                <p>
                  Create a simple mobile experience that turns confusion into a clear learning direction.
                </p>
              </div>

              <div>
                <h3>Process</h3>
                <p>
                  Research, user flow, wireframes, visual design, prototype and high fidelity screens.
                </p>
              </div>

              <div>
                <h3>Solution</h3>
                <p>
                  Users upload a CV or paste a job description, get a match score,
                  see missing skills and follow a learning plan.
                </p>
              </div>
            </div>

            <div className="case-result">
              <h3>Final outcome</h3>
              <p>
                SkillBridge turns a stressful job search into a guided path — showing users
                where they are, what is missing, and what to do next.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default App