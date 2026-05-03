import { motion } from "framer-motion"
import SkillBridgePhone from "./SkillBridgePhone"

function WorkSection({ setIsCaseOpen }) {
  return (
    <section className="work-section">
      <p className="eyebrow">SELECTED WORK</p>

      <motion.div
        className="work-card"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="project-copy">
          <span>01 / CASE STUDY</span>
          <h2>SkillBridge</h2>
          <p>
            A mobile app concept that helps students and professionals find missing
            skills, understand job requirements, and move closer to their next opportunity.
          </p>
          <button onClick={() => setIsCaseOpen(true)}>View Case Study</button>
        </div>

        <motion.div
          className="phone-mockup"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <SkillBridgePhone />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default WorkSection