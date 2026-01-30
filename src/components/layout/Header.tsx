import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Menu, User, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Datos por defecto (fallback)
const defaultSettings = {
  company_slogan: 'Business Partner Canon Chile',
  email: 'contacto@hugodiaz.cl',
  phone: '(32) 2685729',
  phone2: '(32) 2699722',
  whatsapp: '+56998660373',
}

export default function Header() {
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [settings, setSettings] = useState(defaultSettings)

  // Cargar configuración desde localStorage
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('site_settings')
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings)
        setSettings({
          company_slogan: parsedSettings.company_slogan || defaultSettings.company_slogan,
          email: parsedSettings.email || defaultSettings.email,
          phone: parsedSettings.phone || defaultSettings.phone,
          phone2: defaultSettings.phone2, // No está en settings admin
          whatsapp: parsedSettings.whatsapp || defaultSettings.whatsapp,
        })
      }
    } catch (error) {
      console.error('Error loading site settings from localStorage:', error)
    }
  }, [])

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Productos' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="text-primary-foreground" style={{ backgroundColor: '#17215A' }}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
            <span className="font-semibold">{settings.company_slogan}</span>
            <div className="flex gap-4">
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:underline">
                {settings.phone}
              </a>
              <a href={`tel:${settings.phone2.replace(/\s/g, '')}`} className="hover:underline">
                {settings.phone2}
              </a>
              <a href={`tel:${settings.whatsapp.replace(/\s/g, '')}`} className="hover:underline">
                {settings.whatsapp}
              </a>
              <a href={`mailto:${settings.email}`} className="hover:underline">
                {settings.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/images/logo-hugodiaz2.png" 
              alt="Hugo Díaz y Cía" 
              className="h-60 w-auto transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - TEXTO MÁS GRANDE */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="text-xl font-semibold hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions - ICONOS MÁS GRANDES */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <Input 
                    type="search" 
                    placeholder="Buscar productos..." 
                    className="w-[200px] lg:w-[300px]" 
                    autoFocus 
                  />
                  <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                    <X className="h-8 w-8" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                  <Search className="h-8 w-8" />
                </Button>
              )}
            </div>

            {/* Cart */}
            <Link to="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-8 w-8" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Admin login */}
            <Link to="/admin/login">
              <Button variant="ghost" size="icon">
                <User className="h-8 w-8" />
              </Button>
            </Link>

            {/* Mobile menu */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Input type="search" placeholder="Buscar productos..." className="w-full" />
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="text-lg font-semibold hover:text-primary transition-colors py-2" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t space-y-2">
              <p className="text-sm font-medium">Contacto</p>
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="block text-sm text-muted-foreground hover:text-primary">
                {settings.phone}
              </a>
              <a href={`tel:${settings.phone2.replace(/\s/g, '')}`} className="block text-sm text-muted-foreground hover:text-primary">
                {settings.phone2}
              </a>
              <a href={`tel:${settings.whatsapp.replace(/\s/g, '')}`} className="block text-sm text-muted-foreground hover:text-primary">
                {settings.whatsapp}
              </a>
              <a href={`mailto:${settings.email}`} className="block text-sm text-muted-foreground hover:text-primary">
                {settings.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}