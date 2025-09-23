import React, { useEffect, useState } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const container = document.querySelector('.app-scroll')
    const getY = () => {
      const c = document.querySelector('.app-scroll')
      const cy = c ? c.scrollTop : 0
      const wy = window.scrollY || window.pageYOffset || 0
      return Math.max(cy, wy)
    }
  const onScroll = () => setShow(getY() > 60)

    // Listen on both to be safe across browsers/devices
    const listeners = []
    if (container) {
      container.addEventListener('scroll', onScroll, { passive: true })
      listeners.push({ target: container, handler: onScroll })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    listeners.push({ target: window, handler: onScroll })

    onScroll()
    return () => {
      listeners.forEach(({ target, handler }) => target.removeEventListener('scroll', handler))
    }
  }, [])

  // Fallback/robustness: observe the Home section visibility using the scroll container as root
  useEffect(() => {
    const container = document.querySelector('.app-scroll')
    const home = document.getElementById('home')
    if (!home) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        // Show when home is not almost fully visible (less than ~98% in view)
        const mostlyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.98
        setShow(!mostlyVisible)
      },
      { root: container || null, threshold: [0, 0.5, 0.85, 0.98, 1], rootMargin: '0px 0px 0px 0px' }
    )
    observer.observe(home)
    return () => observer.disconnect()
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    const container = document.querySelector('.app-scroll')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <a
      href="#home"
      onClick={handleClick}
      className={`back-to-top ${show ? 'is-visible' : ''}`}
      aria-label="Back to top"
      aria-hidden={show ? 'false' : 'true'}
      tabIndex={show ? 0 : -1}
    >
      <span className="material-symbols-rounded">arrow_upward</span>
    </a>
  )
}
