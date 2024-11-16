export interface ISparePartsModal {
    name: string
    type: string
    device_type: string
    description: string
    quantity: string
    price: string
}

export interface ISpareParts {
    _id: string
    name: string
    type: string
    device_type: string
    description: string
    quantity: number
    price: number
}

export interface ICreateSpareParts {
    name: string
    type: string
    device_type: string
    description: string
    quantity: number
    price: number
}

export interface IUpdateSpareParts {
    name?: string
    type?: string
    device_type?: string
    description?: string
    quantity?: number
    price?: number
}
