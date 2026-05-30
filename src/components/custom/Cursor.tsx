"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // Only add mouse listener if not mobile
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  // Don't render cursor on mobile
  if (isMobile) return null

  return (
    <motion.div 
      animate={{ 
        x: position.x - 10,
        y: position.y - 10 
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
      className='cursor fixed top-0 left-0 size-5 bg-white rounded-full pointer-events-none z-50'
    />
  )
}

export default Cursor