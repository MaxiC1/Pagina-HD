import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCartStore, formatPrice } from '@/store/cartStore'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const total = getTotalPrice()
  const subtotal = total
  const iva = Math.round(total * 0.19)
  const discount = 0

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center py-16">
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Tu carrito está vacío</h2>
              <p className="text-muted-foreground text-lg">
                Agrega productos para comenzar tu compra
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/productos">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Ver Productos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Seguir comprando
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-2">Carrito de Compras</h1>
        <p className="text-muted-foreground text-lg">
          {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemTotal = (item.sale_price || item.price) * item.quantity

            return (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Imagen */}
                    <Link to={`/productos/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image || item.main_image || 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200&h=200&fit=crop'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    </Link>

                    {/* Info del producto */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/productos/${item.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">SKU: {item.sku}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(item.sale_price || item.price)}
                        </span>
                        {item.sale_price && item.sale_price < item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex flex-col items-end gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Subtotal</p>
                        <p className="text-xl font-bold">{formatPrice(itemTotal)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Botón limpiar carrito */}
          <Button
            variant="outline"
            onClick={clearCart}
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Vaciar Carrito
          </Button>
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {/* Descuento */}
              {discount > 0 && (
                <div className="flex justify-between text-base text-green-600">
                  <span>Descuento</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              {/* IVA */}
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">IVA (19%)</span>
                <span className="font-semibold">{formatPrice(iva)}</span>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total + iva)}</span>
              </div>

              {/* Notas */}
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Garantía oficial Canon</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Soporte técnico especializado</span>
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
                <Link to="/checkout">
                  Ir a Pagar
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/productos">
                  Seguir Comprando
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}