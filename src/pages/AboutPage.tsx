import { Card, CardContent } from '@/components/ui/card'
import { Target, Eye, Award, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Más de 25 años siendo el partner de confianza en soluciones de impresión Canon para empresas en Chile
        </p>
      </div>

      {/* Historia */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hugo Díaz y Cía nace en 1995 con la visión de proporcionar soluciones de impresión y
                copiado de alta calidad para empresas chilenas. Desde nuestros inicios, hemos sido
                distribuidores oficiales de Canon, una de las marcas más reconocidas mundialmente en
                tecnología de imagen.
              </p>
              <p>
                A lo largo de estos más de 25 años, hemos crecido junto a nuestros clientes,
                adaptándonos a las nuevas tecnologías y necesidades del mercado. Hoy contamos con un
                equipo de más de 50 profesionales dedicados a brindar el mejor servicio y soporte
                técnico.
              </p>
              <p>
                Nuestra experiencia nos ha convertido en líderes del sector, atendiendo desde pequeñas
                empresas hasta grandes corporaciones en todo Chile, siempre con el compromiso de
                excelencia que nos caracteriza.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
            <span className="text-muted-foreground">Imagen corporativa</span>
          </div>
        </div>
      </div>

      {/* Misión, Visión, Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardContent className="pt-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Misión</h3>
            <p className="text-muted-foreground">
              Proporcionar soluciones integrales de impresión y gestión documental que mejoren la
              productividad de nuestros clientes, con productos Canon de la más alta calidad y un
              servicio excepcional.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visión</h3>
            <p className="text-muted-foreground">
              Ser reconocidos como el principal partner de confianza en soluciones de impresión Canon
              en Chile, liderando la innovación y excelencia en servicio al cliente.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Valores</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• Excelencia en el servicio</li>
              <li>• Integridad y transparencia</li>
              <li>• Compromiso con el cliente</li>
              <li>• Innovación continua</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Certificaciones */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">Certificaciones y Alianzas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Distribuidor Oficial Canon</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Servicio Técnico Certificado</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">ISO 9001:2015</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Partner Gold Canon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
