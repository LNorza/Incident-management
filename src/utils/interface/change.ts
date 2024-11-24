import { Incident } from './incident'

export interface ICreateChange {
    piece_to_change?: string
    spare_part?: string
    device_type?: string
    make_request: boolean
    name?: string
    price?: string
    piece_type?: string
    description?: string
    incident: string
}

export interface IUpdateChange {
    piece_to_change?: string
    spare_part?: string
    name?: string
    price?: string
    piece_type?: string
    description?: string
    status?: string
    approval_date?: Date
}

export interface IChange {
    approval_date: string
    created_at: string
    description: string
    device_type: string
    incident: Incident
    falsename: string
    piece_to_change: string
    price: string
    spare_part: string
    status: string
    updatedAt: string
    _id: string
}

export interface InfoChangeRequest {
    folio: string
    created_at: string
    technician_name: string
    technician_id: string
    device_name: string
    spare_part: string
    piece_to_change: string
    price: string
    description: string
    approval_date: string
    status: string
}
