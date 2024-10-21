import { IncidentState } from "../enum";

export interface IIncident {
  folio: string,
  date: string,
  device: string,
  incident_type: string,
  description: string,
  status: IncidentState,
}

export interface ICreateIncident {
  folio: string;
  device_id: string;
  date: Date;
  status?: string;
  incident_type: string;
  work: string;
  period: number;
  description: string;
  department_id: string;
}