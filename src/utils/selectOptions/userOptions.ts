import { IOptions } from '../interface'

export const getUserPositionOptions: IOptions[] = [
    { label: 'Jefe de laboratorio', value: 'LAB_CHIEF' },
    { label: 'Docente', value: 'TEACHER' },
]

export const getUserPositionTechniciansOptions: IOptions[] = [
    { label: 'Técnico', value: 'TECHNICIAN' },
    { label: 'Técnico de sistemas', value: 'TECHNICIAN_SYSTEMS' },
    { label: 'Técnico de redes', value: 'TECHNICIAN_NETWORKS' },
    { label: 'Técnico de software', value: 'TECHNICIAN_SOFTWARE' },
    { label: 'Técnico de hardware', value: 'TECHNICIAN_HARDWARE' },
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
