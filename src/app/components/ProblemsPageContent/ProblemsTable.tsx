import { AgGridReact } from 'ag-grid-react'
import { Actions } from '../../../ui'
import { InfoIcon } from 'lucide-react'
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import { useCallback, useEffect, useRef, useState } from 'react'
import { API_BASE_URL, myTheme, Incident, dateFormatter } from '../../../utils'

interface ServicesTableProps {
    refresh: boolean
    infoProblem: (incidentId: string) => void
}

export const ProblemsTable: React.FC<ServicesTableProps> = ({ refresh, infoProblem }) => {
    const [rowData, setRowData] = useState<Incident[]>([])
    const parentRef = useRef<HTMLDivElement>(null)

    const localeText = {
        noRowsToShow: 'No hay datos disponibles',
    }

    const handleInfoClick = (row: Incident) => {
        infoProblem(row._id)
    }

    const fetchSpareParts = useCallback(async () => {
        try {
            const url = `${API_BASE_URL}/incidents-search?isProblem=true&status=RELEASED`
            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()
            const formattedData = data.map(
                ({ _id, folio, root_cause, description, created_at, end_date, problem_solution }: Incident) => ({
                    _id,
                    folio,
                    description,
                    root_cause,
                    created_at: created_at ? dateFormatter(new Date(created_at)) : 'Sin fecha',
                    end_date: end_date ? dateFormatter(new Date(end_date)) : 'Sin fecha',
                    problem_solution,
                }),
            )
            setRowData(formattedData)
        } catch (error) {
            console.log('error', error)
        }
    }, [])

    const colDefs: ColDef[] = [
        { field: 'folio', headerName: 'Incidencia', sortable: true, flex: 0.6 },
        { field: 'root_cause', headerName: 'Causa raíz', sortable: true, flex: 1 },
        { field: 'description', headerName: 'Error conocido', sortable: true, flex: 1 },
        { field: 'created_at', headerName: 'Fecha de solicitud', sortable: true, flex: 0.85 },
        { field: 'end_date', headerName: 'Fecha de terminación', sortable: true, flex: 0.9 },
        { field: 'problem_solution', headerName: 'Solución', sortable: true, flex: 1 },
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
                        onClick: (row: Incident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleInfoClick(row)
                        },
                    },
                ],
            }),
            autoHeight: true,
            flex: 0.5,
        },
    ]

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
