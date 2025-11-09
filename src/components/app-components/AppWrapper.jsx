import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import Navbar from '@/components/Navbar.jsx'

const AppWrapper = ({ children }) => {
  const transionRef = useRef()

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  })

  useGSAP(() => {
    gsap.fromTo(
      transionRef.current,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 100%)',
        duration: 1,
        ease: 'power2.inOut',
      }
    )
  }, [])

  return (
    <>
      <div ref={transionRef} className='absolute inset-0 bg-main/50 backdrop-blur-3xl z-60' />

      {useLocation().pathname !== '/*' && <Navbar />}
      {children}
      <span className='absolute bottom-1 right-2 text-main/40 text-xs'>Made by NGM</span>
    </>
  )
}

export default AppWrapper
