// SplitText.jsx
// Lightweight split-text reveal using framer-motion
import React from 'react'
import { motion } from 'framer-motion'

/**
 * SplitText
 * Props:
 * - text: string to split
 * - as: wrapper tag (e.g., 'h1', 'p', 'span'). Default: 'span'
 * - type: 'words' | 'chars'. Default: 'words'
 * - className: pass-through class for wrapper
 * - delay: delay before animation starts
 * - stagger: time between children
 * - duration: per-chunk animation duration
 * - viewportOnce: animate only once when in view (default true)
 */
export default function SplitText({
	text = '',
	as = 'span',
	type = 'words',
	className,
	delay = 0,
	stagger = 0.04,
	duration = 0.6,
	viewportOnce = true,
	...rest
}) {
	const Wrapper = motion[as] || motion.span

	const chunks = React.useMemo(() => {
		if (type === 'chars') return Array.from(text)
		// keep spaces as tokens with capture group
		return text.split(/(\s+)/)
	}, [text, type])

	const container = {
		hidden: {},
		show: {
			transition: { staggerChildren: stagger, delayChildren: delay }
		}
	}

	const item = {
		hidden: { opacity: 0, y: 16 },
		show: {
			opacity: 1, y: 0,
			transition: { duration, ease: [0.22, 1, 0.36, 1] }
		}
	}

	return (
			<Wrapper
			className={className}
			variants={container}
				initial="hidden"
			whileInView="show"
			viewport={{ once: viewportOnce, amount: 0.6 }}
			{...rest}
		>
			{chunks.map((token, i) => (
				<motion.span
					key={`${token}-${i}`}
					variants={item}
					style={{ display: 'inline-block', whiteSpace: 'pre' }}
				>
					{token}
				</motion.span>
			))}
		</Wrapper>
	)
}

