import { IOptions } from "../interface";

export const getIncidentTypeOptions: IOptions[] = [
  { label: 'Computo', value: 'COMPUTER' },
  { label: 'Reparación', value: 'REPAIR' },
  { label: 'Mantenimiento', value: 'MAINTANCE' },
]

export const getWorkTypeOptions = (type?: string): IOptions[] => {
  switch (type) {
    case 'COMPUTER':
      return [
        { label: 'Instalación/Actualización de software', value: 'installation_software' },
        { label: 'Problemas de software', value: 'software_problems' },
        { label: 'Instalación de periféricos', value: 'installation_peripherals' }
      ]
      break;
    case 'MAINTANCE':
      return [
        { label: 'Mantenimiento preventivo', value: 'preventive_maintance' },
        { label: 'Backup y restauración de datos', value: 'repair_software' },
        { label: 'Revisión de seguridad en el equipo', value: 'security_review' }
      ]
      break;
    case 'REPAIR':
      return [
        { label: 'Reemplazo de componente', value: 'component_replacement' },
        { label: 'Diagnóstico y reparación', value: 'diagnosis_repair' },
        { label: 'Problemas de hardware', value: 'hardware_software_problems' },
      ]
      break;

    default:
      return [];
  }
};
