import { useEffect, useState } from 'react'

// Observe sections to set .active and trigger child animations. Returns current active section id.
export default function useActiveSection(selector = '.section', options = {}) {
  const [activeId, setActiveId] = useState('')
  const disabled = options?.disabled

  useEffect(() => {
    if (disabled) return
    const elems = Array.from(document.querySelectorAll(selector))
    if (!elems.length) return

    const root = options.root ?? document.querySelector('.app-scroll') ?? null
    const threshold = options.threshold ?? 0.55

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting) {
          el.classList.add('active')
          // Stagger reveal for elements marked with .fade-up
          const children = el.querySelectorAll('.fade-up')
          children.forEach((c, i) => {
            // Only add once
            if (!c.classList.contains('in')) {
              setTimeout(() => c.classList.add('in'), i * 80)
            }
          })
          if (el.id) setActiveId(el.id)
        } else {
          el.classList.remove('active')
          // Keep items revealed once; if you prefer re-animate on scroll out/in, uncomment next line
          // el.querySelectorAll('.fade-up').forEach(c => c.classList.remove('in'))
        }
      })
    }, { root, rootMargin: '0px', threshold })

    elems.forEach(e => observer.observe(e))
    return () => observer.disconnect()
  }, [selector, disabled, options.root, options.threshold])

  return activeId
}
