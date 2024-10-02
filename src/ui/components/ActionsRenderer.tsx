import React from 'react'
import { Trash2, Pencil } from 'lucide-react'
import { ICellRendererParams } from 'ag-grid-community'
import Actions from './Actions'

const ActionsRenderer: React.FC<ICellRendererParams> = (params) => {
    const handleEditClick = () => {
        // Lógica para editar el dispositivo
        console.log('Edit device:', params.data)
        // Aquí puedes agregar la lógica para abrir el modal de edición
    }

    const handleDeleteClick = () => {
        console.log('Delete device:', params.data)
    }

    return (
        <Actions
            row={''}
            actions={[
                {
                    text: 'Editar',
                    icon: Pencil,
                    onClick: handleEditClick,
                },
                {
                    text: 'Borrar',
                    icon: Trash2,
                    onClick: handleDeleteClick,
                },
            ]}
        />
    )
}

export default ActionsRenderer
