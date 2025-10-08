import { useEffect } from 'react'

export default function useActiveSection(selector = '.section', options = {}) {
  const disabled = options?.disabled
  useEffect(() => {
    if (disabled) return
    const elems = Array.from(document.querySelectorAll(selector))
    if (!elems.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting) {
          el.classList.add('active')
          // also add .in to children with .fade-up etc for stagger
          el.querySelectorAll('.fade-up').forEach((c, i) => {
            setTimeout(() => c.classList.add('in'), i * 80)
          })
        } else {
          el.classList.remove('active')
          el.querySelectorAll('.fade-up').forEach(c => c.classList.remove('in'))
        }
      })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.45,
      ...options  
    })

    elems.forEach(e => observer.observe(e))
    return () => observer.disconnect()
  }, [selector, disabled])
}
