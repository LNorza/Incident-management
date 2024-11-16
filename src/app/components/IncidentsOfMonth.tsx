import { useEffect, useState } from 'react'
import { API_BASE_URL, IUserData } from '../../utils'
import { CircleAlert, RotateCwSquare } from 'lucide-react'
import style from '../style/cardContainer.module.css'

interface IncidentsOfMonthProps {
    departmentId?: string | undefined
    userRole?: string | null
    userData?: IUserData | null
}

export const IncidentsOfMonth = ({ departmentId, userRole, userData }: IncidentsOfMonthProps) => {
    const toolIcon = '/assets/toolIcon.png'
    const maintenanceIcon = '/assets/maintanceIcon.png'

    const [stats, setStats] = useState<{
        incidents: { total: number; difference: number }
        repairs: { total: number; difference: number }
        ongoingRepairs: { total: number }
        maintenances: { total: number; difference: number }
    } | null>(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async (departmentId?: string) => {
            if (!departmentId) {
                return
            }
            try {
                let url = ''
                if (userRole === 'ADMIN_TECHNICIANS') {
                    url = `${API_BASE_URL}/dashboard-stats`
                } else if (userRole === 'TECHNICIAN') {
                    url = `${API_BASE_URL}/dashboard-stats?technician_id=${userData?._id}`
                } else {
                    url = `${API_BASE_URL}/dashboard-stats?department_id=${departmentId}`
                }

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setStats(data)
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats(departmentId)
    }, [departmentId, userRole])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!stats) {
        return <div>Error loading data</div>
    }

    const formatDifference = (difference: number) => {
        if (difference > 0) {
            return `+${difference}`
        } else if (difference < 0) {
            return `${difference}`
        }
        return '' // No sign for zero
    }

    return (
        <div className={`${style.containerCards}`}>
            <div className={`${style.tinyCard}`}>
                <div className={`${style.tinyCardIcon}`}>
                    <CircleAlert color="#c84242" size={64} />
                </div>
                <div className={`${style.tinyCardSubtext}`}>
                    <h3>{stats.incidents.total}</h3>
                    <h4>Incidencias</h4>
                    <p className={`${style.p1}`}>
                        {formatDifference(stats.incidents.difference)} incidencias con respecto al mes pasado
                    </p>
                </div>
            </div>

            <div className={`${style.tinyCard}`}>
                <div className={`${style.tinyCardIcon}`}>
                    <img src={toolIcon} alt="Reparaciones" />
                </div>
                <div className={`${style.tinyCardSubtext}`}>
                    <h3>{stats.repairs.total}</h3>
                    <h4>Reparaciones</h4>
                    <p className={`${style.p2}`}>
                        {formatDifference(stats.repairs.difference)} reparaciones con respecto al mes pasado
                    </p>
                </div>
            </div>

            <div className={`${style.tinyCard}`}>
                <div className={`${style.tinyCardIcon}`}>
                    <RotateCwSquare color="#f2c8ed" size={64} />
                </div>
                <div className={`${style.tinyCardSubtext}`}>
                    <h3>{stats.ongoingRepairs.total}</h3>
                    <h4>Reparaciones en curso</h4>
                    <p className={`${style.p3}`}>
                        {stats.ongoingRepairs.total > 0
                            ? `+${stats.ongoingRepairs.total} reparaciones en curso al mismo tiempo`
                            : 'Sin reparaciones en curso'}
                    </p>
                </div>
            </div>

            <div className={`${style.tinyCard}`}>
                <div className={`${style.tinyCardIcon}`}>
                    <img src={maintenanceIcon} alt="Mantenimientos" />
                </div>
                <div className={`${style.tinyCardSubtext}`}>
                    <h3>{stats.maintenances.total}</h3>
                    <h4>Mantenimientos</h4>
                    <p className={`${style.p4}`}>
                        {formatDifference(stats.maintenances.difference)} mantenimientos completados con respecto al mes
                        pasado
                    </p>
                </div>
            </div>
        </div>
    )
}
