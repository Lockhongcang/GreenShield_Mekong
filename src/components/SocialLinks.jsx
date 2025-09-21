import React from 'react'

export default function SocialLinks({ className = '' }) {
   return (
      <div className={`social-links ${className}`} aria-label="Liên kết mạng xã hội">
         <a className="social-btn" href="https://www.facebook.com/greenshield.mekong" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.19 8.44 9.95v-7.04H7.9v-2.91h2.4V9.84c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.53.73-1.53 1.48v1.78h2.61l-.42 2.91h-2.19v7.04c4.78-.76 8.44-4.93 8.44-9.95Z" /></svg>
         </a>
         <a className="social-btn" href="https://www.tiktok.com/@greenshield.mekong" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.66 3h2.2c.4 1.56 1.6 2.9 3.15 3.42.55.2 1.12.3 1.72.3V9c-1.73 0-3.33-.6-4.6-1.6v6.83a6.23 6.23 0 1 1-6.23-6.23c.46 0 .9.05 1.33.15v2.31a3.93 3.93 0 1 0 2.43 3.64V3Z"/>
            </svg>
         </a>
      </div>
   )
}
