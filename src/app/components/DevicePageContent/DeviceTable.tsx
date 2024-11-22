import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { DeviceProps, IDevice, myTheme, deviceFormatOptions } from '../../../utils'
import { API_BASE_URL, getUserDepartment, getUserRole } from '../../../utils/api'
import { Actions } from '../../../ui'
import { Trash2, Pencil } from 'lucide-react'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'

interface DeviceTableProps {
    refresh: boolean
    building: string
    editDevice: (deviceId: string) => void
    deleteDevice: (deviceId: string, deleteName: string) => void
}

export const DeviceTable: React.FC<DeviceTableProps> = ({ refresh, building, editDevice, deleteDevice }) => {
    const [rowData, setRowData] = useState<IDevice[]>([])
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const isTechnician = userRole === 'ADMIN_TECHNICIANS' || userRole === 'TECHNICIAN'

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

    const fetchDevices = useCallback(async () => {
        if (!departmentId) return
        try {
            const url = isTechnician
                ? `${API_BASE_URL}/devices-by-department-search?building_id=${building}`
                : `${API_BASE_URL}/devices-by-department-search?department_id=${departmentId}&building_id=${building}`
            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()

            console.log('Datos que trae', data)

            const formattedData = await Promise.all(
                data.map(async ({ _id, name, type, brand, specs, location_id, status }: DeviceProps) => {
                    const userName = await getUserName(specs?.user_id ? specs.user_id : '')
                    console.log('Nombre de usuario', userName)

                    return {
                        _id,
                        name,
                        type: deviceFormatOptions(type),
                        brand,
                        specs,
                        user: userName,
                        location: location_id.name,
                        status,
                    }
                }),
            )

            setRowData(formattedData)
        } catch (err) {
            console.error(err)
        }
    }, [departmentId, building])

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const id = await getUserDepartment()
                setDepartmentId(id)
            } catch (err) {
                console.error(err)
            }
        }
        fetchDepartment()
    }, [])

    const fetchUserRole = async () => {
        try {
            const role = await getUserRole()
            setUserRole(role)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const infoDevices = async () => {
            await fetchUserRole()
            await fetchDevices()
        }
        infoDevices()
    }, [departmentId, refresh, fetchDevices, building])

    const colDefs: ColDef[] = [
        { field: 'name', headerName: 'Nombre de equipo', sortable: true, width: 270 }, // Usa flex
        {
            field: 'type',
            headerName: 'Tipo',
            sortable: true,
            flex: 1,
        },
        {
            field: 'brand',
            headerName: 'Marca',
            sortable: true,
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => {
                switch (params.value) {
                    case 'HP':
                        return 'HP'
                    case 'DELL':
                        return 'Dell'
                    case 'LENOVO':
                        return 'Lenovo'
                    case 'ACER':
                        return 'Acer'
                    case 'ASUS':
                        return 'Asus'
                    case 'APPLE':
                        return 'Apple'
                    case 'SAMSUNG':
                        return 'Samsung'
                    case 'EPSON':
                        return 'Epson'
                    case 'CISCO':
                        return 'Cisco'
                    case 'LINKSYS':
                        return 'Linksys'
                    case 'KOBLENZ':
                        return 'Koblenz'
                    case 'OTHER':
                        return 'Otra'
                    default:
                        return 'Desconocida'
                }
            },
        },
        { field: 'user', headerName: 'Usuario', sortable: true, flex: 1 },
        { field: 'location', headerName: 'Locación', sortable: true, flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            sortable: true,
            cellRenderer: (params: ICellRendererParams) => {
                switch (params.value) {
                    case 'ACTIVE':
                        return 'Activo'
                    case 'INACTIVE':
                        return 'Inactivo'
                    case 'MAINTENANCE':
                        return 'En mantenimiento'
                    default:
                        return 'En reparación'
                }
            },
            cellStyle: (params: CellClassParams) => {
                switch (params.value) {
                    case 'ACTIVE':
                        return { color: '#A9DFD8' }
                    case 'INACTIVE':
                        return { color: '#C84242' }
                    case 'MAINTENANCE':
                        return { color: '#20AEF3' }
                    default:
                        return { color: '#FEAF5A' }
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
                    ...(userRole === 'ADMIN_DEPARTMENT' || userRole === 'ADMIN_TECHNICIANS'
                        ? [
                              {
                                  text: 'Borrar',
                                  icon: Trash2,
                                  onClick: (row: IDevice, e: React.MouseEvent<HTMLDivElement>) => {
                                      e.stopPropagation()
                                      handleDeleteClick(row)
                                  },
                              },
                          ]
                        : []),
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
