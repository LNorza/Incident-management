export type IncidentState =
  | 'En proceso'
  | 'Enviado'
  | 'Terminado'
  | 'Asignado'
  | 'Liberado'
  | 'Rechazado'

export type IncidentModalType = 'AddIncident' | 'EditIncident' | 'DeleteIncident'