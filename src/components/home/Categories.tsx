import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Printer, ScanLine, Droplet, ScanSearch, Settings, Camera, Loader2 } from 'lucide-react'

// Datos temporales de categorías (mock)
const mockCategories = [
  { id: 1, name: 'Cámaras', slug: 'camaras', icon: 'Camera', is_active: true, parent_id: null },
  { id: 2, name: 'Impresoras', slug: 'impresoras', icon: 'Printer', is_active: true, parent_id: null },
  { id: 3, name: 'Multifuncionales', slug: 'multifuncionales', icon: 'ScanLine', is_active: true, parent_id: null },
  { id: 4, name: 'Tóner', slug: 'toner', icon: 'Droplet', is_active: true, parent_id: null },
  { id: 5, name: 'Escáneres', slug: 'escaneres', icon: 'ScanSearch', is_active: true, parent_id: null },
  { id: 6, name: 'Accesorios', slug: 'accesorios', icon: 'Settings', is_active: true, parent_id: null },
]

// Mapeo de iconos para las categorías
const iconMap: Record<string, any> = {
  Camera: Camera,
  Printer: Printer,
  ScanLine: ScanLine,
  Droplet: Droplet,
  ScanSearch: ScanSearch,
  Settings: Settings,
}

interface Category {
  id: number
  name: string
  slug: string
  icon?: string
  is_active: boolean
  parent_id: number | null
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      // Simular carga de API
      await new Promise(resolve => setTimeout(resolve, 300))
      setCategories(mockCategories)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (iconName?: string) => {
    if (!iconName) return Printer
    return iconMap[iconName] || Printer
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Categorías de Productos
          </h2>
          <p className="text-lg text-muted-foreground">
            Encuentra el equipo Canon perfecto para tu negocio
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = getIcon(category.icon)
            
            return (
              <Link
                key={category.id}
                to={`/productos?category=${category.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[160px]">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}