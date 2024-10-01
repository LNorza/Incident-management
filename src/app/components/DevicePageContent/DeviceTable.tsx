import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, ICellRendererParams } from 'ag-grid-community' // Importar ICellRendererParams
import { myTheme } from '../../../utils'

export const DeviceTable: React.FC = () => {
    // Tipar correctamente el rowData
    const [rowData, setRowData] = useState<{ make: string; model: string; price: number; electric: boolean }[]>([
        { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
        { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
        { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    ])

    // Define column definitions con la tipificación ColDef
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: 'make', headerName: 'Make', sortable: true },
        { field: 'model', headerName: 'Model', sortable: true },
        { field: 'price', headerName: 'Price', sortable: true },
        {
            field: 'electric',
            headerName: 'Electric',
            sortable: true,
            cellRenderer: (params: ICellRendererParams) => (params.value ? 'Yes' : 'No'), // Tipar params
        },
    ])

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 500 }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} />
        </div>
    )
}
