import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2, XCircle, Clock, Package, Phone, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  
  const success = searchParams.get('success') === 'true'
  const orderNumber = searchParams.get('order') || 'N/A'
  const paymentId = searchParams.get('payment_id')

  useEffect(() => {
    // Simular verificación del pago
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center py-16">
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Clock className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold">Verificando tu pago...</h2>
            <p className="text-muted-foreground">Por favor espera un momento</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // PAGO EXITOSO
  if (success) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold mb-2">
              ¡Pago Exitoso!
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Tu orden ha sido procesada correctamente
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Número de orden */}
            <Alert>
              <Package className="h-4 w-4" />
              <AlertTitle className="text-lg font-semibold">
                Número de Orden
              </AlertTitle>
              <AlertDescription className="text-2xl font-mono font-bold text-primary mt-2">
                {orderNumber}
              </AlertDescription>
            </Alert>

            {/* Información - SOLO EMAIL */}
            <div className="bg-muted p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">¿Qué sigue ahora?</h3>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-base mb-1">Hemos enviado la confirmación a tu correo electrónico</p>
                  <p className="text-sm text-muted-foreground">
                    Revisa tu bandeja de entrada. Si no lo encuentras, verifica tu carpeta de spam o correo no deseado.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contacto - 2 TELÉFONOS JUNTOS + WHATSAPP SEPARADO */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">¿Necesitas ayuda?</h3>
              
              <div className="space-y-3">
                {/* Teléfonos juntos en una tarjeta */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-2">Llámanos</p>
                      <div className="space-y-1">
                        <a 
                          href="tel:+56322685729"
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          (32) 2685729
                        </a>
                        <a 
                          href="tel:+56322699722"
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          (32) 2699722
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp separado */}
                <a 
                  href="https://wa.me/56998660373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">+569 98660373</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:contacto@hugodiaz.cl"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Escríbenos</p>
                    <p className="text-sm text-muted-foreground">contacto@hugodiaz.cl</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                <Link to="/">
                  Volver al Inicio
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/productos">
                  Seguir Comprando
                </Link>
              </Button>
            </div>

            {/* Nota de pago */}
            {paymentId && (
              <p className="text-xs text-center text-muted-foreground pt-4">
                ID de transacción: {paymentId}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // PAGO FALLIDO
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold mb-2">
            Pago No Completado
          </CardTitle>
          <p className="text-lg text-muted-foreground">
            No pudimos procesar tu pago
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Razones posibles */}
          <Alert variant="destructive">
            <AlertTitle className="font-semibold mb-2">
              Posibles causas:
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Fondos insuficientes en la cuenta</li>
                <li>Datos de la tarjeta incorrectos</li>
                <li>Transacción cancelada por el usuario</li>
                <li>Problemas de conexión durante el proceso</li>
                <li>Tarjeta bloqueada o con restricciones</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Qué hacer */}
          <div className="bg-muted p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">¿Qué puedes hacer?</h3>
            
            <div className="space-y-3 text-sm">
              <p>✓ Verifica que tu tarjeta tenga fondos suficientes</p>
              <p>✓ Asegúrate de ingresar correctamente los datos de la tarjeta</p>
              <p>✓ Intenta con otra tarjeta o método de pago</p>
              <p>✓ Contacta con tu banco si el problema persiste</p>
            </div>
          </div>

          {/* Contacto - 2 TELÉFONOS JUNTOS + WHATSAPP SEPARADO */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">¿Necesitas ayuda?</h3>
            <p className="text-sm text-muted-foreground">
              Si continúas teniendo problemas, nuestro equipo está disponible para ayudarte
            </p>
            
            <div className="space-y-3">
              {/* Teléfonos juntos en una tarjeta */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-2">Llámanos</p>
                    <div className="space-y-1">
                      <a 
                        href="tel:+56322685729"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        (32) 2685729
                      </a>
                      <a 
                        href="tel:+56322699722"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        (32) 2699722
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp separado */}
              <a 
                href="https://wa.me/56998660373"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+569 98660373</p>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:contacto@hugodiaz.cl"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Escríbenos</p>
                  <p className="text-sm text-muted-foreground">contacto@hugodiaz.cl</p>
                </div>
              </a>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              <Link to="/carrito">
                Volver al Carrito
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/">
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}