import React, { useEffect, useState } from 'react'
import useActiveSection from './hooks/useActiveSection'
import Nav from './components/Nav'
import LanguageToggle from './components/LanguageToggle'
import HomeSection from './sections/HomeSection'
import AboutSection from './sections/AboutSection'
import ProductsSection from './sections/ProductsSection'
import AdvantagesSection from './sections/AdvantagesSection'
import MissionSection from './sections/MissionSection'
import ContactSection from './sections/ContactSection'
import CommunitySection from './sections/CommunitySection'
import logo from './assets/logo.png';
import BackToTop from './components/BackToTop'

function App() {
  // activates .active on .section elements (skip on narrow screens)
  const [enableAnim, setEnableAnim] = useState(true)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEnableAnim(window.innerWidth >= 1024)
    }
  }, [])
  useActiveSection('.section', { threshold: 0.45, disabled: !enableAnim })

  return (
    <>
      <header className="header">
        <div className='header-logo'>
          <img src={logo} alt="greenshield logo" width="24" />
        </div>

        <div className='header-nav'>
          <Nav />
        </div>

        <div className='header-lang'>
          <LanguageToggle />
        </div>
      </header>

      <main className="app-scroll" aria-label="Main content">
        <HomeSection />
        <AboutSection />
        <ProductsSection />
        <AdvantagesSection />
        <MissionSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <BackToTop />
    </>
  )
}

export default App
