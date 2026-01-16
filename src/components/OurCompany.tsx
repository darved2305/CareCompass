import { motion } from 'framer-motion'
import ArrowIcon from './ArrowIcon'

function OurCompany() {
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
    <section className="our-company">
      <div className="our-company-container">
        <motion.div
          className="our-company-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="our-company-square"></span>
          <span className="our-company-label-text">OUR COMPANY</span>
        </motion.div>

        <div className="our-company-content">
          <motion.div
            className="our-company-image"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img src="/health.jpg" alt="Healthcare professional with tablet in India" />
          </motion.div>

          <motion.div
            className="our-company-text"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="our-company-title" variants={fadeInUp}>
              Bold research to unlock small molecule discovery for human health and aging.
            </motion.h2>

            <div className="our-company-columns">
              <motion.div className="our-company-column" variants={fadeInUp}>
                <p>
                  In many rural and low-income areas, people lose critical time deciding if care is needed, where to go, and what exists nearby. The result is delayed treatment, unnecessary travel, and avoidable expense.
                </p>
              </motion.div>

              <motion.div className="our-company-column" variants={fadeInUp}>
                <p>
                  CareCompass turns that confusion into a step-by-step path: triage, next-step guidance, and facility recommendations, plus an optional referral note to support quicker care at the next touchpoint.
                </p>
              </motion.div>
            </div>

            <motion.a
              href="#about"
              className="our-company-cta"
              variants={fadeInUp}
              whileHover="hover"
            >
              <span className="our-company-cta-text">LEARN MORE ABOUT US</span>
              <motion.span
                className="our-company-cta-arrow"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <ArrowIcon />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OurCompany
