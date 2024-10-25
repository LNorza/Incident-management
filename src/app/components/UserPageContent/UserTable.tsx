import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { IUser, myTheme } from '../../../utils'
import { API_BASE_URL, getUserDepartment, getPosition, getRole } from '../../../utils/api'
import { Actions } from '../../../ui'
import { Trash2, Pencil } from 'lucide-react'
import { ColDef, ICellRendererParams } from 'ag-grid-community'

interface UserTableProps {
    refresh: boolean
    positionFilter: string
    editUser: (userData: IUser) => void
    deleteUser: (userId: string, userName: string) => void
}
export const UserTable: React.FC<UserTableProps> = ({ refresh, positionFilter, editUser, deleteUser }) => {
    const [rowData, setRowData] = useState<IUser[]>([])
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const handleEditClick = (row: IUser) => {
        editUser(row)
    }

    const handleDeleteClick = (row: IUser) => {
        deleteUser(row._id, row.name)
    }

    const fetchUsers = useCallback(async () => {
        if (!departmentId) return
        try {
            const response = await fetch(
                `${API_BASE_URL}/users-search?department_id=${departmentId}&position=${positionFilter}`,
                {
                    credentials: 'include',
                },
            )
            const data = await response.json()

            const formattedData = data.map(
                ({ _id, name, email, username, password, position, role, department_id, imageUrl }: IUser) => ({
                    _id,
                    name,
                    email,
                    username,
                    password,
                    position: getPosition(position),
                    role: getRole(role),
                    department_id,
                    imageUrl,
                }),
            )
            setRowData(formattedData)
        } catch (err) {
            console.error(err)
        }
    }, [departmentId, positionFilter])

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const id = await getUserDepartment()
                setDepartmentId(id)

                await fetchUsers()
            } catch (err) {
                console.error(err)
            }
        }
        fetchDepartment()
    }, [fetchUsers])

    useEffect(() => {
        fetchUsers()
    }, [departmentId, refresh, fetchUsers])

    const colDefs: ColDef[] = [
        { field: 'name', headerName: 'Nombre completo', sortable: true, flex: 1 },
        { field: 'username', headerName: 'Usuario', sortable: true, flex: 1 },
        { field: 'email', headerName: 'Correo', sortable: true, flex: 1 },
        { field: 'position', headerName: 'Puesto', sortable: true, flex: 1 },
        { field: 'role', headerName: 'Rol', sortable: true, flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            cellRenderer: Actions,
            cellRendererParams: (params: ICellRendererParams) => ({
                row: params.data,
                table: true,
                parentRef: parentRef,
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
            flex: 0.7,
        },
    ]

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
