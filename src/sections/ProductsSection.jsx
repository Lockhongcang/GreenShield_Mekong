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
  { key:'collect', img:'/src/assets/step1.jpg', label:'Thu gom', desc:'Lục bình, bã mía và giấy tái chế được thu thập từ địa phương.' },
  { key:'process', img:'/src/assets/step2.jpg', label:'Sơ chế', desc:'Nguyên liệu được làm sạch, nghiền nhỏ và phối trộn theo tỉ lệ.' },
  { key:'mold', img:'/src/assets/step3.jpg', label:'Ép khuôn', desc:'Hỗn hợp được đưa vào khuôn để tạo hình (khay, hộp, tấm lót).' },
  { key:'coat', img:'/src/assets/step4.jpg', label:'Phủ bảo vệ', desc:'Phủ lớp sáp ong tự nhiên để tăng khả năng chống ẩm và bền hơn.' },
  { key:'pack', img:'/src/assets/step5.jpg', label:'Đóng gói & phân phối', desc:'Sản phẩm hoàn thiện được kiểm tra, đóng gói và giao đến khách hàng.' },
]

export default function ProductsSection(){
  const { t } = useTranslation()
  return (
    <section id="products" className="section">
      <div style={{maxWidth:1200, width:'100%'}}>
        <Typography.Title level={1} className="fade-up" style={{textAlign:'center', fontWeight: 'bold', marginBottom: 0 }}>
          {t('products.title')}
        </Typography.Title>
        {/* Stack gallery - 5 bước quy trình (giữ phần dưới, bỏ gallery trên) */}
        <Typography.Title level={4} style={{textAlign:'center', fontWeight: '400', margin: '0 0 2rem 0'}}>{t('products.stepsTitle')}</Typography.Title>
        <div className="stack-gallery steps fade-up">
          {steps.map((s, idx)=> ( 
            <article
              key={s.key}
              className={`stack-card ${idx===0?'is-default':''}`}
              style={{ backgroundImage: `url(${s.img})`, backgroundSize:'cover', backgroundPosition:'center' }}
            >
              <div className="steps-badge">{idx+1}</div>
              <div className="stack-card__overlay">
                <Typography.Title level={3} style={{margin:0, color:'#fff', fontWeight: '700'}}>{s.label}</Typography.Title>
                <Typography.Paragraph style={{margin:'6px 0 0', color:'#fff'}}>{s.desc}</Typography.Paragraph>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
