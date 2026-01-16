import { motion } from 'framer-motion'

const features = [
  {
    id: 1,
    number: '01.',
    title: 'Triage',
    description: 'Quickly assess urgency and get a clear risk level with red-flag warnings.',
    bgColor: '#c8f560',
    textColor: '#0a0a0a',
  },
  {
    id: 2,
    number: '02.',
    title: 'Facility Finder',
    description: 'See nearby clinics, hospitals, and pharmacies matched to the risk level, with hours and contact details.',
    bgColor: '#1a2a2a',
    textColor: '#ffffff',
  },
  {
    id: 3,
    number: '03.',
    title: 'Referral Note',
    description: 'Download a simple referral PDF with symptoms, risk level, red flags, and timestamp (not a diagnosis).',
    bgColor: '#e8e8e8',
    textColor: '#0a0a0a',
  },
]

function PlatformFeatures() {
  return (
    <section className="platform-features">
      <div className="platform-features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="platform-feature-card"
            style={{
              backgroundColor: feature.bgColor,
              color: feature.textColor,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: 'easeOut',
            }}
          >
            <div className="platform-feature-number">{feature.number}</div>
            <div className="platform-feature-icon">
              {feature.id === 1 && (
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[...Array(24)].map((_, i) => {
                    const angle = (i * 15 * Math.PI) / 180
                    const x1 = 60 + Math.cos(angle) * 25
                    const y1 = 60 + Math.sin(angle) * 25
                    const x2 = 60 + Math.cos(angle) * 45
                    const y2 = 60 + Math.sin(angle) * 45
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    )
                  })}
                </svg>
              )}
              {feature.id === 2 && (
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[...Array(6)].map((_, i) => (
                    <polygon
                      key={i}
                      points="60,20 90,35 90,65 60,80 30,65 30,35"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      transform={`scale(${1 - i * 0.15}) translate(${i * 2}, ${i * 2})`}
                      style={{ transformOrigin: '60px 50px' }}
                    />
                  ))}
                </svg>
              )}
              {feature.id === 3 && (
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[...Array(4)].map((_, i) => {
                    const offset = i * 15
                    return (
                      <g key={i}>
                        <line
                          x1={30 + offset}
                          y1={35 + offset}
                          x2={90 - offset}
                          y2={35 + offset}
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1={30 + offset}
                          y1={60}
                          x2={90 - offset}
                          y2={60}
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1={30 + offset}
                          y1={85 - offset}
                          x2={90 - offset}
                          y2={85 - offset}
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </g>
                    )
                  })}
                </svg>
              )}
            </div>
            <h3 className="platform-feature-title">{feature.title}</h3>
            <p className="platform-feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PlatformFeatures
