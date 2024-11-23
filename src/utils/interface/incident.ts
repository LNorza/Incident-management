import { IncidentState } from '../enum'
import { Device } from './device'

export interface IFormIncident {
    folio: string
    technician?: string
    building: string
    location: string
    device: string
    incident_type: string
    worktype: string
    date?: Date
    priority?: string
    arrived_date?: string
    time_duration?: string
    description: string
    comments?: string
}

export interface IIncident {
    _id: string
    folio: string
    created_at: Date
    device_id: string
    incident_type: string
    description: string
    status: IncidentState
    technician_id: string
}

export interface Incident {
    date: string
    location_id: string
    department_name?: string
    description: string
    device_id: Device
    folio: string
    incident_type: string
    period: number
    status: string
    updated_at: string
    created_at?: string
    technician_id: string
    priority: string
    arrival_time?: string
    time_duration?: string
    comments?: string
    work: string
    technician_specialty: string
    diagnostic: string
    _id: string
}

export interface FormIncident {
    folio: string
    buildName: string
    deviceName: string
    locationName: string
    departmentName: string
    created_at: string
    incident_type: string
    work: string
    description: string
    comments: string
    diagnostic: string
}

export interface FinishIncident {
    folio: string
    deviceName: string
    technicianName: string
    priority: string
    start_date: string
    arrival_time: string
    time_duration: string
    description: string
    diagnostic: string
    comments: string
    initial_time: string
    end_time: string
    qualification: number
    work: string
}

export interface InfoIncident {
    folio: string
    buildName: string
    deviceName: string
    status: string
    specialty: string
    locationName: string
    departmentName: string
    created_at: string
    incident_type: string
    technicianName: string
    priority: string
    work: string
    start_date: string
    arrival_time: string
    time_duration: string
    description: string
    diagnostic: string
    comments: string
    initial_time: string
    end_time: string
    qualification: number
}

export interface ICreateIncident {
    folio: string
    device_id: string
    date: Date
    status?: string
    incident_type: string
    work: string
    period: number
    description: string
    department_id: string
}

export interface UpdateIncidentDto {
    start_date?: Date
    end_date?: Date
    time_duration?: string
    arrival_time?: string
    status?: string
    incident_type?: string
    work?: string
    description?: string
    priority?: string
    rejected_reason?: string
    qualification?: number
    technician_specialty?: string
    diagnostic?: string
    comments?: string
    technician_id?: string
}

export class SearchIncidentDto {
    folio?: number
    device_id?: string
    date?: Date
    status?: string
    incident_type?: string
    work?: string
    priority?: string
    department_id?: string
    technician_id?: string
    period?: number
}
