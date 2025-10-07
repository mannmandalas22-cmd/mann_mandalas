"use client"

// SubNav
// Sticky horizontal tab bar for category navigation.
// - Auto-centers active tab on change
// - Subtle background change on window scroll

import { useState, useEffect, useRef } from "react"

interface SubNavProps {
  categories: string[]
  onCategoryClick: (category: string) => void
  activeCategory: string
}

export default function SubNav({ categories, onCategoryClick, activeCategory }: SubNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Track page scroll to style sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-center active category on mobile
  useEffect(() => {
    if (!containerRef.current) return
    
    const activeButton = containerRef.current.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement
    if (activeButton) {
      const container = containerRef.current
      const containerWidth = container.offsetWidth
      const buttonOffsetLeft = activeButton.offsetLeft
      const buttonWidth = activeButton.offsetWidth
      
      // Calculate scroll position to center the button
      const scrollLeft = buttonOffsetLeft - (containerWidth / 2) + (buttonWidth / 2)
      
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      })
    }
  }, [activeCategory])

  return (
    <div className={`sticky top-[73px] z-40 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-amber-50/80'
    } border-b border-amber-100`}>
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-2 sm:py-3">
        <nav ref={containerRef} className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-1">
          {categories.map((category) => (
            <button
              key={category}
              data-category={category}
              onClick={() => onCategoryClick(category)}
              className={`flex-shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover-raise touch-target ${
                activeCategory === category
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-700 hover:bg-amber-100 hover:text-amber-800'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
