'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; index: number } | null>(null)
  const router = useRouter()
  

  const galleryImages = [
    "/images/painting_page/pp2.jpg",
    "/images/painting_page/pp3.jpg",
    "/images/painting_page/pp4.jpg",
    "/images/painting_page/pp5.jpg",
    "/images/painting_page/pp6.jpg", 
    "/images/painting_page/pp7.jpg",
    "/images/painting_page/pp8.jpg",
    "/images/painting_page/pp9.jpg",
    "/images/painting_page/pp10.jpg",
    "/images/painting_page/pp11.jpg",
    "/images/painting_page/pp12.jpg",
    "/images/painting_page/pp13.jpg",
    "/images/painting_page/pp14.jpg",
    "/images/painting_page/pp15.jpg",
    "/images/painting_page/pp16.jpg",
    "/images/painting_page/pp17.jpg",
    "/images/painting_page/pp18.jpg",
    "/images/painting_page/pp19.jpg",
    "/images/painting_page/pp20.jpg",
    "/images/painting_page/pp21.jpg",
    "/images/painting_page/pp22.jpg",
    "/images/painting_page/pp23.jpg",
    "/images/painting_page/pp24.jpg",
    "/images/painting_page/pp25.jpg",
    "/images/painting_page/pp26.jpg",
    "/images/painting_page/pp27.jpg",
    "/images/painting_page/pp28.jpg",
    "/images/painting_page/pp29.jpg",
    "/images/painting_page/pp30.jpg",
    "/images/painting_page/pp31.jpg",
    "/images/painting_page/pp32.jpg",
    "/images/painting_page/pp33.jpg",
  ]

  // Build exactly 10 featured images by repeating if needed
  const featuredImages = Array.from({ length: 10 }, (_, index) => galleryImages[index % galleryImages.length])

  // Fullscreen modal functions
  const openFullscreen = (src: string, index: number) => {
    setFullscreenImage({ src, index })
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  const goToPrevious = () => {
    if (fullscreenImage) {
      const currentIndex = fullscreenImage.index
      const newIndex = currentIndex === 0 ? featuredImages.length - 1 : currentIndex - 1
      setFullscreenImage({ src: featuredImages[newIndex], index: newIndex })
    }
  }

  const goToNext = () => {
    if (fullscreenImage) {
      const currentIndex = fullscreenImage.index
      const newIndex = currentIndex === featuredImages.length - 1 ? 0 : currentIndex + 1
      setFullscreenImage({ src: featuredImages[newIndex], index: newIndex })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!fullscreenImage) return
    
    switch (e.key) {
      case 'Escape':
        closeFullscreen()
        break
      case 'ArrowLeft':
        goToPrevious()
        break
      case 'ArrowRight':
        goToNext()
        break
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      
      {/* Hero Section - Full Screen with Scroll Arrow */}
      <section className="relative h-screen w-full flex items-center justify-center bg-white">
        {/* Decorative Background Pattern - Cover and align to top */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30 pointer-events-none">
          <img
            src="/images/floral-gold.png"
            alt=""
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-3 sm:px-4">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-amber-100 text-amber-800 rounded-full text-[11px] sm:text-xs font-medium mb-3 sm:mb-4">
              Mandala Art Studio
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-serif font-bold text-amber-600 mb-4 sm:mb-6 leading-tight">
            Mann Mandala
          </h1>
          
          <p className="text-m sm:text-lg md:text-xl text-slate-600 mb-5 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-2">
            Creating sacred geometry art that brings peace, mindfulness, and beauty into everyday life
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 justify-center items-center px-4 mb-8 sm:mb-12">
            <button 
              onClick={() => router.push('/paintings')}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3.5 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors text-sm sm:text-[15px]"
            >
              Explore Gallery
            </button>
            <button 
              onClick={() => router.push('/workshops')}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3.5 border-2 border-amber-600 text-amber-600 rounded-full font-medium hover:bg-amber-50 transition-colors text-sm sm:text-[15px]"
            >
              Book Workshop
            </button>
          </div>

          {/* Scroll Arrow - Positioned closer to buttons */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                const nextSection = document.querySelector('section:nth-of-type(2)');
                if (nextSection) {
                  nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group flex flex-col items-center text-amber-600 hover:text-amber-700 transition-colors duration-300"
              aria-label="Scroll to next section"
            >
              <span className="text-xs sm:text-sm font-medium mb-2 opacity-80 group-hover:opacity-100">
                Scroll Down
              </span>
              <div className="w-8 h-8 flex items-center justify-center">
                <svg 
                  className="w-6 h-6 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* About Section - Mobile Responsive */}
      <section className="py-12 sm:py-20 md:py-32 bg-gradient-to-br from-slate-50 to-amber-50 relative">
        <img
          src="/images/svg/about_us.svg"
          alt="About section decorative vector"
          aria-hidden="true"
          loading="lazy"
          className="hidden md:block pointer-events-none select-none absolute left-[-400px] top-150 -translate-y-1/2 h-[70%] lg:h-[800px] w-auto opacity-20"
        />
         <img
          src="/images/svg/about_us.svg"
          alt="About section decorative vector"
          aria-hidden="true"
          loading="lazy"
          className="hidden md:block pointer-events-none select-none absolute right-[-400px] top-330 -translate-y-1/2 h-[70%] lg:h-[800px] w-auto opacity-20 rotate-180"
        />
        {/* Mobile-only SVG sized relative to the About section height */}
        <img
          src="/images/svg/about_us.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="block md:hidden pointer-events-none select-none absolute left-[-200px] top-195 -translate-y-1/2 h-[60%] sm:h-[70%] w-auto opacity-30 z-[-1]"
        />
        {/* <img
          src="/images/svg/about_us.svg"
          alt=""
          aria-hidden="true"
          className="block md:hidden pointer-events-none select-none absolute left-[-200px] top-195 -translate-y-1/2 h-[60%] sm:h-[70%] w-auto opacity-30 z-[-1]"
        />         */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-amber-600 mb-4 sm:mb-6">
              About Me
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Artist Image - Mobile Responsive */}
            <div className="relative order-2 lg:order-1 ">
              <div className="aspect-square max-w-xs sm:max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-full h-full bg-slate-200 rounded-full border-4 sm:border-8 border-white shadow-2xl overflow-hidden">
                  <img
                    src="/images/profile.jpg"
                    alt="Mansi – Mann Mandala"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* About Content - Mobile Responsive */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-amber-100">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-amber-600 mb-4 sm:mb-6">
                  Meet Mansi
                </h3>
                <div className="space-y-3 sm:space-y-4 text-slate-700 leading-relaxed">
                <p className="text-sm sm:text-base md:text-lg">
                  I stumbled into the world of mandalas and got hooked—it's more than art, it’s a way to find balance and inspire others. I craft custom pieces and lead hands-on workshops and team sessions that bring calm focus and creativity.
                </p>
                  <p className="text-sm sm:text-base md:text-lg">
                    In 2020, when Covid hit, I instinctively turned inward, dedicating time to creativity for my mental health. As a self-taught artist, I discovered my passion with dotting and mandala.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg">
                    My intricate works take 10 to 100 hours each, embodying harmony and balance. The peace I feel while creating transfers to the viewer.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-amber-700">
                    Based in Pune, India, creating mindful spaces—one dot at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </section>

      

      {/* Gallery & Brand Section - Mobile Responsive */}
      <section className="py-12 sm:py-20 md:py-32 bg-gradient-to-br from-amber-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Brand Story - Mobile Responsive */}
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-amber-600 mb-4 sm:mb-6">
              Mann Mandala
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-amber-600 mx-auto mb-6 sm:mb-8"></div>
            <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-amber-100">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed">
                Mann Mandala was conceptualized to bring the timeless benefits of mandala art into contemporary designer products for everyday life. In today's fast-paced world, where stress is inevitable, our handcrafted dot mandala merchandise brings calm, beauty, and spiritual connection. Each piece integrates sacred geometry, colors, and patterns, helping to relieve stress and anxiety while drawing you closer to your inner self.
              </p>
            </div>
          </div>

          {/* Featured Artworks - Single Row (10 items) */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-600 text-center mb-6 sm:mb-8">Featured Artworks</h3>

            <div className="relative -mx-4 sm:mx-0">
              <div className="scroller" data-direction="left" data-speed="slow">
                <ul className="scroller__inner gap-3 sm:gap-4 px-4 sm:px-0">
                  {[...featuredImages, ...featuredImages].map((src, i) => (
                    <li key={`featured-marquee-${i}`} className="w-[220px] sm:w-[260px] md:w-[300px] h-36 sm:h-44 md:h-52 flex-shrink-0">
                      <button
                        onClick={() => openFullscreen(src, i % featuredImages.length)}
                        className="w-full h-full p-0 m-0 border-0 bg-transparent cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        aria-label={`Open artwork ${i % featuredImages.length + 1} fullscreen`}
                      >
                        <img
                          src={src}
                          alt={`Artwork ${i % featuredImages.length + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <button 
                onClick={() => router.push('/paintings')}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg text-sm sm:text-base"
              >
                View Full Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section - Mobile Responsive */}
      <section className="py-12 sm:py-20 md:py-32 bg-white text-slate-800 relative overflow-hidden">
        {/* Decorative Background - Mobile Optimized */}
        {/* <div className="absolute inset-0 opacity-5 sm:opacity-10">
          <img src="/images/floral-gold.png" alt="" loading="eager" className="w-full h-full object-cover" />
        </div> */}
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 sm:mb-8 text-amber-600">
            Follow Our Journey
          </h2>
          <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 text-slate-600">
            Join our community and stay updated with the latest mandala creations, workshops, and mindful moments.
          </p>
          
          {/* Social Media Links - Circular Icon Buttons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Instagram */}
            <a href="https://instagram.com/mann_mandalas" target="_blank" rel="noopener noreferrer" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/918668765859" target="_blank" rel="noopener noreferrer" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=100063902983600" target="_blank" rel="noopener noreferrer" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow" title="Follow us on Facebook">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.326v21.348C0 23.404.596 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.404 24 24 23.404 24 22.674V1.326C24 .596 23.404 0 22.675 0z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/mannmandala/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-sky-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          
          {/* CTA Buttons - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={() => router.push('/products')}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg text-sm sm:text-base"
            >
              Browse Products
            </button>
            <button 
              onClick={() => router.push('/workshops')}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border-2 border-amber-600 text-amber-600 rounded-full font-medium hover:bg-amber-50 transition-colors text-sm sm:text-base"
            >
              Book a Workshop
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Image Modal with Navigation */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={closeFullscreen}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen artwork gallery"
          tabIndex={-1}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] p-4">
            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 z-10"
              aria-label="Previous artwork"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 z-10"
              aria-label="Next artwork"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <img 
              src={fullscreenImage.src} 
              alt={`Artwork ${fullscreenImage.index + 1}`} 
              loading="eager" 
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain" 
            />

            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
              aria-label="Close fullscreen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {fullscreenImage.index + 1} / {featuredImages.length}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}