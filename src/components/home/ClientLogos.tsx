import { useState, useEffect } from 'react'

// Datos por defecto (fallback si no hay localStorage)
const defaultClients = [
  { id: '1', name: 'Banco de Chile', logo: 'https://via.placeholder.com/150x60?text=Banco+Chile', active: true, order: 1 },
  { id: '2', name: 'Falabella', logo: 'https://via.placeholder.com/150x60?text=Falabella', active: true, order: 2 },
  { id: '3', name: 'Clínica Las Condes', logo: 'https://via.placeholder.com/150x60?text=Las+Condes', active: true, order: 3 },
  { id: '4', name: 'Universidad Católica', logo: 'https://via.placeholder.com/150x60?text=UC', active: true, order: 4 },
  { id: '5', name: 'Municipalidad de Santiago', logo: 'https://via.placeholder.com/150x60?text=Muni+Stgo', active: true, order: 5 },
  { id: '6', name: 'Entel', logo: 'https://via.placeholder.com/150x60?text=Entel', active: true, order: 6 },
]

export default function ClientLogos() {
  const [clients, setClients] = useState(defaultClients)

  // Cargar clientes desde localStorage
  useEffect(() => {
    try {
      const storedClients = localStorage.getItem('clients')
      if (storedClients) {
        const parsedClients = JSON.parse(storedClients)
        // Filtrar solo activos y ordenar
        const activeClients = parsedClients
          .filter((client: any) => client.active)
          .sort((a: any, b: any) => a.order - b.order)
        
        if (activeClients.length > 0) {
          setClients(activeClients)
        }
      }
    } catch (error) {
      console.error('Error loading clients from localStorage:', error)
    }
  }, [])

  if (clients.length === 0) {
    return null // No mostrar nada si no hay clientes activos
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Confían en Nosotros</h2>
          <p className="text-lg text-muted-foreground">
            Empresas líderes que eligen nuestros productos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 items-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center p-6 bg-white rounded-lg hover:shadow-lg transition-shadow h-[180px]"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-40 max-w-full w-auto object-contain transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}