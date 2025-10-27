import React from 'react'
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
import logolg from './assets/logo-lg.png';
import BackToTop from './components/BackToTop'
import ChatWidget from './components/ChatWidget'

function App() {

  return (
    <>
      <header className="header">
        <div className='header-logo'>
          <img src={logo} alt="greenshield logo" width="24" />
          <img className="logo-lg" src={logolg} alt="greenshield name" width="100" />
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
      <ChatWidget />
      <BackToTop />
    </>
  )
}

export default App
