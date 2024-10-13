import { Building2, House, Laptop, LogOut, Users } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import style from '../style/sidebar.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'

const logo = '/assets/logoLogin.svg'

export const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { logout } = useContext(AuthContext)

    const handleLogOut = async () => {
        if (logout) {
            await logout() // Llama a la función logout del contexto
            navigate('/login') // Redirige al login después del logout
        }
    }

    return (
        <section className={`${style.sidebar}`}>
            <img src={logo} alt="Logo" className={`${style.sidebarImage}`} />
            <ul>
                <Link
                    to="/home"
                    className={`${location.pathname === '/home' ? style.sidebarSelected : style.nonSelected}`}
                >
                    <li>
                        <House />
                        <span>Inicio</span>
                    </li>
                </Link>

                <Link
                    to="/user"
                    className={`${location.pathname === '/user' ? style.sidebarSelected : style.nonSelected}`}
                >
                    <li>
                        <Users />
                        <span>Usuarios</span>
                    </li>
                </Link>

                <Link
                    to="/build"
                    className={`${location.pathname === '/build' ? style.sidebarSelected : style.nonSelected}`}
                >
                    <li>
                        <Building2 />
                        Edificios
                    </li>
                </Link>

                <Link
                    to="/device"
                    className={`${location.pathname === '/device' ? style.sidebarSelected : style.nonSelected}`}
                >
                    <li>
                        <Laptop />
                        Equipos
                    </li>
                </Link>

                <li onClick={handleLogOut} className={style.nonSelected}>
                    <LogOut />
                    Cerrar Sesión
                </li>
            </ul>
        </section>
    )
}
