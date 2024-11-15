import { Link, useLocation } from 'react-router-dom'
import { House, Users, Building2, Laptop, CircleX, Cpu, History, ArrowRightLeft } from 'lucide-react'
import style from '../style/sidebar.module.css'
import { getUserRole } from '../../utils/api/userData'
import { ISidebar } from '../../utils/interface/sidebar'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../utils/api'

const logo = '/assets/logoLogin.svg'
const iconMap = {
    House: House,
    Users: Users,
    Building2: Building2,
    Laptop: Laptop,
    Cpu: Cpu,
    Changes: ArrowRightLeft,
    History: History,
    Incidents: CircleX,
}

export const Sidebar = () => {
    const location = useLocation()
    const [routes, setRoutes] = useState<[ISidebar] | []>([]) // Estado para guardar las rutas
    const [userRole, setUserRole] = useState<string | null>(null)

    useEffect(() => {
        const fetchRole = async () => {
            const role = await getUserRole() // Obtener el rol del usuario
            setUserRole(role) // Guardar el rol en el estado
        }

        fetchRole()
    }, [])

    useEffect(() => {
        const fetchNavbarRoutes = async () => {
            if (userRole) {
                try {
                    const response = await fetch(`${API_BASE_URL}/sidebar/${userRole}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    })
                    const data = await response.json() // Convertir la respuesta a JSON
                    setRoutes(data) // Guardar las rutas en el estado
                } catch (error) {
                    console.error('Error fetching navbar routes:', error)
                }
            }
        }

        fetchNavbarRoutes()
    }, [userRole]) // Ejecutar cada vez que `userRole` cambie

    return (
        <section className={`${style.sidebar}`}>
            <img src={logo} alt="Logo" className={`${style.sidebarImage}`} />
            <ul>
                {routes.map((route) => {
                    const IconComponent = iconMap[route.icon as keyof typeof iconMap] // Obtener el componente del icono

                    return (
                        <Link
                            key={route.route}
                            to={route.route}
                            className={`${
                                location.pathname === route.route ? style.sidebarSelected : style.nonSelected
                            }`}
                        >
                            <li>
                                {IconComponent && <IconComponent />} {/* Renderizar el icono */}
                                <span>{route.name}</span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </section>
    )
}
