import { Bell, ChevronDown, CircleUser } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SearchHere } from './SearchHere'
import { getUserData } from '../../utils/api'
import { IUser } from '../../utils'
import style from '../style/navbar.module.css'

export const Navbar = () => {
    const [userData, setUserData] = useState<IUser | null>(null)

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

    return (
        <section className={`${style.navbar}`}>
            <SearchHere />
            <div className={`${style.navbarIcons}`}>
                <Bell size={28} />

                {userData?.imageUrl ? (
                    <img src={userData?.imageUrl} alt="User" className={`${style.userImage}`} />
                ) : (
                    <CircleUser size={34} />
                )}

                {/* <CircleUser size={34} /> */}

                <ChevronDown size={24} />
            </div>
        </section>
    )
}
