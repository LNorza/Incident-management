import { useState, useEffect } from 'react'
import { AreaChart, IncidentsOfMonth, SemiCircleChart } from '../components'
import { API_BASE_URL, getUserData, IUserData } from '../../utils'
import style from '../style/cardContainer.module.css'

export const Dashboard = () => {
    const [userData, setUserData] = useState<IUserData | null>(null)
    const [devicesNumber, setDevicesNumber] = useState<number | null>(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData()
                setUserData(userData)
                if (userData) {
                    await fetchDevicesNumber(userData.department._id)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, []) // Agregamos las dependencias adecuadas

    const fetchDevicesNumber = async (departmentId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/number-devices-by-department/${departmentId}`, {
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

    return (
        <>
            <section className={`${style.container} animate__animated animate__fadeInDown`}>
                <section className={`${style.largeCard}`}>
                    <div>
                        <h2>Incidencias en este mes</h2>
                        <p className={`${style.pSubTitle}`}>Resumen general</p>
                    </div>

                    <IncidentsOfMonth />
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
                    <div>
                        <h2>Equipos</h2>
                        <p className={`${style.pSubTitle}`}>Total de equipos</p>
                        <h1 className={`${style.p2}`}>{devicesNumber ? devicesNumber : 0}</h1>
                        <p className={`${style.pMiddleSubTitle}`}>Equipos funcionando</p>
                    </div>
                    <SemiCircleChart />
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
