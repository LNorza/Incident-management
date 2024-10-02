import { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'
import Actions from '../../../ui/components/Actions'
import { Trash2, Pencil } from 'lucide-react'
import { myTheme } from '../../../utils'
import API_BASE_URL from '../../../utils/api/apiConfig'
import { getUserDepartment } from '../../../utils/api/userData'

interface DeviceTableProps {
    refresh: boolean
}

export const DeviceTable: React.FC<DeviceTableProps> = ({ refresh }) => {
    const [rowData, setRowData] = useState<
        {
            name: string
            type: string
            brand: string
            user: string
            location: string
            status: string
        }[]
    >([])

    const handleEditClick = (params) => {
        console.log('Edit device:, params')
    }

    const handleDeleteClick = (params) => {
        console.log('Delete device:, params')
    }

    const [colDefs] = useState<ColDef[]>([
        {
            field: 'name',
            headerName: 'Nombre de equipo',
            sortable: true,
        },
        { field: 'type', headerName: 'Tipo', sortable: true, autoHeaderHeight: true },
        { field: 'brand', headerName: 'Marca', sortable: true, autoHeaderHeight: true },
        {
            field: 'user',
            headerName: 'Usuario',
            sortable: true,
            cellRenderer: (params: ICellRendererParams) => params.value || 'Compartido',
            autoHeaderHeight: true,
        },
        { field: 'location', headerName: 'Locación', sortable: true, autoHeaderHeight: true },
        {
            field: 'status',
            headerName: 'Status',
            sortable: true,
            cellRenderer: (params: ICellRendererParams) => {
                if (params.value === 'ACTIVE') {
                    return 'Activo'
                } else if (params.value === 'INACTIVE') {
                    return 'Inactivo'
                } else {
                    return 'En reparación'
                }
            },
            cellStyle: (params: CellClassParams) => {
                if (params.value === 'ACTIVE') {
                    return { color: '#A9DFD8' }
                } else if (params.value === 'INACTIVE') {
                    return { color: '#C84242' }
                } else {
                    return { color: '#FEAF5A' }
                }
            },
            autoHeaderHeight: true,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            cellRenderer: Actions,
            cellRendererParams: (params: ICellRendererParams) => ({
                row: params.data,
                actions: [
                    {
                        text: 'Editar',
                        icon: <Pencil />,
                        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleEditClick(params.data)
                        },
                    },
                    {
                        text: 'Eliminar',
                        icon: <Trash2 />,
                        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleDeleteClick(params.data)
                        },
                    },
                ],
            }),
            autoHeight: true,
        },
    ])

    const [departmentId, setDepartmentId] = useState<string | null>(null)

    useEffect(() => {
        fetchDepartment()
    }, [])

    useEffect(() => {
        if (departmentId) {
            fetchDevices()
        }
    }, [departmentId, refresh])

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchDevices = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices-by-department/${departmentId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            const formattedData = data.map((device: any) => ({
                name: device.name,
                type: device.type,
                brand: device.brand,
                user: device.specs.user_id,
                location: device.location_id.name,
                status: device.status,
            }))
            setRowData(formattedData)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 500 }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
