import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const slides = [
  {
    id: 1,
    step: '01',
    text: 'In underserved communities, uncertainty about symptom urgency leads to dangerous delays. Our triage system helps people understand their risk level in under a minute, turning confusion into clear, actionable next steps.',
  },
  {
    id: 2,
    step: '02',
    text: 'Without reliable facility information, people waste critical time going to the wrong place. We match every risk level to the right facility type (clinic, hospital, or pharmacy), eliminating guesswork from the care journey.',
  },
  {
    id: 3,
    step: '03',
    text: 'Scattered, outdated listings make discovering nearby care nearly impossible. Our verified facility finder shows what is actually available nearby, with real addresses, hours, phone numbers, and services matched to your needs.',
  },
]

function WhatWeDoScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      sectionObserver.observe(containerRef.current)
    }

    return () => sectionObserver.disconnect()
  }, [])

  useEffect(() => {
    const panels = document.querySelectorAll('.whatwedo-panel')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveIndex(index)
          }
        })
      },
      { threshold: 0.6 }
    )

    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="whatwedo-section" ref={containerRef}>
      {isVisible && (
        <>
          <button className="whatwedo-button">
            <span className="whatwedo-button-square"></span>
            <span className="whatwedo-button-text">WHAT WE DO</span>
          </button>

          <div className="whatwedo-indicator">
            <span className="whatwedo-label">WHAT WE DO</span>
            <span className="whatwedo-step">
              {String(activeIndex + 1).padStart(2, '0')} / 03
            </span>
          </div>
        </>
      )}

      <div className="whatwedo-video-container">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="whatwedo-video-overlay"></div>
      </div>

      <div className="whatwedo-top-line"></div>

      <div className="whatwedo-panels">
        {slides.map((slide, index) => (
          <SlidePanel
            key={slide.id}
            slide={slide}
            index={index}
            isActive={activeIndex === index}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  )
}

interface SlidePanelProps {
  slide: typeof slides[0]
  index: number
  isActive: boolean
  prefersReducedMotion: boolean
}

function SlidePanel({ slide, index, isActive, prefersReducedMotion }: SlidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  })

  const textProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])

  return (
    <div
      ref={panelRef}
      className="whatwedo-panel"
      data-index={index}
    >
      <div className="whatwedo-panel-content">
        {prefersReducedMotion ? (
          <p className="whatwedo-text whatwedo-text-white">{slide.text}</p>
        ) : (
          <AnimatedText text={slide.text} progress={textProgress} isActive={isActive} />
        )}
      </div>
    </div>
  )
}

interface AnimatedTextProps {
  text: string
  progress: ReturnType<typeof useTransform>
  isActive: boolean
}

function AnimatedText({ text, isActive }: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <p className="whatwedo-text">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="whatwedo-word"
          initial={{ color: 'rgba(255, 255, 255, 0.35)' }}
          animate={{
            color: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.35)',
          }}
          transition={{
            duration: 0.4,
            delay: isActive ? i * 0.02 : 0,
            ease: 'easeOut',
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </p>
  )
}

export default WhatWeDoScroll
