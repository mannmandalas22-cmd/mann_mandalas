"use client"

import { useState } from "react"

export default function ContactUsPage() {
  const [activeTab, setActiveTab] = useState("terms")

  // Update with your actual business WhatsApp number
  const whatsappNumber = "918668765859"
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=Hi%20I%27d%20like%20to%20ask%20about%20your%20products`
  const instagramHref = "https://instagram.com/mann_mandalas"
  const emailHref = "mailto:mannmandalaofficial@gmail.com"

  const contactOptions = [
    {
      id: "whatsapp",
      title: "WhatsApp Chat",
      description: "Get instant replies to your questions",
      icon: "💬",
      action: "Chat Now",
      href: whatsappHref,
      color: "from-green-500 to-emerald-600",
      hoverColor: "from-green-600 to-emerald-700"
    },
    {
      id: "email",
      title: "Email Us",
      description: "Send us detailed inquiries",
      icon: "📧",
      action: "Send Email",
      href: emailHref,
      color: "from-blue-500 to-sky-600",
      hoverColor: "from-blue-600 to-sky-700"
    },
    {
      id: "instagram",
      title: "Follow Us",
      description: "See our latest creations",
      icon: "📷",
      action: "Visit Profile",
      href: instagramHref,
      color: "from-purple-500 to-pink-600",
      hoverColor: "from-purple-600 to-pink-700"
    }
  ]

  const termsData = [
    {
      icon: "🎨",
      title: "Handmade Products",
      points: [
        "All products are handmade with care",
        "Each piece has unique variations in color, design, or finish",
        "Variations are marks of uniqueness, not defects"
      ]
    },
    {
      icon: "☕",
      title: "Usage & Care", 
      points: [
        "Mugs are suitable for daily use",
        "Gentle hand wash recommended for best durability",
        "Top-rack dishwasher safe",
        "Avoid abrasive cleaners or harsh scrubbing"
      ]
    },
    {
      icon: "🌈",
      title: "Customisation",
      points: [
        "Colors can be customised per your preference",
        "Designs remain the artist's creative choice",
        "Ensures originality in every piece"
      ]
    },
    {
      icon: "⏰", 
      title: "Production & Delivery",
      points: [
        "Minimum 7–10 days for custom production",
        "Timeline varies by product type and quantity"
      ]
    },
    {
      icon: "📦",
      title: "Order & Returns",
      points: [
        "Orders are final and non-refundable",
        "Items are handcrafted and customised",
        "Shipping calculated on actuals (location, dimensions, weight)"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/30">
      {/* Hero Section with Tabs */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-transparent to-amber-100/50"></div>
        
        <div className="relative mx-auto max-w-6xl px-3 sm:px-4">
          {/* Hero Content */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="h-2 w-2 bg-amber-600 rounded-full animate-pulse"></span>
              Get in Touch
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-amber-800 mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-2g sm:text-xl md:text-2xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you and bring your mandala dreams to life
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-amber-200">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("terms")}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 touch-target ${
                    activeTab === "terms"
                      ? "bg-amber-600 text-white shadow-md"
                      : "text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 touch-target ${
                    activeTab === "contact"
                      ? "bg-amber-600 text-white shadow-md"
                      : "text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  Contact Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="mx-auto max-w-6xl px-3 sm:px-4 pb-16 sm:pb-20">
        {/* Contact Options Tab */}
        {activeTab === "contact" && (
          <div className="animate-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {contactOptions.map((option, index) => (
                <div
                  key={option.id}
                  className="group relative overflow-hidden rounded-3xl bg-white border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8 sm:p-10 text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${option.color} text-white text-3xl sm:text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {option.icon}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">
                      {option.title}
                    </h3>
                    <p className="text-amber-700 mb-8 leading-relaxed">
                      {option.description}
                    </p>
                    
                    <a
                      href={option.href}
                      target={option.id === "email" ? undefined : "_blank"}
                      rel={option.id === "email" ? undefined : "noopener noreferrer"}
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${option.color} hover:${option.hoverColor} text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg touch-target group-hover:scale-105`}
                    >
                      {option.action}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Banner */}
            <div className="mt-12 sm:mt-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Have a Question? Ask Away! 
              </h2>
              <p className="text-amber-100 mb-8 text-lg max-w-2xl mx-auto">
                Don't hesitate to reach out. We're here to help you create something beautiful.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-amber-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg touch-target"
              >
                <span className="text-2xl">💬</span>
                Ask Your Doubt Now
              </a>
            </div>
          </div>
        )}

        {/* Terms & Conditions Tab */}
        {activeTab === "terms" && (
          <div className="animate-in-up">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-200 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-8 sm:px-12 py-8 sm:py-10 text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Terms & Conditions
                  </h2>
                  <p className="text-amber-100">
                    Please read these important terms before placing your order
                  </p>
                </div>
                
                <div className="p-8 sm:p-12">
                  <div className="grid gap-8">
                    {termsData.map((section, index) => (
                      <div 
                        key={index}
                        className="group p-6 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-amber-50/30"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                              {section.title}
                            </h3>
                            <ul className="space-y-3">
                              {section.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                                  <span className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Floating WhatsApp Button (Mobile Only) */}
      <div className="md:hidden">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-110 animate-bounce touch-target"
          aria-label="Chat on WhatsApp"
        >
          <span className="text-2xl">💬</span>
        </a>
      </div>
    </main>
  )
}