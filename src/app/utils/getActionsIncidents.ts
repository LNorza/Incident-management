import { CheckCheck, Trash2, Pencil, LucideIcon, SendHorizonal, CircleAlert, Printer } from "lucide-react"; // Importa los íconos necesarios
import { IIncident } from "../../utils";

interface Props {
  rowData: any;
  status: string;
  role?: string;
  function1: (row: any, e: React.MouseEvent<HTMLDivElement>) => void
  function2: (row: any, e: React.MouseEvent<HTMLDivElement>) => void
}

export interface Action {
  text: string
  icon: LucideIcon
  color?: string
  onClick: (row: any, e: React.MouseEvent<HTMLDivElement>) => void
}

export const getActionIncident = ({ status, role, rowData, function1, function2 }: Props): Action[] => {

  if (role == 'ADMIN_DEPARTMENT') {
    switch (status) {
      case 'FINISHED':
        return [
          {
            text: 'Liberar',
            icon: CheckCheck as LucideIcon, // Forzamos el tipo del ícono
            onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              // handleEditClick(rowData); // Asegúrate de definir esta función
            },
          },
          {
            text: 'Reenviar',
            icon: SendHorizonal as LucideIcon, // Forzamos el tipo del ícono
            onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              // handleDeleteClick(rowData); // Asegúrate de definir esta función
            },
          },
        ];
        break;

      case 'SENT':
        return [
          {
            text: 'Editar',
            icon: Pencil,
            onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation()
              function1(rowData, e)
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
        ];
        break;

      default:
        return [
          {
            text: 'Información',
            icon: CircleAlert,
            onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation()
              // handleEditClick(rowData)
            },
          },
          {
            text: 'Imprimir',
            icon: Printer,
            onClick: (rowData: IIncident, e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation()
              // handleDeleteClick(rowData)
            },
          },
        ];
        break;
    }
  }

  return []
}
