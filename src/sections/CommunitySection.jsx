// src/sections/CommunitySection.jsx
import React from 'react'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import Ticker from '../components/Ticker'

export default function CommunitySection() {
  const { t } = useTranslation()
  const items = [
    { k: 'coop' },
    { k: 'training' },
    { k: 'digital' },
    { k: 'esg' }
  ]

  return (
    <section id="community" className="section section--community">
      <div className="community-wrap">
        <div className="community-grid">
          {/* Left: stacked heading like reference */}
          <div className="community-left">
            <div className="stacked-title">
              <span>{t('community.title', { defaultValue: 'Cộng đồng' }).toUpperCase()}</span>
            </div>
          </div>
          {/* Right: split into scroller (top) + static black tile (bottom) */}
          <div className="community-right">
            <div className="community-scroller marquee">
              <div className="marquee-track">
                {[...items, ...items].map((it, idx) => (
                  <div className="community-card" key={it.k + '-' + idx} aria-hidden={idx >= items.length}>
                    <div className="card-head">
                      <button className="card-chip" type="button">
                        {t(`community.pillars.${it.k}.title`)}
                      </button>
                      <button className="arrow-btn" type="button" aria-label="Open">
                        <span className="material-symbols-rounded">arrow_outward</span>
                      </button>
                    </div>
                    <p className="card-desc">{t(`community.pillars.${it.k}.desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="community-static">
              <span className="handle">@greenmind_team</span>
            </div>
          </div>
        </div>
      </div>
      {/* Scrolling ticker for Community (bottom anchored like About/Advantages) */}
      <Ticker items={t('ticker.community', { returnObjects: true })} separator="✳" className="community-ticker" />
    </section>
  )
}
