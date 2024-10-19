import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { DeviceProps, IDevice, myTheme } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { Actions } from '../../../ui'
import { Trash2, Pencil } from 'lucide-react'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'
import { IIncident } from '../../../utils/interface/incident'

interface IncidentTableProps {
    refresh: boolean
    building: string
    editDevice: (deviceId: string) => void
    deleteDevice: (deviceId: string, deleteName: string) => void
}

export const IncidentTable: React.FC<IncidentTableProps> = ({ refresh, building, editDevice, deleteDevice }) => {
    const [rowData2, setRowData2] = useState<IDevice[]>([])
    const [rowData, setRowData] = useState<IIncident[]>([])
    const contentRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const handleEditClick = useCallback((row: IDevice) => {
        editDevice(row._id)
    }, [])

    const handleDeleteClick = useCallback((row: IDevice) => {
        deleteDevice(row._id, row.name)
    }, [])

    const getUserName = async (userId: string) => {
        if (userId === '') return 'Compartido'
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            return `${data.name}`
        } catch (err) {
            console.error(err)
            return 'Desconocido'
        }
    }

    const fetchIncident = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents`, {
                credentials: 'include',
            })
            const data = await response.json()

            const formattedData = await Promise.all(
                data.map(async ({ folio, date, device, incident_type, description, status }: IIncident) => {
                    return {
                        folio,
                        date,
                        device,
                        incident_type,
                        description,
                        status,
                    }
                }),
            )
            console.log('data', formattedData)

            setRowData(formattedData)
        } catch (err) {
            console.error(err)
        }
    }, [building])

    // useEffect(() => {
    //     const fetchDepartment = async () => {
    //         try {
    //             const id = await getUserDepartment()
    //             setDepartmentId(id)
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     }
    //     fetchDepartment()
    // }, [])

    // useEffect(() => {
    //     fetchDevices()
    // }, [departmentId, refresh, fetchDevices, building])

    const colDefs: ColDef[] = [
        { field: 'folio', headerName: 'Folio', sortable: true, width: 270 },
        { field: 'date', headerName: 'Fecha de solicitud', sortable: true },
        { field: 'nameDevice', headerName: 'Equipo', sortable: true }, // Usa flex
        {
            field: 'type',
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
            headerName: 'Status',
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
                        return { color: '#ff0505' }
                }
            },
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            cellRenderer: Actions,
            cellRendererParams: (params: ICellRendererParams) => ({
                row: params.data,
                table: true,
                parentRef: contentRef,
                actions: [
                    {
                        text: 'Editar',
                        icon: Pencil,
                        onClick: (row: IDevice, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleEditClick(row)
                        },
                    },
                    {
                        text: 'Borrar',
                        icon: Trash2,
                        onClick: (row: IDevice, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleDeleteClick(row)
                        },
                    },
                ],
            }),
            autoHeight: true,
            flex: 0.7, // Usa flex para las acciones
        },
    ]

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
