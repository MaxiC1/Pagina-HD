import { useState, useEffect } from 'react'
import { products as mockProducts } from '@/data/products'
import type { Product as MockProduct } from '@/store/cartStore'

// Interfaz para productos con galería (como los guarda el admin)
interface ProductWithGallery {
  id: string
  sku: string
  name: string
  price: number
  sale_price?: number
  stock: number
  category: string
  brand: string
  short_description?: string
  description?: string
  images: string[]
  pdf_url?: string
  video_url?: string
  is_featured: boolean
  is_new: boolean
}

// Convertir productos del admin al formato esperado
const convertAdminToApi = (adminProduct: ProductWithGallery): any => {
  return {
    id: adminProduct.id,
    sku: adminProduct.sku,
    name: adminProduct.name,
    slug: adminProduct.sku.toLowerCase(),
    price: adminProduct.price,
    sale_price: adminProduct.sale_price,
    stock: adminProduct.stock,
    category_id: adminProduct.category,
    brand: adminProduct.brand,
    short_description: adminProduct.short_description,
    description: adminProduct.description,
    is_featured: adminProduct.is_featured,
    is_new: adminProduct.is_new,
    is_active: true,
    main_image: adminProduct.images?.[0] || 'https://lh3.googleusercontent.com/p/AF1QipNG3ZzzW6eD-83md-2Ted17QAa0iXg2zxwPpUZ6=s1360-w1360-h1020',
    images: adminProduct.images || [],
    pdf_url: adminProduct.pdf_url,
    video_url: adminProduct.video_url,
    rating: 4.5,
    reviews_count: 10,
  }
}

// Convertir productos mock al formato de la API (fallback)
const convertMockToApi = (mockProduct: MockProduct): any => {
  return {
    id: mockProduct.id,
    sku: mockProduct.sku,
    name: mockProduct.name,
    slug: mockProduct.sku.toLowerCase(),
    price: mockProduct.price,
    sale_price: mockProduct.sale_price,
    stock: mockProduct.stock,
    category_id: mockProduct.category,
    brand: mockProduct.brand,
    is_featured: Math.random() > 0.5,
    is_new: false,
    is_active: true,
    main_image: mockProduct.image,
    rating: 4.5,
    reviews_count: 10,
  }
}

export function useProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Intentar cargar productos desde localStorage
      const storedProducts = localStorage.getItem('products')
      
      setTimeout(() => {
        if (storedProducts) {
          const parsedProducts: ProductWithGallery[] = JSON.parse(storedProducts)
          // Filtrar solo productos con stock > 0
          const availableProducts = parsedProducts
            .filter(p => p.stock > 0)
            .map(convertAdminToApi)
          setProducts(availableProducts)
        } else {
          // Fallback a productos mock si no hay localStorage
          const apiProducts = mockProducts
            .filter(p => p.stock > 0)
            .map(convertMockToApi)
          setProducts(apiProducts)
        }
        setLoading(false)
      }, 500)
    } catch (err) {
      console.error('Error loading products:', err)
      setError('Error al cargar productos')
      setLoading(false)
    }
  }, [])

  return { products, loading, error }
}

export function useFeaturedProducts(limit = 8) {
  const { products, loading, error } = useProducts()
  
  const featured = products
    .filter(p => p.is_featured)
    .slice(0, limit)

  return { products: featured, loading, error }
}

export function useNewProducts(limit = 8) {
  const { products, loading, error } = useProducts()
  
  const newProducts = products
    .filter(p => p.is_new)
    .slice(0, limit)

  return { products: newProducts, loading, error }
}