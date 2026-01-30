import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCartStore, type Product, formatPrice, calculateDiscount } from '@/store/cartStore'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, 1)
    setTimeout(() => setIsAdding(false), 600)
  }

  const discount = calculateDiscount(product.price, product.sale_price)
  const effectivePrice = product.sale_price && product.sale_price < product.price 
    ? product.sale_price 
    : product.price

  return (
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Imagen del producto */}
      <Link to={`/productos/${product.id}`} className="relative overflow-hidden bg-muted">
        <div className="aspect-square relative">
          <img
            src={product.image || product.main_image || 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop'}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges superiores */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.is_new && (
              <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
            )}
            {product.stock < 5 && product.stock > 0 && (
              <Badge variant="destructive">Últimas unidades</Badge>
            )}
          </div>
        </div>
      </Link>

      {/* Contenido */}
      <CardContent className="flex-1 p-4">
        <Link to={`/productos/${product.id}`}>
          {/* SKU */}
          <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku}</p>
          
          {/* Marca */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
          </div>

          {/* Nombre del producto */}
          <h3 className="font-semibold text-base line-clamp-2 mb-3 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Precio */}
          <div className="space-y-1">
            {product.sale_price && product.sale_price < product.price ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.sale_price)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-medium">
                  Ahorras {formatPrice(product.price - product.sale_price)}
                </p>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3">
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 font-medium">
                ✓ Disponible ({product.stock} en stock)
              </p>
            ) : (
              <p className="text-sm text-red-600 font-medium">
                Sin stock
              </p>
            )}
          </div>
        </Link>
      </CardContent>

      {/* Footer con botón */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className="w-full transition-all"
          style={{ backgroundColor: '#17215A' }}
          size="lg"
        >
          {isAdding ? (
            <>
              <span className="animate-pulse">Agregado ✓</span>
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al Carrito
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}