import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Datos por defecto (fallback si no hay localStorage)
const defaultSlides = [
  {
    id: 1,
    title: 'Soluciones Canon para tu Empresa',
    subtitle: 'Fotocopiadoras e impresoras de última generación',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1920&h=800&fit=crop',
    button_text: 'Ver Catálogo',
    button_link: '/productos',
    active: true,
    position: 1,
  },
  {
    id: 2,
    title: 'Equipos Multifuncionales Canon',
    subtitle: 'Imprime, escanea y copia con la mejor calidad',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=1920&h=800&fit=crop',
    button_text: 'Ver Multifuncionales',
    button_link: '/productos?category=multifuncionales',
    active: true,
    position: 2,
  },
  {
    id: 3,
    title: 'Arriendo y Venta de Equipos',
    subtitle: 'Planes flexibles adaptados a tu negocio',
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=1920&h=800&fit=crop',
    button_text: 'Conocer Servicios',
    button_link: '/servicios',
    active: true,
    position: 3,
  },
]

export default function Hero() {
  const [slides, setSlides] = useState(defaultSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplaySpeed, setAutoplaySpeed] = useState(8000)

  // Cargar slides desde localStorage
  useEffect(() => {
    try {
      // Cargar hero slides
      const storedSlides = localStorage.getItem('hero_slides')
      if (storedSlides) {
        const parsedSlides = JSON.parse(storedSlides)
        // Filtrar solo activos y ordenar por position
        const activeSlides = parsedSlides
          .filter((slide: any) => slide.active)
          .sort((a: any, b: any) => a.position - b.position)
        
        if (activeSlides.length > 0) {
          setSlides(activeSlides)
        }
      }

      // Cargar velocidad de autoplay desde settings
      const storedSettings = localStorage.getItem('general_settings')
      if (storedSettings) {
        const settings = JSON.parse(storedSettings)
        if (settings.heroAutoplaySpeed) {
          setAutoplaySpeed(settings.heroAutoplaySpeed)
        }
      }
    } catch (error) {
      console.error('Error loading hero slides from localStorage:', error)
    }
  }, [])

  // Autoplay
  useEffect(() => {
    if (slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoplaySpeed)

    return () => clearInterval(timer)
  }, [slides.length, autoplaySpeed])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (slides.length === 0) {
    return null // No mostrar nada si no hay slides activos
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl mb-8"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button asChild size="lg" style={{ backgroundColor: '#17215A' }}>
                  <Link to={slides[currentSlide].button_link}>
                    {slides[currentSlide].button_text}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons - Solo mostrar si hay más de 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}