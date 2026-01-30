import { useState, useEffect } from 'react'
import { Save, Mail, Phone, MapPin, Globe, Clock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface SiteSettings {
  // Información de la empresa
  company_name: string
  company_slogan: string
  company_description: string
  
  // Información de contacto
  email: string
  phone: string
  whatsapp: string
  address: string
  city: string
  country: string
  
  // Horarios
  schedule_weekdays: string
  schedule_saturday: string
  schedule_sunday: string
  
  // SEO
  meta_title: string
  meta_description: string
  meta_keywords: string
  
  // Otros
  google_maps_url: string
  business_partner_text: string
  
  // Visibilidad de secciones
  showPromoBanner: boolean
  showTestimonials: boolean
  showClientLogos: boolean
}

const defaultSettings: SiteSettings = {
  company_name: 'Hugo Díaz y Cía.',
  company_slogan: 'Business Partner Canon Chile',
  company_description: 'Soluciones profesionales en equipos de impresión y tecnología de imagen Canon para empresas.',
  
  email: 'contacto@hugodiaz.cl',
  phone: '+56 2 2345 6789',
  whatsapp: '+56912345678',
  address: 'Av. Libertador Bernardo O\'Higgins 1234',
  city: 'Santiago',
  country: 'Chile',
  
  schedule_weekdays: 'Lunes a Viernes: 9:00 - 18:00',
  schedule_saturday: 'Sábado: 10:00 - 14:00',
  schedule_sunday: 'Domingo: Cerrado',
  
  meta_title: 'Hugo Díaz y Cía. - Business Partner Canon Chile',
  meta_description: 'Equipos de impresión profesional y tecnología de imagen Canon. Soluciones para empresas con servicio técnico especializado.',
  meta_keywords: 'canon, impresoras, copiadoras, multifuncionales, servicio técnico, business partner',
  
  google_maps_url: '',
  business_partner_text: 'Business Partner Oficial de Canon Chile desde 1995',
  
  showPromoBanner: true,
  showTestimonials: true,
  showClientLogos: true,
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Cargar configuración desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('general_settings')
    if (stored) {
      setSettings(JSON.parse(stored))
    } else {
      localStorage.setItem('general_settings', JSON.stringify(defaultSettings))
    }
  }, [])

  // Guardar configuración
  const handleSave = () => {
    setIsSaving(true)
    
    // Simular guardado
    setTimeout(() => {
      localStorage.setItem('general_settings', JSON.stringify(settings))
      setIsSaving(false)
      
      toast({
        title: '✅ Configuración guardada',
        description: 'Los cambios se han guardado correctamente.',
      })
    }, 800)
  }

  // Restablecer valores por defecto
  const handleReset = () => {
    if (confirm('¿Estás seguro de restablecer la configuración a los valores por defecto?')) {
      setSettings(defaultSettings)
      localStorage.setItem('general_settings', JSON.stringify(defaultSettings))
      
      toast({
        title: '🔄 Configuración restablecida',
        description: 'Se han restaurado los valores por defecto.',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuración General</h1>
          <p className="text-muted-foreground">Administra la información y ajustes del sitio web</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Restablecer
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información de la Empresa */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Empresa</CardTitle>
            <CardDescription>Datos principales de la empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Nombre de la Empresa</Label>
              <Input
                id="company_name"
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_slogan">Eslogan</Label>
              <Input
                id="company_slogan"
                value={settings.company_slogan}
                onChange={(e) => setSettings({ ...settings, company_slogan: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_description">Descripción</Label>
              <Textarea
                id="company_description"
                value={settings.company_description}
                onChange={(e) => setSettings({ ...settings, company_description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_partner_text">Texto Business Partner</Label>
              <Input
                id="business_partner_text"
                value={settings.business_partner_text}
                onChange={(e) => setSettings({ ...settings, business_partner_text: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Información de Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Datos de contacto de la empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline h-4 w-4 mr-2" />
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="inline h-4 w-4 mr-2" />
                Teléfono
              </Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">
                <Phone className="inline h-4 w-4 mr-2" />
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="+56912345678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="inline h-4 w-4 mr-2" />
                Dirección
              </Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={settings.country}
                  onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horarios de Atención */}
        <Card>
          <CardHeader>
            <CardTitle>Horarios de Atención</CardTitle>
            <CardDescription>Horarios de apertura y cierre</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule_weekdays">
                <Clock className="inline h-4 w-4 mr-2" />
                Lunes a Viernes
              </Label>
              <Input
                id="schedule_weekdays"
                value={settings.schedule_weekdays}
                onChange={(e) => setSettings({ ...settings, schedule_weekdays: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule_saturday">
                <Clock className="inline h-4 w-4 mr-2" />
                Sábado
              </Label>
              <Input
                id="schedule_saturday"
                value={settings.schedule_saturday}
                onChange={(e) => setSettings({ ...settings, schedule_saturday: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule_sunday">
                <Clock className="inline h-4 w-4 mr-2" />
                Domingo
              </Label>
              <Input
                id="schedule_sunday"
                value={settings.schedule_sunday}
                onChange={(e) => setSettings({ ...settings, schedule_sunday: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Visibilidad de Secciones */}
        <Card>
          <CardHeader>
            <CardTitle>Visibilidad de Secciones</CardTitle>
            <CardDescription>Controla qué secciones se muestran en la página principal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {settings.showPromoBanner ? (
                  <Eye className="h-5 w-5 text-green-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <Label htmlFor="showPromoBanner" className="cursor-pointer font-medium">
                    Banner Promocional
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Mostrar banner de promoción en la página principal
                  </p>
                </div>
              </div>
              <input
                id="showPromoBanner"
                type="checkbox"
                checked={settings.showPromoBanner}
                onChange={(e) => setSettings({ ...settings, showPromoBanner: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {settings.showTestimonials ? (
                  <Eye className="h-5 w-5 text-green-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <Label htmlFor="showTestimonials" className="cursor-pointer font-medium">
                    Testimonios
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Mostrar sección de testimonios de clientes
                  </p>
                </div>
              </div>
              <input
                id="showTestimonials"
                type="checkbox"
                checked={settings.showTestimonials}
                onChange={(e) => setSettings({ ...settings, showTestimonials: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {settings.showClientLogos ? (
                  <Eye className="h-5 w-5 text-green-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <Label htmlFor="showClientLogos" className="cursor-pointer font-medium">
                    Logos de Clientes
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Mostrar logos de empresas clientes
                  </p>
                </div>
              </div>
              <input
                id="showClientLogos"
                type="checkbox"
                checked={settings.showClientLogos}
                onChange={(e) => setSettings({ ...settings, showClientLogos: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración SEO</CardTitle>
            <CardDescription>Optimización para motores de búsqueda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Título Meta (SEO)</Label>
              <Input
                id="meta_title"
                value={settings.meta_title}
                onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                placeholder="Título que aparece en Google"
              />
              <p className="text-xs text-muted-foreground">
                Recomendado: 50-60 caracteres. Actual: {settings.meta_title.length}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Descripción Meta (SEO)</Label>
              <Textarea
                id="meta_description"
                value={settings.meta_description}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                rows={3}
                placeholder="Descripción breve para Google"
              />
              <p className="text-xs text-muted-foreground">
                Recomendado: 150-160 caracteres. Actual: {settings.meta_description.length}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_keywords">Palabras Clave (SEO)</Label>
              <Input
                id="meta_keywords"
                value={settings.meta_keywords}
                onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                placeholder="palabra1, palabra2, palabra3"
              />
              <p className="text-xs text-muted-foreground">
                Separar palabras con comas
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Otros */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Otros Ajustes</CardTitle>
            <CardDescription>Configuraciones adicionales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google_maps_url">URL de Google Maps (Iframe)</Label>
              <Textarea
                id="google_maps_url"
                value={settings.google_maps_url}
                onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                rows={3}
                placeholder="<iframe src='...' ..."
              />
              <p className="text-xs text-muted-foreground">
                Pega aquí el código de inserción de Google Maps
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botón flotante de guardar */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button size="lg" onClick={handleSave} disabled={isSaving} className="shadow-lg">
          <Save className="mr-2 h-5 w-5" />
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  )
}