import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Tipos de producto con campos extendidos
export interface Product {
  id: string
  sku: string
  name: string
  slug?: string
  price: number
  sale_price?: number
  image?: string
  main_image?: string
  images?: string[]  // ✅ NUEVO: Múltiples imágenes
  stock: number
  category: string
  category_id?: number
  brand: string
  short_description?: string
  description?: string  // ✅ NUEVO: Descripción detallada (para máquinas/cámaras)
  pdf_url?: string  // ✅ NUEVO: Link a PDF técnico
  video_url?: string  // ✅ NUEVO: ID de YouTube (ej: "dQw4w9WgXcQ")
  related_products?: string[]  // ✅ NUEVO: IDs de productos relacionados
  specifications?: Record<string, string>  // ✅ NUEVO: Especificaciones técnicas
  is_featured?: boolean
  is_new?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)

          if (existingItem) {
            // Si ya existe, aumentar cantidad
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
                  : item
              ),
            }
          } else {
            // Si no existe, agregar nuevo
            return {
              items: [
                ...state.items,
                {
                  ...product,
                  quantity: Math.min(quantity, product.stock),
                },
              ],
            }
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === productId) {
              // Asegurar que no se exceda el stock
              const newQuantity = Math.max(0, Math.min(quantity, item.stock))
              
              // Si la cantidad es 0, eliminar el item
              if (newQuantity === 0) {
                return null
              }
              
              return { ...item, quantity: newQuantity }
            }
            return item
          }).filter(Boolean) as CartItem[],
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const state = get()
        return state.items.reduce((total, item) => {
          const price = item.sale_price || item.price
          return total + price * item.quantity
        }, 0)
      },

      getSubtotal: () => {
        // Alias de getTotalPrice para compatibilidad
        return get().getTotalPrice()
      },
    }),
    {
      name: 'hugo-diaz-cart',
    }
  )
)

// Helper para formatear precios en CLP
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price)
}

// Helper para calcular descuento
export const calculateDiscount = (price: number, salePrice?: number): number => {
  if (!salePrice || salePrice >= price) return 0
  return Math.round(((price - salePrice) / price) * 100)
}

// Helper para obtener precio efectivo (con o sin descuento)
export const getEffectivePrice = (product: Product): number => {
  return product.sale_price && product.sale_price < product.price
    ? product.sale_price
    : product.price
}