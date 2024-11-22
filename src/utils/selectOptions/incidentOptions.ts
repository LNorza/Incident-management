import { IOptions } from '../interface'

export const getIncidentStateOptions = (select?: string): IOptions[] => {
    if (select === 'ALL') {
        return [
            { label: 'Todos', value: 'ALL' },
            { label: 'Enviado', value: 'SENT' },
            { label: 'Asignado', value: 'ASSIGNED' },
            { label: 'En proceso', value: 'IN_PROCESS' },
            { label: 'Liberado', value: 'RELEASED' },
            { label: 'Rechazado', value: 'REJECTED' },
            {
                label: 'Finalizado',
                value: 'FINISHED',
            },
        ]
    } else {
        return [
            { label: 'Enviado', value: 'SENT' },
            { label: 'Asignado', value: 'ASSIGNED' },
            { label: 'En proceso', value: 'IN_PROCESS' },
            { label: 'Liberado', value: 'RELEASED' },
            { label: 'Rechazado', value: 'REJECTED' },
            { label: 'Finalizado', value: 'FINISHED' },
        ]
    }
}

export const getIncidentTypeOptions = (select?: string): IOptions[] => {
    if (select === 'ALL') {
        return [
            { label: 'Todos', value: 'ALL' },
            { label: 'Computo', value: 'COMPUTER' },
            { label: 'Reparación', value: 'REPAIR' },
            { label: 'Mantenimiento', value: 'MAINTANCE' },
        ]
    } else {
        return [
            { label: 'Computo', value: 'COMPUTER' },
            { label: 'Reparación', value: 'REPAIR' },
            { label: 'Mantenimiento', value: 'MAINTANCE' },
        ]
    }
}

// export const getIncidentStateOptions: IOptions[] = [
//   { label: 'Todos', value: 'ALL' },
//   { label: 'Enviado', value: 'SENT' },
//   { label: 'Asignado', value: 'ASSIGNED' },
//   { label: 'En proceso', value: 'IN_PROCESS' },
//   { label: 'Liberado', value: 'RELEASED' },
//   { label: 'Rechazado', value: 'REJECTED' },
//   { label: 'Finalizado', value: 'FINISHED' },
// ]

// export const getIncidentTypeOptions: IOptions[] = [
//   { label: 'Todos', value: 'ALL' },
//   { label: 'Computo', value: 'COMPUTER' },
//   { label: 'Reparación', value: 'REPAIR' },
//   { label: 'Mantenimiento', value: 'MAINTANCE' },
// ]

export const getIncidentPriorityOptions: IOptions[] = [
    { label: 'Alta', value: 'HIGH' },
    { label: 'Media', value: 'MEDIUM' },
    { label: 'Baja', value: 'LOW' },
]

export const getSpecialtyOptions: IOptions[] = [
    { label: 'Software', value: 'SOFTWARE' },
    { label: 'Hardware', value: 'HARDWARE' },
    { label: 'Desarrollo', value: 'DEVELOPMENT' },
    { label: 'Redes', value: 'NETWORK' },
]

export const getWorkTypeOptions = (type?: string): IOptions[] => {
    switch (type) {
        case 'COMPUTER':
            return [
                { label: 'Instalación/Actualización de software', value: 'installation_software' },
                { label: 'Problemas de software', value: 'software_problems' },
                { label: 'Instalación de periféricos', value: 'installation_peripherals' },
            ]

        case 'MAINTANCE':
            return [
                { label: 'Mantenimiento preventivo', value: 'preventive_maintance' },
                { label: 'Backup y restauración de datos', value: 'repair_software' },
                { label: 'Revisión de seguridad en el equipo', value: 'security_review' },
            ]

        case 'REPAIR':
            return [
                { label: 'Reemplazo de componente', value: 'component_replacement' },
                { label: 'Diagnóstico y reparación', value: 'diagnosis_repair' },
                { label: 'Problemas de hardware', value: 'hardware_software_problems' },
            ]

        default:
            return []
    }
}

export const getArriveHourOptions = (): IOptions[] => {
    return [
        { label: '7:00 AM', value: '7' },
        { label: '8:00 AM', value: '8' },
        { label: '9:00 AM', value: '9' },
        { label: '10:00 AM', value: '10' },
        { label: '11:00 AM', value: '11' },
        { label: '12:00 PM', value: '12' },
        { label: '1:00 PM', value: '13' },
        { label: '2:00 PM', value: '14' },
        { label: '3:00 PM', value: '15' },
        { label: '4:00 PM', value: '16' },
        { label: '5:00 PM', value: '17' },
    ]
}

export const getTimeDurationOptions = () => {
    return [
        { label: '15 min', value: '0.25' },
        { label: '30 min', value: '0.5' },
        { label: '1 hr', value: '1' },
        { label: '2 hr', value: '2' },
        { label: '3 hr', value: '3' },
        { label: '4 hr', value: '4' },
        { label: '5 hr o más', value: '5' },
    ]
}
