"use client"

// ProductsPage
// Renders the Products experience with:
// - Sticky SubNav tabs (auto-centering active)
// - One active category displayed at a time (fade transition)
// - Subcategory rows rendered via ManualScrollGrid
// - Click on image opens ProductModal with swipe/keyboard navigation
// Data uses "#" images as placeholders for later replacement.

import { useState, useRef, useMemo } from "react"
import SubNav from "./sub-nav"
import ManualScrollGrid from "./infinite-scroll-grid"
import ProductModal from "./product-modal"

interface Product {
  name: string
  duration: string
  image: string
}

interface Category {
  name: string
  subcategories: {
    title: string
    products: Product[]
  }[]
}

// Category → Subcategory → Products using actual image folder structure
const categories: Category[] = [
  {
    name: "Mugs & Glasses",
    subcategories: [
      {
        title: "Mugs",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/mug/m1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mug/m2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mug/m3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mug/m4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mug/m5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mug/m6.jpeg" }
        ]
      },
      {
        title: "Wine glasses",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/wine_glasses/wg1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wine_glasses/wg2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wine_glasses/wg3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wine_glasses/wg4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wine_glasses/wg5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wine_glasses/wg6.jpeg" }
        ]
      }
    ]
  },
  {
    name: "Customizable Boxes",
    subcategories: [
      {
        title: "Multipurpose box",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/multipurpose_box/mp1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/multipurpose_box/mp2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/multipurpose_box/mp3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/multipurpose_box/mp4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/multipurpose_box/mp6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/multipurpose_box/mp7.jpeg" }
        ]
      },
      {
        title: "Tissue box",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/tissue_box/tb1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tissue_box/tb2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tissue_box/tb3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tissue_box/tb4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tissue_box/tb5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tissue_box/tb6.jpeg" }
        ]
      }
    ]
  },
  {
    name: "Everyday Essentials",
    subcategories: [
      {
        title: "Keychain",
        products: [
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k1.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k2.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k3.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k8.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k4.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k5.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k6.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/keychain/k7.jpeg" },

        ]
      },
      {
        title: "Bookmark",
        products: [
          { name: "", duration: "Duration: 7–10 days", image: "/images/bookmark/bm1.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/bookmark/bm2.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/bookmark/bm3.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/bookmark/bm4.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/bookmark/bm5.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/bookmark/bm6.jpeg" }
        ]
      },
      {
        title: "Hair Brush",
        products: [
          { name: "", duration: "Duration: 7–10 days", image: "/images/hair_brushes/hb1.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/hair_brushes/hb2.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/hair_brushes/hb3.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/hair_brushes/hb4.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/hair_brushes/hb5.jpeg" },
          { name: "", duration: "Duration: 7–10 days", image: "/images/hair_brushes/hb6.jpeg" }
        ]
      }
    ]
  },
  {
    name: "Celebration Collection",
    subcategories: [
      {
        title: "Pooja thali / Pooja chowki",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj3.2.jpeg"},
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj3.3.jpeg"},
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/pooja_chowki_and_thali/pj6.jpeg" }
        ]
      },
      {
        title: "Incense holders",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/incense_holders/ih1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/incense_holders/ih2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/incense_holders/ih3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/incense_holders/ih4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/incense_holders/ih5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/incense_holders/ih6.jpeg" }
        ]
      },
      {
        title: "Tea light holders",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl7.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl8.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl9.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl10.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_light_holders/tl11.jpeg" },

        ]
      },
      {
        title: "Tray",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/tray/tr1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tray/tr2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tray/tr3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tray/tr4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tray/tr5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tray/tr6.jpeg" }
        ]
      },
      {
        title: "Tea cups and coasters",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc7.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc8.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc9.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/tea_cups_and_coasters/tc10.jpeg" }
        ]
      },
      {
        title: "Elephant figurine",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e6.jpeg" }
        ]
      },
      {
        title: "Turtles figurine",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/turtles/t1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/turtles/t2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/turtles/t3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/turtles/t4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/turtles/t5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/turtles/t6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/turtles/t7.jpeg" }
        ]
      },
      {
        title: "Shriyantra",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/shriyantra/sh1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/shriyantra/sh2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/shriyantra/sh3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/shriyantra/sh4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/shriyantra/sh5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/shriyantra/sh6.jpeg" }
        ]
      },
      {
        title: "Spiritual symbols",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/spritual_symbol/ss1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/spritual_symbol/ss4.jpeg" }, 
          { name: "", duration: "Duration: 7-10 days", image: "/images/spritual_symbol/ss3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/spritual_symbol/ss5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/elephant/e3.jpeg" },
        ]
      },
      {
        title: "Bottle lamps",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/mandala_bottles/ml1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mandala_bottles/ml2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mandala_bottles/ml3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mandala_bottles/ml4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mandala_bottles/ml5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mandala_bottles/ml6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mandala_bottles/ml7.jpeg" },
        ]
      }
    ]
  },
  {
    name: "Mandala Corporate Gifts",
    subcategories: [
      {
        title: "Journals",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j7.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j8.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/journals/j9.jpeg" },

        ]
      },
      {
        title: "Sippers",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/sippers/s1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/sippers/s2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/sippers/s3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/sippers/s4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/sippers/s5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/sippers/s6.jpeg" }
        ]
      },
      {
        title: "LED lamps",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps/ll1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps/ll2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll7.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll8.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll9.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/led_lamps//ll10.jpeg" },

        ]
      },
      {
        title: "Wall plates",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/wall_plates/wp1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wall_plates/wp2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wall_plates/wp3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wall_plates/wp4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wall_plates/wp5.jpg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/wall_plates/wp6.jpeg" }
        ]
      }
    ]
  },
  {
    name: "Home Décor",
    subcategories: [
      {
        title: "Mirrors",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/mirrors/mr1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mirrors/mr2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mirrors/mr3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mirrors/mr4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mirrors/mr5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/mirrors/mr6.jpeg" }
        ]
      },
      {
        title: "Paintings",
        products: [
          { name: "", duration: "Based on size ", image: "/images/painting/p1.jpeg" },
          { name: "", duration: "Based on size ", image: "/images/painting/p2.jpeg" },
          { name: "", duration: "Based on size ", image: "/images/painting/p3.jpeg" },
          { name: "", duration: "Based on size ", image: "/images/painting/p4.jpeg" },
          { name: "", duration: "Based on size ", image: "/images/painting/p5.jpeg" },
          { name: "", duration: "Based on size ", image: "/images/painting/p6.jpeg" }
        ]
      },
      {
        title: "Nameplates",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/name_plates/nm1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/name_plates/nm2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/name_plates/nm3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/name_plates/nm4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/name_plates/nm5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/name_plates/nm6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/name_plates/nm7.jpeg" }
        ]
      },
      {
        title: "Clock",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/clock/c1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/clock/c2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/clock/c3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/clock/c4.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/clock/c5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/clock/c6.jpeg" }
        ]
      }
    ]
  },
  {
    name: "Gift Hampers",
    subcategories: [
      {
        title: "Hampers",
        products: [
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h1.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h2.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h3.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h5.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h6.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h7.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h8.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h9.jpeg" },
          { name: "", duration: "Duration: 7-10 days", image: "/images/hampers/h10.jpeg" }
        ]
      }
    ]
  }
]

export default function ProductsPage() {
  // Active category + modal state
  const [activeCategory, setActiveCategory] = useState(categories[0].name)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [currentNames, setCurrentNames] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const categoryNames = useMemo(() => categories.map(cat => cat.name), [])
  const activeData = useMemo(() => categories.find(c => c.name === activeCategory)!, [activeCategory])

  // Click on a tab → fade out current, switch, then scroll to top of new
  const handleCategoryClick = (category: string) => {
    if (category === activeCategory) return
    setFading(true)
    setTimeout(() => {
      setActiveCategory(category)
      setFading(false)
      const element = sectionRefs.current[category]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      }
    }, 150)
  }

  // Open modal for a subcategory's images from a given index
  const openModalFor = (images: string[], names: string[], index: number) => {
    setCurrentImages(images)
    setCurrentNames(names)
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentImages([])
    setCurrentNames([])
    setCurrentIndex(0)
  }

  const whatsappHref = "https://wa.me/918668765859?text=Hi%20I%27d%20like%20to%20customize%20a%20product"

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      <SubNav 
        categories={categoryNames}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
        <div
          ref={(el) => { sectionRefs.current[activeData.name] = el }}
          className={`mb-12 sm:mb-16 scroll-mt-24 transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-800 mb-6 sm:mb-8 text-center leading-tight">
            {activeData.name}
          </h2>

          {activeData.subcategories.map((subcategory, subIndex) => {
            const images = subcategory.products.map(p => p.image)
            const names = subcategory.products.map(p => p.name)
            const duration = subcategory.products[0]?.duration || "Duration: 10–15 days"
            return (
              <ManualScrollGrid
                key={subIndex}
                title={subcategory.title}
                images={images}
                names={names}
                duration={duration}
                buttonText="Make Your Own"
                buttonLink={whatsappHref}
                onImageClick={(i) => openModalFor(images, names, i)}
              />
            )
          })}
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={currentImages}
        names={currentNames}
        index={currentIndex}
        setIndex={setCurrentIndex}
      />
    </div>
  )
}