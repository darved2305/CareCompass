import Header from '../components/Header'
import Hero from '../components/Hero'
import VideoBackground from '../components/VideoBackground'
import WhatWeDoScroll from '../components/WhatWeDoScroll'
import IntegratedPlatform from '../components/IntegratedPlatform'
import PlatformFeatures from '../components/PlatformFeatures'
import OurCompany from '../components/OurCompany'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className="app">
      <VideoBackground />
      <div className="content-wrapper">
        <Header />
        <Hero />
      </div>
      <WhatWeDoScroll />
      <IntegratedPlatform />
      <PlatformFeatures />
      <OurCompany />
      <Footer />
    </div>
  )
}

export default HomePage
