import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Star, Upload, Link as LinkIcon } from 'lucide-react'
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

interface Testimonial {
  id: string
  name: string
  company: string
  position: string
  message: string
  rating: number
  image: string
  active: boolean
  created_at: string
}

const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Martínez',
    company: 'Empresa ABC',
    position: 'Gerente General',
    message:
      'Excelente servicio y productos de alta calidad. Llevamos años trabajando con Hugo Díaz y siempre superan nuestras expectativas.',
    rating: 5,
    image: '/images/testimonials/client-1.jpg',
    active: true,
    created_at: '2024-01-15',
  },
  {
    id: '2',
    name: 'María González',
    company: 'Tech Solutions',
    position: 'Directora de TI',
    message:
      'Las impresoras Canon que adquirimos han mejorado significativamente nuestra productividad. El soporte técnico es excepcional.',
    rating: 5,
    image: '/images/testimonials/client-2.jpg',
    active: true,
    created_at: '2024-01-20',
  },
  {
    id: '3',
    name: 'Roberto Silva',
    company: 'Constructora XYZ',
    position: 'Jefe de Operaciones',
    message:
      'Productos confiables y un equipo profesional. Recomendamos Hugo Díaz a todas las empresas que buscan soluciones de impresión.',
    rating: 4,
    image: '/images/testimonials/client-3.jpg',
    active: true,
    created_at: '2024-02-01',
  },
]

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null)

  // Estado para manejo de imágenes
  const [imageUploadMode, setImageUploadMode] = useState<'url' | 'upload'>('url')

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    company: '',
    position: '',
    message: '',
    rating: 5,
    image: '',
    active: true,
  })

  // Cargar testimonios desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('testimonials')
    if (stored) {
      setTestimonials(JSON.parse(stored))
    } else {
      setTestimonials(initialTestimonials)
      localStorage.setItem('testimonials', JSON.stringify(initialTestimonials))
    }
  }, [])

  // Guardar testimonios en localStorage
  const saveTestimonials = (updatedTestimonials: Testimonial[]) => {
    setTestimonials(updatedTestimonials)
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials))
  }

  // Filtrar testimonios
  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Abrir diálogo
  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      setFormData(testimonial)
    } else {
      setEditingTestimonial(null)
      setFormData({
        name: '',
        company: '',
        position: '',
        message: '',
        rating: 5,
        image: '',
        active: true,
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

    // Validar tamaño (máx 1MB)
    if (file.size > 1 * 1024 * 1024) {
      alert('La imagen no debe superar 1MB')
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

  // Guardar testimonio
  const handleSaveTestimonial = () => {
    if (!formData.name || !formData.company || !formData.message) {
      alert('El nombre, empresa y mensaje son obligatorios')
      return
    }

    if (editingTestimonial) {
      // Editar
      const updated = testimonials.map((t) =>
        t.id === editingTestimonial.id ? { ...t, ...formData } : t
      )
      saveTestimonials(updated)
    } else {
      // Crear
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        name: formData.name || '',
        company: formData.company || '',
        position: formData.position || '',
        message: formData.message || '',
        rating: formData.rating || 5,
        image: formData.image || '',
        active: formData.active ?? true,
        created_at: new Date().toISOString().split('T')[0],
      }
      saveTestimonials([...testimonials, newTestimonial])
    }

    setDialogOpen(false)
  }

  // Eliminar testimonio
  const handleDeleteTestimonial = () => {
    if (testimonialToDelete) {
      const updated = testimonials.filter((t) => t.id !== testimonialToDelete)
      saveTestimonials(updated)
      setDeleteConfirmOpen(false)
      setTestimonialToDelete(null)
    }
  }

  // Toggle estado activo
  const handleToggleActive = (testimonialId: string) => {
    const updated = testimonials.map((t) =>
      t.id === testimonialId ? { ...t, active: !t.active } : t
    )
    saveTestimonials(updated)
  }

  // Renderizar estrellas
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonios</h1>
          <p className="text-muted-foreground">Gestiona las reseñas de clientes</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Testimonio
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o empresa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron testimonios</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className={!testimonial.active ? 'opacity-60' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-lg overflow-hidden">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            testimonial.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                        </div>
                      </div>
                      <Badge variant={testimonial.active ? 'default' : 'secondary'}>
                        {testimonial.active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>

                    <div className="mb-3">{renderStars(testimonial.rating)}</div>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      "{testimonial.message}"
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-xs text-muted-foreground">
                        {new Date(testimonial.created_at).toLocaleDateString('es-CL')}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(testimonial.id)}
                          title={testimonial.active ? 'Desactivar' : 'Activar'}
                        >
                          <span className="text-xs">{testimonial.active ? '👁️' : '🚫'}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(testimonial)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setTestimonialToDelete(testimonial.id)
                            setDeleteConfirmOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog: Crear/Editar Testimonio */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}
            </DialogTitle>
            <DialogDescription>
              {editingTestimonial
                ? 'Modifica la información del testimonio'
                : 'Completa los datos para crear un nuevo testimonio'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Carlos Martínez"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Empresa ABC"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Gerente General"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Escribe el testimonio del cliente..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Calificación</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 cursor-pointer ${
                        star <= (formData.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Imagen del Cliente */}
            <div className="space-y-2">
              <Label>Foto del Cliente (Opcional)</Label>
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
                  placeholder="https://ejemplo.com/foto.jpg"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="testimonial-image-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('testimonial-image-input')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Seleccionar Foto
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos: JPG, PNG, WebP • Tamaño máximo: 1MB • Resolución recomendada: 200x200px
                  </p>
                </div>
              )}

              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-full border"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Testimonio Activo (visible en la página)</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTestimonial}>
              {editingTestimonial ? 'Guardar Cambios' : 'Crear Testimonio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirmar Eliminación */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar Testimonio?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El testimonio será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteTestimonial}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}