import { Product } from '@/store/cartStore'

export const categories = [
  { id: 'fotocopiadoras', name: 'Fotocopiadoras', icon: 'Printer' },
  { id: 'impresoras', name: 'Impresoras', icon: 'Printer' },
  { id: 'multifuncionales', name: 'Multifuncionales', icon: 'ScanLine' },
  { id: 'toner', name: 'Tóner y Consumibles', icon: 'Droplet' },
  { id: 'escaner', name: 'Escáneres', icon: 'ScanSearch' },
  { id: 'accesorios', name: 'Accesorios', icon: 'Settings' },
]

export const brands = [
  'Canon',
]

export const products: Product[] = [
  // ========================================
  // MULTIFUNCIONALES - CON HTML RICO
  // ========================================
  {
    id: '1',
    name: 'Canon imageRUNNER ADVANCE DX C3835i',
    sku: 'CANON-DX3835',
    price: 2890000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&h=500&fit=crop',
    ],
    stock: 5,
    category: 'multifuncionales',
    brand: 'Canon',
    // ✅ DESCRIPCIÓN CON HTML RICO (ejemplo de cómo se verá desde el admin)
    description: `
      <h2>Canon imageRUNNER ADVANCE DX C3835i</h2>
      <p>La <strong>Canon imageRUNNER ADVANCE DX C3835i</strong> es una impresora multifuncional a color de alto rendimiento diseñada para grupos de trabajo medianos y grandes.</p>
      
      <img src="https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800&h=400&fit=crop" alt="Detalle del equipo" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
      
      <h3>Características Destacadas</h3>
      <ul>
        <li>Impresión a color de alta calidad hasta <strong>35 ppm</strong></li>
        <li>Pantalla táctil intuitiva de <strong>10.1"</strong> para fácil navegación</li>
        <li>Escáner de doble cara de un solo paso para mayor eficiencia</li>
        <li>Conectividad cloud integrada (Google Drive, Dropbox, OneDrive)</li>
        <li>Seguridad avanzada con autenticación de usuarios y encriptación de datos</li>
      </ul>
      
      <h3>Aplicaciones Ideales</h3>
      <p>Perfecta para empresas que requieren gestión documental avanzada, flujos de trabajo digitales y soluciones de impresión seguras. Ideal para departamentos de marketing, finanzas, recursos humanos y equipos colaborativos.</p>
      
      <img src="https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&h=400&fit=crop" alt="Panel de control" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
      
      <h3>Especificaciones Técnicas</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600;">Velocidad de impresión</td>
          <td style="padding: 12px;">35 ppm (color/B&N)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600;">Resolución</td>
          <td style="padding: 12px;">1200 x 1200 dpi</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600;">Capacidad de papel</td>
          <td style="padding: 12px;">1,200 hojas (expandible a 3,200)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600;">Memoria</td>
          <td style="padding: 12px;">4 GB RAM</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600;">Disco duro</td>
          <td style="padding: 12px;">320 GB</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600;">Conectividad</td>
          <td style="padding: 12px;">Ethernet, Wi-Fi, USB</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600;">Dimensiones</td>
          <td style="padding: 12px;">615 x 685 x 809 mm</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: 600;">Peso</td>
          <td style="padding: 12px;">Aprox. 78 kg</td>
        </tr>
      </table>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-dx-c3835i.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: ['4', '7', '13'],
    is_featured: true,
    is_new: false,
  },
  {
    id: '5',
    name: 'Canon imageRUNNER ADVANCE C5540i',
    sku: 'CANON-C5540i',
    price: 4590000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=500&fit=crop',
    ],
    stock: 3,
    category: 'multifuncionales',
    brand: 'Canon',
    description: `
      <h2>Rendimiento Profesional de Alto Volumen</h2>
      <p>El equipo multifuncional <strong>Canon imageRUNNER ADVANCE C5540i</strong> ofrece velocidades de impresión de hasta 40 páginas por minuto en color y blanco y negro.</p>
      
      <h3>Funcionalidades Avanzadas</h3>
      <ul>
        <li>Procesador de alta velocidad para tiempos de respuesta rápidos</li>
        <li>Escáner dual de 270 ipm para digitalización masiva</li>
        <li>Panel táctil personalizable de 10.1 pulgadas</li>
      </ul>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-c5540i.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: ['7', '15', '17'],
    is_featured: true,
    is_new: true,
  },
  {
    id: '8',
    name: 'Canon imageRUNNER 1643iF',
    sku: 'CANON-1643iF',
    price: 890000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 10,
    category: 'multifuncionales',
    brand: 'Canon',
    description: `
      <h2>Compacto y Eficiente</h2>
      <p>Equipo multifuncional ideal para pequeñas oficinas.</p>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-1643if.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: ['10', '13'],
  },
  {
    id: '14',
    name: 'Canon imageRUNNER ADVANCE C256i',
    sku: 'CANON-C256i',
    price: 1890000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 6,
    category: 'multifuncionales',
    brand: 'Canon',
    short_description: 'Impresora multifuncional a color de nivel empresarial con velocidad de 25 ppm.',
  },
  {
    id: '16',
    name: 'Canon imageCLASS MF445dw',
    sku: 'CANON-MF445dw',
    price: 459990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 14,
    category: 'multifuncionales',
    brand: 'Canon',
    short_description: 'Multifuncional láser monocromático inalámbrico con impresión dúplex automática.',
  },

  // ========================================
  // FOTOCOPIADORAS
  // ========================================
  {
    id: '2',
    name: 'Canon imageRUNNER 2630i',
    sku: 'CANON-2630i',
    price: 1590000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&h=500&fit=crop',
    ],
    stock: 8,
    category: 'fotocopiadoras',
    brand: 'Canon',
    description: `
      <h2>Alto Volumen para Corporativos</h2>
      <p>Fotocopiadora multifuncional blanco y negro de alto volumen.</p>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-2630i.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: ['7', '10', '17'],
  },
  {
    id: '11',
    name: 'Canon imageRUNNER ADVANCE DX 6780i',
    sku: 'CANON-DX6780',
    price: 6990000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 2,
    category: 'fotocopiadoras',
    brand: 'Canon',
    description: `
      <h2>Producción de Alto Volumen</h2>
      <p>Fotocopiadora premium con velocidades de hasta 60 ppm.</p>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-dx6780i.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: ['4', '7', '13', '17'],
    is_featured: true,
  },
  {
    id: '18',
    name: 'Canon imageRUNNER ADVANCE 4551i',
    sku: 'CANON-4551i',
    price: 3490000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 4,
    category: 'fotocopiadoras',
    brand: 'Canon',
    short_description: 'Sistema multifuncional blanco y negro de alto rendimiento.',
  },

  // ========================================
  // IMPRESORAS
  // ========================================
  {
    id: '3',
    name: 'Canon imageCLASS LBP6230dw',
    sku: 'CANON-LBP6230',
    price: 189990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 15,
    category: 'impresoras',
    brand: 'Canon',
    description: `
      <h2>Compacta y Inalámbrica</h2>
      <p>Impresora láser monocromática perfecta para oficinas pequeñas.</p>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-lbp6230dw.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: ['10'],
  },
  {
    id: '6',
    name: 'Canon imagePROGRAF PRO-1000',
    sku: 'CANON-PRO1000',
    price: 3290000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 4,
    category: 'impresoras',
    brand: 'Canon',
    description: `
      <h2>Calidad Fotográfica Profesional</h2>
      <p>Impresora de gran formato con sistema de 12 tintas LUCIA PRO.</p>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-pro1000.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: ['13'],
    is_featured: true,
  },
  {
    id: '9',
    name: 'Canon PIXMA G7020',
    sku: 'CANON-G7020',
    price: 329990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 20,
    category: 'impresoras',
    brand: 'Canon',
    short_description: 'Impresora multifuncional de tinta continua con Wi-Fi.',
  },

  // ========================================
  // ESCÁNERES
  // ========================================
  {
    id: '12',
    name: 'Canon imageFORMULA DR-C225W',
    sku: 'CANON-DRC225W',
    price: 489990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 12,
    category: 'escaner',
    brand: 'Canon',
    description: `
      <h2>Escaneo Inalámbrico Portátil</h2>
      <p>Escáner compacto perfecto para trabajo remoto.</p>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-drc225w.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: [],
  },
  {
    id: '19',
    name: 'Canon imageFORMULA DR-G2140',
    sku: 'CANON-DRG2140',
    price: 2890000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 5,
    category: 'escaner',
    brand: 'Canon',
    description: `
      <h2>Digitalización Industrial</h2>
      <p>Escáner de producción para alto volumen.</p>
    `,
    pdf_url: 'https://ejemplo.com/fichas-tecnicas/canon-drg2140.pdf',
    video_url: 'dQw4w9WgXcQ',
    related_products: [],
    is_featured: true,
  },

  // ========================================
  // TÓNER Y CONSUMIBLES - SIN DESCRIPCIÓN DETALLADA
  // ========================================
  {
    id: '4',
    name: 'Tóner Canon 046 Negro',
    sku: 'TONER-046-BK',
    price: 45990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 50,
    category: 'toner',
    brand: 'Canon',
    short_description: 'Tóner negro original Canon 046 para impresoras y multifuncionales compatibles.',
  },
  {
    id: '7',
    name: 'Tóner Canon 051 Negro',
    sku: 'TONER-051-BK',
    price: 52990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 80,
    category: 'toner',
    brand: 'Canon',
    short_description: 'Tóner negro de alto rendimiento Canon 051.',
  },
  {
    id: '10',
    name: 'Tóner Canon 057 Negro',
    sku: 'TONER-057-BK',
    price: 38990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 60,
    category: 'toner',
    brand: 'Canon',
    short_description: 'Tóner negro Canon 057 para imageCLASS.',
  },
  {
    id: '15',
    name: 'Tóner Canon 055 Cyan',
    sku: 'TONER-055-C',
    price: 48990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 40,
    category: 'toner',
    brand: 'Canon',
    short_description: 'Tóner cyan original Canon 055.',
  },

  // ========================================
  // ACCESORIOS - SIN DESCRIPCIÓN DETALLADA
  // ========================================
  {
    id: '13',
    name: 'Cassette de Papel Canon',
    sku: 'ACC-CASSETTE',
    price: 189990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 25,
    category: 'accesorios',
    brand: 'Canon',
    short_description: 'Cassette adicional de papel de 550 hojas para equipos Canon.',
  },
  {
    id: '17',
    name: 'Unidad de Tambor Canon',
    sku: 'ACC-DRUM',
    price: 129990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 30,
    category: 'accesorios',
    brand: 'Canon',
    short_description: 'Unidad de tambor de repuesto para impresoras láser Canon.',
  },
  {
    id: '20',
    name: 'Kit de Mantenimiento Canon',
    sku: 'ACC-MAINT-KIT',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
    stock: 35,
    category: 'accesorios',
    brand: 'Canon',
    short_description: 'Kit de mantenimiento preventivo para equipos Canon.',
  },
]

// Funciones helper
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category)
}

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter((p) => p.brand === brand)
}

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery)
  )
}

export const getRelatedProducts = (productIds: string[]): Product[] => {
  return products.filter((p) => productIds.includes(p.id))
}

export const hasDetailedContent = (product: Product): boolean => {
  return !!(product.description || product.pdf_url || product.video_url)
}