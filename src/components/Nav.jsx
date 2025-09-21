// src/components/Nav.jsx
import React, { useEffect, useMemo, useState } from 'react'
import LanguageToggle from './LanguageToggle'
import { useTranslation } from 'react-i18next'

const links = [
  { id: 'home', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'products', labelKey: 'nav.products' },
  { id: 'advantages', labelKey: 'nav.advantages' },
  { id: 'mission', labelKey: 'nav.mission' },
  { id: 'community', labelKey: 'nav.community' },
  { id: 'contact', labelKey: 'nav.contact' },
]

export default function Nav() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState('home')
  const [open, setOpen] = useState(false)
  const isNarrow = useMemo(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.6 } // 60% section trong viewport thì tính là active
    )

    links.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  if (isNarrow) {
    return (
      <nav aria-label="Main navigation" className="nav-mobile">
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(v => !v)}>
          <span className="material-symbols-rounded">menu</span>
        </button>
        {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
        <aside className={`nav-drawer ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
          <div className="nav-drawer__head">
            <button className="burger close" aria-label="Close" onClick={() => setOpen(false)}>
              <span className="material-symbols-rounded">close</span>
            </button>
          </div>
          <ul className="nav-drawer__list">
            {links.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="nav-link" onClick={() => setOpen(false)}>
                  {t(l.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-drawer__lang">
            <LanguageToggle />
          </div>
        </aside>
      </nav>
    )
  }

  return (
    <nav aria-label="Main navigation">
      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map(l => (
          <li key={l.id}>
            <a href={`#${l.id}`} className={activeId === l.id ? 'nav-link active' : 'nav-link'} style={{ textDecoration: 'none', color: 'var(--color-dark)' }}>
              {t(l.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
