import { Link } from 'react-router-dom'
import { 
  Wrench, 
  ShoppingCart, 
  Clock, 
  Headphones, 
  Shield, 
  Truck,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    icon: ShoppingCart,
    title: 'Venta de Equipos Canon',
    description: 'Amplio catálogo de impresoras, fotocopiadoras, multifuncionales y escáneres Canon con garantía oficial.',
    features: [
      'Equipos nuevos con garantía oficial Canon',
      'Asesoría personalizada para tu negocio',
      'Financiamiento disponible',
      'Instalación incluida'
    ],
    color: 'bg-blue-500'
  },
  {
    icon: Clock,
    title: 'Arriendo de Equipos',
    description: 'Soluciones flexibles de arriendo con mantenimiento incluido, ideal para empresas que necesitan equipos sin inversión inicial.',
    features: [
      'Planes desde 12 meses',
      'Mantenimiento preventivo incluido',
      'Reemplazo de tóner sin costo adicional',
      'Opción de compra al finalizar el contrato'
    ],
    color: 'bg-green-500'
  },
  {
    icon: Wrench,
    title: 'Servicio Técnico Especializado',
    description: 'Técnicos certificados Canon para mantener tus equipos funcionando al máximo rendimiento.',
    features: [
      'Técnicos certificados por Canon',
      'Repuestos originales',
      'Diagnóstico sin costo',
      'Servicio a domicilio disponible'
    ],
    color: 'bg-red-500'
  },
  {
    icon: Shield,
    title: 'Mantenimiento Preventivo',
    description: 'Planes de mantenimiento programado para evitar fallas y maximizar la vida útil de tus equipos.',
    features: [
      'Visitas programadas mensuales o trimestrales',
      'Limpieza profunda de componentes',
      'Calibración y ajustes',
      'Reporte detallado de estado'
    ],
    color: 'bg-purple-500'
  },
  {
    icon: Headphones,
    title: 'Soporte Técnico',
    description: 'Atención telefónica y remota para resolver consultas y problemas técnicos de forma rápida.',
    features: [
      'Horario extendido de atención',
      'Soporte remoto',
      'Asesoría en uso de equipos',
      'Resolución de problemas comunes'
    ],
    color: 'bg-orange-500'
  },
  {
    icon: Truck,
    title: 'Suministros y Consumibles',
    description: 'Tóner, cartuchos y consumibles originales Canon con entrega a domicilio.',
    features: [
      'Tóner original Canon',
      'Cartuchos de tinta',
      'Papel especializado',
      'Entrega a domicilio'
    ],
    color: 'bg-cyan-500'
  }
]

const benefits = [
  'Business Partner Oficial Canon Chile',
  'Más de 30 años de experiencia',
  'Técnicos certificados',
  'Respaldo y garantía oficial',
  'Atención personalizada',
  'Cobertura en toda la región'
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 gradient-hd">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Servicios Profesionales
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Soluciones Integrales Canon
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Venta, arriendo, mantenimiento y soporte técnico especializado para empresas e instituciones
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/productos">
                  Ver Equipos
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Link to="/contacto">
                  Solicitar Cotización
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones completas para todas tus necesidades de impresión y digitalización
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <div className={`w-14 h-14 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Por Qué Elegirnos?
              </h2>
              <p className="text-lg text-muted-foreground">
                Somos el partner ideal para tus soluciones de impresión
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas Ayuda Personalizada?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nuestro equipo de expertos está listo para asesorarte y encontrar la mejor solución para tu negocio
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <a 
                href="tel:+56322685729"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Llámanos</p>
                  <p className="font-semibold">(32) 2685729</p>
                </div>
              </a>

              <a 
                href="tel:+56322699722"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Llámanos</p>
                  <p className="font-semibold">(32) 2699722</p>
                </div>
              </a>

              <a 
                href="mailto:contacto@hugodiaz.cl"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors"
              >
                <Mail className="h-5 w-5" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Escríbenos</p>
                  <p className="font-semibold text-sm">contacto@hugodiaz.cl</p>
                </div>
              </a>
            </div>

            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contacto">
                Solicitar Cotización
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}