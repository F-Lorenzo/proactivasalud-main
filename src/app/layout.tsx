import type { Metadata } from 'next'
import { Playfair_Display, Inter, Montserrat, Merriweather, Lora } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
})

const merriweather = Merriweather({
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
  subsets: ['latin'],
  display: 'swap',
})

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Proactiva Salud — Bienestar para la Generación Silver',
  description:
    'Programas de prevención, salud integral y apoyo humano para personas 50+ y organizaciones. Human Care Platform.',
  keywords:
    'bienestar, salud, mayores de 50, generación silver, prevención, Argentina',
  openGraph: {
    title: 'Proactiva Salud',
    description: 'Bienestar, autonomía y calidad de vida en cada etapa.',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} ${montserrat.variable} ${merriweather.variable} ${lora.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-lg"
        >
          Saltar al contenido
        </a>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
