import { IOptions } from '../interface'

export const getUserPositionOptions: IOptions[] = [
    { label: 'Jefe de laboratorio', value: 'LAB_CHIEF' },
    { label: 'Docente', value: 'TEACHER' },
]

export const formatUserPositions = (position: string) => {
    if (position === 'HEAD_SYSTEMS_DEPARTMENT') return 'Jefe de departamento de sistemas'
    if (position === 'LAB_CHIEF') return 'Jefe de laboratorio'
    if (position === 'TEACHER') return 'Docente'
    return 'Desconocido'
}

export const formatUserRoles = (role: string) => {
    if (role === 'ADMIN_DEPARTMENT') return 'Jefe de departamento'
    if (role === 'ADMIN_LAB') return 'Jefe de laboratorio'
    if (role === 'ONLY_READ') return 'Solo lectura'
    return 'Desconocido'
}
