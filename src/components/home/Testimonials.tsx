import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'

// Datos por defecto (fallback si no hay localStorage)
const defaultTestimonials = [
  {
    id: '1',
    name: 'María González',
    position: 'Gerente General',
    company: 'Empresa XYZ',
    message: 'Excelente servicio y equipos de primera calidad. Han mejorado significativamente nuestra productividad.',
    rating: 5,
    image: '',
    active: true,
  },
  {
    id: '2',
    name: 'Carlos Ramírez',
    position: 'Director de Operaciones',
    company: 'Corporación ABC',
    message: 'El servicio técnico es excepcional. Siempre responden rápido y solucionan cualquier inconveniente.',
    rating: 5,
    image: '',
    active: true,
  },
  {
    id: '3',
    name: 'Ana Martínez',
    position: 'Jefa de Administración',
    company: 'Consultora 123',
    message: 'Los planes de arriendo son muy convenientes y nos han permitido actualizar nuestros equipos constantemente.',
    rating: 5,
    image: '',
    active: true,
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Cargar testimonios desde localStorage
  useEffect(() => {
    try {
      const storedTestimonials = localStorage.getItem('testimonials')
      if (storedTestimonials) {
        const parsedTestimonials = JSON.parse(storedTestimonials)
        // Filtrar solo activos
        const activeTestimonials = parsedTestimonials.filter((t: any) => t.active)
        
        if (activeTestimonials.length > 0) {
          setTestimonials(activeTestimonials)
        }
      }
    } catch (error) {
      console.error('Error loading testimonials from localStorage:', error)
    }
  }, [])

  // Filtrar solo testimonios activos
  const activeTestimonials = testimonials.filter(t => t.active)

  useEffect(() => {
    if (activeTestimonials.length <= 1) return

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % activeTestimonials.length)
    }, 6000) // Cambiar cada 6 segundos

    return () => clearInterval(timer)
  }, [activeTestimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % activeTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length)
  }

  if (activeTestimonials.length === 0) {
    return null
  }

  const current = activeTestimonials[currentTestimonial]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conoce las experiencias de empresas que confían en nuestros servicios
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carrusel de Testimonios */}
          <div className="relative min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <Card className="border-2 border-primary/10 shadow-xl">
                  <CardContent className="pt-12 pb-12 px-8 md:px-12">
                    {/* Icono de comillas */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Quote className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    {/* Estrellas */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < current.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Texto del testimonio */}
                    <p className="text-xl md:text-2xl text-center text-foreground mb-8 italic leading-relaxed">
                      "{current.message}"
                    </p>

                    {/* Información del cliente */}
                    <div className="text-center">
                      {current.image && (
                        <img
                          src={current.image}
                          alt={current.name}
                          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-primary/20"
                        />
                      )}
                      <h4 className="font-bold text-lg text-foreground">{current.name}</h4>
                      <p className="text-primary font-medium">{current.position}</p>
                      <p className="text-muted-foreground">{current.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Botones de navegación (solo si hay más de 1 testimonio) */}
          {activeTestimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-primary/10 border-2 border-primary/20 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-primary/10 border-2 border-primary/20 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            </>
          )}

          {/* Indicadores (dots) */}
          {activeTestimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {activeTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all ${
                    index === currentTestimonial
                      ? 'bg-primary w-8 h-3'
                      : 'bg-primary/30 w-3 h-3 hover:bg-primary/50'
                  } rounded-full`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Contador (opcional) */}
        {activeTestimonials.length > 1 && (
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {currentTestimonial + 1} / {activeTestimonials.length}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}