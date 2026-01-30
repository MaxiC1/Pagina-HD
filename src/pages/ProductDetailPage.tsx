import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShoppingCart, ArrowLeft, Check, Truck, Shield, Award, ChevronRight, FileText, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cartStore'
import { products as mockProducts } from '@/data/products'
import ProductCard from '@/components/products/ProductCard'

// Interfaz para productos desde localStorage
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

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  // Cargar producto desde localStorage
  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    try {
      const storedProducts = localStorage.getItem('products')
      
      if (storedProducts) {
        const parsedProducts: ProductWithGallery[] = JSON.parse(storedProducts)
        const foundProduct = parsedProducts.find(p => p.id === id || p.sku === id)
        
        if (foundProduct) {
          // Convertir al formato esperado por el componente
          setProduct({
            ...foundProduct,
            image: foundProduct.images?.[0] || 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
            main_image: foundProduct.images?.[0],
          })
        } else {
          // Fallback a productos mock
          const mockProduct = mockProducts.find(p => p.id === id || p.sku === id)
          if (mockProduct) {
            setProduct({
              ...mockProduct,
              images: [mockProduct.image],
              main_image: mockProduct.image,
            })
          }
        }
      } else {
        // Si no hay localStorage, usar mock products
        const mockProduct = mockProducts.find(p => p.id === id || p.sku === id)
        if (mockProduct) {
          setProduct({
            ...mockProduct,
            images: [mockProduct.image],
            main_image: mockProduct.image,
          })
        }
      }
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!product || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-muted-foreground mb-6">
            El producto que buscas no existe o fue eliminado.
          </p>
          <Button asChild>
            <Link to="/productos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Productos
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Convertir al formato esperado por el carrito
    const cartProduct = {
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      image: product.images?.[0] || product.image,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
    }
    addItem(cartProduct, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    const cartProduct = {
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      image: product.images?.[0] || product.image,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
    }
    addItem(cartProduct, quantity)
    navigate('/checkout')
  }

  // Imágenes del producto (usar galería si existe, sino la imagen principal)
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || product.main_image || 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop']

  const inStock = product.stock > 0

  // Función para extraer ID de YouTube de una URL
  const getYouTubeEmbedUrl = (videoUrl?: string): string | null => {
    if (!videoUrl) return null
    
    // Si ya es solo el ID
    if (videoUrl.length === 11 && !videoUrl.includes('/') && !videoUrl.includes('?')) {
      return `https://www.youtube.com/embed/${videoUrl}`
    }
    
    // Extraer ID de diferentes formatos de URL de YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = videoUrl.match(regExp)
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }
    
    return null
  }

  const videoEmbedUrl = getYouTubeEmbedUrl(product.video_url)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/productos" className="hover:text-primary transition-colors">
            Productos
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* SECCIÓN SUPERIOR: Imágenes + Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* IZQUIERDA: Galería de Imágenes */}
          <div className="space-y-4">
            {/* Imagen Principal */}
            <div className="bg-white rounded-lg border p-8 aspect-square flex items-center justify-center">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Miniaturas (solo si hay múltiples imágenes) */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg border p-4 aspect-square hover:border-primary transition-colors ${
                      selectedImage === index ? 'border-primary ring-2 ring-primary' : ''
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DERECHA: Información del Producto */}
          <div className="space-y-6">
            {/* Categoría y Stock */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="text-sm">
                {product.category}
              </Badge>
              {inStock ? (
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  <Check className="mr-1 h-3 w-3" />
                  En Stock ({product.stock} disponibles)
                </Badge>
              ) : (
                <Badge variant="destructive">Agotado</Badge>
              )}
              {product.is_new && (
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                  Nuevo
                </Badge>
              )}
              {product.is_featured && (
                <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
                  Destacado
                </Badge>
              )}
            </div>

            {/* Nombre */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.brand}</p>
              <p className="text-sm text-muted-foreground mt-1">SKU: {product.sku}</p>
            </div>

            {/* Precio */}
            <div className="py-4">
              {product.sale_price && product.sale_price < product.price ? (
                <>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-4xl font-bold text-primary">
                      ${product.sale_price.toLocaleString('es-CL')}
                    </span>
                    <span className="text-2xl text-muted-foreground line-through">
                      ${product.price.toLocaleString('es-CL')}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-medium mt-2">
                    Ahorras ${(product.price - product.sale_price).toLocaleString('es-CL')} ({Math.round(((product.price - product.sale_price) / product.price) * 100)}%)
                  </p>
                </>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price.toLocaleString('es-CL')}
                  </span>
                  <span className="text-muted-foreground">+ IVA</span>
                </div>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Precio final: ${(product.price * 1.19).toLocaleString('es-CL')}
              </p>
            </div>

            {/* Descripción corta (si existe) */}
            {product.short_description && (
              <div className="py-4 border-t border-b">
                <p className="text-muted-foreground leading-relaxed">
                  {product.short_description}
                </p>
              </div>
            )}

            {/* Cantidad y Botones */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!inStock}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={!inStock}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Máx: {product.stock}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!inStock || addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Agregado
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Agregar al Carrito
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleBuyNow}
                  disabled={!inStock}
                >
                  Comprar Ahora
                </Button>
              </div>
            </div>

            {/* Beneficios */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Envío a Todo Chile</h4>
                      <p className="text-sm text-muted-foreground">
                        Despacho rápido y seguro
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Garantía Oficial Canon</h4>
                      <p className="text-sm text-muted-foreground">
                        Cobertura completa del fabricante
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Instalación Incluida</h4>
                      <p className="text-sm text-muted-foreground">
                        Técnicos certificados
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Descripción Detallada con HTML Rico (solo si existe) */}
        {product.description && (
          <div className="mb-12">
            <Card>
              <CardContent className="pt-8 pb-8">
                <div 
                  className="prose prose-slate max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8
                    prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:text-muted-foreground prose-ul:my-4
                    prose-li:my-2
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-img:rounded-lg prose-img:shadow-lg
                    prose-table:w-full prose-table:my-6
                    prose-td:py-3 prose-td:px-4
                    prose-th:py-3 prose-th:px-4 prose-th:font-semibold"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Video de YouTube (solo si existe) */}
        {videoEmbedUrl && (
          <div className="mb-12">
            <Card>
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-6">Video Demostración</h2>
                <div className="aspect-video rounded-lg overflow-hidden max-w-3xl mx-auto">
                  <iframe
                    className="w-full h-full"
                    src={videoEmbedUrl}
                    title="Video demostración del producto"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Botón de Descarga de PDF (solo si existe) */}
        {product.pdf_url && (
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Ficha Técnica Completa
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Descarga la documentación técnica detallada en formato PDF
                      </p>
                    </div>
                  </div>
                  <a
                    href={product.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Button size="lg">
                      <Download className="mr-2 h-5 w-5" />
                      Descargar PDF
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}