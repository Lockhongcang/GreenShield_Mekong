import React, { useEffect, useRef, useState } from 'react'

/**
 * NumberTicker: counts from 'from' to 'to' when visible.
 * Props:
 *  - value: number (target)
 *  - from?: number (default 0)
 *  - duration?: number ms (default 1200)
 *  - decimals?: number of decimal places to show (default 0)
 *  - className?: string
 */
export default function NumberTicker({ value, from = 0, duration = 1200, decimals = 0, className = '' }) {
	const ref = useRef(null)
	const [started, setStarted] = useState(false)
	const [display, setDisplay] = useState(from)

	useEffect(() => {
		if (typeof window === 'undefined') return
		// Reduced motion: skip animation
		const media = window.matchMedia('(prefers-reduced-motion: reduce)')
		if (media.matches) {
			setDisplay(value)
			return
		}

		const root = document.querySelector('.app-scroll') || null
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !started) {
					setStarted(true)
				}
			})
		}, { root, threshold: 0.4 })

		if (ref.current) obs.observe(ref.current)
		return () => obs.disconnect()
	}, [started, value])

	useEffect(() => {
		if (!started) return
		let frameId
		const startTs = performance.now()
		const fromVal = Number(from) || 0
		const toVal = Number(value) || 0
		const run = (ts) => {
			const t = Math.min(1, (ts - startTs) / duration)
			// easeOutCubic
			const eased = 1 - Math.pow(1 - t, 3)
			const v = fromVal + (toVal - fromVal) * eased
			setDisplay(v)
			if (t < 1) frameId = requestAnimationFrame(run)
		}
		frameId = requestAnimationFrame(run)
		return () => cancelAnimationFrame(frameId)
	}, [started, value, from, duration])

	const formatted = Number(display).toLocaleString(undefined, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	})

	return <span ref={ref} className={className}>{formatted}</span>
}

