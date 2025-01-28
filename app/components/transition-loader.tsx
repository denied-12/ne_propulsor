'use client'

import { useEffect, useState } from 'react'

export default function TransitionLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500) // Animation will show for 1.5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Outer square */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-[#E6007E] rounded-sm transform rotate-45 animate-spin-slow origin-center"></div>
        </div>

        {/* Middle square */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#FF4DB8] rounded-sm transform rotate-45 animate-spin-slower origin-center"></div>
        </div>

        {/* Inner square */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-[#FF99D6] rounded-sm transform rotate-45 animate-spin-slowest origin-center"></div>
        </div>
      </div>
    </div>
  )
}
