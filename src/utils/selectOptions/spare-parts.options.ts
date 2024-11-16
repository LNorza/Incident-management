import { IOptions } from '../interface'

export const laptopSparePartTypeOptions: IOptions[] = [
    { label: 'Memoria RAM', value: 'ram' },
    { label: 'Disco duro', value: 'storage' },
    { label: 'Procesador', value: 'cpu' },
    { label: 'Tarjeta de video', value: 'gpu' },
    { label: 'Otro', value: 'other' },
]

export const pcSparePartTypeOptions: IOptions[] = [
    { label: 'Memoria RAM', value: 'ram' },
    { label: 'Disco duro', value: 'storage' },
    { label: 'Procesador', value: 'cpu' },
    { label: 'Tarjeta de video', value: 'gpu' },
    { label: 'Tarjeta madre', value: 'motherboard' },
    { label: 'Fuente de poder', value: 'powerSupply' },
    { label: 'Otro', value: 'other' },
]

export const getSparePartOptions = (device: string): IOptions[] => {
    switch (device) {
        case 'LAPTOP':
            return laptopSparePartTypeOptions
        case 'PC':
            return pcSparePartTypeOptions
        default:
            return []
    }
}

export const getSpareUnitsOptions: IOptions[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
]
