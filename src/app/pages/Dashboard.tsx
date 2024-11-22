import { useState, useEffect } from 'react'
import { AreaChart, IncidentsOfMonth, SemiCircleChart } from '../components'
import { API_BASE_URL, getUserData, IUserData, translateRole } from '../../utils'
import style from '../style/cardContainer.module.css'

export const Dashboard = () => {
    const [userData, setUserData] = useState<IUserData | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [devicesNumber, setDevicesNumber] = useState<number | null>(0)

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData()
        }
        fetchData()
    }, [])

    const fetchUserData = async () => {
        try {
            const userData = await getUserData()
            setUserData(userData)
            setRole(userData ? translateRole(userData.role) : null)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        if (userData) {
            const fetchDevicesNumber = async (departmentId: string) => {
                try {
                    const url =
                        role === 'ADMIN_TECHNICIANS'
                            ? `${API_BASE_URL}/number-devices`
                            : `${API_BASE_URL}/number-devices-by-department/${departmentId}`

                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    })
                    const devicesNumber = await response.json()

                    if (devicesNumber) {
                        setDevicesNumber(devicesNumber.totalDevices)
                    } else {
                        setDevicesNumber(0)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            console.log(role)
            if (role === 'TECHNICIAN') return
            const departmentId = userData.department._id || ''
            fetchDevicesNumber(departmentId)
        }
    }, [userData, role])

    return (
        <>
            <section className={`${style.container} animate__animated animate__fadeInDown`}>
                <section className={`${style.largeCard}`}>
                    <div>
                        <h2>Incidencias en este mes</h2>
                        <p className={`${style.pSubTitle}`}>Resumen general</p>
                    </div>
                    <IncidentsOfMonth departmentId={userData?.department._id} userRole={role} userData={userData} />
                </section>

                <section className={`${style.middleCard}`}>
                    <div>
                        <h2>Perfil</h2>
                        <p className={`${style.pSubTitle}`}>Información de usuario</p>
                    </div>

                    <div className={`${style.smallCard}`}>
                        <div className={`${style.smallCardContent}`}>
                            <div>
                                <h3 className={style.p4}>Usuario</h3>
                                <p className={`${style.pSubTitle}`}>{userData ? userData.name : ''}</p>
                            </div>
                        </div>
                        <div className={`${style.smallCardContent}`}>
                            <div>
                                <h3 className={style.p4}>Puesto</h3>
                                <p className={`${style.pSubTitle}`}>{userData ? userData.position : ''}</p>
                            </div>
                        </div>
                        <div className={`${style.smallCardContent}`}>
                            <div>
                                <h3 className={style.p4}>Periodo</h3>
                                <p className={`${style.pSubTitle} ${style.pSmall}`}>AGO-DEC 2024</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className={`${style.container} animate__animated animate__fadeInDown`}>
                <section className={`${style.middleCard} `}>
                    {role !== 'TECHNICIAN' ? (
                        <>
                            <div>
                                <h2>Equipos</h2>
                                <p className={`${style.pSubTitle}`}>Total de equipos</p>
                                <h1 className={`${style.p2}`}>{devicesNumber ? devicesNumber : 0}</h1>
                                <p className={`${style.pMiddleSubTitle}`}>Equipos funcionando</p>
                            </div>
                            <SemiCircleChart />
                        </>
                    ) : (
                        <>
                            <div>
                                <h2>Calificación</h2>
                                <p className={`${style.pSubTitle}`}>Calificación general</p>
                                <h1 className={`${style.p2}`}>4.7</h1>
                                <div className={style.ratingContainer}>
                                    <div className={style.rating}>
                                        <input value="5" name="rating" id="star5" type="radio" />
                                        <label htmlFor="star5"></label>
                                        <input value="4" name="rating" id="star4" type="radio" defaultChecked />
                                        <label htmlFor="star4"></label>
                                        <input value="3" name="rating" id="star3" type="radio" />
                                        <label htmlFor="star3"></label>
                                        <input value="2" name="rating" id="star2" type="radio" />
                                        <label htmlFor="star2"></label>
                                        <input value="1" name="rating" id="star1" type="radio" />
                                        <label htmlFor="star1"></label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
                <section className={`${style.largeCard}`}>
                    <div>
                        <h2>Incidencias</h2>
                        <p className={`${style.pSubTitle}`}>Incidencias ocurridas</p>
                    </div>
                    <AreaChart />
                </section>
            </section>
        </>
    )
}
