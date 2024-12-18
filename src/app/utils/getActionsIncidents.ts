import {
    CheckCheck,
    Trash2,
    Pencil,
    LucideIcon,
    SendHorizonal,
    CircleAlert,
    Printer,
    UserRoundPlus,
    Ban,
    Clock,
    CircleCheckBig,
    ArrowLeftRight,
} from 'lucide-react' // Importa los íconos necesarios
import { IIncident, IncidentModalType } from '../../utils'

interface Props {
    rowData: IIncident
    status: string
    role?: string
    function1: (
        row: IIncident,
        type: IncidentModalType,
        nameAction: string,
        e: React.MouseEvent<HTMLDivElement>,
    ) => void
    function2: (row: IIncident, e: React.MouseEvent<HTMLDivElement>) => void
}
export interface Action {
    text: string
    icon: LucideIcon
    color?: string
    onClick: (row: IIncident, e: React.MouseEvent<HTMLDivElement>) => void
}

export const getActionIncident = ({ status, role, function1, function2 }: Props): Action[] => {
    if (role == 'ADMIN_DEPARTMENT') {
        switch (status) {
            case 'FINISHED':
                return [
                    {
                        text: 'Liberar',
                        icon: CheckCheck as LucideIcon, // Forzamos el tipo del ícono
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'FinishedIncident', 'RELEASED', e)
                        },
                    },
                    {
                        text: 'Reenviar',
                        icon: SendHorizonal as LucideIcon, // Forzamos el tipo del ícono
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'FinishedIncident', 'RESENT', e)
                        },
                    },
                ]
                break

            case 'SENT':
                return [
                    {
                        text: 'Editar',
                        icon: Pencil,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'EditIncident', '', e)
                        },
                    },
                    {
                        text: 'Borrar',
                        icon: Trash2,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function2(rowData, e)
                        },
                    },
                ]
                break

            default:
                return [
                    {
                        text: 'Información',
                        icon: CircleAlert,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'InfoIncident', '', e)
                        },
                    },
                    {
                        text: 'Imprimir',
                        icon: Printer,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            console.log(rowData)
                            // handleDeleteClick(rowData)
                        },
                    },
                ]
                break
        }
    }

    if (role == 'ADMIN_TECHNICIANS') {
        switch (status) {
            case 'SENT':
                return [
                    {
                        text: 'Asignar incidencia',
                        icon: UserRoundPlus,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'AssignedIncident', 'ASSIGNED', e)
                        },
                    },
                    {
                        text: 'Rechazar incidencia',
                        icon: Ban,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'AssignedIncident', 'REJECTED', e)
                        },
                    },
                    {
                        text: 'Imprimir',
                        icon: Printer,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            console.log(rowData)
                            // handleDeleteClick(rowData)
                        },
                    },
                ]
                break

            default:
                return [
                    {
                        text: 'Información',
                        icon: CircleAlert,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'InfoIncident', '', e)
                        },
                    },
                    {
                        text: 'Imprimir',
                        icon: Printer,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            console.log(rowData)
                            // handleDeleteClick(rowData)
                        },
                    },
                ]
                break
        }
    }
    if (role == 'TECHNICIAN') {
        switch (status) {
            case 'ASSIGNED':
                return [
                    {
                        text: 'Información',
                        icon: CircleAlert,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'InfoIncident', '', e)
                        },
                    },
                    {
                        text: 'Asignar tiempo',
                        icon: Clock,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'AssignedIncident', 'ASSIGNED', e)
                        },
                    },
                ]
                break

            case 'IN_PROCESS':
                return [
                    {
                        text: 'Información',
                        icon: CircleAlert,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'InfoIncident', '', e)
                        },
                    },
                    {
                        text: 'Realizar cambio',
                        icon: ArrowLeftRight,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'ChangeModal', '', e)
                        },
                    },
                    {
                        text: 'Finalizar',
                        icon: CircleCheckBig,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'FinishedIncident', 'FINISHED', e)
                        },
                    },
                ]
                break

            case 'SENT':
                return [
                    {
                        text: 'Información',
                        icon: CircleAlert,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'InfoIncident', 'SENT', e)
                        },
                    },
                ]
                break

            default:
                return [
                    {
                        text: 'Información',
                        icon: CircleAlert,
                        onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            function1(rowData, 'InfoIncident', '', e)
                        },
                    },
                ]
                break
        }
    }

    return []
}
