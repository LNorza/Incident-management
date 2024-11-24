import { LucideIcon, InfoIcon, CircleCheck, Ban } from 'lucide-react'
import { ChangeModalType } from '../../utils'
import { IChange } from '../../utils'

interface Props {
    status: string
    role?: string
    openModal: (id: string, type: ChangeModalType, action?: string) => void
}
export interface Action {
    text: string
    icon: LucideIcon
    onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => void
}

export const getActionChangeRequest = ({ status, role, openModal }: Props): Action[] => {
    if (role == 'ADMIN_TECHNICIANS') {
        switch (status) {
            case 'SENT':
                return [
                    {
                        text: 'Información',
                        icon: InfoIcon,
                        onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            openModal(row._id, 'InfoChange')
                        },
                    },
                    {
                        text: 'Aprovar',
                        icon: CircleCheck,
                        onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            openModal(row._id, 'ApproveOrRejectedChange', 'Aprove')
                        },
                    },
                    {
                        text: 'Rechazar',
                        icon: Ban,
                        onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            openModal(row._id, 'ApproveOrRejectedChange', 'Rejected')
                        },
                    },
                ]
            default:
                return [
                    {
                        text: 'Información',
                        icon: InfoIcon,
                        onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            openModal(row._id, 'InfoChange')
                        },
                    },
                ]
        }
    }

    return [
        {
            text: 'Información',
            icon: InfoIcon,
            onClick: (row: IChange, e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
                openModal(row._id, 'InfoChange')
            },
        },
    ]
}
