import { DeviceState } from "../enum";

export interface IDevice {
  name: string;
  type: string;
  brand: string;
  user: string;
  location: string;
  status: DeviceState;
}

export interface Device {
  _id?: string
  name: string
  type: string
  status: string
  specs: IComputerSpecs | ILaptop | IPrinter | ISwitch | IRouter | INoBreak | IVoltageRegulator | IProjector
  purchaseDate: string
  warrantyYears: number
  deviceModel: string
  brand: string
  location_id: {
    _id: string
    name: string
    building_id: string
  }
}

export interface IDeviceInfo {
  name: string;
  type: string;
  brand: string;
  deviceModel: string;
  os?: string;
  motherBoard?: string;
  cpu?: string;
  gpu?: string;
  ram?: string;
  ramType?: string;
  storage?: string;
  warrantyYears?: string;
  powerSupply?: string;
  ipAddress?: string;
  macAddress?: string;
  connectedPort?: string;
  purchaseDate?: string;
  printerType?: string;
  tonerType?: string;
  printerInk?: string;
  scanner?: boolean;
  wifiConnection?: boolean;
  ports?: number;
}

export interface IComputerSpecs {
  os?: string
  motherBoard?: string
  cpu?: string
  gpu?: string
  ram?: string
  ramType?: string
  storage?: string
  powerSupply?: string
  ipAddress?: string
  macAddress?: string
  connectedPort?: string
  isShared?: boolean
  user_id?: string
}

export interface ILaptop {
  os?: string
  storage?: string
  cpu?: string
  gpu?: string
  ram?: string
  ramType?: string
  wifiConnection?: boolean
  ipAddress?: string
  macAddress?: string
  connectedPort?: string
  user_id?: string
}

export interface IPrinter {
  printerType?: string
  tonerType?: string
  printerInk?: string
  scanner?: boolean
  wifiConnection?: boolean
  ipAddress?: string
  macAddress?: string
}

export interface ISwitch {
  ports?: number
  macAddress?: string
}

export interface IRouter {
  routerType?: string
  ipAddress?: string
  macAddress?: string
  ports?: number
  connectivity?: string
  capacity?: string
}

export interface INoBreak {
  powerCapacity?: string
  ports?: number
  backupTime?: string
}

export interface IVoltageRegulator {
  powerCapacity?: string
  ports?: number
}

export interface IProjector {
  resolution?: string
  connectivity?: string
  brightness?: string
  scope?: string
  control?: boolean
}

