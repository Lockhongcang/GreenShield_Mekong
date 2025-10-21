import React from 'react'
import { Typography, Space } from 'antd'
import { useTranslation } from 'react-i18next'

const MSRIcon = ({ name, color = 'var(--color-bg)', size = 32 }) => (
  <span
    className="material-symbols-rounded"
    aria-hidden
    style={{ fontSize: size, lineHeight: 1, color, backgroundColor: 'var(--color-primary)', borderRadius: '50%', padding: 8 }}
  >
    {name}
  </span>
)

const steps = [
  { key:'collect', img:'https://res.cloudinary.com/dnini39bp/image/upload/fl_preserve_transparency/v1760540732/IMG_4283_bi5hjv.jpg?_s=public-apps' },
  { key:'process', img:'https://res.cloudinary.com/dnini39bp/image/upload/fl_preserve_transparency/v1760540731/IMG_3692_new_xdyohd.jpg?_s=public-apps' },
  { key:'mold',    img:'https://res.cloudinary.com/dnini39bp/image/upload/fl_preserve_transparency/v1760574019/IMG_3699_new_t6rk5v.jpg?_s=public-apps' },
  { key:'coat',    img:'https://res.cloudinary.com/dnini39bp/image/upload/fl_preserve_transparency/v1758473922/step3_b6mhei.jpg?_s=public-apps' },
  { key:'pack',    img:'https://res.cloudinary.com/dnini39bp/image/upload/fl_preserve_transparency/v1760540733/IMG_3920-da_ch%E1%BB%89nh_hfotmm.jpg?_s=public-apps' },
]

export default function ProductsSection(){
  const { t } = useTranslation()
  return (
    <section id="products" className="section">
      <div style={{maxWidth:1200, width:'100%'}}>
        <Typography.Title level={1} style={{textAlign:'center', fontWeight: 'bold', marginBottom: 0 }}>
          {t('products.title')}
        </Typography.Title>
        {/* Stack gallery - 5 bước quy trình (giữ phần dưới, bỏ gallery trên) */}
        <Typography.Title level={4} style={{textAlign:'center', fontWeight: '400', margin: '0 0 2rem 0'}}>{t('products.stepsTitle')}</Typography.Title>
        <div className="stack-gallery steps">
          {steps.map((s, idx)=> { 
            const label = t(`products.steps.${idx}.label`, { defaultValue: '' })
            const desc = t(`products.steps.${idx}.desc`, { defaultValue: '' })
            return (
            <article
              key={s.key}
              className={`stack-card ${idx===0?'is-default':''}`}
              style={{ backgroundImage: `url(${s.img})`, backgroundSize:'cover', backgroundPosition:'center' }}
            >
              <div className="steps-badge">{idx+1}</div>
              <div className="stack-card__overlay">
                <Typography.Title level={3} style={{margin:0, color:'#fff', fontWeight: '700'}}>{label}</Typography.Title>
                <Typography.Paragraph style={{margin:'6px 0 0', color:'#fff'}}>{desc}</Typography.Paragraph>
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
