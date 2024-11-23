import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { IncidentModalType, IncidentState, myTheme, getUserDepartment, IUserData } from '../../../utils'
import { API_BASE_URL, getUserData, getUserRole } from '../../../utils/api'
import { Actions } from '../../../ui'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'
import { IIncident } from '../../../utils/interface/incident'
import { dateFormatter } from '../../../utils/formatter/date.formatter'
import { getActionIncident } from '../../utils'

interface IncidentTableProps {
    refresh: boolean
    typeIncident: string
    statusIncident: string
    typeIncidentModal?: (
        deviceId: string,
        type?: IncidentModalType,
        incidentStatus?: IncidentState,
        nameAction?: string,
    ) => void
    deleteIncident?: (deviceId: string, deleteName: string) => void
}

export const IncidentTable: React.FC<IncidentTableProps> = ({
    refresh,
    typeIncident,
    statusIncident,
    typeIncidentModal,
    deleteIncident,
}) => {
    const [rowData, setRowData] = useState<IIncident[]>([])

    const contentRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const [userData, setUserData] = useState<IUserData | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [departmentId, setDepartmentId] = useState<string | null>(null)

    const localeText = {
        noRowsToShow: 'No hay datos disponibles',
    }

    const handleReleasedClick = useCallback(
        (row: IIncident, type?: IncidentModalType, action?: string) => {
            if (typeIncidentModal) {
                if (type == 'EditIncident') {
                    typeIncidentModal(row._id)
                }
                if (type == 'ChangeModal') {
                    typeIncidentModal(row._id, 'ChangeModal', row.status)
                }
                if (type == 'InfoIncident') {
                    if (row.status != 'SENT') {
                        typeIncidentModal(row._id, 'InfoIncident', row.status)
                    } else {
                        typeIncidentModal(row._id, 'InfoIncident', 'SENT')
                    }
                }
                if (type == 'FinishedIncident') {
                    typeIncidentModal(row._id, 'FinishedIncident', row.status, action)
                }
                if (type == 'AssignedIncident') {
                    typeIncidentModal(row._id, 'AssignedIncident', row.status, action)
                }
            }
        },
        [typeIncidentModal],
    )

    const handleDeleteClick = useCallback(
        (row: IIncident) => {
            if (deleteIncident) {
                deleteIncident(row._id, `Folio ${row.folio}`)
            }
        },
        [deleteIncident],
    )

    const fetchDepartment = async () => {
        const department = await getUserDepartment()
        setDepartmentId(department)
    }

    const fetchRole = async () => {
        const role = await getUserRole()
        setUserRole(role)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData()
                setUserData(userData ?? null)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    // Función para obtener el dispositivo
    const fetchDeviceById = async (deviceId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            return data.name
        } catch (err) {
            console.error(`Error fetching device ${deviceId}:`, err)
            return 'Desconocido'
        }
    }

    // Función principal para obtener los incidentes
    const fetchIncident = useCallback(async () => {
        try {
            if (!departmentId) return
            let url = `${API_BASE_URL}/incidents-search?department_id=${departmentId}`
            if (userRole === 'ADMIN_TECHNICIANS') {
                url = `${API_BASE_URL}/incidents`
                if (typeIncident !== 'ALL' || statusIncident !== 'ALL') {
                    url = `${API_BASE_URL}/incidents-search?incident_type=${typeIncident}&status=${statusIncident}`
                }
            }

            if (userRole === 'TECHNICIAN' && userData) {
                url = `${API_BASE_URL}/incidents-search?technician_id=${userData._id}`
                if (typeIncident !== 'ALL' || statusIncident !== 'ALL') {
                    url = `${API_BASE_URL}/incidents-search?technician_id=${userData._id}&incident_type=${typeIncident}&status=${statusIncident}`
                }
            }

            if (userRole === 'ADMIN_DEPARTMENT') {
                url = `${API_BASE_URL}/incidents-search?department_id=${departmentId}`
                if (typeIncident !== 'ALL' || statusIncident !== 'ALL') {
                    url = `${API_BASE_URL}/incidents-search?department_id=${departmentId}&incident_type=${typeIncident}&status=${statusIncident}`
                }
            }

            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()

            const formattedData = await Promise.all(
                data.map(
                    async ({
                        _id,
                        folio,
                        created_at,
                        device_id,
                        incident_type,
                        description,
                        status,
                        technician_id,
                    }: IIncident) => {
                        return {
                            _id,
                            folio,
                            date: dateFormatter(new Date(created_at)),
                            device_id: await fetchDeviceById(device_id),
                            incident_type,
                            description,
                            status,
                            technician_id,
                        }
                    },
                ),
            )

            setRowData(formattedData)
        } catch (err) {
            console.error(err)
        }
    }, [typeIncident, statusIncident, userRole, departmentId, userData])

    useEffect(() => {
        const initialize = async () => {
            await fetchRole()
            await fetchDepartment()
        }

        initialize()
    }, [])

    useEffect(() => {
        fetchIncident()
    }, [fetchIncident, refresh, typeIncident, statusIncident, userRole, userData])

    const colDefs: ColDef[] = [
        { field: 'folio', headerName: 'Folio', sortable: true, width: 100 },
        { field: 'date', headerName: 'Fecha de solicitud', sortable: true },
        { field: 'device_id', headerName: 'Equipo', sortable: true }, // Actualizado para devolver el nombre del dispositivo
        {
            field: 'incident_type',
            headerName: 'Tipo',
            sortable: true,
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => {
                switch (params.value) {
                    case 'COMPUTER':
                        return 'Computo'
                    case 'REPAIR':
                        return 'Reparación'
                    case 'MAINTANCE':
                        return 'Mantenimiento'
                    default:
                        return 'Desconocido'
                }
            },
        },
        { field: 'description', headerName: 'Descripción', sortable: true, flex: 1 },
        {
            field: 'status',
            headerName: 'Estatus',
            sortable: true,
            cellRenderer: (params: ICellRendererParams) => {
                switch (params.value) {
                    case 'IN_PROCESS':
                        return 'En proceso'
                    case 'SENT':
                        return 'Enviada'
                    case 'RELEASED':
                        return 'Liberada'
                    case 'FINISHED':
                        return 'Terminada'
                    case 'ASSIGNED':
                        return 'Asignada'
                    case 'REJECTED':
                        return 'Rechazada'
                    default:
                        return 'En reparación'
                }
            },
            cellStyle: (params: CellClassParams) => {
                switch (params.value) {
                    case 'IN_PROCESS':
                        return { color: '#20AEF3' }
                    case 'SENT':
                        return { color: '#FFFFFF' }
                    case 'RELEASED':
                        return { color: '#A9DFD8' }
                    case 'FINISHED':
                        return { color: '#FEAF5A' }
                    case 'REJECTED':
                        return { color: '#FF0000' }
                    default:
                        return { color: '#FFFF' }
                }
            },
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            cellRenderer: Actions,
            cellRendererParams: (params: ICellRendererParams) => {
                const actions = getActionIncident({
                    status: params.data.status,
                    role: userRole ?? undefined,
                    rowData: params.data,
                    function1: handleReleasedClick,
                    function2: handleDeleteClick,
                })

                return {
                    row: params.data,
                    table: true,
                    parentRef: contentRef,
                    actions: actions,
                }
            },
            autoHeight: true,
            flex: 0.7,
        },
    ]

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme={myTheme}
                rowHeight={50}
                localeText={localeText}
            />
        </div>
    )
}
