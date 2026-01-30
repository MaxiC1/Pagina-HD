import { useState, useEffect } from 'react'
import Hero from '@/components/home/Hero'
import PromoBanner from '@/components/home/PromoBanner'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import ClientLogos from '@/components/home/ClientLogos'
import Testimonials from '@/components/home/Testimonials'

// Configuración por defecto (fallback)
const defaultSettings = {
  showPromoBanner: true,
  showTestimonials: true,
  showClientLogos: true,
}

export default function Index() {
  const [settings, setSettings] = useState(defaultSettings)

  // Cargar configuración desde localStorage
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('general_settings')
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings)
        setSettings({
          showPromoBanner: parsedSettings.showPromoBanner ?? defaultSettings.showPromoBanner,
          showTestimonials: parsedSettings.showTestimonials ?? defaultSettings.showTestimonials,
          showClientLogos: parsedSettings.showClientLogos ?? defaultSettings.showClientLogos,
        })
      }
    } catch (error) {
      console.error('Error loading general settings from localStorage:', error)
    }
  }, [])

  return (
    <>
      {/* 1. Carrusel Hero */}
      <Hero />

      {/* 2. Por Qué Elegirnos */}
      <WhyChooseUs />

      {/* 3. Categorías */}
      <Categories />

      {/* 4. Banner Promocional */}
      {settings.showPromoBanner && <PromoBanner />}

      {/* 5. Productos Destacados */}
      <FeaturedProducts />

      {/* 6. Testimonios */}
      {settings.showTestimonials && <Testimonials />}

      {/* 7. Logos de Clientes */}
      {settings.showClientLogos && <ClientLogos />}
    </>
  )
}