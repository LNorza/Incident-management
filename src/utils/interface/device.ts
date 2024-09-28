import { DeviceState } from "../enum/device.enum";

export interface IDevice {
  name: string;
  type: string;
  brand: string;
  user: string;
  location: string;
  status: DeviceState;
}
