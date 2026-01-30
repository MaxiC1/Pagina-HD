import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Verificar si el admin está logueado (localStorage temporal)
  const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true'

  if (!isLoggedIn) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}