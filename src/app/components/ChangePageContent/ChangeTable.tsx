import { AgGridReact } from 'ag-grid-react'
import { Actions } from '../../../ui'
import { InfoIcon, CircleCheck, Ban } from 'lucide-react'
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
    dateFormatter,
    ChangeModalType,
    formatSparePartType,
} from '../../../utils'

interface ChangeProps {
    refresh?: boolean
    typeChangeModal?: (id: string, type: ChangeModalType, action?: string) => void
}

export const ChangeTable: React.FC<ChangeProps> = ({ refresh, typeChangeModal }) => {
    const [rowData, setRowData] = useState<IChange[]>([])
    const parentRef = useRef<HTMLDivElement>(null)
    const [userRole, setUserRole] = useState<string | null>(null)

    const handleType = (id: string, type: ChangeModalType, action?: string) => {
        typeChangeModal && typeChangeModal(id, type, action)
    }

    const getTechnicianName = async (technicianId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${technicianId}`, {
                credentials: 'include',
            })
            const data = await response.json()

            return data.name
        } catch (error) {
            console.error('Error fetching technician:', error)
        }
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

            // Crear un array de promesas
            const promises = data.map(
                async ({
                    _id,
                    approval_date,
                    created_at,
                    description,
                    device_type,
                    incident,
                    piece_to_change,
                    price,
                    spare_part,
                    status,
                    updatedAt,
                }: IChange) => ({
                    _id,
                    folio: incident.folio,
                    updatedAt: dateFormatter(new Date(updatedAt)),
                    technician: await getTechnicianName(incident.technician_id), // Asíncrono
                    device: deviceFormatOptions(device_type),
                    parts: spare_part,
                    type: sparePartsFormatOptions(piece_to_change),
                    description,
                    status,
                    created_at: dateFormatter(new Date(created_at)),
                }),
            )

            // Resolver todas las promesas
            const formattedData = await Promise.all(promises)

            setRowData(formattedData)
        } catch (error) {
            console.log('error', error)
        }
    }, [])

    const roleColDef = (): ColDef[] => {
        if (userRole === 'ADMIN_TECHNICIANS') {
            return [
                { field: 'folio', headerName: 'Folio de incidencia', sortable: true, flex: 1.2 },
                { field: 'created_ad', headerName: 'Fecha de solicitud', sortable: true, flex: 1.2 },
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
                                onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                                    e.stopPropagation()
                                    handleType(row._id, 'InfoChange')
                                },
                            },
                            {
                                text: 'Aprovar',
                                icon: CircleCheck,
                                onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                                    e.stopPropagation()
                                    handleType(row._id, 'ApproveOrRejectedChange', 'Aprove')
                                },
                            },
                            {
                                text: 'Rechazar',
                                icon: Ban,
                                onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                                    e.stopPropagation()
                                    handleType(row._id, 'ApproveOrRejectedChange', 'Rejected')
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
            { field: 'updateAt', headerName: 'Fecha del cambio', sortable: true, flex: 0.7 },
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
                                handleType(row._id, 'InfoChange')
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
