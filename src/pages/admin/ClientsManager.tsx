import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Link as LinkIcon, Upload, X } from 'lucide-react'
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

interface Client {
  id: string
  name: string
  logo: string
  website: string
  category: string
  active: boolean
  order: number
}

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Canon',
    logo: '/images/clients/canon.png',
    website: 'https://www.canon.cl',
    category: 'Fabricante',
    active: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Ministerio de Salud',
    logo: '/images/clients/minsal.png',
    website: 'https://www.minsal.cl',
    category: 'Sector Público',
    active: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Universidad de Chile',
    logo: '/images/clients/uchile.png',
    website: 'https://www.uchile.cl',
    category: 'Educación',
    active: true,
    order: 3,
  },
  {
    id: '4',
    name: 'Banco de Chile',
    logo: '/images/clients/bancochile.png',
    website: 'https://www.bancochile.cl',
    category: 'Banca',
    active: true,
    order: 4,
  },
  {
    id: '5',
    name: 'Falabella',
    logo: '/images/clients/falabella.png',
    website: 'https://www.falabella.com',
    category: 'Retail',
    active: true,
    order: 5,
  },
  {
    id: '6',
    name: 'Cencosud',
    logo: '/images/clients/cencosud.png',
    website: 'https://www.cencosud.com',
    category: 'Retail',
    active: true,
    order: 6,
  },
]

const categories = ['Fabricante', 'Sector Público', 'Educación', 'Banca', 'Retail', 'Tecnología', 'Salud', 'Otros']

export default function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)

  // Estado para manejo de imágenes
  const [imageUploadMode, setImageUploadMode] = useState<'url' | 'upload'>('url')

  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    logo: '',
    website: '',
    category: 'Otros',
    active: true,
  })

  // Cargar clientes desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('clients')
    if (stored) {
      setClients(JSON.parse(stored))
    } else {
      setClients(initialClients)
      localStorage.setItem('clients', JSON.stringify(initialClients))
    }
  }, [])

  // Guardar clientes en localStorage
  const saveClients = (updatedClients: Client[]) => {
    const sorted = [...updatedClients].sort((a, b) => a.order - b.order)
    setClients(sorted)
    localStorage.setItem('clients', JSON.stringify(sorted))
  }

  // Filtrar clientes
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || client.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Abrir diálogo
  const handleOpenDialog = (client?: Client) => {
    if (client) {
      setEditingClient(client)
      setFormData(client)
    } else {
      setEditingClient(null)
      const maxOrder = clients.length > 0 ? Math.max(...clients.map((c) => c.order)) : 0
      setFormData({
        name: '',
        logo: '',
        website: '',
        category: 'Otros',
        active: true,
        order: maxOrder + 1,
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
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      alert('Solo se permiten imágenes JPG, PNG, WebP o SVG')
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
      setFormData({ ...formData, logo: base64 })
    }
    reader.readAsDataURL(file)
  }

  // Guardar cliente
  const handleSaveClient = () => {
    if (!formData.name || !formData.logo) {
      alert('El nombre y el logo son obligatorios')
      return
    }

    if (editingClient) {
      // Editar
      const updated = clients.map((client) =>
        client.id === editingClient.id ? { ...client, ...formData } : client
      )
      saveClients(updated)
    } else {
      // Crear
      const newClient: Client = {
        id: Date.now().toString(),
        name: formData.name || '',
        logo: formData.logo || '',
        website: formData.website || '',
        category: formData.category || 'Otros',
        active: formData.active ?? true,
        order: formData.order || clients.length + 1,
      }
      saveClients([...clients, newClient])
    }

    setDialogOpen(false)
  }

  // Eliminar cliente
  const handleDeleteClient = () => {
    if (clientToDelete) {
      const updated = clients.filter((c) => c.id !== clientToDelete)
      saveClients(updated)
      setDeleteConfirmOpen(false)
      setClientToDelete(null)
    }
  }

  // Toggle estado activo
  const handleToggleActive = (clientId: string) => {
    const updated = clients.map((client) =>
      client.id === clientId ? { ...client, active: !client.active } : client
    )
    saveClients(updated)
  }

  // Mover orden del cliente
  const handleMoveClient = (clientId: string, direction: 'up' | 'down') => {
    const clientIndex = clients.findIndex((c) => c.id === clientId)
    if (clientIndex === -1) return

    const newClients = [...clients]
    const targetIndex = direction === 'up' ? clientIndex - 1 : clientIndex + 1

    if (targetIndex < 0 || targetIndex >= newClients.length) return

    // Intercambiar
    const temp = newClients[clientIndex]
    newClients[clientIndex] = newClients[targetIndex]
    newClients[targetIndex] = temp

    // Actualizar números de orden
    newClients.forEach((client, index) => {
      client.order = index + 1
    })

    saveClients(newClients)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logos de Clientes</h1>
          <p className="text-muted-foreground">Gestiona los logos que aparecen en la página principal</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron clientes</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredClients.map((client, index) => (
                <Card key={client.id} className={!client.active ? 'opacity-60' : ''}>
                  <CardContent className="p-4">
                    {/* Logo */}
                    <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain p-4"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm line-clamp-1">{client.name}</h3>
                          <p className="text-xs text-muted-foreground">{client.category}</p>
                        </div>
                        <Badge variant={client.active ? 'default' : 'secondary'} className="text-xs">
                          {client.active ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>

                      {client.website && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <LinkIcon className="h-3 w-3" />
                          <a
                            href={client.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline truncate"
                          >
                            {client.website.replace(/^https?:\/\/(www\.)?/, '')}
                          </a>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Orden: {client.order}</span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleMoveClient(client.id, 'up')}
                            disabled={index === 0}
                            title="Mover arriba"
                          >
                            <span className="text-xs">↑</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleMoveClient(client.id, 'down')}
                            disabled={index === filteredClients.length - 1}
                            title="Mover abajo"
                          >
                            <span className="text-xs">↓</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleToggleActive(client.id)}
                            title={client.active ? 'Desactivar' : 'Activar'}
                          >
                            <span className="text-xs">{client.active ? '👁️' : '🚫'}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleOpenDialog(client)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => {
                              setClientToDelete(client.id)
                              setDeleteConfirmOpen(true)
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-red-600" />
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

      {/* Dialog: Crear/Editar Cliente */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
            <DialogDescription>
              {editingClient
                ? 'Modifica la información del cliente'
                : 'Completa los datos para agregar un nuevo cliente'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Cliente *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Canon Chile"
              />
            </div>

            {/* Logo del Cliente */}
            <div className="space-y-2">
              <Label>Logo del Cliente *</Label>
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
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://ejemplo.com/logo.png"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="client-logo-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('client-logo-input')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Seleccionar Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos: JPG, PNG, WebP, SVG • Tamaño máximo: 1MB • Resolución recomendada: 300x300px
                  </p>
                </div>
              )}

              {formData.logo && (
                <div className="mt-2 w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center p-4">
                  <img
                    src={formData.logo}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web (Opcional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.ejemplo.cl"
                />
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
                <span className="text-sm">Cliente Activo (visible en la página)</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveClient}>
              {editingClient ? 'Guardar Cambios' : 'Crear Cliente'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirmar Eliminación */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar Cliente?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El logo será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteClient}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}