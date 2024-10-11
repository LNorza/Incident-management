import { createContext } from 'react'
import { IUserLogin } from '../../utils/interface/user'

// Define la interfaz para el contexto de autenticación
interface AuthContextType {
    user: IUserLogin
    logged: boolean
    login: (user: any) => void
    logout: () => void
}

const defaultAuthContext: AuthContextType = {
    user: { username: '', password: '' },
    logged: false,
    login: () => {},
    logout: () => {},
}

// Crea el contexto de autenticación
export const AuthContext = createContext<AuthContextType>(defaultAuthContext)
