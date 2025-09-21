// src/sections/HomeSection.jsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import hero from '../assets/logo-fade.png'

export default function HomeSection() {
  const { t } = useTranslation()
  return (
    <section id="home" className="section" role="region" aria-label={t('home.title')}>
      <div className="banner">
        <div className="banner-content">
          <h1 className="fade-up">{t('home.title')}</h1>
          <p className="fade-up">{t('home.subtitle')}</p>
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'row' , gap: '1rem'}}>
            <a className="btn btn-primary" href="#products">{t('cta.explore')}
              <span className="material-symbols-rounded">
                arrow_outward
              </span>
            </a>
            <a className="btn btn-transparent" href="#contact">{t('cta.contact')}</a>
          </div>
        </div>
        <div className="banner-content fade-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={hero} alt={t('home.bannerAlt')} style={{ maxWidth: '100%', height: 'auto' , opacity: '0.5' }} />
        </div>
      </div>
    </section>
  )
}
