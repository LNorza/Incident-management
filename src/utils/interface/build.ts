export interface BuildingProps {
    _id: string
    name: string
    description: string
    isShared?: boolean
    department_id?: string
    totalDevices: number
}

export interface OfficeProps {
    _id: string
    name: string
    description: string
    building_id: string
    type: string
    department_id: string
    totalDevices: number
}
