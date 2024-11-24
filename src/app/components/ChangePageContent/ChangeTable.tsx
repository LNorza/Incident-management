import { AgGridReact } from 'ag-grid-react'
import { Actions } from '../../../ui'
import { InfoIcon } from 'lucide-react'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    API_BASE_URL,
    myTheme,
    sparePartsFormatOptions,
    getSparePartType,
    ISpareParts,
    getUserRole,
    IChange,
    dateFormatter,
    ChangeModalType,
    IUserData,
    getUserData,
} from '../../../utils'
import { getActionChangeRequest } from '../../utils/getActionsChangeRequest'

interface ChangeProps {
    refresh?: boolean
    isHistory?: boolean
    typeChangeModal?: (id: string, type: ChangeModalType, action?: string) => void
}

export const ChangeTable: React.FC<ChangeProps> = ({ refresh, isHistory, typeChangeModal }) => {
    const [rowData, setRowData] = useState<IChange[]>([])
    const parentRef = useRef<HTMLDivElement>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [userData, setUserData] = useState<IUserData | null>(null)

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

    useEffect(() => {
        getUserData().then((data) => setUserData(data))
    }, [])

    const fetchChange = useCallback(async () => {
        try {
            let url = ''
            if (isHistory) {
                url = `${API_BASE_URL}/change-requests-search?status=APPROVED`
            } else {
                if (userRole === 'ADMIN_TECHNICIANS') {
                    url = `${API_BASE_URL}/change-requests-search`
                } else {
                    url = `${API_BASE_URL}/change-requests-search?technician_id=${userData?._id}`
                }
            }

            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()

            // Crear un array de promesas
            const promises = data.map(
                async ({
                    _id,
                    created_at,
                    approval_date,
                    description,
                    incident,
                    piece_to_change,
                    spare_part,
                    status,
                }: IChange) => ({
                    _id,
                    folio: incident.folio,
                    approval_date: approval_date ? dateFormatter(new Date(approval_date)) : 'Sin fecha',
                    piece_to_change: await getSparePartType(piece_to_change),
                    technician: await getTechnicianName(incident.technician_id),
                    device: incident.device_id.name,
                    parts: spare_part,
                    type: await sparePartsFormatOptions(piece_to_change),
                    description,
                    status,
                    created_at: dateFormatter(new Date(created_at)),
                }),
            )
            const formattedData = await Promise.all(promises)

            setRowData(formattedData)
        } catch (error) {
            console.log('error', error)
        }
    }, [userRole, userData, isHistory])

    const roleColDef = (): ColDef[] => {
        if ((userRole === 'ADMIN_TECHNICIANS' || userRole === 'TECHNICIAN') && !isHistory) {
            return [
                { field: 'folio', headerName: 'Folio incidencia', sortable: true, flex: 0.9 },
                { field: 'created_at', headerName: 'Fecha de solicitud', sortable: true, flex: 1 },
                { field: 'technician', headerName: 'Técnico', sortable: true, flex: 0.9 },
                { field: 'device', headerName: 'Equipo', sortable: true, flex: 0.7 },
                { field: 'parts', headerName: 'Pieza', sortable: true, flex: 0.9 },
                { field: 'description', headerName: 'Descripción', sortable: true, flex: 1.3 },
                {
                    field: 'status',
                    headerName: 'Estatus',
                    sortable: true,
                    flex: 0.7,
                    cellRenderer: (params: ICellRendererParams) => {
                        switch (params.value) {
                            case 'SENT':
                                return 'Enviada'
                            case 'APPROVED':
                                return 'Aprobada'
                            case 'REJECTED':
                                return 'Rechazada'
                            default:
                                return 'Desconocido'
                        }
                    },
                    cellStyle: (params: CellClassParams) => {
                        switch (params.value) {
                            case 'APPROVED':
                                return { color: '#A9DFD8' }
                            case 'REJECTED':
                                return { color: '#FF0000' }
                            default:
                                return { color: '#FFFF' }
                        }
                    },
                },
                // {
                //     field: 'actions',
                //     headerName: 'Acciones',
                //     cellRenderer: Actions,
                //     cellRendererParams: (params: ICellRendererParams) => ({
                //         row: params.data,
                //         table: true,
                //         parentRef: parentRef,
                //         actions: [
                //             {
                //                 text: 'Información',
                //                 icon: InfoIcon,
                //                 onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                //                     e.stopPropagation()
                //                     handleType(row._id, 'InfoChange')
                //                 },
                //             },
                //             {
                //                 text: 'Aprovar',
                //                 icon: CircleCheck,
                //                 onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                //                     e.stopPropagation()
                //                     handleType(row._id, 'ApproveOrRejectedChange', 'Aprove')
                //                 },
                //             },
                //             {
                //                 text: 'Rechazar',
                //                 icon: Ban,
                //                 onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                //                     e.stopPropagation()
                //                     handleType(row._id, 'ApproveOrRejectedChange', 'Rejected')
                //                 },
                //             },
                //         ],
                //     }),
                //     autoHeight: true,
                //     flex: 0.7,
                // },
                {
                    field: 'actions',
                    headerName: 'Acciones',
                    cellRenderer: Actions,
                    cellRendererParams: (params: ICellRendererParams) => {
                        const actions = getActionChangeRequest({
                            status: params.data.status,
                            role: userRole ?? undefined,
                            openModal: handleType,
                        })

                        return {
                            row: params.data,
                            table: true,
                            parentRef: parentRef,
                            actions: actions,
                        }
                    },
                    autoHeight: true,
                    flex: 0.7,
                },
            ]
        }
        return [
            { field: 'folio', headerName: 'Folio de incidencia', sortable: true, flex: 1 },
            { field: 'approval_date', headerName: 'Fecha del cambio', sortable: true, flex: 1 },
            { field: 'technician', headerName: 'Técnico', sortable: true, flex: 1 },
            { field: 'device', headerName: 'Equipo', sortable: true, flex: 0.9 },
            { field: 'parts', headerName: 'Pieza', sortable: true, flex: 1 },
            { field: 'piece_to_change', headerName: 'Tipo', sortable: true, flex: 1 },
            { field: 'description', headerName: 'Descripción', sortable: true, flex: 1.3 },
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
