const incidentTypeTranslations: { [key: string]: string } = {
  'COMPUTER': 'Computo',
  'REPAIR': 'Reparación',
  'MAINTANCE': 'Mantenimiento'
};

const workTypetranslations: { [key: string]: string } = {
  'installation_software': 'Instalación/Actualización de software',
  'software_problems': 'Problemas de software',
  'installation_peripherals': 'Instalación de periféricos',
  'preventive_maintance': 'Mantenimiento preventivo',
  'repair_software': 'Backup y restauración de datos',
  'security_review': 'Revisión de seguridad en el equipo',
  'component_replacement': 'Reemplazo de componente',
  'diagnosis_repair': 'Diagnóstico y reparación',
  'hardware_software_problems': 'Problemas de hardware',
};

const priorityTranslations: { [key: string]: string } = {
  'LOW': 'Baja',
  'MEDIUM': 'Media',
  'HIGH': 'Alta',
};

const StatusTranslations: { [key: string]: string } = {
  'IN_PROGRESS': 'En proceso',
  'SENT': 'Enviada',
  'FINISHED': 'Finalizada',
  'ASSIGNED': 'Asignada',
  'RELEASED': 'Liberada',
  'REJECTED': 'Rechazada',

};

// Función que recibe texto y retorna la traducción
export const translateIncident = (text: string, type?: string): string => {
  switch (type) {
    case 'work':
      return workTypetranslations[text] || text;
    case 'status':
      return StatusTranslations[text] || text;
    case 'incident':
      return incidentTypeTranslations[text] || text;
    case 'priority':
      return priorityTranslations[text] || text;
    default:
      return 'No hay traducción';
  }
};