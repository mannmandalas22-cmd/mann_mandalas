"use client"

// NavMenu
// Global top navigation with desktop menu and collapsible mobile menu.
// Updates: Workshop link points to /workshops page.

import { useState } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export default function NavMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/paintings", label: "Painting" },
    { href: "/products", label: "Products" },
    { href: "/workshops", label: "Workshop" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-amber-600 text-base sm:text-lg flex items-center gap-2 touch-target">
        <div className="h-12 w-12 sm:h-8 sm:w-8 rounded-full  flex items-center  justify-center text-amber-600 font-bold text-sm sm:text-base">
          <img src="/images/svg/logo.svg" alt="Mann Mandalas logo" className="h-20 w-20" />
        </div>          
        <span className="hidden md:inline">Mann Mandalas</span>
  
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 
                    "text-amber-800 hover:text-amber-600 hover:bg-amber-50 focus:bg-amber-50")}> 
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-amber-800 hover:bg-amber-50 focus:outline-none touch-target"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-amber-100 animate-in-down">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="px-4 py-3 text-amber-800 hover:bg-amber-50 transition-colors touch-target text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}