import { LucideIcon, InfoIcon, Pencil, Trash2 } from 'lucide-react'
import { IServices } from '../../utils'

interface Props {
    status: string
    role?: string
    infoModal: (row: IServices) => void
    editModal: (row: IServices) => void
    deleteModal: (row: IServices) => void
}
export interface Action {
    text: string
    icon: LucideIcon
    onClick: (row: IServices, e: React.MouseEvent<HTMLDivElement>) => void
}

export const getActionsServices = ({ role, infoModal, editModal, deleteModal }: Props): Action[] => {
    if (role == 'ADMIN_TECHNICIANS') {
        return [
            {
                text: 'Información',
                icon: InfoIcon,
                onClick: (row: IServices, e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation()
                    infoModal(row)
                },
            },
            {
                text: 'Editar',
                icon: Pencil,
                onClick: (row: IServices, e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation()
                    editModal(row)
                },
            },
            {
                text: 'Borrar',
                icon: Trash2,
                onClick: (row: IServices, e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation()
                    deleteModal(row)
                },
            },
        ]
    }

    return [
        {
            text: 'Información',
            icon: InfoIcon,
            onClick: (row: IServices, e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
                infoModal(row)
            },
        },
    ]
}
