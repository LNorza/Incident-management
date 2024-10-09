import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { Login } from '../auth'
import { RouteManager } from '../app'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth/context/AuthContext'

export const AppRouter = () => {
    const authContext = useContext(AuthContext)
    const { logged } = authContext
    const navigate = useNavigate()
    const location = useLocation()

    const saveLastPath = () => {
        if (location.pathname !== '/login') {
            localStorage.setItem('lastPath', location.pathname)
        }
    }

    useEffect(() => {
        // Redirige al usuario a la última ruta guardada si intenta acceder a login estando autenticado
        if (logged && location.pathname === '/login') {
            const lastPath = localStorage.getItem('lastPath') || '/home'
            navigate(lastPath)
            localStorage.removeItem('lastPath')
        } else if (!logged && location.pathname !== '/login') {
            saveLastPath()
        }
    }, [logged, location.pathname, navigate])

    if (logged === null) {
        // Mostrar un indicador de carga mientras se verifica la autenticación
        return <div>Loading...</div>
    }

    return (
        <Routes>
            <Route
                path="login/*"
                element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<Login />} />
                        </Routes>
                    </PublicRoute>
                }
            />
            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <RouteManager />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}
