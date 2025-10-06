// src/sections/CommunitySection.jsx
import React, { useRef, useEffect, useState } from 'react'
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
  // duplicate for seamless marquee loop
  const loopItems = [...items, ...items]
  const scrollerRef = useRef(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let frame
    const speed = 0.35 // px per frame ~21px/s at 60fps
    const step = () => {
      if (!paused) {
        el.scrollLeft += speed
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) {
          // loop smoothly without visual jump
            el.scrollLeft -= half
        }
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [paused])

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
            <div
              className="community-scroller auto-marquee"
              ref={scrollerRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              {loopItems.map((it, idx) => (
                <div className="community-card" key={`${it.k}-${idx}`}> 
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
