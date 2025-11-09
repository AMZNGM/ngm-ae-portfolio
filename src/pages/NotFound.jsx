import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import TextFlipper from '@/components/ui/text/TextFlipper'
import Noise from '@/components/ui/effect/Noise'

const NotFound = () => {
  const contentRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      }
    )
  }, [contentRef])

  return (
    <section className='relative w-screen h-screen overflow-hidden flex items-center justify-center bg-bg text-text font-fake py-12 px-4'>
      <Noise className={`opacity-35`} />
      <div ref={contentRef} className='text-center max-w-md border border-b-0 border-main p-1'>
        <h1 className='text-9xl text-main mb-4'>404</h1>
        <h2 className='text-3xl mb-4'>Page Not Found</h2>
        <p className='text-text/60 mb-8'>The page you're looking for doesn't exist or has been moved.</p>
        <TextFlipper>
          <Link
            to='/'
            className='inline-block px-8 py-3 border border-b-bg border-main hover:bg-text hover:text-bg hover:border-text duration-100'>
            Go Back Home
          </Link>
        </TextFlipper>
      </div>
    </section>
  )
}

export default NotFound
