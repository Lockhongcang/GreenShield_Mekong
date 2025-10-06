import React from 'react'

// Simpler original-style SocialLinks: just a row of icon buttons
export default function SocialLinks({
  className = '',
  links = [
    { id: 'fb', label: 'Facebook', icon: 'public', href: 'https://facebook.com', title: 'Facebook' },
    { id: 'yt', label: 'YouTube', icon: 'play_circle', href: 'https://youtube.com', title: 'YouTube' },
    { id: 'in', label: 'LinkedIn', icon: 'business_center', href: 'https://linkedin.com', title: 'LinkedIn' },
  ]
}) {
  return (
    <div className={`social-links ${className}`}>
      {links.map(l => (
        <a
          key={l.id}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title={l.title}
          aria-label={l.label}
        >
          <span className="material-symbols-rounded" aria-hidden="true">{l.icon}</span>
        </a>
      ))}
    </div>
  )
}
