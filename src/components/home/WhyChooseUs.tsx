import { Truck, Shield, HeadphonesIcon, BadgeCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Truck,
    title: 'Instalación Incluida',
    description: 'Instalamos y configuramos tu equipo sin costo',
  },
  {
    icon: Shield,
    title: 'Garantía Canon',
    description: 'Todos nuestros equipos con garantía oficial',
  },
  {
    icon: HeadphonesIcon,
    title: 'Soporte Técnico',
    description: 'Servicio técnico especializado Canon',
  },
  {
    icon: BadgeCheck,
    title: 'Distribuidor Autorizado',
    description: 'Partner oficial Canon en Chile',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por Qué Elegirnos?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Más de 25 años de experiencia como distribuidores oficiales Canon en Chile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
