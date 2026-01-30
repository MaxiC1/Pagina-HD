import { Link } from 'react-router-dom'
import ProductCard from '@/components/products/ProductCard'
import { Button } from '@/components/ui/button'
import { useFeaturedProducts } from '@/hooks/useProducts'
import { Loader2 } from 'lucide-react'

export default function FeaturedProducts() {
  const { products, loading, error } = useFeaturedProducts(8)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Equipos Canon profesionales para empresas y oficinas
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-destructive/10 text-destructive rounded-lg p-6 max-w-md mx-auto">
              <p className="font-medium mb-2">Error al cargar productos</p>
              <p className="text-sm mb-4">{error}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
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
                    category: product.category_id?.toString() || '',
                  }}
                />
              ))}
            </div>

            {/* Ver todos los productos */}
            <div className="text-center">
              <Button asChild size="lg" style={{ backgroundColor: '#17215A' }}>
                <Link to="/productos">Ver Todos los Productos</Link>
              </Button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No hay productos destacados disponibles en este momento.
            </p>
            <Button asChild variant="outline">
              <Link to="/productos">Ver Catálogo Completo</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}