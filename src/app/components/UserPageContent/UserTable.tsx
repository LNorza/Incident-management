import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { IUser, myTheme } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { Actions } from '../../../ui'
import { Trash2, Pencil } from 'lucide-react'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'

interface UserTableProps {
    refresh: boolean
    building: string
    editDevice: (deviceId: string) => void
    deleteDevice: (deviceId: string, deleteName: string) => void
}
export const UserTable: React.FC<UserTableProps> = ({ refresh, building, editDevice, deleteDevice }) => {
    const [rowData, setRowData] = useState<IUser[]>([])
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const handleEditClick = useCallback((row: IUser) => {
        editDevice(row.id)
    }, [])

    const handleDeleteClick = useCallback((row: IUser) => {
        deleteDevice(row.id, row.name)
    }, [])

    //Checar ALAN
    const fetchDevices = useCallback(async () => {
        if (!departmentId) return
        console.log('fetching devices', building)
        try {
            const response = await fetch(
                `${API_BASE_URL}/devices-by-department-search?department_id=${departmentId}&building_id=${building}`,
                {
                    credentials: 'include',
                },
            )
            const data = await response.json()

            const formattedData = data.map(({ _id, name, type, brand, specs, location_id, status }: any) => ({
                _id,
                name,
                type,
                brand,
                user: specs.user_id || 'Compartido',
                location: location_id.name,
                status,
            }))
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

    useEffect(() => {
        fetchDevices()
    }, [departmentId, refresh, fetchDevices, building])

    const colDefs: ColDef[] = [
        { field: 'name', headerName: 'Nombre completo', sortable: true, width: 270 }, // Usa flex
        { field: 'username', headerName: 'Usuario', sortable: true, width: 270 }, // Usa flex
        { field: 'email', headerName: 'Correo', sortable: true, width: 270 }, // Usa flex
        { field: 'position', headerName: 'Puesto', sortable: true, width: 270 }, // Usa flexx
        { field: 'Rol', headerName: 'Rol', sortable: true, width: 270 }, // Usa flexx
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
                        onClick: (row: IUser, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleEditClick(row)
                        },
                    },
                    {
                        text: 'Borrar',
                        icon: Trash2,
                        onClick: (row: IUser, e: React.MouseEvent<HTMLDivElement>) => {
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
