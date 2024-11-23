import { useState, useEffect } from 'react'
import { AreaChart, IncidentsOfMonth, SemiCircleChart } from '../components'
import { API_BASE_URL, getUserData, IUserData, translateRole } from '../../utils'
import style from '../style/cardContainer.module.css'

export const Dashboard = () => {
    const [userData, setUserData] = useState<IUserData | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [devicesNumber, setDevicesNumber] = useState<number | null>(0)
    const [activeDevices, setActiveDevices] = useState<number | null>(null)
    const [technicianQualification, setTechnicianQualification] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData()
            if (role === 'TECHNICIAN') {
                fetchTechnicianQualification()
            }
        }
        fetchData()
    }, [role])

    const fetchTechnicianQualification = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/technician-qualification?technician_id=${userData?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await response.json()
            const qualification2decimals = Math.round(data.qualification * 100) / 100
            setTechnicianQualification(qualification2decimals || 0)
        } catch (error) {
            console.error(error)
        }
    }

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
                    const data = await response.json()
                    setDevicesNumber(data.devicesNumber || 0)
                    setActiveDevices(data.activePercentage || 0)
                } catch (error) {
                    console.error(error)
                }
            }
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
                <section className={`${style.middleCard}`}>
                    {role !== 'TECHNICIAN' ? (
                        <>
                            <div>
                                <h2>Equipos</h2>
                                <p className={`${style.pSubTitle}`}>Total de equipos</p>
                                <h1 className={`${style.p2}`}>{devicesNumber}</h1>
                                <p className={`${style.pMiddleSubTitle}`}>Equipos funcionando</p>
                            </div>
                            {activeDevices !== null && <SemiCircleChart percentage={activeDevices} />}
                        </>
                    ) : (
                        <>
                            <div>
                                <h2>Calificación</h2>
                                <p className={`${style.pSubTitle}`}>Calificación general</p>
                                <h1 className={`${style.p2}`}>{technicianQualification}</h1>
                                <div className={style.ratingContainer}>
                                    <div className={style.rating}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <label
                                                key={star}
                                                style={{
                                                    color:
                                                        star <= technicianQualification
                                                            ? 'var(--MainGreenColor)'
                                                            : '#ccc',
                                                }}
                                            ></label>
                                        ))}
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
