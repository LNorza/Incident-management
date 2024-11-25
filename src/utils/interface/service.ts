export interface IServices {
    _id: string
    service: string
    type: string
    device_type: string
    description: string
    duration: number
}

export interface IServicesModal {
    service: string
    description: string
}
