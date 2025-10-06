import React from 'react'

/**
 * Reusable scrolling ticker using existing .about-ticker CSS.
 * Props:
 * - items: string[] text items to display in sequence
 * - className: additional classes (e.g., 'advantages-ticker', 'community-ticker')
 * - separator: string to render between items (e.g., '✳')
 */
export default function Ticker({ items = [], className = '', separator = '' }) {
  if (!items.length) return null

  // Build canonical pattern: item sep item sep ... item sep (final sep so loop visually seamless)
  const buildStripChildren = (repeatKey = 'a') => {
    const nodes = []
    items.forEach((txt, idx) => {
      nodes.push(<span key={`${repeatKey}-i-${idx}`}>{txt}</span>)
      nodes.push(<span className="aster" key={`${repeatKey}-s-${idx}`}>{separator || '✳'}</span>)
    })
    return nodes
  }

  const stripA = <div className="about-ticker__strip" key="strip-a">{buildStripChildren('a')}</div>
  const stripB = <div className="about-ticker__strip" key="strip-b" aria-hidden>{buildStripChildren('b')}</div>

  return (
    <div className={`about-ticker ${className}`} aria-hidden>
      <div className="about-ticker__track">
        {stripA}
        {stripB}
      </div>
    </div>
  )
}
