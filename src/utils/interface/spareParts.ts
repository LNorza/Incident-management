export interface ISpareParts {
  name: string;
  type: string;
  device_type: string;
  description: string;
  quantity: number;
  price: number;
}

export interface ICreateSpareParts {
  name: string;
  type: string;
  device_type: string;
  description: string;
  quantity: number;
  price: number;
}

export interface IUpdateSpareParts {
  name?: string;
  type?: string;
  device_type?: string;
  description?: string;
  quantity?: number;
  price?: number;
}