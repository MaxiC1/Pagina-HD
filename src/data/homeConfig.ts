/**
 * Configuración de la Página de Inicio
 * Este archivo contiene todos los textos, imágenes y configuraciones
 * que serán editables desde el Panel de Administración
 */

// ========================================
// HERO CAROUSEL (Carrusel Principal)
// ========================================
export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  image: string
  cta: string
  link: string
  isActive: boolean
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Soluciones Canon para tu Empresa',
    subtitle: 'Fotocopiadoras e impresoras de última generación',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1920&h=800&fit=crop',
    cta: 'Ver Catálogo',
    link: '/productos',
    isActive: true,
  },
  {
    id: 2,
    title: 'Equipos Multifuncionales Canon',
    subtitle: 'Imprime, escanea y copia con la mejor calidad',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=1920&h=800&fit=crop',
    cta: 'Ver Multifuncionales',
    link: '/productos?category=multifuncionales',
    isActive: true,
  },
  {
    id: 3,
    title: 'Arriendo y Venta de Equipos',
    subtitle: 'Planes flexibles adaptados a tu negocio',
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=1920&h=800&fit=crop',
    cta: 'Conocer Servicios',
    link: '/servicios',
    isActive: true,
  },
]

// ========================================
// WHY CHOOSE US (Por Qué Elegirnos)
// ========================================
export interface WhyChooseUsConfig {
  title: string
  subtitle: string
  features: Array<{
    id: number
    title: string
    description: string
    icon: string // Nombre del ícono de lucide-react
  }>
}

export const whyChooseUsConfig: WhyChooseUsConfig = {
  title: '¿Por Qué Elegirnos?',
  subtitle: 'Somos expertos en soluciones de impresión Canon',
  features: [
    {
      id: 1,
      title: 'Experiencia de Más de 30 Años',
      description: 'Somos distribuidores autorizados Canon con amplia trayectoria',
      icon: 'Award',
    },
    {
      id: 2,
      title: 'Servicio Técnico Especializado',
      description: 'Técnicos certificados Canon para mantención y reparación',
      icon: 'Wrench',
    },
    {
      id: 3,
      title: 'Garantía Oficial',
      description: 'Todos nuestros equipos cuentan con garantía del fabricante',
      icon: 'Shield',
    },
    {
      id: 4,
      title: 'Arriendo Flexible',
      description: 'Planes de arriendo adaptados a las necesidades de tu empresa',
      icon: 'CreditCard',
    },
  ],
}

// ========================================
// PROMO BANNER (Banner Promocional)
// ========================================
export interface PromoBannerConfig {
  image: string
  title?: string
  subtitle?: string
  cta?: string
  link?: string
  showOverlay: boolean
  isActive: boolean
}

export const promoBannerConfig: PromoBannerConfig = {
  image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1920&h=400&fit=crop',
  title: '', // Vacío si solo quieres mostrar la imagen
  subtitle: '',
  cta: '',
  link: '',
  showOverlay: true, // Mostrar overlay oscuro sobre la imagen
  isActive: true, // Activar/desactivar el banner
}

// ========================================
// TESTIMONIALS (Testimonios)
// ========================================
export interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  text: string
  avatar?: string
  rating: number
  isActive: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    position: 'Gerente General',
    company: 'Empresa XYZ',
    text: 'Excelente servicio y equipos de primera calidad. Han mejorado significativamente nuestra productividad.',
    rating: 5,
    isActive: true,
  },
  {
    id: 2,
    name: 'Carlos Ramírez',
    position: 'Director de Operaciones',
    company: 'Corporación ABC',
    text: 'El servicio técnico es excepcional. Siempre responden rápido y solucionan cualquier inconveniente.',
    rating: 5,
    isActive: true,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Jefa de Administración',
    company: 'Consultora 123',
    text: 'Los planes de arriendo son muy convenientes y nos han permitido actualizar nuestros equipos constantemente.',
    rating: 5,
    isActive: true,
  },
]

// ========================================
// CLIENT LOGOS (Logos de Clientes)
// ========================================
export interface ClientLogo {
  id: number
  name: string
  logo: string
  isActive: boolean
}

export const clientLogos: ClientLogo[] = [
  {
    id: 1,
    name: 'Cliente 1',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    isActive: true,
  },
  {
    id: 2,
    name: 'Cliente 2',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    isActive: true,
  },
  {
    id: 3,
    name: 'Cliente 3',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    isActive: true,
  },
  {
    id: 4,
    name: 'Cliente 4',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    isActive: true,
  },
  {
    id: 5,
    name: 'Cliente 5',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    isActive: true,
  },
  {
    id: 6,
    name: 'Cliente 6',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
    isActive: true,
  },
]

// ========================================
// FEATURED PRODUCTS (Configuración)
// ========================================
export interface FeaturedProductsConfig {
  title: string
  subtitle: string
  showCount: number // Cuántos productos mostrar
}

export const featuredProductsConfig: FeaturedProductsConfig = {
  title: 'Productos Destacados',
  subtitle: 'Descubre nuestros equipos más populares',
  showCount: 8, // Mostrar 8 productos destacados
}

// ========================================
// CATEGORIES (Configuración)
// ========================================
export interface CategoriesConfig {
  title: string
  subtitle: string
}

export const categoriesConfig: CategoriesConfig = {
  title: 'Nuestras Categorías',
  subtitle: 'Encuentra el equipo perfecto para tu negocio',
}

// ========================================
// GENERAL SETTINGS
// ========================================
export interface GeneralSettings {
  heroAutoplaySpeed: number // Velocidad del carrusel en milisegundos
  showPromoBanner: boolean // Mostrar/ocultar banner promocional
  showTestimonials: boolean // Mostrar/ocultar testimonios
  showClientLogos: boolean // Mostrar/ocultar logos de clientes
}

export const generalSettings: GeneralSettings = {
  heroAutoplaySpeed: 8000, // 8 segundos
  showPromoBanner: true,
  showTestimonials: true,
  showClientLogos: true,
}