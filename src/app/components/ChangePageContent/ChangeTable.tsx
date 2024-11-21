import { AgGridReact } from 'ag-grid-react'
import { Actions } from '../../../ui'
import { Trash2, Pencil, InfoIcon, CircleCheck, Ban } from 'lucide-react'
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    API_BASE_URL,
    myTheme,
    deviceFormatOptions,
    sparePartsFormatOptions,
    ISpareParts,
    getUserRole,
    IChange,
} from '../../../utils'

interface SparePartsTableProps {
    refresh?: boolean
    device?: string
    editSparePart?: (spareData: ISpareParts) => void
    deleteSparePart?: (spareId: string, spareName: string) => void
}

export const ChangeTable: React.FC<SparePartsTableProps> = ({ refresh, device, editSparePart, deleteSparePart }) => {
    const [rowData, setRowData] = useState<ISpareParts[]>([])
    const parentRef = useRef<HTMLDivElement>(null)
    const [userRole, setUserRole] = useState<string | null>(null)

    const handleEditClick = (row: ISpareParts) => {
        // editSparePart(row)
    }

    const handleDeleteClick = (row: ISpareParts) => {
        // deleteSparePart(row._id, row.name)
    }

    useEffect(() => {
        getUserRole().then((role) => setUserRole(role))
    }, [])

    const fetchChange = useCallback(async () => {
        try {
            const url = `${API_BASE_URL}/change-requests-search`
            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()
            console.log('data', data)

            const formattedData = data.map(
                ({
                    _id,
                    created_at,
                    description,
                    date_change,
                    device_type,
                    incident_folio,
                    piece_type,
                    spare_part,
                    status,
                    technician,
                }: IChange) => ({
                    _id,
                    folio: incident_folio,
                    date_change,
                    technician,
                    device: deviceFormatOptions(device_type),
                    parts: sparePartsFormatOptions(spare_part),
                    type: piece_type,
                    description,
                }),
            )
            setRowData(formattedData)
        } catch (error) {
            console.log('error', error)
        }
    }, [device])

    const roleColDef = (): ColDef[] => {
        if (userRole === 'ADMIN_TECHNICIANS') {
            return [
                { field: 'folio', headerName: 'Folio de incidencia', sortable: true, flex: 1.2 },
                { field: 'date_change', headerName: 'Fecha de solicitud', sortable: true, flex: 1.2 },
                { field: 'technician', headerName: 'Técnico', sortable: true, flex: 0.7 },
                { field: 'device', headerName: 'Equipo', sortable: true, flex: 0.7 },
                { field: 'parts', headerName: 'Piezas', sortable: true, flex: 0.7 },
                { field: 'description', headerName: 'Descripción', sortable: true, flex: 1.3 },
                { field: 'status', headerName: 'Estatus', sortable: true, flex: 0.7 },
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
                                text: 'Información',
                                icon: InfoIcon,
                                onClick: (row: ISpareParts, e: React.MouseEvent<HTMLDivElement>) => {
                                    e.stopPropagation()
                                    handleEditClick(row)
                                },
                            },
                            {
                                text: 'Aprovar',
                                icon: CircleCheck,
                                onClick: (row: ISpareParts, e: React.MouseEvent<HTMLDivElement>) => {
                                    e.stopPropagation()
                                    handleEditClick(row)
                                },
                            },
                            {
                                text: 'Rechazar',
                                icon: Ban,
                                onClick: (row: ISpareParts, e: React.MouseEvent<HTMLDivElement>) => {
                                    e.stopPropagation()
                                    handleEditClick(row)
                                },
                            },
                        ],
                    }),
                    autoHeight: true,
                    flex: 0.7,
                },
            ]
        }
        return [
            { field: 'folio', headerName: 'Folio de incidencia', sortable: true, flex: 1 },
            { field: 'date_change', headerName: 'Fecha del cambio', sortable: true, flex: 0.7 },
            { field: 'technician', headerName: 'Técnico', sortable: true, flex: 0.7 },
            { field: 'device', headerName: 'Equipo', sortable: true, flex: 0.7 },
            { field: 'parts', headerName: 'Piezas', sortable: true, flex: 0.7 },
            { field: 'type', headerName: 'Tipo', sortable: true, flex: 0.7 },
            { field: 'description', headerName: 'Descripción', sortable: true, flex: 1.2 },
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
                            text: 'Información',
                            icon: InfoIcon,
                            onClick: (row: ISpareParts, e: React.MouseEvent<HTMLDivElement>) => {
                                e.stopPropagation()
                                handleEditClick(row)
                            },
                        },
                    ],
                }),
                autoHeight: true,
                flex: 0.7,
            },
        ]
    }

    const baseColDefs: ColDef[] = roleColDef()

    useEffect(() => {
        fetchChange()
    }, [refresh, fetchChange])

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact rowData={rowData} columnDefs={baseColDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
