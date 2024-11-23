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
                    updatedAt,
                    device_type,
                    incident_folio,
                    piece_type,
                    spare_part,
                    status,
                    technician,
                }: any) => ({
                    _id,
                    folio: incident_folio,
                    updatedAt: updatedAt ? dateFormatter(new Date(updatedAt)) : 'N/A',
                    technician: technician || 'N/A',
                    device: deviceFormatOptions(device_type),
                    parts: sparePartsFormatOptions('ram'),
                    type: device_type,
                    description,
                }),
            )

            setRowData(formattedData)
        } catch (error) {
            console.log('error', error)
        }
    }, [])

    const roleColDef = (): ColDef[] => {
        if (userRole === 'ADMIN_TECHNICIANS') {
            return [
                { field: 'folio', headerName: 'Folio de incidencia', sortable: true, flex: 1.2 },
                { field: 'updatedAt', headerName: 'Fecha de solicitud', sortable: true, flex: 1.2 },
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
