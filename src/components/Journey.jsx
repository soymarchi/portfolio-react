import { motion } from "framer-motion"

function Journey() {
  return (
    <section id="journey" className="journey-section">
      <div className="journey-line"></div>

      <motion.div
        className="journey-step step-one"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <span>01</span>
        <h2>Some paths feel impossible to navigate.</h2>
      </motion.div>

      <motion.div
        className="journey-step step-two"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <span>02</span>
        <h2>I search for light inside complex systems.</h2>
      </motion.div>

      <motion.div
        className="journey-step step-three"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <span>03</span>
        <h2>Then I turn that light into structure.</h2>
      </motion.div>
    </section>
  )
}

export default Journey