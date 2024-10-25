export type IncidentState =
  | 'IN_PROGRESS'
  | 'SENT'
  | 'FINISHED'
  | 'ASSIGNED'
  | 'RELEASED'
  | 'REJECTED'

export type IncidentModalType = 'AddIncident' | 'EditIncident' | 'DeleteIncident'