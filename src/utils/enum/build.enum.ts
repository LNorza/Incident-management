export type BuildModalType =
    | 'AddBuild'
    | 'AddOfficeClass'
    | 'EditBuild'
    | 'EditOfficeClass'
    | 'DeleteBuild'
    | 'DeleteOfficeClass'
export interface BuildingProps {
    _id: string
    name: string
    description: string
    isShared?: boolean
    department_id?: string
}

export interface OfficeProps {
    _id: string
    name: string
    description: string
    building_id: string
    type: string
}
