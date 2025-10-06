import React, { useEffect, useRef } from 'react'

/**
 * Reusable scrolling ticker using existing .about-ticker CSS.
 * Props:
 * - items: string[] text items to display in sequence
 * - className: additional classes (e.g., 'advantages-ticker', 'community-ticker')
 * - separator: string to render between items (e.g., '✳')
 */
export default function Ticker({ items = [], className = '', separator = '✳', speed = 40 }) {
  // speed: pixels per second
  const trackRef = useRef(null)
  const mounted = useRef(false)

  // Build base sequence: item * item * ... (no clone needed — we recycle nodes)
  const renderItems = () => {
    const seq = []
    items.forEach((txt, idx) => {
      seq.push(<span data-type="item" key={`t-${idx}`}>{txt}</span>)
      seq.push(<span data-type="sep" className="aster" key={`s-${idx}`}>{separator}</span>)
    })
    return seq
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track || !items.length) return
    let lastTs = null
    let offset = 0
    let raf

    // Ensure we have enough width to cover at least 2x viewport for smoothness
    // Duplicate initial sequence if width smaller than container width * 2
    const ensureFill = () => {
      const containerWidth = track.parentElement?.offsetWidth || 0
      while (track.scrollWidth < containerWidth * 2 && track.children.length < items.length * 6) {
        for (let i = 0; i < track.children.length; i++) {
          const clone = track.children[i].cloneNode(true)
          track.appendChild(clone)
        }
      }
    }
    ensureFill()

    const step = (ts) => {
      if (lastTs != null) {
        const dt = (ts - lastTs) / 1000 // seconds
        offset -= speed * dt
        // While we've moved past first child, recycle it
        let first = track.firstElementChild
        while (first && offset <= -first.offsetWidth) {
          offset += first.offsetWidth
          track.appendChild(first)
          first = track.firstElementChild
        }
        track.style.transform = `translateX(${offset}px)`
      }
      lastTs = ts
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    mounted.current = true
    return () => cancelAnimationFrame(raf)
  }, [items, speed])

  return (
    <div className={`about-ticker ${className}`} aria-hidden>
      <div className="about-ticker__track ticker-track--js" ref={trackRef} style={{ animation: 'none' }}>
        {renderItems()}
      </div>
    </div>
  )
}
