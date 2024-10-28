export type IncidentState =
  | 'IN_PROGRESS'
  | 'SENT'
  | 'FINISHED'
  | 'ASSIGNED'
  | 'RELEASED'
  | 'REJECTED'

export type IncidentType = 'COMPUTER' | 'REPAIR' | 'MAINTANCE'

export type WorkType =
  | 'Software Installation/Update'
  | 'Software Issues'
  | 'Peripheral Installation'
  | 'Preventive Maintenance'
  | 'Data Backup & Restore'
  | 'Security Check'
  | 'Component Replacement'
  | 'Diagnosis & Repair'
  | 'Hardware Issues'

export type IncidentModalType = 'AddIncident' | 'EditIncident' | 'DeleteIncident' | 'InfoIncident' | 'FinishedIncident'
