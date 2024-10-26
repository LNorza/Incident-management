import { IncidentState } from "../enum";
import { Device } from "./device";

export interface IFormIncident {
  folio: string;
  building: string;
  location: string;
  device: string;
  incident_type: string;
  worktype: string;
  description: string;
}

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
  date: string
  location_id: string
  description: string
  device_id: Device
  folio: string
  incident_type: string
  period: number
  status: string
  updated_at: string
  work: string
  _id: string
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