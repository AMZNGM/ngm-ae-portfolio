import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const TextFlipper = ({ className, children }) => {
  const containerRef = useRef(null)
  const topSpansRef = useRef([])
  const bottomSpansRef = useRef([])

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })

      topSpansRef.current.forEach((span, i) => {
        tl.to(
          span,
          {
            y: '-100%',
            duration: 0.25,
            ease: 'power2.inOut',
            delay: i * 0.025,
          },
          0
        )
      })

      bottomSpansRef.current.forEach((span, i) => {
        tl.fromTo(
          span,
          { y: '100%' },
          {
            y: '0%',
            duration: 0.25,
            ease: 'power2.inOut',
            delay: i * 0.025,
          },
          0
        )
      })

      containerRef.current._animation = tl

      return () => {
        if (containerRef.current?._animation) {
          containerRef.current._animation.kill()
          delete containerRef.current._animation
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [children])

  const handleMouseEnter = () => {
    if (containerRef.current?._animation) {
      containerRef.current._animation.play()
    }
  }

  const handleMouseLeave = () => {
    if (containerRef.current?._animation) {
      containerRef.current._animation.reverse()
    }
  }

  const content = typeof children === 'string' ? children.split(/(\s+)/) : [children]

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}>
      <div className='lg:-rotate-10'>
        {content.map((item, i) => (
          <span
            ref={el => (topSpansRef.current[i] = el)}
            className='inline-flex justify-center items-center gap-1 will-change-transform h-8'
            key={`top-${i}`}>
            {item}
          </span>
        ))}
      </div>
      <div className='absolute inset-0 rotate-10'>
        {content.map((item, i) => (
          <span
            ref={el => (bottomSpansRef.current[i] = el)}
            className='inline-flex justify-center items-center gap-1 will-change-transform h-8'
            key={`bottom-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </span>
  )
}

export default TextFlipper
