import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { myTheme } from '../../../utils'
import { API_BASE_URL, getUserRole } from '../../../utils/api'
import { Actions } from '../../../ui'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'
import { IIncident } from '../../../utils/interface/incident'
import { dateFormatter } from '../../../utils/formatter/date.formatter'
import { getActionIncident } from '../../utils/getActionsIncidents'

interface IncidentTableProps {
    refresh: boolean
    building: string
    editIncident?: (deviceId: string) => void
    deleteIncident?: (deviceId: string, deleteName: string) => void
}

export const IncidentTable: React.FC<IncidentTableProps> = ({ refresh, building, editIncident, deleteIncident }) => {
    const [rowData, setRowData] = useState<IIncident[]>([])

    const contentRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const [userRole, setUserRole] = useState<string | null>(null)

    const handleReleasedClick = useCallback(
        (row: IIncident) => {
            if (editIncident) {
                editIncident(row._id)
            }
        },
        [editIncident],
    )

    const handleDeleteClick = useCallback(
        (row: IIncident) => {
            if (deleteIncident) {
                deleteIncident(row._id, `Folio ${row.folio}`)
            }
        },
        [deleteIncident],
    )

    // Función para obtener el rol del usuario
    const fetchRole = async () => {
        const role = await getUserRole() // Obtener el rol del usuario
        setUserRole(role) // Guardar el rol en el estado
    }

    // Función para obtener el dispositivo
    const fetchDeviceById = async (deviceId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            return data.name // Devuelve el nombre del dispositivo
        } catch (err) {
            console.error(`Error fetching device ${deviceId}:`, err)
            return 'Desconocido' // En caso de error, devuelve un valor por defecto
        }
    }

    // Función principal para obtener los incidentes
    const fetchIncident = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents`, {
                credentials: 'include',
            })
            const data = await response.json()

            // Cache local para evitar múltiples solicitudes al mismo dispositivo
            const deviceCache: { [key: string]: string } = {}

            const formattedData = await Promise.all(
                data.map(async ({ _id, folio, date, device_id, incident_type, description, status }: IIncident) => {
                    const formattedDate = dateFormatter(new Date(date))

                    // Revisa si el dispositivo ya está en la caché
                    if (!deviceCache[device_id]) {
                        deviceCache[device_id] = await fetchDeviceById(device_id)
                    }

                    return {
                        _id,
                        folio,
                        date: formattedDate,
                        device_id: deviceCache[device_id], // Usa el nombre del dispositivo desde la caché
                        incident_type,
                        description,
                        status,
                    }
                }),
            )
            setRowData(formattedData)
        } catch (err) {
            console.error(err)
        }
    }, [building])

    useEffect(() => {
        fetchRole()
    }, [])

    useEffect(() => {
        fetchIncident()
    }, [fetchIncident, refresh, building])

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
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
