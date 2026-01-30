import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validación básica
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido')
      return
    }

    setLoading(true)

    try {
      // Simular envío (aquí irá la llamada a la API)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Formulario de contacto:', formData)

      // Aquí se enviará a la API
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      })
    } catch (err) {
      setError('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 gradient-hd">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Contáctanos
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Estamos Aquí Para Ayudarte
            </h1>
            <p className="text-xl text-white/90">
              Nuestro equipo de expertos está listo para resolver tus consultas y encontrar la mejor solución para tu empresa
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Teléfonos */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Teléfonos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a 
                  href="tel:+56322685729" 
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  (32) 2685729
                </a>
                <a 
                  href="tel:+56322699722" 
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  (32) 2699722
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://wa.me/56998660373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +569 98660373
                </a>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:contacto@hugodiaz.cl" 
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  contacto@hugodiaz.cl
                </a>
              </CardContent>
            </Card>

            {/* Horario */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Horario</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lun - Jue: 8:30 a 14:00 - 14:30 a 18:00
                </p>
                <p className="text-sm text-muted-foreground">
                  Viernes: 8:30 a 14:00 - 14:30 a 17:30
                </p>
                <p className="text-sm text-muted-foreground">
                  Sábado y Domingo: Cerrado
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Formulario y Mapa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo a la brevedad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nombre Completo <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Teléfono <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa (opcional)</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Mi Empresa S.A."
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Mensaje <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Cuéntanos sobre tu consulta o requerimiento..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-green-50 text-green-900 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-pulse">Enviando...</span>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <div className="space-y-6">
              {/* Ubicación con Mapa */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Nuestra Ubicación</CardTitle>
                      <CardDescription className="mt-2">
                        Hugo Díaz y Cía. Ltda., Viña del Mar, Chile
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden border">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.525256117257!2d-71.55161162439265!3d-33.016289675409354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dd4e1f680119%3A0x30f768d4bfd69f75!2sHugo%20D%C3%ADaz%20y%20C%C3%ADa.%20Ltda.!5e0!3m2!1ses-419!2scl!4v1768592435545!5m2!1ses-419!2scl" 
                      width="100%" 
                      height="300" 
                      style={{ border: 0 }} 
                      allowFullScreen={true}
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación Hugo Díaz y Cía"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Preguntas Frecuentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">¿Tienes Dudas?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">¿Ofrecen arriendo de equipos?</h4>
                    <p className="text-sm text-muted-foreground">
                      Sí, contamos con planes flexibles de arriendo con mantenimiento incluido.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">¿Tienen servicio técnico?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contamos con técnicos certificados Canon para mantenimiento y reparaciones.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">¿Entregan factura?</h4>
                    <p className="text-sm text-muted-foreground">
                      Sí, emitimos factura electrónica para todas nuestras ventas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}