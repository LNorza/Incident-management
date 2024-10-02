export type DeviceState = 'Activo' | 'En reparación' | 'Inactivo'

export interface Device {
    _id: string
    name: string
    type: string
    brand: string
    specs: []
}
