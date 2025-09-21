import React from 'react'

/**
 * Reusable scrolling ticker using existing .about-ticker CSS.
 * Props:
 * - items: string[] text items to display in sequence
 * - className: additional classes (e.g., 'advantages-ticker', 'community-ticker')
 * - separator: string to render between items (e.g., '✳')
 */
export default function Ticker({ items = [], className = '', separator = '' }) {
  const sequence = []
  items.forEach((txt, idx) => {
    sequence.push(<span key={`i-${idx}`}>{txt}</span>)
    if (separator && idx < items.length - 1) {
      sequence.push(<span className="aster" key={`s-${idx}`}>{separator}</span>)
    }
  })
  // duplicate the sequence to make each strip long enough
  const stripContent = (
    <div className="about-ticker__strip">
      {sequence}
      {sequence}
    </div>
  )
  return (
    <div className={`about-ticker ${className}`} aria-hidden>
      <div className="about-ticker__track">
        {stripContent}
        {React.cloneElement(stripContent, { 'aria-hidden': true })}
      </div>
    </div>
  )
}
