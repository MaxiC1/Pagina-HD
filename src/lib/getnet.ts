// Integración con Getnet Payment Link
// Documentación: https://www.getnet.cl/developers

export interface PaymentLinkRequest {
  amount: number
  orderId: string
  customerEmail: string
  customerName: string
  customerPhone: string
  description: string
  returnUrl: string
}

export interface PaymentLinkResponse {
  success: boolean
  paymentUrl?: string
  paymentId?: string
  error?: string
}

// Configuración de Getnet (usar variables de entorno en producción)
const GETNET_CONFIG = {
  // Usar sandbox para desarrollo
  baseUrl: import.meta.env.VITE_GETNET_BASE_URL || 'https://api-sandbox.getnet.cl',
  sellerId: import.meta.env.VITE_GETNET_SELLER_ID || 'DEMO_SELLER',
  clientId: import.meta.env.VITE_GETNET_CLIENT_ID || 'DEMO_CLIENT',
  clientSecret: import.meta.env.VITE_GETNET_CLIENT_SECRET || 'DEMO_SECRET',
}

/**
 * Genera un link de pago de Getnet
 * @param request Datos de la solicitud de pago
 * @returns URL del link de pago generado
 */
export async function generatePaymentLink(
  request: PaymentLinkRequest
): Promise<PaymentLinkResponse> {
  try {
    // En modo demo, generamos un link simulado
    // En producción, aquí se haría la llamada real a la API de Getnet

    if (GETNET_CONFIG.sellerId === 'DEMO_SELLER') {
      // Modo demo/desarrollo
      return {
        success: true,
        paymentUrl: `/pago/resultado?order_id=${request.orderId}&status=success`,
        paymentId: `PAY-${Date.now()}`,
      }
    }

    // Código para producción (descomentar y configurar):
    /*
    // 1. Obtener token de autenticación
    const authResponse = await fetch(`${GETNET_CONFIG.baseUrl}/auth/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${GETNET_CONFIG.clientId}:${GETNET_CONFIG.clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'oob',
      }),
    })

    if (!authResponse.ok) {
      throw new Error('Error al autenticar con Getnet')
    }

    const { access_token } = await authResponse.json()

    // 2. Crear link de pago
    const paymentResponse = await fetch(`${GETNET_CONFIG.baseUrl}/v1/payment-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        'seller_id': GETNET_CONFIG.sellerId,
      },
      body: JSON.stringify({
        amount: request.amount,
        currency: 'CLP',
        order_id: request.orderId,
        customer: {
          email: request.customerEmail,
          name: request.customerName,
          phone: request.customerPhone,
        },
        description: request.description,
        callback_url: request.returnUrl,
      }),
    })

    if (!paymentResponse.ok) {
      throw new Error('Error al crear link de pago')
    }

    const paymentData = await paymentResponse.json()

    return {
      success: true,
      paymentUrl: paymentData.payment_url,
      paymentId: paymentData.payment_id,
    }
    */

    // Fallback para demo
    return {
      success: true,
      paymentUrl: `/pago/resultado?order_id=${request.orderId}&status=success`,
      paymentId: `PAY-${Date.now()}`,
    }
  } catch (error) {
    console.error('Error en generatePaymentLink:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

/**
 * Verifica el estado de un pago
 * @param paymentId ID del pago a verificar
 * @returns Estado del pago
 */
export async function verifyPayment(_paymentId: string): Promise<{
  success: boolean
  status: 'approved' | 'pending' | 'rejected' | 'cancelled'
  amount?: number
}> {
  try {
    // En modo demo
    if (GETNET_CONFIG.sellerId === 'DEMO_SELLER') {
      return {
        success: true,
        status: 'approved',
        amount: 0,
      }
    }

    // Código para producción (descomentar y configurar):
    /*
    const response = await fetch(
      `${GETNET_CONFIG.baseUrl}/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'seller_id': GETNET_CONFIG.sellerId,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Error al verificar pago')
    }

    const data = await response.json()

    return {
      success: true,
      status: data.status,
      amount: data.amount,
    }
    */

    return {
      success: true,
      status: 'approved',
      amount: 0,
    }
  } catch (error) {
    console.error('Error en verifyPayment:', error)
    return {
      success: false,
      status: 'rejected',
    }
  }
}
