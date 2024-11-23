export type IncidentState = 'IN_PROCESS' | 'SENT' | 'FINISHED' | 'ASSIGNED' | 'RELEASED' | 'REJECTED'

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

export type IncidentModalType =
    | 'AddIncident'
    | 'ChangeModal'
    | 'EditIncident'
    | 'AssignedIncident'
    | 'DeleteIncident'
    | 'InfoIncident'
    | 'FinishedIncident'
