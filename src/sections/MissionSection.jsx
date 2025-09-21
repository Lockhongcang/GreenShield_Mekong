import React from 'react'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import mascot from '../assets/mascot-gsm-01.png'

export default function MissionSection(){
  const { t } = useTranslation()
  const tiles = [
    { key: 'a', variant: 'media', bg: "url('/src/assets/mission.jpg')" },
    { key: 'b', variant: 'lime' },
    { key: 'c', variant: 'soft' },
    { key: 'd', variant: 'dark' }
  ]
  return (
    <section id="mission" className="section section--mission">
      <div className="mission-wrap">
        <Typography.Title level={2} style={{ color: 'var(--color-dark)' ,fontWeight: 800}} className="fade-up">{t('mission.title')||'Our Mission'}</Typography.Title>

        {/* Impact-style bento grid inside Mission */}
        <div className="impact-grid fade-up">
          {tiles.map((td, idx) => {
            const base = `impact-tile impact-${td.variant}`
            const kicker = t(`impact.${td.key}.kicker`)
            const value = t(`impact.${td.key}.value`)
            const label = t(`impact.${td.key}.label`)
            const desc = t(`impact.${td.key}.desc`)
            return (
              <div key={idx} className={base} style={td.bg ? { backgroundImage: td.bg } : undefined}>
                <div className="impact-inner">
                  <div className="impact-kicker">{kicker}</div>
                  <div className="impact-value">{value}{td.key==='b' && <span className="impact-suffix">+</span>}</div>
                  <div className="impact-label">{label}</div>
                  <div className="impact-desc">{desc}</div>
                  {td.variant==='lime' && (
                    <button className="impact-cta" aria-label="go"><span className="material-symbols-rounded">north_east</span></button>
                  )}
                </div>
              </div>
            )
          })}
          <img src={mascot} alt="Mascot" className="impact-mascot" aria-hidden />
        </div>
      </div>
    </section>
  )
}
