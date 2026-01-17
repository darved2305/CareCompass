import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Header() {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const navVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay: 0.3 + i * 0.05,
      },
    }),
  }

  return (
    <motion.header
      className="header"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="header-logo"
        variants={logoVariants}
        whileHover="hover"
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <Logo />
          <span className="logo-text">CareCompass</span>
        </Link>
      </motion.div>
      <motion.nav
        className="header-nav"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <ul className="nav-list">
          <motion.li
            className="nav-item"
            custom={0}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="#platform" className="nav-link">HOW IT WORKS</a>
          </motion.li>
          <motion.li
            className="nav-item"
            custom={1}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="#company" className="nav-link">THE PROBLEM</a>
          </motion.li>
          <motion.li
            className="nav-item"
            custom={2}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="#newsroom" className="nav-link">RESOURCES</a>
          </motion.li>
          <motion.li
            className="nav-item"
            custom={3}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/check" className="nav-link nav-button">TRY NOW</Link>
          </motion.li>
        </ul>
      </motion.nav>
    </motion.header>
  )
}

export default Header
