export const deviceFormatOptions = (deviceTypes: string) => {
    switch (deviceTypes) {
        case 'PC':
            return 'Escritorio'
        case 'LAPTOP':
            return 'Laptop'
        case 'PRINTER':
            return 'Impresora'
        case 'SWITCH':
            return 'Switch'
        case 'ROUTER':
            return 'Router'
        case 'PROJECTOR':
            return 'Proyector'
        case 'VOLTAGE-REGULATOR':
            return 'Regulador'
        case 'NO-BREAK':
            return 'No-break'
        default:
            return 'No definido'
    }
}

export const sparePartsFormatOptions = (sparePartsTypes: string) => {
    switch (sparePartsTypes) {
        case 'ram':
            return 'RAM'
        case 'motherboard':
            return 'Tarjeta madre'
        case 'cpu':
            return 'Procesador'
        case 'gpu':
            return 'Tarjeta de video'
        case 'storage':
            return 'Disco duro'
        case 'powerSupply':
            return 'Fuente de poder'
        case 'OTHER':
            return 'Otro'
        default:
            return 'No definido'
    }
}

export const getSparePartType = (type: string): string => {
    switch (type) {
        case 'RAM':
            return 'ram'
        case 'storage':
            return 'Disco duro'
        case 'cpu':
            return 'Procesador'
        case 'gpu':
            return 'Tarjeta de video'
        case 'motherboard':
            return 'Tarjeta madre'
        case 'powerSupply':
            return 'Fuente de poder'
        case 'other':
            return 'Otro'
        default:
            return ''
    }
}

export const formatSparePartType = (type: string): string => {
    switch (type) {
        case 'RAM':
            return 'ram'
        case 'Disco duro':
            return 'storage'
        case 'Procesador':
            return 'cpu'
        case 'Tarjeta de video':
            return 'gpu'
        case 'Tarjeta madre':
            return 'motherboard'
        case 'Fuente de poder':
            return 'powerSupply'
        case 'Otro':
            return 'other'
        default:
            return ''
    }
}

export const formatDeviceType = (device: string): string => {
    switch (device) {
        case 'Laptop':
            return 'LAPTOP'
        case 'Escritorio':
            return 'PC'
        default:
            return ''
    }
}
