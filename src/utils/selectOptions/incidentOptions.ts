import { IOptions } from '../interface'

export const getIncidentStateOptions = (select?: string): IOptions[] => {
    if (select === 'ALL') {
        return [
            { label: 'Todos', value: 'ALL' },
            { label: 'Enviada', value: 'SENT' },
            { label: 'Asignada', value: 'ASSIGNED' },
            { label: 'En proceso', value: 'IN_PROCESS' },
            { label: 'Liberada', value: 'RELEASED' },
            { label: 'Rechazada', value: 'REJECTED' },
            {
                label: 'Finalizada',
                value: 'FINISHED',
            },
        ]
    } else {
        return [
            { label: 'Enviada', value: 'SENT' },
            { label: 'Asignada', value: 'ASSIGNED' },
            { label: 'En proceso', value: 'IN_PROCESS' },
            { label: 'Liberada', value: 'RELEASED' },
            { label: 'Rechazada', value: 'REJECTED' },
            { label: 'Finalizada', value: 'FINISHED' },
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
        { label: '7:15 AM', value: '7.25' },
        { label: '7:30 AM', value: '7.5' },
        { label: '7:45 AM', value: '7.75' },
        { label: '8:00 AM', value: '8' },
        { label: '8:15 AM', value: '8.25' },
        { label: '8:30 AM', value: '8.5' },
        { label: '8:45 AM', value: '8.75' },
        { label: '9:00 AM', value: '9' },
        { label: '9:15 AM', value: '9.25' },
        { label: '9:30 AM', value: '9.5' },
        { label: '9:45 AM', value: '9.75' },
        { label: '10:00 AM', value: '10' },
        { label: '10:15 AM', value: '10.25' },
        { label: '10:30 AM', value: '10.5' },
        { label: '10:45 AM', value: '10.75' },
        { label: '11:00 AM', value: '11' },
        { label: '11:15 AM', value: '11.25' },
        { label: '11:30 AM', value: '11.5' },
        { label: '11:45 AM', value: '11.75' },
        { label: '12:00 PM', value: '12' },
        { label: '12:15 PM', value: '12.25' },
        { label: '12:30 PM', value: '12.5' },
        { label: '12:45 PM', value: '12.75' },
        { label: '1:00 PM', value: '13' },
        { label: '1:15 PM', value: '13.25' },
        { label: '1:30 PM', value: '13.5' },
        { label: '1:45 PM', value: '13.75' },
        { label: '2:00 PM', value: '14' },
        { label: '2:15 PM', value: '14.25' },
        { label: '2:30 PM', value: '14.5' },
        { label: '2:45 PM', value: '14.75' },
        { label: '3:00 PM', value: '15' },
        { label: '3:15 PM', value: '15.25' },
        { label: '3:30 PM', value: '15.5' },
        { label: '3:45 PM', value: '15.75' },
        { label: '4:00 PM', value: '16' },
        { label: '4:15 PM', value: '16.25' },
        { label: '4:30 PM', value: '16.5' },
        { label: '4:45 PM', value: '16.75' },
        { label: '5:00 PM', value: '17' },
    ]
}

export const getTimeDurationOptions = () => {
    return [
        { label: '15 min', value: '0.25' },
        { label: '30 min', value: '0.5' },
        { label: '45 min', value: '0.75' },
        { label: '1 hr', value: '1' },
        { label: '1 hr 30 min', value: '1.5' },
        { label: '2 hr', value: '2' },
        { label: '3 hr', value: '3' },
        { label: '4 hr', value: '4' },
        { label: '5 hr o más', value: '5' },
    ]
}

export const translateTimeDuration = (duration: string) => {
    switch (duration) {
        case '0.25':
            return '15 min'
        case '0.5':
            return '30 min'
        case '0.75':
            return '45 min'
        case '1':
            return '1 hr'
        case '1.5':
            return '1 hr 30 min'
        case '2':
            return '2 hr'
        case '3':
            return '3 hr'
        case '4':
            return '4 hr'
        case '5':
            return '5 hr o más'
        default:
            return ''
    }
}
