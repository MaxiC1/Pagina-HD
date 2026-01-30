import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useCartStore, formatPrice } from '@/store/cartStore'
import { Link } from 'react-router-dom'

// Función para formatear RUT chileno
const formatRUT = (value: string): string => {
  // Remover todo excepto números y k
  const cleaned = value.replace(/[^0-9kK]/g, '')
  
  if (cleaned.length === 0) return ''
  
  // Separar número y dígito verificador
  const length = cleaned.length
  const dv = cleaned.slice(-1).toLowerCase()
  const number = cleaned.slice(0, -1)
  
  if (number.length === 0) return dv
  
  // Formatear número con puntos
  const formatted = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  
  return `${formatted}-${dv}`
}

// Función para limpiar RUT (quitar formato)
const cleanRUT = (rut: string): string => {
  return rut.replace(/[^0-9kK]/g, '')
}

// Función para validar RUT chileno
const validateRUT = (rut: string): boolean => {
  const cleaned = cleanRUT(rut)
  if (cleaned.length < 2) return false
  
  const dv = cleaned.slice(-1).toLowerCase()
  const number = cleaned.slice(0, -1)
  
  let sum = 0
  let multiplier = 2
  
  for (let i = number.length - 1; i >= 0; i--) {
    sum += parseInt(number[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  
  const expectedDV = 11 - (sum % 11)
  const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'k' : expectedDV.toString()
  
  return dv === calculatedDV
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = getTotalPrice()
  const iva = Math.round(subtotal * 0.19)
  const total = subtotal + iva

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rut: '',
    company: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Si es el campo RUT, formatearlo automáticamente
    if (name === 'rut') {
      const formatted = formatRUT(value)
      setFormData({
        ...formData,
        [name]: formatted,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Por favor completa todos los campos obligatorios')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido')
      return false
    }

    // Validar RUT si está presente
    if (formData.rut && !validateRUT(formData.rut)) {
      setError('El RUT ingresado no es válido')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Limpiar y convertir RUT a mayúscula para guardar
      const rutForDB = formData.rut ? cleanRUT(formData.rut).toUpperCase() : ''

      // Simular creación de orden
      const orderId = Math.floor(Math.random() * 100000)
      const orderNumber = `HD-${orderId.toString().padStart(6, '0')}`

      // En producción aquí se llamaría a createOrder de la API
      console.log('Creando orden:', {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_rut: rutForDB, // RUT limpio y en mayúscula
        customer_company: formData.company,
        customer_notes: formData.notes,
        subtotal,
        discount: 0,
        tax: iva,
        total: total,
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          product_sku: item.sku,
          quantity: item.quantity,
          price: item.sale_price || item.price,
          subtotal: (item.sale_price || item.price) * item.quantity,
        })),
      })

      // Limpiar carrito
      clearCart()

      // Redirigir a página de confirmación
      navigate(`/pago-resultado?success=true&order=${orderNumber}`)
    } catch (err) {
      setError('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.')
      console.error('Error al crear orden:', err)
    } finally {
      setLoading(false)
    }
  }

  // Si el carrito está vacío, redirigir
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center py-16">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold">Tu carrito está vacío</h2>
            <p className="text-muted-foreground text-lg">
              Agrega productos antes de ir al checkout
            </p>
            <Button asChild size="lg">
              <Link to="/productos">Ver Productos</Link>
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
          <Link to="/carrito">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al carrito
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-2">Finalizar Compra</h1>
        <p className="text-muted-foreground text-lg">
          Completa tus datos para procesar el pedido
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Datos del cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Datos de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nombre Completo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Teléfono <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rut">RUT (opcional)</Label>
                    <Input
                      id="rut"
                      name="rut"
                      placeholder="12.345.678-9"
                      value={formData.rut}
                      onChange={handleChange}
                      maxLength={12}
                    />
                    {formData.rut && !validateRUT(formData.rut) && (
                      <p className="text-xs text-destructive">RUT inválido</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Información adicional sobre tu pedido..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Método de pago */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Método de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    Serás redirigido a la plataforma de pago segura de Getnet para completar tu compra.
                    Aceptamos todas las tarjetas de crédito y débito.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Error */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Productos */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.quantity} x {formatPrice(item.sale_price || item.price)}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice((item.sale_price || item.price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Subtotal */}
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                {/* IVA */}
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">IVA (19%)</span>
                  <span className="font-semibold">{formatPrice(iva)}</span>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-xl font-bold">
                  <span>Total a Pagar</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                {/* Beneficios */}
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

                {/* Botón de pago */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-pulse">Procesando...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Proceder al Pago
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Al hacer clic aceptas nuestros términos y condiciones
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}