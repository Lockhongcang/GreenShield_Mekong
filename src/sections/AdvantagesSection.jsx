import React from 'react'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import mascot from '../assets/mascot-gsm.PNG'
import Ticker from '../components/Ticker'

// Advantages: 2-column layout — left mascot, right bento board (2 items on first row, 3 on second)
export default function AdvantagesSection() {
  const { t } = useTranslation()

  const features = [
    {
      icon: 'verified',
      title: t('advantages.feature1.title', { defaultValue: 'Chứng nhận chuyên gia' }),
      desc: t('advantages.feature1.desc', { defaultValue: 'Quy trình được cố vấn bởi chuyên gia vật liệu sinh học & nông nghiệp.' })
    },
    {
      icon: 'insights',
      title: t('advantages.feature2.title', { defaultValue: 'Hiệu quả đã kiểm chứng' }),
      desc: t('advantages.feature2.desc', { defaultValue: 'Giảm hao hụt sau thu hoạch, duy trì chất lượng nông sản tốt hơn.' })
    },
    {
      icon: 'workspace_premium',
      title: t('advantages.feature3.title', { defaultValue: 'Giải pháp đoạt giải' }),
      desc: t('advantages.feature3.desc', { defaultValue: 'Được các quỹ đổi mới và cộng đồng khởi nghiệp ghi nhận.' })
    },
    {
      icon: 'group',
      title: t('advantages.feature4.title', { defaultValue: 'Đồng hành địa phương' }),
      desc: t('advantages.feature4.desc', { defaultValue: 'Hợp tác xã nông dân tham gia, tạo việc làm tại chỗ.' })
    },
    {
      icon: 'public',
      title: t('advantages.feature5.title', { defaultValue: 'Hướng tới tiêu chuẩn quốc tế' }),
      desc: t('advantages.feature5.desc', { defaultValue: 'Tương thích yêu cầu xanh của EU/Japan/US trong chuỗi cung ứng.' })
    }
  ]

  // split into 2 rows: [0,1] and [2,3,4]
  const row1 = features.slice(0, 2)
  const row2 = features.slice(2)

  return (
    <section id="advantages" className="section section--advantages">
      <div className="advantages-bento">
        <div className="advantages-grid">
          {/* Left mascot */}
          <div className="advantages-media">
            <div className="media-tile media-mascot" aria-hidden="true">
              <img src={mascot} alt="Mascot" loading="lazy" />
            </div>
          </div>

          {/* Right board: two rows (2 then 3 items) */}
          <div className="advantages-board">
            <div className="advantages-header">
              <Typography.Title level={2} style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: 0 }}>
                {t('advantages.title', { defaultValue: 'Vì sao khách hàng tin chọn GreenShield Mekong' })}
              </Typography.Title>
            </div>

            <div className="board-row board-row--two">
              {row1.map((f, idx) => (
                <div className="adv-card puzzle" key={`r1-${idx}`}>
                  <div className="adv-head">
                    <h4 className="adv-title">{f.title}</h4>
                    <span className="material-symbols-rounded adv-icon" aria-hidden="true">{f.icon}</span>
                  </div>
                  <div className="adv-body">
                    <span className="vr" aria-hidden="true" />
                    <p className="adv-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="board-row board-row--three">
              {row2.map((f, idx) => (
                <div className="adv-card puzzle" key={`r2-${idx}`}>
                  <div className="adv-head">
                    <h4 className="adv-title">{f.title}</h4>
                    <span className="material-symbols-rounded adv-icon" aria-hidden="true">{f.icon}</span>
                  </div>
                  <div className="adv-body">
                    <span className="vr" aria-hidden="true" />
                    <p className="adv-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling ticker reused from About */}
        <Ticker items={t('ticker.advantages', { returnObjects: true })} separator="✳" className="advantages-ticker" />
      </div>
    </section>
  )
}
