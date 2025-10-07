import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import NavMenu from '@/components/nav-menu'
import Footer from '@/components/footer'

// Root layout for the app:
// - Loads global styles and fonts
// - Renders persistent NavMenu and analytics
// - Uses suppressHydrationWarning to avoid extension-injected attribute mismatches

export const metadata: Metadata = {
  title: 'Mann_mandala',
  description: 'Created by Mann Mandalas',
  generator: 'Mann Mandalas',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: [
      '/favicon.png',
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <NavMenu />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
