import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/products/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, SlidersHorizontal, Loader2, X } from 'lucide-react'

const categories = [
  { id: 'all', name: 'Todas las categorías' },
  { id: 'Fotocopiadoras', name: 'Fotocopiadoras' },
  { id: 'Impresoras', name: 'Impresoras' },
  { id: 'Multifuncionales', name: 'Multifuncionales' },
  { id: 'Consumibles', name: 'Tóner y Consumibles' },
  { id: 'Escáneres', name: 'Escáneres' },
  { id: 'Cámaras Profesionales', name: 'Cámaras Profesionales' },
  { id: 'Cámaras Semi-Profesionales', name: 'Cámaras Semi-Profesionales' },
  { id: 'Lentes', name: 'Lentes' },
  { id: 'Accesorios', name: 'Accesorios' },
  { id: 'Otros', name: 'Otros' },
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products: allProducts, loading } = useProducts()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  // Inicializar filtros desde URL
  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filtro por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      )
    }

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => {
        // Comparar directamente con category_id (que viene del admin)
        return p.category_id === selectedCategory ||
               p.category_id?.toLowerCase() === selectedCategory.toLowerCase() ||
               p.slug?.toLowerCase().includes(selectedCategory.toLowerCase())
      })
    }

    // Filtro por rango de precio
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        filtered.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))
        break
      default:
        break
    }

    return filtered
  }, [allProducts, searchQuery, selectedCategory, priceRange, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setPriceRange([0, 10000000])
    setSortBy('name')
    setSearchParams({})
  }

  const activeFiltersCount = [
    searchQuery !== '',
    selectedCategory !== 'all',
    priceRange[0] !== 0 || priceRange[1] !== 10000000,
  ].filter(Boolean).length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Catálogo de Productos Canon</h1>
        <p className="text-lg text-muted-foreground">
          {loading ? 'Cargando...' : `${filteredProducts.length} productos disponibles`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtros laterales */}
        <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Filtros</CardTitle>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Limpiar
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Búsqueda */}
              <div className="space-y-2">
                <Label htmlFor="search">Buscar producto</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Buscar por nombre o SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rango de precio */}
              <div className="space-y-2">
                <Label>Rango de precio</Label>
                <div className="pt-2">
                  <Slider
                    min={0}
                    max={10000000}
                    step={100000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Badges de filtros activos */}
              {activeFiltersCount > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Filtros activos:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge variant="secondary">
                        Búsqueda: {searchQuery}
                      </Badge>
                    )}
                    {selectedCategory !== 'all' && (
                      <Badge variant="secondary">
                        {categories.find((c) => c.id === selectedCategory)?.name}
                      </Badge>
                    )}
                    {(priceRange[0] !== 0 || priceRange[1] !== 10000000) && (
                      <Badge variant="secondary">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>

        {/* Productos */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            <div className="flex items-center gap-2 ml-auto">
              <Label htmlFor="sort" className="text-sm hidden sm:inline">
                Ordenar por:
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="newest">Más Nuevos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Cargando productos...</p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    price: product.price,
                    sale_price: product.sale_price,
                    image: product.main_image || 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
                    stock: product.stock,
                    brand: product.brand,
                    category: product.category_id || product.slug || '',
                  }}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">No se encontraron productos</p>
                <p className="text-muted-foreground mb-4">
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}