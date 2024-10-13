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
  getStatusTranslation,
} from '../../utils'
import { dateFormatter } from '../../utils/formatter/date.formatter'

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
  'Direccion MAC',
  'Fecha de Compra',
  'Garantia',
  'Estatus',
]

export const HeadersRouter = [
  'Nombre del equipo',
  'Tipo',
  'Marca',
  'Modelo',
  'Tipo de router',
  'Direccion IP',
  'Direccion MAC',
  'Cantidad de puertos',
  'Conectividad',
  'Capacidad',
  'Fecha de Compra',
  'Garantia',
  'Estatus',
]

export const HeadersNoBreak = [
  'Nombre del equipo',
  'Tipo',
  'Marca',
  'Modelo',
  'Potencia',
  'Cantidad de enchufes',
  'Tiempo de respaldo',
  'Fecha de Compra',
  'Garantia',
  'Estatus',
]

export const HeadersVoltageRegulator = [
  'Nombre del equipo',
  'Tipo',
  'Marca',
  'Modelo',
  'Potencia',
  'Cantidad de enchufes',
  'Fecha de Compra',
  'Garantia',
  'Estatus',
]

export const HeadersProjector = [
  'Nombre del equipo',
  'Tipo',
  'Marca',
  'Modelo',
  'Resolución',
  'Conectividad',
  'Brillo',
  'Alcance',
  'Control Remoto',
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
    case 'NO-BREAK':
      return HeadersNoBreak
    case 'VOLTAGE-REGULATOR':
      return HeadersVoltageRegulator
    case 'PROJECTOR':
      return HeadersProjector
    default:
      return 'Tipo de dispositivo no soportado'
  }
}

export const createArrayDevices = (device: Device): string[] | null => {
  let deviceInfo = [device.name ?? '', device.type ?? '', device.brand ?? '', device.deviceModel ?? '']
  const deviceStatus = getStatusTranslation('status', device.status ?? '')
  const deviceDate = dateFormatter(new Date(device.purchaseDate))

  const warrantyValue = (): string => {
    const aux = new Date();
    const currentDate = aux; // Se compara directamente como objetos Date

    // Compara directamente las fechas
    return new Date(device.purchaseDate) >= currentDate ? 'Vigente' : 'Expirada';
  };

  const deviceBoolean = (value: boolean | undefined): string => {
    return value ? 'Si' : 'No'
  }

  const deviceWarranty = warrantyValue();
  if (!device) return null

  switch (device.type) {
    case 'PC':
      const pcSpecs = device.specs as IComputerSpecs
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
        deviceDate,
        deviceWarranty,
        deviceStatus,
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
        deviceDate,
        deviceWarranty,
        deviceStatus,
      ]

    case 'PRINTER':
      const printerSpecs = device.specs as IPrinter
      return [
        ...deviceInfo,
        printerSpecs.printerType ?? '',
        printerSpecs.tonerType ?? '',
        printerSpecs.printerInk ?? '',
        deviceBoolean(printerSpecs.scanner),
        deviceBoolean(printerSpecs.wifiConnection),
        printerSpecs.ipAddress ?? '',
        printerSpecs.macAddress ?? '',
        deviceDate,
        deviceWarranty,
        deviceStatus,
      ]

    case 'SWITCH':
      const switchSpecs = device.specs as ISwitch
      return [
        ...deviceInfo,
        switchSpecs.ports?.toString() ?? '',
        switchSpecs.macAddress ?? '',
        deviceDate,
        deviceWarranty,
        deviceStatus,
      ]

    case 'ROUTER':
      const routerSpecs = device.specs as IRouter
      return [
        ...deviceInfo,
        routerSpecs.routerType ?? '',
        routerSpecs.ipAddress ?? '',
        routerSpecs.macAddress ?? '',
        routerSpecs.ports?.toString() ?? '',
        routerSpecs.connectivity ?? '',
        routerSpecs.capacity ?? '',
        deviceDate,
        deviceWarranty,
        deviceStatus,
      ]

    case 'NO-BREAK':
      const noBreakSpecs = device.specs as INoBreak
      return [
        ...deviceInfo,
        noBreakSpecs.powerCapacity ?? '',
        noBreakSpecs.ports?.toString() ?? '',
        noBreakSpecs.backupTime ?? '',
        deviceDate,
        deviceWarranty,
        deviceStatus,
      ]

    case 'PROJECTOR':
      const projectorSpecs = device.specs as IProjector
      return [
        ...deviceInfo,
        projectorSpecs.resolution ?? '',
        projectorSpecs.connectivity ?? '',
        projectorSpecs.brightness ?? '',
        projectorSpecs.scope ?? '',
        deviceBoolean(projectorSpecs.control),
        deviceDate,
        deviceWarranty,
        deviceStatus,
      ]

    case 'VOLTAGE-REGULATOR':
      const voltageRegulatorSpecs = device.specs as IVoltageRegulator
      return [
        ...deviceInfo,
        voltageRegulatorSpecs.powerCapacity ?? '',
        voltageRegulatorSpecs.ports?.toString() ?? '',
        deviceDate,
        deviceWarranty,
        deviceStatus,
      ]

    // Agrega otros casos para otros tipos de dispositivos

    default:
      toast.error('Tipo de dispositivo no soportado: ' + device.type)
      return null
  }
}
