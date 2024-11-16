import { AgGridReact } from 'ag-grid-react'
import { Actions } from '../../../ui'
import { Trash2, Pencil } from 'lucide-react'
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    API_BASE_URL,
    myTheme,
    deviceFormatOptions,
    sparePartsFormatOptions,
    ISpareParts,
    getUserRole,
} from '../../../utils'

interface SparePartsTableProps {
    refresh: boolean
    device: string
    editSparePart: (spareData: ISpareParts) => void
    deleteSparePart: (spareId: string, spareName: string) => void
}

export const SparePartsTable: React.FC<SparePartsTableProps> = ({
    refresh,
    device,
    editSparePart,
    deleteSparePart,
}) => {
    const [rowData, setRowData] = useState<ISpareParts[]>([])
    const parentRef = useRef<HTMLDivElement>(null)
    const [userRole, setUserRole] = useState<string | null>(null)

    const handleEditClick = (row: ISpareParts) => {
        editSparePart(row)
    }

    const handleDeleteClick = (row: ISpareParts) => {
        deleteSparePart(row._id, row.name)
    }

    useEffect(() => {
        getUserRole().then((role) => setUserRole(role))
    }, [])

    const fetchSpareParts = useCallback(async () => {
        try {
            const url = device
                ? `${API_BASE_URL}/spare-parts-search?device_type=${device}`
                : `${API_BASE_URL}/spare-parts-search?`
            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()
            const formattedData = data.map(
                ({ _id, name, type, device_type, description, quantity, price }: ISpareParts) => ({
                    _id,
                    name,
                    type: sparePartsFormatOptions(type),
                    device_type: deviceFormatOptions(device_type),
                    description,
                    quantity,
                    price,
                }),
            )
            setRowData(formattedData)
        } catch (error) {
            console.log('error', error)
        }
    }, [device])

    const baseColDefs: ColDef[] = [
        { field: 'name', headerName: 'Nombre', sortable: true, flex: 1 },
        { field: 'type', headerName: 'Tipo', sortable: true, flex: 0.7 },
        { field: 'device_type', headerName: 'Equipo', sortable: true, flex: 0.7 },
        { field: 'description', headerName: 'Descripción', sortable: true, flex: 1.2 },
        { field: 'quantity', headerName: 'Unidades', sortable: true, flex: 0.7 },
        { field: 'price', headerName: 'Precio por unidad', sortable: true, flex: 0.7 },
    ]

    const actionsColDef: ColDef = {
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
                    onClick: (row: ISpareParts, e: React.MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation()
                        handleEditClick(row)
                    },
                },
                {
                    text: 'Borrar',
                    icon: Trash2,
                    onClick: (row: ISpareParts, e: React.MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation()
                        handleDeleteClick(row)
                    },
                },
            ],
        }),
        autoHeight: true,
        flex: 0.7,
    }

    // Condicionalmente incluye la columna de acciones
    const colDefs = userRole === 'ADMIN_TECHNICIANS' ? [...baseColDefs, actionsColDef] : baseColDefs

    useEffect(() => {
        fetchSpareParts()
    }, [refresh, fetchSpareParts])

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
