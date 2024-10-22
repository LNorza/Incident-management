import { useEffect, useRef, useState, useContext } from 'react'
import { IUserData } from '../../utils'
import { Link } from 'react-router-dom'
import { Bell, ChevronDown, CircleUser, User, LogOut } from 'lucide-react'
import { getUserData } from '../../utils/api'
import profileStyles from '../style/navbar.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'
import style from '../style/profileModal.module.css'

export const ProfileOptions = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [userData, setUserData] = useState<IUserData | null>(null)
    const modalRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)

    const handleLogOut = async () => {
        if (logout) {
            await logout()
            navigate('/login')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData()
                setUserData(userData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return (
        <div className={style.modal} ref={modalRef}>
            <div className={`${profileStyles.navbarIcons}`}>
                <Bell size={28} />

                {userData?.imageUrl ? (
                    <img
                        src={userData?.imageUrl}
                        alt="User"
                        style={{ cursor: 'pointer' }}
                        className={`${profileStyles.userImage}`}
                        onClick={() => {
                            setIsOpen((prev) => !prev)
                        }}
                    />
                ) : (
                    <CircleUser
                        style={{ cursor: 'pointer' }}
                        size={34}
                        onClick={() => {
                            setIsOpen((prev) => !prev)
                        }}
                    />
                )}
                <ChevronDown
                    style={{ cursor: 'pointer' }}
                    size={24}
                    onClick={() => {
                        setIsOpen((prev) => !prev)
                    }}
                />
            </div>

            {isOpen && (
                <div className={style.options}>
                    <Link className={style.option} to={'/profile'} onClick={() => setIsOpen(false)}>
                        <User />
                        Perfil
                    </Link>
                    <div className={style.option} onClick={handleLogOut}>
                        <LogOut />
                        Cerrar sesión
                    </div>
                </div>
            )}
        </div>
    )
}
