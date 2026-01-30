import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

// Datos por defecto (fallback)
const defaultSettings = {
  company_name: 'Hugo Díaz y Cía.',
  company_description: 'Business Partner Oficial Canon Chile. Soluciones de impresión y digitalización para empresas.',
  email: 'contacto@hugodiaz.cl',
  phone: '(32) 2685729',
  phone2: '(32) 2699722',
  whatsapp: '+56998660373',
  address: 'Viña del Mar, Chile',
}

export default function Footer() {
  const [settings, setSettings] = useState(defaultSettings)
  const currentYear = new Date().getFullYear()

  // Cargar configuración desde localStorage
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('general_settings')
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings)
        setSettings({
          company_name: parsedSettings.company_name || defaultSettings.company_name,
          company_description: parsedSettings.business_partner_text || parsedSettings.company_description || defaultSettings.company_description,
          email: parsedSettings.email || defaultSettings.email,
          phone: parsedSettings.phone || defaultSettings.phone,
          phone2: defaultSettings.phone2, // Segundo teléfono no está en settings
          whatsapp: parsedSettings.whatsapp || defaultSettings.whatsapp,
          address: `${parsedSettings.city || 'Viña del Mar'}, ${parsedSettings.country || 'Chile'}`,
        })
      }
    } catch (error) {
      console.error('Error loading general settings from localStorage:', error)
    }
  }, [])

  return (
    <footer className="mt-auto" style={{ backgroundColor: '#17215A' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/images/logo-hugodiaz.png" 
                alt={settings.company_name}
                className="h-40 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-300">
              {settings.company_description}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Servicio técnico disponible</span>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Productos */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-white">Productos Canon</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productos?category=impresoras" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Impresoras
                </Link>
              </li>
              <li>
                <Link to="/productos?category=multifuncionales" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Multifuncionales
                </Link>
              </li>
              <li>
                <Link to="/productos?category=fotocopiadoras" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Fotocopiadoras
                </Link>
              </li>
              <li>
                <Link to="/productos?category=escaner" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Escáneres
                </Link>
              </li>
              <li>
                <Link to="/productos?category=toner" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Tóner y Consumibles
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-white">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <a 
                      href={`tel:${settings.phone.replace(/\s/g, '')}`}
                      className="text-sm text-gray-300 hover:text-white transition-colors block"
                    >
                      {settings.phone}
                    </a>
                    {settings.phone2 && (
                      <a 
                        href={`tel:${settings.phone2.replace(/\s/g, '')}`}
                        className="text-sm text-gray-300 hover:text-white transition-colors block"
                      >
                        {settings.phone2}
                      </a>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{settings.whatsapp}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{settings.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 5: Logos ChileCompra */}
          <div>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg">
                <img 
                  src="/images/logo-chilecompra.png" 
                  alt="ChileCompra" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-3 rounded-lg">
                <img 
                  src="/images/logo-mercadopublico-compraagil.png" 
                  alt="Mercado Público - Compra Ágil" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-800/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {settings.company_name} Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </Link>
              <Link to="/privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}