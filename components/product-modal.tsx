"use client"

// ProductModal
// Fullscreen image viewer with:
// - Keyboard: ESC to close, ←/→ to navigate, +/- for zoom
// - Swipe (via hooks/use-swipe in parent usage) handled externally when needed
// - Looping navigation and fade between images
// - Zoom in/out functionality
// Props:
//   isOpen, onClose: visibility control
//   images, names: arrays representing current subcategory
//   index, setIndex: controlled index for current image

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  names: string[]
  index: number
  setIndex: (i: number) => void
}

export default function ProductModal({ isOpen, onClose, images, names, index, setIndex }: ProductModalProps) {
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)

  // Reset zoom and pan when modal opens or image changes
  useEffect(() => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }, [isOpen, index])

  // Prevent background scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((index + 1) % (images.length || 1))
      if (e.key === 'ArrowLeft') setIndex((index - 1 + (images.length || 1)) % (images.length || 1))
      if (e.key === '+' || e.key === '=') handleZoomIn()
      if (e.key === '-') handleZoomOut()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, index, images.length, onClose, setIndex])

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleImageReset = () => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }

  if (!isOpen) return null

  const safeIndex = images.length ? ((index % images.length) + images.length) % images.length : 0
  const src = images[safeIndex] === "#" ? "/placeholder.jpg" : images[safeIndex] || "/placeholder.jpg"
  const title = names[safeIndex] || ""

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-amber-300 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={32} />
        </button>

        <div className="relative rounded-xl overflow-hidden bg-white shadow-2xl animate-zoom-in">
          <div className="relative aspect-square max-h-[80vh] w-full select-none overflow-hidden">
            {/* Navigation buttons */}
            <button
              aria-label="Previous image"
              onClick={() => setIndex((safeIndex - 1 + (images.length || 1)) % (images.length || 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              aria-label="Next image"
              onClick={() => setIndex((safeIndex + 1) % (images.length || 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            {/* Zoom controls */}
            <div className="absolute top-2 left-2 z-20 flex gap-2">
              <button
                aria-label="Zoom in"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ZoomIn size={20} />
              </button>
              <button
                aria-label="Zoom out"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ZoomOut size={20} />
              </button>
              <button
                aria-label="Reset zoom"
                onClick={handleImageReset}
                className="px-3 py-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors text-xs font-medium"
              >
                Reset
              </button>
            </div>

            {/* Image container with zoom and pan */}
            <div 
              className="w-full h-full flex items-center justify-center cursor-move"
              style={{
                transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                transition: zoom === 1 ? 'transform 0.3s ease' : 'none'
              }}
            >
              <Image
                src={src}
                alt={title}
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100">
            {title && title.trim() && (
              <h3 className="text-lg font-semibold text-amber-800 mb-2">{title}</h3>
            )}
            <p className="text-sm text-amber-600">Use arrows to navigate • +/- keys or buttons to zoom • Click outside to close</p>
          </div>
        </div>
      </div>
    </div>
  )
}