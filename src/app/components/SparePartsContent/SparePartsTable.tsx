import { AgGridReact } from 'ag-grid-react'
import { Actions } from '../../../ui'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'
import { getActionIncident } from '../../utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ISpareParts } from '../../../utils/interface/spareParts'
import { API_BASE_URL, myTheme } from '../../../utils'

interface SparePartsTableProps {
    refresh: boolean
    typeSparePartModal?: () => void
}

export const SparePartsTable = () => {
    const [rowData, setRowData] = useState<ISpareParts[]>([])
    const parentRef = useRef<HTMLDivElement>(null)

    const fetchSpareParts = useCallback(async () => {
        //Obtener todas las piezas de repuesto
        try {
            const response = await fetch(`${API_BASE_URL}/spare-parts`)
            const data = await response.json()
            console.log('data', data)
        } catch (error) {
            console.log('error', error)
        }
    }, [])

    const colDefs: ColDef[] = [
        { field: 'name', headerName: 'Nombre', sortable: true, width: 150 },
        { field: 'type', headerName: 'Tipo', sortable: true },
        { field: 'device_id', headerName: 'Equipo', sortable: true },
        { field: 'description', headerName: 'Descripción', sortable: true, flex: 1 },
        { field: 'units', headerName: 'Unidades', sortable: true },
        // {
        //     field: 'actions',
        //     headerName: 'Acciones',
        //     cellRenderer: Actions,
        //     cellRendererParams: (params: ICellRendererParams) => {
        //         const actions = getActionIncident({
        //             status: params.data.status,
        //             role: userRole ?? undefined,
        //             rowData: params.data,
        //             function1: handleReleasedClick,
        //             function2: handleDeleteClick,
        //         })

        //         return {
        //             row: params.data,
        //             table: true,
        //             parentRef: contentRef,
        //             actions: actions,
        //         }
        //     },
        //     autoHeight: true,
        //     flex: 0.7,
        // },
    ]

    useEffect(() => {
        fetchSpareParts()
    }, [])

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
