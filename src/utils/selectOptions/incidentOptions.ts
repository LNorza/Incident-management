import { IOptions } from "../interface";

export const getIncidentTypeOptions: IOptions[] = [
  { label: 'Computo', value: 'COMPUTER' },
  { label: 'Reparación', value: 'REPAIR' },
  { label: 'Mantenimiento', value: 'MAINTANCE' },
]

export const getIncidentPriorityOptions: IOptions[] = [
  { label: 'Alta', value: 'HIGH' },
  { label: 'Media', value: 'MEDIUM' },
  { label: 'Baja', value: 'LOW' },
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

export const getArriveHourOptions = (): IOptions[] => {
  return [
    { label: '7:00 AM', value: '7' },
    { label: '8:00 AM', value: '8' },
    { label: '9:00 AM', value: '9' },
    { label: '10:00 AM', value: '10' },
    { label: '11:00 AM', value: '11' },
    { label: '12:00 PM', value: '12' },
    { label: '1:00 PM', value: '13' },
    { label: '2:00 PM', value: '14' },
    { label: '3:00 PM', value: '15' },
    { label: '4:00 PM', value: '16' },
    { label: '5:00 PM', value: '17' },
  ]
}

export const getTimeDurationOptions = () => {
  return [
    { label: '1 hr', value: '1' },
    { label: '2 hr', value: '2' },
    { label: '3 hr', value: '3' },
    { label: '4 hr', value: '4' },
    { label: '4 hr o más', value: '5' },
  ]
}

