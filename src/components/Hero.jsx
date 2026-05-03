import { motion } from "framer-motion"

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="eyebrow">MARIA UTKINA / UX UI DESIGNER</p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          I turn
          <br />
          complexity
          <br />
          into clarity.
        </motion.h1>

        <motion.p
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.1 }}
        >
          I design digital experiences by looking deeply into complex situations,
          finding hidden light, and turning confusion into clear direction.
        </motion.p>

        <motion.a
          href="#journey"
          className="scroll-link"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Enter the journey
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero