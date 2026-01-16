import { motion } from 'framer-motion'
import ArrowIcon from './ArrowIcon'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-video-bg">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="footer-video-overlay"></div>
      </div>

      <div className="footer-content">
        <div className="footer-main">
          <motion.div
            className="footer-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="footer-title">
              We help people reach the right care sooner and with less confusion.
            </h2>
            <a href="#contact" className="footer-cta">
              <span className="footer-cta-text">TRY CARECOMPASS</span>
              <span className="footer-cta-arrow">
                <ArrowIcon />
              </span>
            </a>
          </motion.div>

          <motion.div
            className="footer-right"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="footer-nav-section">
              <h3 className="footer-nav-title">NAVIGATE</h3>
              <ul className="footer-nav-list">
                <li><a href="#platform">How it works</a></li>
                <li><a href="#company">The problem</a></li>
                <li><a href="#newsroom">Resources</a></li>
                <li><a href="#contact">Try now</a></li>
              </ul>
            </div>

            <div className="footer-nav-section">
              <h3 className="footer-nav-title">CONNECT</h3>
              <ul className="footer-nav-list">
                <li><a href="#linkedin">LinkedIn</a></li>
                <li><a href="#twitter">X</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="footer-brand-text">CareCompass</span>
          </div>
          <p className="footer-copyright">
            © 2026 CARE COMPASS. ALL RIGHTS RESERVED.
          </p>
          <button className="footer-scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
