import { motion } from 'framer-motion'
import ArrowIcon from './ArrowIcon'

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const arrowVariants = {
    hidden: { x: -10 },
    visible: { x: 0 },
    hover: {
      x: 8,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
  }

  return (
    <main className="hero">
      <motion.h1
        className="hero-title"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Find the right care,
        <br />
        faster.
      </motion.h1>
      <motion.div
        className="hero-bottom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="hero-subtitle"
          variants={subtitleVariants}
        >
          CareCompass helps people in underserved communities understand urgency,
          <br />
          choose the right facility, and discover nearby verified options without the confusion.
        </motion.p>
        <motion.a
          href="#platform"
          className="cta-button"
          variants={buttonVariants}
          whileHover="hover"
        >
          <span className="cta-text">START TRIAGE</span>
          <motion.span
            className="cta-arrow"
            variants={arrowVariants}
          >
            <ArrowIcon />
          </motion.span>
        </motion.a>
      </motion.div>
    </main>
  )
}

export default Hero
