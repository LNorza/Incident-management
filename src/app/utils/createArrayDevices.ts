import { toast } from 'sonner'
import {
    Device,
    IComputerSpecs,
    ILaptop,
    IPrinter,
    IRouter,
    ISwitch,
    IProjector,
    INoBreak,
    IVoltageRegulator,
    IDeviceInfo,
} from '../../utils'

export const HeadersPC = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Sistema Operativo',
    'Tarjeta Madre',
    'Procesador',
    'Tarjeta Grafica',
    'RAM',
    'Tipo de RAM',
    'Disco Duro',
    'Fuente de Poder',
    'Direccion IP',
    'Direccion MAC',
    'Puerto al que esta Conectado',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const HeadersLaptop = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Sistema Operativo',
    'Procesador',
    'Tarjeta Grafica',
    'RAM',
    'Tipo de RAM',
    'Disco Duro',
    'Direccion IP',
    'Direccion MAC',
    'Puerto al que esta Conectado',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const HeadersPrinter = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Tipo de Impresora',
    'Tipo de Toner',
    'Tinta',
    'Escanner',
    'Conexion Wifi',
    'Direccion IP',
    'Direccion MAC',
    'Puerto al que esta Conectado',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const HeadersSwitch = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Numero de Puertos',
    'Direccion IP',
    'Direccion MAC',
    'Puerto al que esta Conectado',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const HeadersRouter = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Numero de Puertos',
    'Conectividad',
    'Capacidad',
    'Direccion IP',
    'Direccion MAC',
    'Puerto al que esta Conectado',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const HeadersNoBreak = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Capacidad',
    'Numero de puertos',
    'Tiempo de Carga',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const HeadersVoltageRegulator = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Capacidad',
    'Numero de puertos',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const HeadersProjector = [
    'Nombre del equipo',
    'Tipo',
    'Marca',
    'Modelo',
    'Luminosidad',
    'Resolucion',
    'Conectividad',
    'Control Remoto',
    'Alcance',
    'Fecha de Compra',
    'Garantia',
    'Estatus',
]

export const headerDevices = (type: string) => {
    switch (type) {
        case 'PC':
            return HeadersPC
        case 'LAPTOP':
            return HeadersLaptop
        case 'PRINTER':
            return HeadersPrinter
        case 'SWITCH':
            return HeadersSwitch
        case 'ROUTER':
            return HeadersRouter
        case 'NOBREAK':
            return HeadersNoBreak
        case 'VOLTAGEREGULATOR':
            return HeadersVoltageRegulator
        case 'PROJECTOR':
            return HeadersProjector
        default:
            return 'Tipo de dispositivo no soportado'
    }
}

// const routerSpecs = device.specs as IRouter
// const projectorSpecs = device.specs as IProjector
// const noBreakSpecs = device.specs as INoBreak
// const voltageRegulatorSpecs = device.specs as IVoltageRegulator

export const createArrayDevices = (device: Device): string[] | null => {
    console.log('device', device)
    if (!device) return null

    // Datos generales del dispositivo, con valores por defecto si están indefinidos
    let deviceInfo = [device.name ?? '', device.type ?? '', device.brand ?? '', device.deviceModel ?? '']

    switch (device.type) {
        case 'PC':
            const pcSpecs = device.specs as IComputerSpecs
            console.log('pcSpecs', pcSpecs)
            console.log('Mother', pcSpecs.motherboard)

            return [
                ...deviceInfo,
                pcSpecs.os ?? '',
                pcSpecs.motherboard ?? '',
                pcSpecs.cpu ?? '',
                pcSpecs.gpu ?? '',
                pcSpecs.ram ?? '',
                pcSpecs.ramType ?? '',
                pcSpecs.storage ?? '',
                pcSpecs.powerSupply ?? '',
                pcSpecs.ipAddress ?? '',
                pcSpecs.macAddress ?? '',
                pcSpecs.connectedPort ?? '',
                new Date(device.purchaseDate).toLocaleDateString() ?? '',
                `${device.warrantyYears ?? 0} año(s)`,
            ]

        case 'LAPTOP':
            const laptopSpecs = device.specs as ILaptop
            return [
                ...deviceInfo,
                laptopSpecs.os ?? '',
                laptopSpecs.cpu ?? '',
                laptopSpecs.gpu ?? '',
                laptopSpecs.ram ?? '',
                laptopSpecs.ramType ?? '',
                laptopSpecs.storage ?? '',
                laptopSpecs.ipAddress ?? '',
                laptopSpecs.macAddress ?? '',
                laptopSpecs.connectedPort ?? '',
                new Date(device.purchaseDate).toLocaleDateString() ?? '',
                `${device.warrantyYears ?? 0} año(s)`,
            ]

        case 'PRINTER':
            const printerSpecs = device.specs as IPrinter
            return [
                ...deviceInfo,
                printerSpecs.printerType ?? '',
                printerSpecs.tonerType ?? '',
                printerSpecs.printerInk ?? '',
                String(printerSpecs.scanner) ?? '', // Convertir a string
                String(printerSpecs.wifiConnection) ?? '', // Convertir a string
                printerSpecs.ipAddress ?? '',
                printerSpecs.macAddress ?? '',
                new Date(device.purchaseDate).toLocaleDateString() ?? '',
                `${device.warrantyYears ?? 0} año(s)`,
            ]

        case 'SWITCH':
            const switchSpecs = device.specs as ISwitch
            return [
                ...deviceInfo,
                switchSpecs.ports?.toString() ?? '',
                switchSpecs.macAddress ?? '',
                new Date(device.purchaseDate).toLocaleDateString() ?? '',
                `${device.warrantyYears ?? 0} año(s)`,
            ]

        // Agrega otros casos para otros tipos de dispositivos

        default:
            toast.error('Tipo de dispositivo no soportado: ' + device.type)
            return null
    }
}
