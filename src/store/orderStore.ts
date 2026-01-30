import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from './cartStore'

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  rut: string
}

export interface ShippingInfo {
  address: string
  city: string
  region: string
  comuna: string
  zipCode: string
  notes?: string
}

export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  shipping?: ShippingInfo
  total: number
  subtotal: number
  discount: number
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentId?: string
  paymentMethod?: string
  createdAt: string
  updatedAt: string
}

interface OrderState {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => string
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  getOrderById: (orderId: string) => Order | undefined
  getOrdersByStatus: (status: Order['status']) => Order[]
  updateOrder: (orderId: string, updates: Partial<Order>) => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set({ orders: [...get().orders, newOrder] })
        return newOrder.id
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
        })
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter((order) => order.status === status)
      },

      updateOrder: (orderId, updates) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId
              ? { ...order, ...updates, updatedAt: new Date().toISOString() }
              : order
          ),
        })
      },
    }),
    {
      name: 'order-storage',
    }
  )
)
