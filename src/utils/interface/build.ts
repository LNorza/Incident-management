export interface BuildingProps {
    _id: string
    name: string
    description: string
    isShared?: boolean
    departments: [
        {
            department_id?: string
            build_manager?: {
                _id: string
                name: string
            }
        },
    ]
    totalDevices: number
}

export interface OfficeProps {
    _id: string
    name: string
    description: string
    building_id: string
    type: string
    department_id: string
    location_manager: {
        _id: string
        name: string
    }
    totalDevices: number
}
