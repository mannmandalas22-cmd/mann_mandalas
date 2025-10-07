"use client"

// PaintingsPage
// Mandala Paintings page with highlight section and Polaroid-style gallery
// Features: Title/subtitle, highlight painting, paginated gallery, modal zoom

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"

interface Painting {
  id: number
  title: string
  image: string
  description?: string
}

// Highlight painting data
const highlightPainting: Painting = {
  id: 0,
  title: "Masterpiece Mandala",
  image: "/images/painting_page/pp1.jpg",
  description: "My largest mandala till date, this 6-foot masterpiece was curated in five parts and shipped to the USA. Designed as a statement piece, it beautifully covers an entire wall, making a bold yet harmonious presence. With intricate dot work and unique detailing, this artwork transforms the space into one of elegance and energy."
}

// Gallery paintings data (32 paintings)
const galleryPaintings: Painting[] = [
  { id: 1, title: "Sunshine Dot Mandala ", image: "/images/painting_page/pp2.jpg" },
  { id: 2, title: "The Grand Dot Mandala ", image: "/images/painting_page/pp3.jpg" },
  { id: 3, title: "Earthen waves Mandala ", image: "/images/painting_page/pp4.jpg" },
  { id: 4, title: "Radha Krishna Mandala ", image: "/images/painting_page/pp5.jpg" },
  { id: 5, title: "Lord Ganesha Mandala", image: "/images/painting_page/pp6.jpg" },
  { id: 6, title: "Joyful hues Mandala ", image: "/images/painting_page/pp7.jpg" },
  { id: 7, title: "Silver lining Mandala", image: "/images/painting_page/pp8.jpg" },
  { id: 8, title: "Adi Yogi (Sun & Moon) Mandala ", image: "/images/painting_page/pp9.jpg" },
  { id: 9, title: "pastel color palette Mandala", image: "/images/painting_page/pp10.jpg" },
  { id: 10, title: "Blue aura Mandala ", image: "/images/painting_page/pp11.jpg" },
  { id: 11, title: "Radiant wheel Mandala ", image: "/images/painting_page/pp12.jpg" },
  { id: 12, title: "Seven Chakra Mandala", image: "/images/painting_page/pp13.jpg" },
  { id: 13, title: "Lotus Dot Mandala", image: "/images/painting_page/pp14.jpg" },
  { id: 14, title: "Earthy and serene mandala ", image: "/images/painting_page/pp15.jpg" },
  { id: 15, title: "Teal and earthy tones", image: "/images/painting_page/pp16.jpg" },
  { id: 16, title: "Cosmic mandala", image: "/images/painting_page/pp17.jpg" },
  { id: 17, title: " Krishna Mandala ", image: "/images/painting_page/pp18.jpg" },
  { id: 18, title: "Om (Aum) symbol Mandala", image: "/images/painting_page/pp19.jpg" },
  { id: 19, title: "Krishna Mandala ", image: "/images/painting_page/pp20.jpg" },
  { id: 20, title: "Shiva in Dhyan Mudra Mandala", image: "/images/painting_page/pp21.jpg" },
  { id: 21, title: "Sunshine Dot Mandala ", image: "/images/painting_page/pp22.jpg" },
  { id: 22, title: "Ik Onkar Mandala", image: "/images/painting_page/pp23.jpg" },
  { id: 23, title: "Dot Mandala ", image: "/images/painting_page/pp24.jpg" },
  { id: 24, title: "Bronze & Gold Overload Dot Mandala ", image: "/images/painting_page/pp25.jpg" },
  { id: 25, title: "Om (Aum) symbol Mandala", image: "/images/painting_page/pp26.jpg" },
  { id: 26, title: "Buddha Mandala", image: "/images/painting_page/pp27.jpg" },
  { id: 27, title: "Joyful hues Mandala II", image: "/images/painting_page/pp28.jpg" },
  { id: 28, title: "Radiance Mandala", image: "/images/painting_page/pp29.jpg" },
  { id: 29, title: "Earthy tones Mandala", image: "/images/painting_page/pp30.jpg" },
  { id: 30, title: "The Flower of life Mandala ", image: "/images/painting_page/pp31.jpg" },
  { id: 31, title: "Tree of Life Mandala", image: "/images/painting_page/pp32.jpg" },
  { id: 32, title: "Spectrum mandala", image: "/images/painting_page/pp33.jpg" }
]

const PAINTINGS_PER_PAGE = 12

export default function PaintingsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPainting, setCurrentPainting] = useState<Painting | null>(null)
  const [zoom, setZoom] = useState(1)

  // Calculate pagination
  const totalPages = Math.ceil(galleryPaintings.length / PAINTINGS_PER_PAGE)
  const startIndex = (currentPage - 1) * PAINTINGS_PER_PAGE
  const endIndex = startIndex + PAINTINGS_PER_PAGE
  const currentPaintings = galleryPaintings.slice(startIndex, endIndex)

  // Open modal for a specific painting
  const openModal = (painting: Painting) => {
    setCurrentPainting(painting)
    setZoom(1)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentPainting(null)
    setZoom(1)
  }

  // Navigate to next/previous painting in current page
  const navigatePainting = (direction: 'next' | 'prev') => {
    if (!currentPainting) return
    
    const currentIndex = currentPaintings.findIndex(p => p.id === currentPainting.id)
    let newIndex: number
    
    if (direction === 'next') {
      newIndex = currentIndex + 1
      if (newIndex >= currentPaintings.length) newIndex = 0
    } else {
      newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = currentPaintings.length - 1
    }
    
    setCurrentPainting(currentPaintings[newIndex])
    setZoom(1)
  }

  // Handle zoom
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5))
  const resetZoom = () => setZoom(1)

  // Prevent background scroll when modal is open (client-only)
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isModalOpen])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      {/* Page Header */}
      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-amber-600 mb-4 sm:mb-6 leading-tight">
          Mandala Paintings
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
          Explore our collection of handcrafted mandala artworks
        </p>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="mx-4 w-3 h-3 bg-amber-400 rounded-full"></div>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      {/* Highlight Painting Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 mb-16 sm:mb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Painting Image */}
          <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
            <div className="relative aspect-square lg:aspect-auto lg:h-[500px]">
              <Image
                src={highlightPainting.image}
                alt={highlightPainting.title}
                fill
                className="object-cover object-center"
                loading="eager"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          {/* Description */}
          <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-700 mb-4 sm:mb-6">
              {highlightPainting.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
              {highlightPainting.description}
            </p>
          </div>
        </div>
      </div>

      {/* Polaroid Gallery */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 mb-12 sm:mb-16">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-700 mb-8 sm:mb-12 text-center">
          Gallery Collection
        </h3>
        
        {/* Polaroid Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {currentPaintings.map((painting) => (
            <div
              key={painting.id}
              className="group cursor-pointer"
              onClick={() => openModal(painting)}
            >
              <div className="bg-white rounded-lg shadow-lg p-4 hover:rotate-1 transition-transform duration-300 hover:shadow-xl">
                {/* Polaroid Image */}
                <div className="relative aspect-square mb-4 rounded-md overflow-hidden">
                  <Image
                    src={painting.image}
                    alt={painting.title}
                    fill
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>
                
                {/* Polaroid Caption */}
                <div className="text-center">
                  <p className="text-sm sm:text-base font-handwriting text-slate-700 leading-tight">
                    {painting.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full font-medium transition-all duration-200 ${
                currentPage === page
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && currentPainting && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-amber-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePainting('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => navigatePainting('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/60 disabled:opacity-50 transition-colors"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/60 disabled:opacity-50 transition-colors"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={resetZoom}
                className="px-3 py-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors text-xs font-medium"
              >
                Reset
              </button>
            </div>

            {/* Modal Content */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <div className="relative aspect-square max-h-[80vh] w-full">
                <Image
                  src={currentPainting.image}
                  alt={currentPainting.title}
                  fill
                  className="object-contain"
                  style={{
                    transform: `scale(${zoom})`,
                    transition: zoom === 1 ? 'transform 0.3s ease' : 'none'
                  }}
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
                <h3 className="text-xl font-serif font-bold text-amber-800 mb-2">
                  {currentPainting.title}
                </h3>
                <p className="text-sm text-amber-600">
                  Use arrows to navigate • +/- keys or buttons to zoom • Click outside to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
