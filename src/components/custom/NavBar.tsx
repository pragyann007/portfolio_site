"use client"
import { motion } from "motion/react"
import { Link } from 'next-view-transitions'
import React, { useState, useEffect, useRef } from 'react'
import { Download, Menu, X } from "lucide-react"
import { LiquidButton } from '../animate-ui/components/buttons/liquid'

const NavBar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [age, setAge] = useState({ years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
  const menuRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0 })

  const menues = [
    { name: "Home", link: "/" },
    // { name: "About", link: "/about" },
    { name: "My Works", link: "/works" },
    { name: "Blog", link: "/blogs" },
    // { name: "Contact", link: "/contact" }
  ]

  // Calculate age with live updates
  useEffect(() => {
    const calculateAge = () => {
      const dob = new Date(2007, 7, 2)
      const now = new Date()
      const diff = now.getTime() - dob.getTime()

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
      const weeks = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setAge({ years, months, weeks, days, hours, minutes, seconds })
    }

    calculateAge()
    const interval = setInterval(calculateAge, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    const element = menuRefs.current[index]
    if (element) {
      setHoverStyle({
        left: element.offsetLeft,
        width: element.offsetWidth
      })
    }
  }

  return (
    <div className='p-4 md:p-8'>
      {/* Desktop Navbar */}
      <motion.div 
        className="navbar hidden lg:flex px-6 py-4 border border-border-custom bg-surface shadow-xl rounded-2xl justify-between items-center relative overflow-visible gap-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Glassy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-soft via-transparent to-neon-soft opacity-30 pointer-events-none rounded-2xl" />

        {/* Logo */}
        <motion.div 
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className='text-3xl font-bebas bg-gradient-to-r from-green-400 via-white to-neutral-300 bg-clip-text cursor-pointer  text-transparent font-bold'>
            PRAGYAN
          </h2>
        </motion.div>

        {/* Menu Items */}
        <div className="flex-1 flex justify-center ml-40   items-center gap-1 text-lg relative">
          {hoveredIndex !== null && (
            <motion.div
              layoutId="hoverBackground"
              className="absolute bg-neon-soft rounded-lg z-0 border border-accent-green/10"
              initial={false}
              animate={{
                left: hoverStyle.left,
                width: hoverStyle.width,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
              style={{
                height: "100%",
              }}
            />
          )}

          {menues.map((menue, idx) => (
            <div
              key={idx}
              ref={(el) => { menuRefs.current[idx] = el }}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={menue.link} className="relative block px-4 py-2">
                <motion.h3 
                  className={`relative z-10 font-bebas transition-all duration-200 ${
                    hoveredIndex === idx 
                      ? 'text-accent-green scale-105' 
                      : 'text-text-secondary'
                  }`}
                >
                  {menue.name}
                </motion.h3>
              </Link>
            </div>
          ))}
        </div>

        {/* Age Counter */}
        <motion.div 
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-neon-soft to-transparent rounded-lg border border-accent-green/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: age.years, label: 'Y' },
            { value: age.months, label: 'M' },
            { value: age.weeks, label: 'W' },
            { value: age.days, label: 'D' },
            { value: age.hours, label: 'H' },
            { value: age.minutes, label: 'Min' },
            { value: age.seconds, label: 'S' },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <motion.span 
                  className="text-xs font-bold font-mono bg-gradient-to-br from-accent-green to-neon-green bg-clip-text text-transparent"
                  key={item.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>
                <span className="text-[9px] text-text-secondary font-sans">{item.label}</span>
              </div>
              {idx < 6 && <span className="text-text-secondary text-xs">:</span>}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Resume Button */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <LiquidButton 
  variant={"destructive"} 
  onClick={() => {
    const link = document.createElement('a')
    link.href = '/resume.pdf' // or whatever your file name is
    link.download = 'Pragyan_Thapaliya_Resume.pdf' // the name it will be saved as
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }}
  className='text-lg font-sans cursor-pointer px-6 py-3 rounded-lg w-full !bg-white hover:!bg-white/90 !text-bg shadow-lg shadow-white/20 transition-colors font-semibold'
>
  Resume <Download className='inline-block ml-2' size={18} />
</LiquidButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div 
        className="navbar lg:hidden px-6 py-4 border border-border-custom bg-surface shadow-lg rounded-2xl relative overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="flex justify-between items-center">
        <h2 className='text-3xl font-bebas bg-gradient-to-r from-green-400 via-white to-neutral-300 bg-clip-text cursor-pointer  text-transparent font-bold'>
            PRAGYAN
          </h2>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neon-soft text-text-primary border border-accent-green/20"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Age Display Mobile */}
        <div className="mt-3 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-neon-soft to-transparent rounded-lg border border-accent-green/20">
          {[
            { value: age.years, label: 'Y' },
            { value: age.months, label: 'M' },
            { value: age.weeks, label: 'W' },
            { value: age.days, label: 'D' },
            { value: age.hours, label: 'H' },
            { value: age.minutes, label: 'Min' },
            { value: age.seconds, label: 'S' },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <motion.span 
                  className="text-[10px] font-bold font-mono bg-gradient-to-br from-accent-green to-neon-green bg-clip-text text-transparent"
                  key={item.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>
                <span className="text-[8px] text-text-secondary font-sans">{item.label}</span>
              </div>
              {idx < 6 && <span className="text-text-secondary text-[10px]">:</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col gap-3 mt-6 pb-4">
            {menues.map((menue, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: mobileMenuOpen ? 0 : -20,
                  opacity: mobileMenuOpen ? 1 : 0
                }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  href={menue.link} 
                  className="block px-4 py-3 rounded-lg bg-neon-soft hover:bg-accent-green/30 transition-colors font-bebas text-lg text-text-primary border border-accent-green/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {menue.name}
                </Link>
              </motion.div>
            ))}
            
            <LiquidButton 
  variant={"destructive"} 
  className='text-lg font-sans cursor-pointer px-6 py-3 rounded-lg w-full !bg-white hover:!bg-white/90 !text-bg shadow-lg shadow-white/20 transition-colors font-semibold'
>
  Resume <Download className='inline-block ml-2' size={18} />
</LiquidButton>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NavBar