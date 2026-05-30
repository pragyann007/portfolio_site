import BlogsSection from '@/components/custom/BlogsSection'
import ContactSection from '@/components/custom/ContactSection'
import Cursor from '@/components/custom/Cursor'
import Hero from '@/components/custom/Hero'
import NavBar from '@/components/custom/NavBar'
import Projects from '@/components/custom/Projects'
import Skills from '@/components/custom/Skills'
import SlidingText from '@/components/custom/SlidingText'
import SocialCredibility from '@/components/custom/SocialCredibility'
import Timeline from '@/components/custom/Timeline'
import { Link } from 'next-view-transitions'
import React from 'react'

const page = () => {
  return (
    <div className='bg-bg-light p-8 overflow-x-hidden ' >
      <Hero/>
      <SocialCredibility/>
      <Skills/>
      <Projects/>
      <Timeline/>
      <BlogsSection/>
      <ContactSection/>
    </div>
  )
}

export default page