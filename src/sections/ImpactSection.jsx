import React from 'react'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import mascot from '../assets/mascot-gsm-01.png'

// Impact section: headline + 4-tile bento inspired by reference
export default function ImpactSection(){
  const { t } = useTranslation()

  const tiles = [
    { key: 'a', variant: 'media', bg: "url('/src/assets/mission.jpg')" },
    { key: 'b', variant: 'lime' },
    { key: 'c', variant: 'soft' },
    { key: 'd', variant: 'dark' }
  ]

  return (
    <section id="impact" className="section section--impact">
      <div className="impact-wrap">
        <Typography.Title level={2} className="impact-title">
          {t('impact.title')}
        </Typography.Title>

        <div className="impact-grid">
          {tiles.map((tdef, idx) => {
            const base = `impact-tile impact-${tdef.variant}`
            const kicker = t(`impact.${tdef.key}.kicker`)
            const value = t(`impact.${tdef.key}.value`)
            const label = t(`impact.${tdef.key}.label`)
            const desc = t(`impact.${tdef.key}.desc`)
            return (
              <div key={idx} className={base} style={tdef.bg ? { backgroundImage: tdef.bg } : undefined}>
                <div className="impact-inner">
                  <div className="impact-kicker">{kicker}</div>
                  <div className="impact-value">{value}{tdef.key==='b' && <span className="impact-suffix">+</span>}</div>
                  <div className="impact-label">{label}</div>
                  <div className="impact-desc">{desc}</div>
                  {tdef.variant==='lime' && (
                    <button className="impact-cta" aria-label="go">
                      <span className="material-symbols-rounded">north_east</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          {/* Absolute mascot overlay covering the empty space */}
          <img src={mascot} alt="Mascot" className="impact-mascot" aria-hidden />
        </div>
      </div>
    </section>
  )
}
