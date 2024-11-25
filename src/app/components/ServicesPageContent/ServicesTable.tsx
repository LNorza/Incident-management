import { AgGridReact } from 'ag-grid-react'
import { Actions } from '../../../ui'
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    API_BASE_URL,
    myTheme,
    deviceFormatOptions,
    getUserRole,
    IServices,
    translateIncident,
    translateTimeDuration,
} from '../../../utils'
import { getActionsServices } from '../../utils/getActionsServices'

interface ServicesTableProps {
    refresh: boolean
    editService: (serviceData: IServices) => void
    deleteService: (serviceId: string, serviceName: string) => void
    infoService: (serviceData: IServices) => void
}

export const ServicesTable: React.FC<ServicesTableProps> = ({ refresh, infoService, editService, deleteService }) => {
    const [rowData, setRowData] = useState<IServices[]>([])
    const parentRef = useRef<HTMLDivElement>(null)
    const [userRole, setUserRole] = useState<string | null>(null)

    const localeText = {
        noRowsToShow: 'No hay datos disponibles',
    }

    const handleInfoClick = (row: IServices) => {
        infoService(row)
    }

    const handleEditClick = (row: IServices) => {
        editService(row)
    }

    const handleDeleteClick = (row: IServices) => {
        deleteService(row._id, row.service)
    }

    useEffect(() => {
        getUserRole().then((role) => setUserRole(role))
    }, [])

    const fetchSpareParts = useCallback(async () => {
        try {
            const url = `${API_BASE_URL}/services`
            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()
            const formattedData = data.map(({ _id, service, type, device_type, description, duration }: IServices) => ({
                _id,
                service,
                type: translateIncident(type, 'incident'),
                device_type: deviceFormatOptions(device_type),
                description,
                duration: translateTimeDuration(duration.toString()),
            }))
            setRowData(formattedData)
        } catch (error) {
            console.log('error', error)
        }
    }, [])

    const colDefs: ColDef[] = [
        { field: 'service', headerName: 'Servicio', sortable: true, flex: 1 },
        { field: 'type', headerName: 'Tipo', sortable: true, flex: 0.6 },
        { field: 'device_type', headerName: 'Equipo', sortable: true, flex: 0.6 },
        { field: 'description', headerName: 'Descripción', sortable: true, flex: 1.4 },
        { field: 'duration', headerName: 'Duración', sortable: true, flex: 0.5 },
        {
            field: 'actions',
            headerName: 'Acciones',
            cellRenderer: Actions,
            cellRendererParams: (params: ICellRendererParams) => {
                const actions = getActionsServices({
                    status: params.data.status,
                    role: userRole ?? undefined,
                    infoModal: handleInfoClick,
                    editModal: handleEditClick,
                    deleteModal: handleDeleteClick,
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

    // const actionsColDef: ColDef = {
    //     field: 'actions',
    //     headerName: 'Acciones',
    //     cellRenderer: Actions,
    //     cellRendererParams: (params: ICellRendererParams) => ({
    //         row: params.data,
    //         table: true,
    //         parentRef: parentRef,
    //         actions: [
    //             {
    //                 text: 'Editar',
    //                 icon: Pencil,
    //                 onClick: (row: IServices, e: React.MouseEvent<HTMLDivElement>) => {
    //                     e.stopPropagation()
    //                     handleEditClick(row)
    //                 },
    //             },
    //             {
    //                 text: 'Borrar',
    //                 icon: Trash2,
    //                 onClick: (row: IServices, e: React.MouseEvent<HTMLDivElement>) => {
    //                     e.stopPropagation()
    //                     handleDeleteClick(row)
    //                 },
    //             },
    //         ],
    //     }),
    //     autoHeight: true,
    //     flex: 0.6,
    // }

    // // Condicionalmente incluye la columna de acciones
    // const colDefs = userRole === 'ADMIN_TECHNICIANS' ? [...baseColDefs, actionsColDef] : baseColDefs

    useEffect(() => {
        fetchSpareParts()
    }, [refresh, fetchSpareParts])

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme={myTheme}
                rowHeight={50}
                localeText={localeText}
            />
        </div>
    )
}
