import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, ChevronUp, ChevronDown, Image as ImageIcon, Upload, Link as LinkIcon, X } from 'lucide-react'
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

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  image: string
  button_text: string
  button_link: string
  position: number
  active: boolean
}

const initialSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Soluciones Canon para tu Empresa',
    subtitle: 'Equipos de impresión profesional y tecnología de imagen de última generación',
    image: '/images/hero-1.jpg',
    button_text: 'Ver Catálogo',
    button_link: '/productos',
    position: 1,
    active: true,
  },
  {
    id: '2',
    title: 'Cámaras Profesionales',
    subtitle: 'Captura cada momento con la mejor tecnología',
    image: '/images/hero-2.jpg',
    button_text: 'Conocer Más',
    button_link: '/productos',
    position: 2,
    active: true,
  },
  {
    id: '3',
    title: 'Impresoras Multifuncionales',
    subtitle: 'Eficiencia y calidad para tu negocio',
    image: '/images/hero-3.jpg',
    button_text: 'Ver Modelos',
    button_link: '/productos',
    position: 3,
    active: true,
  },
]

// Opciones de navegación para el botón
const navigationOptions = [
  { label: 'Inicio', value: '/' },
  { label: 'Productos', value: '/productos' },
  { label: 'Servicios', value: '/servicios' },
  { label: 'Nosotros', value: '/nosotros' },
  { label: 'Contacto', value: '/contacto' },
]

export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null)

  // Estado para manejo de imágenes
  const [imageUploadMode, setImageUploadMode] = useState<'url' | 'upload'>('url')

  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    title: '',
    subtitle: '',
    image: '',
    button_text: '',
    button_link: '/',
    active: true,
  })

  // Cargar slides desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('hero_slides')
    if (stored) {
      setSlides(JSON.parse(stored))
    } else {
      setSlides(initialSlides)
      localStorage.setItem('hero_slides', JSON.stringify(initialSlides))
    }
  }, [])

  // Guardar slides en localStorage
  const saveSlides = (updatedSlides: HeroSlide[]) => {
    setSlides(updatedSlides)
    localStorage.setItem('hero_slides', JSON.stringify(updatedSlides))
  }

  // Filtrar slides
  const filteredSlides = slides
    .filter((slide) => slide.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.position - b.position)

  // Abrir diálogo
  const handleOpenDialog = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide)
      setFormData(slide)
    } else {
      setEditingSlide(null)
      const maxPosition = slides.length > 0 ? Math.max(...slides.map((s) => s.position)) : 0
      setFormData({
        title: '',
        subtitle: '',
        image: '',
        button_text: '',
        button_link: '/',
        active: true,
        position: maxPosition + 1,
      })
    }
    setImageUploadMode('url')
    setDialogOpen(true)
  }

  // Manejar subida de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Solo se permiten imágenes JPG, PNG o WebP')
      return
    }

    // Validar tamaño (máx 3MB para hero)
    if (file.size > 3 * 1024 * 1024) {
      alert('La imagen no debe superar 3MB')
      return
    }

    // Convertir a base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setFormData({ ...formData, image: base64 })
    }
    reader.readAsDataURL(file)
  }

  // Guardar slide
  const handleSaveSlide = () => {
    if (!formData.title || !formData.image) {
      alert('El título y la imagen son obligatorios')
      return
    }

    if (editingSlide) {
      // Editar
      const updated = slides.map((slide) =>
        slide.id === editingSlide.id ? { ...slide, ...formData } : slide
      )
      saveSlides(updated)
    } else {
      // Crear
      const newSlide: HeroSlide = {
        id: Date.now().toString(),
        title: formData.title || '',
        subtitle: formData.subtitle || '',
        image: formData.image || '',
        button_text: formData.button_text || '',
        button_link: formData.button_link || '/',
        position: formData.position || slides.length + 1,
        active: formData.active ?? true,
      }
      saveSlides([...slides, newSlide])
    }

    setDialogOpen(false)
  }

  // Eliminar slide
  const handleDeleteSlide = () => {
    if (slideToDelete) {
      const updated = slides.filter((s) => s.id !== slideToDelete)
      saveSlides(updated)
      setDeleteConfirmOpen(false)
      setSlideToDelete(null)
    }
  }

  // Cambiar posición del slide
  const handleMoveSlide = (slideId: string, direction: 'up' | 'down') => {
    const slideIndex = slides.findIndex((s) => s.id === slideId)
    if (slideIndex === -1) return

    const newSlides = [...slides]
    const targetIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1

    if (targetIndex < 0 || targetIndex >= newSlides.length) return

    // Intercambiar posiciones
    const temp = newSlides[slideIndex]
    newSlides[slideIndex] = newSlides[targetIndex]
    newSlides[targetIndex] = temp

    // Actualizar números de posición
    newSlides.forEach((slide, index) => {
      slide.position = index + 1
    })

    saveSlides(newSlides)
  }

  // Toggle estado activo
  const handleToggleActive = (slideId: string) => {
    const updated = slides.map((slide) =>
      slide.id === slideId ? { ...slide, active: !slide.active } : slide
    )
    saveSlides(updated)
  }

  // Obtener el label de navegación
  const getNavigationLabel = (value: string) => {
    const option = navigationOptions.find((opt) => opt.value === value)
    return option ? option.label : value
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hero Slides (Carrusel Principal)</h1>
          <p className="text-muted-foreground">Gestiona el carrusel de la página principal</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Slide
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar slides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredSlides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron slides</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSlides.map((slide, index) => (
                <Card key={slide.id} className={!slide.active ? 'opacity-60' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Preview de imagen */}
                      <div className="w-48 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {slide.image ? (
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Información */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{slide.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {slide.subtitle}
                            </p>
                            {slide.button_text && (
                              <div className="mt-2 text-sm">
                                <span className="text-muted-foreground">Botón:</span>{' '}
                                <span className="font-medium">{slide.button_text}</span>
                                <span className="text-muted-foreground"> → {getNavigationLabel(slide.button_link)}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={slide.active ? 'default' : 'secondary'}>
                              {slide.active ? 'Activo' : 'Inactivo'}
                            </Badge>
                            <Badge variant="outline">Pos. {slide.position}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveSlide(slide.id, 'up')}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveSlide(slide.id, 'down')}
                            disabled={index === filteredSlides.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleActive(slide.id)}
                            title={slide.active ? 'Desactivar' : 'Activar'}
                          >
                            <span className="text-xs">{slide.active ? '👁️' : '🚫'}</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(slide)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSlideToDelete(slide.id)
                              setDeleteConfirmOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog: Crear/Editar Slide */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSlide ? 'Editar Slide' : 'Nuevo Slide'}</DialogTitle>
            <DialogDescription>
              {editingSlide
                ? 'Modifica la información del slide'
                : 'Completa los datos para crear un nuevo slide'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Soluciones Canon para tu Empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Textarea
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Descripción breve del slide"
                rows={2}
              />
            </div>

            {/* Imagen del Slide */}
            <div className="space-y-2">
              <Label>Imagen del Slide *</Label>
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
                  Subir Archivo
                </Button>
              </div>

              {imageUploadMode === 'url' ? (
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="hero-image-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('hero-image-input')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Seleccionar Imagen
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos: JPG, PNG, WebP • Tamaño máximo: 3MB • Resolución recomendada: 1920x800px
                  </p>
                </div>
              )}

              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            {/* Botón del Slide */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="button_text">Texto del Botón</Label>
                <Input
                  id="button_text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  placeholder="Ver Catálogo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button_link">Destino del Botón</Label>
                <Select
                  value={formData.button_link}
                  onValueChange={(value) => setFormData({ ...formData, button_link: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {navigationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Slide Activo (visible en la página)</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveSlide}>
              {editingSlide ? 'Guardar Cambios' : 'Crear Slide'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirmar Eliminación */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar Slide?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El slide será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteSlide}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}