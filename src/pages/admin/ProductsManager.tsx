import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, FileText, Video, Upload, Link as LinkIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { products as initialProducts } from '@/data/products'
import type { Product } from '@/store/cartStore'

// Categorías actualizadas con cámaras
const categories = [
  'Fotocopiadoras',
  'Impresoras',
  'Multifuncionales',
  'Escáneres',
  'Cámaras Profesionales',
  'Cámaras Semi-Profesionales',
  'Lentes',
  'Accesorios',
  'Consumibles',
  'Otros',
]

// Categorías que requieren descripción detallada
const categoriesWithDetailedDescription = [
  'Fotocopiadoras',
  'Impresoras',
  'Multifuncionales',
  'Cámaras Profesionales',
  'Cámaras Semi-Profesionales',
]

// Extender interfaz Product para soportar múltiples imágenes
interface ProductWithGallery extends Omit<Product, 'image'> {
  images: string[] // Array de imágenes (la primera es la principal)
}

export default function ProductsManager() {
  const [products, setProducts] = useState<ProductWithGallery[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductWithGallery | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Estado para manejo de imágenes
  const [imageUploadMode, setImageUploadMode] = useState<'url' | 'upload'>('url')
  const [mainImages, setMainImages] = useState<string[]>([]) // Imágenes principales del producto
  const [descriptionImages, setDescriptionImages] = useState<string[]>([]) // Imágenes para la descripción

  // Formulario
  const [formData, setFormData] = useState<Partial<ProductWithGallery>>({
    name: '',
    sku: '',
    price: 0,
    stock: 0,
    category: '',
    brand: 'Canon',
    short_description: '',
    description: '',
    images: [],
    pdf_url: '',
    video_url: '',
    is_featured: false,
    is_new: false,
  })

  // Precio formateado
  const [priceFormatted, setPriceFormatted] = useState('')

  // Cargar productos y convertir formato antiguo
  useEffect(() => {
    const stored = localStorage.getItem('products')
    if (stored) {
      const parsedProducts = JSON.parse(stored)
      // Convertir productos con image: string a images: string[]
      const converted = parsedProducts.map((p: Product | ProductWithGallery) => {
        if ('image' in p && typeof p.image === 'string') {
          const { image, ...rest } = p as Product
          return { ...rest, images: [image] } as ProductWithGallery
        }
        return p as ProductWithGallery
      })
      setProducts(converted)
    } else {
      // Convertir productos iniciales
      const converted = initialProducts.map((p) => ({
        ...p,
        images: [p.image],
      })) as unknown as ProductWithGallery[]
      setProducts(converted)
      localStorage.setItem('products', JSON.stringify(converted))
    }
  }, [])

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Verificar si tiene contenido detallado
  const hasDetailedContent = (product: ProductWithGallery) => {
    return product.description || product.pdf_url || product.video_url
  }

  // Generar SKU automático
  const generateSKU = () => {
    const prefix = 'HD' // Hugo Díaz
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}-${timestamp}-${random}`
  }

  // Formatear precio con separador de miles
  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (!numbers) return ''
    const formatted = new Intl.NumberFormat('es-CL').format(parseInt(numbers))
    return formatted
  }

  // Manejar cambio de precio
  const handlePriceChange = (value: string) => {
    const formatted = formatPrice(value)
    setPriceFormatted(formatted)
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0
    setFormData({ ...formData, price: numericValue })
  }

  // Abrir diálogo
  const handleOpenDialog = (product?: ProductWithGallery) => {
    if (product) {
      setEditingProduct(product)
      setFormData(product)
      setPriceFormatted(formatPrice(product.price.toString()))
      setMainImages(product.images || [])
      setDescriptionImages([])
    } else {
      setEditingProduct(null)
      const newSKU = generateSKU()
      setFormData({
        name: '',
        sku: newSKU,
        price: 0,
        stock: 0,
        category: '',
        brand: 'Canon',
        short_description: '',
        description: '',
        images: [],
        pdf_url: '',
        video_url: '',
        is_featured: false,
        is_new: false,
      })
      setPriceFormatted('')
      setMainImages([])
      setDescriptionImages([])
    }
    setImageUploadMode('url')
    setDialogOpen(true)
  }

  // Manejar subida de MÚLTIPLES imágenes principales
  const handleMainImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      // Validar tipo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Solo se permiten imágenes JPG, PNG o WebP')
        return
      }

      // Validar tamaño (máx 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Cada imagen no debe superar 2MB')
        return
      }

      // Convertir a base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setMainImages((prev) => [...prev, base64])
      }
      reader.readAsDataURL(file)
    })
  }

  // Eliminar imagen principal
  const removeMainImage = (index: number) => {
    setMainImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Agregar URL de imagen principal
  const addMainImageURL = (url: string) => {
    if (!url) return
    setMainImages((prev) => [...prev, url])
  }

  // Manejar subida de imágenes para descripción
  const handleDescriptionImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      // Validar tipo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Solo se permiten imágenes JPG, PNG o WebP')
        return
      }

      // Validar tamaño (máx 1MB por imagen)
      if (file.size > 1 * 1024 * 1024) {
        alert('Cada imagen no debe superar 1MB')
        return
      }

      // Convertir a base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setDescriptionImages((prev) => [...prev, base64])
      }
      reader.readAsDataURL(file)
    })
  }

  // Eliminar imagen de la descripción
  const removeDescriptionImage = (index: number) => {
    setDescriptionImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Extraer ID de YouTube desde URL completa
  const extractYouTubeID = (url: string) => {
    if (!url) return ''
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // ID directo
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    
    return url
  }

  // Guardar producto
  const handleSaveProduct = () => {
    if (!formData.name || !formData.sku || !formData.category || mainImages.length === 0) {
      alert('Nombre, SKU, Categoría y al menos una Imagen Principal son obligatorios')
      return
    }

    // Procesar video de YouTube
    const videoId = formData.video_url ? extractYouTubeID(formData.video_url) : ''

    // Construir descripción HTML si hay texto o imágenes
    let finalDescription = formData.description || ''
    if (descriptionImages.length > 0) {
      const imagesHTML = descriptionImages
        .map((img) => `<img src="${img}" alt="Imagen del producto" style="max-width: 100%; margin: 10px 0;" />`)
        .join('\n')
      finalDescription = `${finalDescription}\n${imagesHTML}`
    }

    if (editingProduct) {
      // Editar
      const updated = products.map((product) =>
        product.id === editingProduct.id
          ? { ...product, ...formData, images: mainImages, video_url: videoId, description: finalDescription }
          : product
      )
      setProducts(updated)
      localStorage.setItem('products', JSON.stringify(updated))
    } else {
      // Crear
      const newProduct: ProductWithGallery = {
        id: Date.now().toString(),
        name: formData.name || '',
        sku: formData.sku || '',
        price: formData.price || 0,
        stock: formData.stock || 0,
        category: formData.category || '',
        brand: formData.brand || 'Canon',
        short_description: formData.short_description || '',
        description: finalDescription,
        images: mainImages,
        pdf_url: formData.pdf_url || '',
        video_url: videoId,
        is_featured: formData.is_featured ?? false,
        is_new: formData.is_new ?? false,
      }
      const updated = [...products, newProduct]
      setProducts(updated)
      localStorage.setItem('products', JSON.stringify(updated))
    }

    setDialogOpen(false)
  }

  // Eliminar producto
  const handleDeleteProduct = () => {
    if (productToDelete) {
      const updated = products.filter((p) => p.id !== productToDelete)
      setProducts(updated)
      localStorage.setItem('products', JSON.stringify(updated))
      setDeleteConfirmOpen(false)
      setProductToDelete(null)
    }
  }

  // Verificar si la categoría requiere descripción detallada
  const requiresDetailedDescription = formData.category
    ? categoriesWithDetailedDescription.includes(formData.category)
    : false

  // Estado temporal para URL de imagen
  const [tempImageURL, setTempImageURL] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Productos</h1>
          <p className="text-muted-foreground">Administra el catálogo de productos</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Producto</th>
                  <th className="text-left py-3 px-4">SKU</th>
                  <th className="text-left py-3 px-4">Categoría</th>
                  <th className="text-right py-3 px-4">Precio</th>
                  <th className="text-center py-3 px-4">Stock</th>
                  <th className="text-center py-3 px-4">Contenido</th>
                  <th className="text-center py-3 px-4">Estado</th>
                  <th className="text-right py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          {product.images.length > 1 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {product.images.length}
                            </Badge>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{product.sku}</code>
                    </td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${new Intl.NumberFormat('es-CL').format(product.price)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={product.stock > 10 ? 'default' : 'destructive'}>
                        {product.stock}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {product.description && (
                          <span title="Tiene descripción">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </span>
                        )}
                        {product.pdf_url && (
                          <span title="Tiene PDF">
                            <FileText className="h-4 w-4 text-red-600" />
                          </span>
                        )}
                        {product.video_url && (
                          <span title="Tiene video">
                            <Video className="h-4 w-4 text-purple-600" />
                          </span>
                        )}
                        {!hasDetailedContent(product) && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {product.is_featured && (
                          <Badge className="bg-yellow-500">★</Badge>
                        )}
                        {product.is_new && (
                          <Badge className="bg-green-500">Nuevo</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setProductToDelete(product.id)
                            setDeleteConfirmOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron productos</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog: Crear/Editar Producto */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? 'Modifica la información del producto'
                : 'Completa los datos para crear un nuevo producto'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Información Básica */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Canon imageRUNNER 2645i"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">
                  SKU * <span className="text-xs text-muted-foreground">(Autogenerado)</span>
                </Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio (CLP) *</Label>
              <Input
                id="price"
                value={priceFormatted}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="1.500.000"
              />
              <p className="text-xs text-muted-foreground">
                Ingresa solo números, el formato se aplicará automáticamente
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Descripción Corta</Label>
              <Textarea
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Descripción breve para el listado"
                rows={2}
              />
            </div>

            {/* Imágenes Principales del Producto */}
            <div className="space-y-2 border-t pt-4">
              <Label>Imágenes Principales del Producto * (Galería)</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Estas imágenes se mostrarán en el carrusel del producto. La primera será la imagen principal.
              </p>
              
              <div className="flex gap-2 mb-2">
                <Button
                  type="button"
                  variant={imageUploadMode === 'url' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setImageUploadMode('url')}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  URL
                </Button>
                <Button
                  type="button"
                  variant={imageUploadMode === 'upload' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setImageUploadMode('upload')}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Archivos
                </Button>
              </div>

              {imageUploadMode === 'url' ? (
                <div className="flex gap-2">
                  <Input
                    value={tempImageURL}
                    onChange={(e) => setTempImageURL(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addMainImageURL(tempImageURL)
                        setTempImageURL('')
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addMainImageURL(tempImageURL)
                      setTempImageURL('')
                    }}
                  >
                    Agregar
                  </Button>
                </div>
              ) : (
                <div>
                  <Input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    onChange={handleMainImagesUpload}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos: JPG, PNG, WebP • Tamaño máximo: 2MB por imagen • Resolución recomendada: 800x800px
                  </p>
                </div>
              )}

              {/* Mostrar imágenes principales */}
              {mainImages.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {mainImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                      {index === 0 && (
                        <Badge className="absolute top-1 left-1 bg-blue-600">Principal</Badge>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMainImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Descripción Detallada (solo para ciertas categorías) */}
            {requiresDetailedDescription && (
              <div className="space-y-2 border-t pt-4">
                <Label htmlFor="description">
                  Descripción Detallada <span className="text-xs text-muted-foreground">(Opcional)</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Escribe la descripción detallada del producto aquí..."
                  rows={6}
                />

                {/* Subir imágenes PARA LA DESCRIPCIÓN */}
                <div className='space-y-2'>
                  <label>Imágenes Adicionales (Para insertar en la descripción)</label>

                  {/* Input oculto */}
                  <input
                    type='file'
                    accept='image/jpeg,image/jpg,image/png,image/webp'
                    multiple
                    onChange={handleDescriptionImagesUpload}
                    className='hidden'
                    id='description-images-input'
                  />

                  {/* Botón personalizado */}
                  <Button
                    type='button'
                    variant='outline'
                    className='w-full'
                    onClick={() => document.getElementById('description-images-input')?.click()}
                  >
                    <Upload className='mr-2 h-4 w-4' />
                    Subir Imágenes para Descripción
                  </Button>

                  <p className='text-xs text-muted-foreground'>
                    Formatos: JPG, PNG, WebP • Tamaño máximo por imagen: 1MB • Estas imágenes se insertarán en la descripción del producto
                  </p>
                  {descriptionImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {descriptionImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Descripción ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeDescriptionImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PDF y Video */}
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="pdf_url">Link del PDF Técnico (Opcional)</Label>
                <Input
                  id="pdf_url"
                  value={formData.pdf_url}
                  onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                  placeholder="https://drive.google.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  Link directo o de Google Drive
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="video_url">Link de YouTube (Opcional)</Label>
                <Input
                  id="video_url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-muted-foreground">
                  Se extraerá el ID automáticamente
                </p>
              </div>
            </div>

            {/* Estados */}
            <div className="flex items-center gap-6 border-t pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Producto Destacado</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_new}
                  onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Producto Nuevo</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProduct}>
              {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirmar Eliminación */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar Producto?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}