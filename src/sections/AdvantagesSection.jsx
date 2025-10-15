import React, { useEffect, useRef } from 'react'

export default function AdvantagesSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const section = vid.closest('.section')
    const root = document.querySelector('.app-scroll') || null
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        vid.play().catch(() => {})
      } else {
        vid.pause()
      }
    }, { root, threshold: 0.45 })
    observer.observe(section || vid)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="advantages" className="section section--advantages">
      <div className="advantages-video" aria-label="Advantages intro video">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dnini39bp/video/upload/v1760519256/Intro-02_w2ktdr.mp4"
          muted
          playsInline
          loop
          preload="metadata"
        />
      </div>
    </section>
  )
}
