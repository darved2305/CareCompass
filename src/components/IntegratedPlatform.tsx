import { motion } from 'framer-motion'
import ArrowIcon from './ArrowIcon'

function IntegratedPlatform() {
  const fadeInUp = {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <section className="integrated-platform">
      <div className="integrated-platform-container">
        <motion.div
          className="integrated-platform-content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="integrated-platform-label" variants={fadeInUp}>
            <span className="integrated-platform-square"></span>
            <span className="integrated-platform-label-text">THE CARE NAVIGATOR</span>
          </motion.div>

          <motion.h2 className="integrated-platform-title" variants={fadeInUp}>
            Combining triage, facility discovery, and referral notes into{' '}
            <span className="integrated-platform-title-fade">one care journey.</span>
          </motion.h2>

          <motion.p className="integrated-platform-description" variants={fadeInUp}>
            Our platform reduces uncertainty by guiding users from symptoms to urgency, from urgency to the correct facility type, and from facility type to nearby verified options, with a downloadable referral note for faster, clearer handoffs.
          </motion.p>

          <motion.a
            href="#platform"
            className="integrated-platform-cta"
            variants={fadeInUp}
            whileHover="hover"
          >
            <span className="integrated-platform-cta-text">EXPLORE HOW IT WORKS</span>
            <motion.span
              className="integrated-platform-cta-arrow"
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <ArrowIcon />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default IntegratedPlatform
