import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Admin {
  username: string
  email: string
}

interface AdminState {
  isAuthenticated: boolean
  admin: Admin | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Credenciales por defecto (hardcodeadas para demo)
const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  email: 'admin@industrial.cl',
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      admin: null,

      login: (username, password) => {
        if (
          username === DEFAULT_CREDENTIALS.username &&
          password === DEFAULT_CREDENTIALS.password
        ) {
          set({
            isAuthenticated: true,
            admin: {
              username: DEFAULT_CREDENTIALS.username,
              email: DEFAULT_CREDENTIALS.email,
            },
          })
          return true
        }
        return false
      },

      logout: () => {
        set({
          isAuthenticated: false,
          admin: null,
        })
      },
    }),
    {
      name: 'admin-storage',
    }
  )
)
