/**
 * Servicio API - Hugo Díaz y Cía.
 * Conecta el frontend con la API PHP en /api/
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://hugodiaz.cl/api'

// Tipos
export interface Product {
  id: string
  sku: string
  name: string
  slug: string
  short_description?: string
  description?: string
  price: number
  sale_price?: number
  stock: number
  category_id: number
  brand: string
  model?: string
  is_featured: boolean
  is_new: boolean
  is_active: boolean
  main_image?: string
  rating?: number
  reviews_count?: number
  created_at?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
  icon?: string
  parent_id?: number
  is_active: boolean
}

export interface Order {
  id?: number
  order_number?: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_rut?: string
  subtotal: number
  discount: number
  tax: number
  total: number
  items: OrderItem[]
  coupon_code?: string
  customer_notes?: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_sku: string
  product_image?: string
  quantity: number
  price: number
  subtotal: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp?: string
}

// Helper para manejar errores
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// Helper para hacer requests
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Error de conexión con el servidor')
  }
}

// ============================================
// PRODUCTOS
// ============================================

/**
 * Obtener todos los productos
 */
export async function getProducts(filters?: {
  category?: string
  search?: string
  featured?: boolean
  limit?: number
}): Promise<Product[]> {
  const params = new URLSearchParams()
  
  if (filters?.category) params.append('category', filters.category)
  if (filters?.search) params.append('search', filters.search)
  if (filters?.featured) params.append('featured', '1')
  if (filters?.limit) params.append('limit', filters.limit.toString())

  const queryString = params.toString()
  const endpoint = `/products${queryString ? `?${queryString}` : ''}`

  const response = await fetchApi<Product[]>(endpoint)
  return response.data
}

/**
 * Obtener un producto por ID o slug
 */
export async function getProduct(idOrSlug: string): Promise<Product> {
  const response = await fetchApi<Product>(`/products/${idOrSlug}`)
  return response.data
}

/**
 * Obtener productos destacados
 */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return getProducts({ featured: true, limit })
}

// ============================================
// CATEGORÍAS
// ============================================

/**
 * Obtener todas las categorías
 */
export async function getCategories(): Promise<Category[]> {
  const response = await fetchApi<Category[]>('/categories')
  return response.data
}

/**
 * Obtener una categoría por ID o slug
 */
export async function getCategory(idOrSlug: string): Promise<Category> {
  const response = await fetchApi<Category>(`/categories/${idOrSlug}`)
  return response.data
}

// ============================================
// ÓRDENES
// ============================================

/**
 * Crear una nueva orden
 */
export async function createOrder(order: Order): Promise<{
  order_id: number
  order_number: string
  payment_url?: string
}> {
  const response = await fetchApi<{
    order_id: number
    order_number: string
    payment_url?: string
  }>('/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  })
  
  return response.data
}

/**
 * Obtener una orden por ID o número
 */
export async function getOrder(orderIdOrNumber: string): Promise<Order> {
  const response = await fetchApi<Order>(`/orders/${orderIdOrNumber}`)
  return response.data
}

// ============================================
// CUPONES
// ============================================

/**
 * Validar un cupón de descuento
 */
export async function validateCoupon(code: string, subtotal: number): Promise<{
  valid: boolean
  discount: number
  message?: string
}> {
  const response = await fetchApi<{
    valid: boolean
    discount: number
    message?: string
  }>('/coupons/validate', {
    method: 'POST',
    body: JSON.stringify({ code, subtotal }),
  })
  
  return response.data
}

// ============================================
// PAGOS (GETNET)
// ============================================

/**
 * Iniciar proceso de pago con Getnet
 */
export async function createPayment(orderId: number, amount: number): Promise<{
  payment_id: string
  payment_url: string
}> {
  const response = await fetchApi<{
    payment_id: string
    payment_url: string
  }>('/payments/create', {
    method: 'POST',
    body: JSON.stringify({ order_id: orderId, amount }),
  })
  
  return response.data
}

/**
 * Verificar estado de un pago
 */
export async function getPaymentStatus(paymentId: string): Promise<{
  status: string
  order_id: number
  message?: string
}> {
  const response = await fetchApi<{
    status: string
    order_id: number
    message?: string
  }>(`/payments/status/${paymentId}`)
  
  return response.data
}

// ============================================
// ADMIN
// ============================================

/**
 * Login de administrador
 */
export async function adminLogin(username: string, password: string): Promise<{
  token: string
  user: {
    id: number
    username: string
    email: string
    role: string
  }
}> {
  const response = await fetchApi<{
    token: string
    user: {
      id: number
      username: string
      email: string
      role: string
    }
  }>('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  
  return response.data
}

/**
 * Obtener dashboard stats (requiere token)
 */
export async function getDashboardStats(token: string): Promise<{
  total_orders: number
  total_revenue: number
  total_products: number
  low_stock_products: number
}> {
  const response = await fetchApi<{
    total_orders: number
    total_revenue: number
    total_products: number
    low_stock_products: number
  }>('/admin/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  
  return response.data
}

// ============================================
// HEALTH CHECK
// ============================================

/**
 * Verificar que la API está funcionando
 */
export async function healthCheck(): Promise<{
  status: string
  database: string
  memory: string
}> {
  const response = await fetchApi<{
    status: string
    database: string
    memory: string
  }>('/health')
  
  return response.data
}

export default {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getCategories,
  getCategory,
  createOrder,
  getOrder,
  validateCoupon,
  createPayment,
  getPaymentStatus,
  adminLogin,
  getDashboardStats,
  healthCheck,
}