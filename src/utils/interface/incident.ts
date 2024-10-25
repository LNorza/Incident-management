import { IncidentState } from "../enum";

export interface IIncident {
  _id: string,
  folio: string,
  date: string,
  device_id: string,
  incident_type: string,
  description: string,
  status: IncidentState,
}

export interface Incident {
  folio: string,
  date: Date,
  device_id: string,
  incident_type: string,
  description: string,
  status: IncidentState,
  department_id: string,
  location_id: string,
  period: number,
  work: string,
  technician_id: string,
  start_date: Date,
  end_date: Date,
  time_duration: string,
  priority: string,
  rejected_reason: string,
  qualification: number,
  comments: string,
  created_at: Date,
  updated_at: Date,
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

export interface UpdateIncidentDto {
  start_date?: Date;
  end_date?: Date;
  time_duration?: string;
  status?: string;
  incident_type?: string;
  work?: string;
  description?: string;
  priority?: string;
  rejected_reason?: string;
  qualification?: number;
  comments?: string;
  technician_id?: string;
}

export class SearchIncidentDto {
  folio?: number;
  device_id?: string;
  date?: Date;
  status?: string;
  incident_type?: string;
  work?: string;
  priority?: string;
  department_id?: string;
  technician_id?: string;
  period?: number;
}