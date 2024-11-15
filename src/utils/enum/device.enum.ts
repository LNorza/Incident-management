export type DeviceState = 'Activo' | 'En reparación' | 'Inactivo'
export type DeviceModalType = 'AddDevice' | 'EditDevice' | 'DeleteDevice'

export type DeviceType = 'COMPUTER' | 'LAPTOP' | 'PRINTER' | 'SWITCH' | 'ROUTER' | 'NO_BREAK' | 'VOLTAGE_REGULATOR' | 'PROJECTOR'
export enum DeviceStatus {
  ACTIVE = 'Activo',
  UnderRepair = 'En reparación',
  INACTIVE = 'Inactivo',
}

export function getStatusTranslation(type: string, data: string): string {
  if (type === 'status') {
    return DeviceStatus[data as keyof typeof DeviceStatus] || 'No definido';
  }
  return 'Tipo no soportado';
}


