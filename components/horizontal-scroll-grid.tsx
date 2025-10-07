"use client"

// HorizontalScrollGrid
// Horizontal scrolling product grid with arrow navigation
// Features: Responsive grid, smooth scrolling, arrow controls, swipe gestures

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: number
  name: string
  image: string
  duration: string
}

interface HorizontalScrollGridProps {
  title: string
  products: Product[]
  onImageClick: (index: number) => void
  buttonText?: string
  buttonLink?: string
}

export default function HorizontalScrollGrid({ 
  title, 
  products, 
  onImageClick, 
  buttonText = "Make Your Own",
  buttonLink = "https://wa.me/919999999999"
}: HorizontalScrollGridProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(products.length).fill(false))

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Handle image load
  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  // Add scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition() // Initial check
      return () => container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  // Add swipe gestures for mobile
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let startX = 0
    let isScrolling = false

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isScrolling = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) return
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isScrolling) return
      isScrolling = false
      
      const endX = e.changedTouches[0].clientX
      const diff = startX - endX
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          scrollRight() // Swipe left = scroll right
        } else {
          scrollLeft() // Swipe right = scroll left
        }
      }
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div className="mb-12 sm:mb-16">
      {/* Section Title */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-amber-700 mb-6 sm:mb-8">
        {title}
      </h3>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg text-amber-600 hover:bg-white hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg text-amber-600 hover:bg-white hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>

        {/* Scrollable Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[280px] lg:w-[300px]"
            >
              <div className="group">
                {/* Product Image */}
                <div
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-white shadow-md border border-amber-200 transition-all duration-300 hover:scale-105 hover:shadow-lg mb-4"
                  onClick={() => onImageClick(index)}
                >
                  <Image
                    src={product.image === "#" ? "/placeholder.jpg" : product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />
                  
                  {!imageLoaded[index] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    Click to view
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h4 className="text-sm sm:text-base font-medium text-slate-700 mb-2 line-clamp-2">
                    {product.name || `${title} ${index + 1}`}
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-600 mb-3">
                    {product.duration}
                  </p>
                  
                  {/* Make Your Own Button */}
                  <a
                    href={buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full px-4 py-2 bg-amber-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200"
                  >
                    {buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
