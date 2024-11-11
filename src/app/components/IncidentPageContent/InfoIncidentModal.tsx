import { useCallback, useEffect, useRef, useState } from 'react'
import { CustomInput, CustomTextArea } from '../../../ui'
import {
    API_BASE_URL,
    getArriveHourOptions,
    getTimeDurationOptions,
    getUserDepartment,
    getUserRole,
    Incident,
    IncidentState,
} from '../../../utils'
import { InfoIcon } from 'lucide-react'
import style from '../../style/modal.module.css'
import { useForm } from '../../../hooks'
import { translateIncident } from '../../../utils/formatter/incident.formatter'

interface Props {
    onClose: () => void
    incidentId?: string
    status?: IncidentState
}

const rol = 'TECHNICIAN'
const technicianDepartmentId = '67206b309acf1976ca32173b'
const arriveHourOptions = getArriveHourOptions()
const timeDurationOptions = getTimeDurationOptions()

export const InfoIncidentModal = ({ incidentId, onClose, status }: Props) => {
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)
    const [departmentName, setDepartmentName] = useState<string | undefined>(undefined)
    const [colorState, setColorState] = useState<string | undefined>(undefined)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [technicianName, setTechnicianName] = useState<string | undefined>(undefined)
    const [arriveHour, setArriveHour] = useState<string | undefined>(undefined)
    const [timeDuration, setTimeDuration] = useState<string | undefined>(undefined)

    const incidentFetched = useRef(false) // Se asegura de que fetchIncident solo se ejecute una vez por cambio en incidentId.

    const [incidentData, setIncidentData] = useState<Incident>({
        date: '',
        location_id: '',
        description: '',
        device_id: {
            _id: '',
            name: '',
            type: '',
            brand: '',
            specs: {},
            location_id: {
                _id: '',
                name: '',
                building_id: {
                    _id: '',
                    name: '',
                    description: '',
                    isShared: false,
                    departments: [
                        {
                            department_id: '',
                            build_manager: {
                                _id: '',
                                name: '',
                            },
                            _id: '',
                        },
                    ],
                    totalDevices: 0,
                },
            },
            status: '',
            purchaseDate: '',
            warrantyYears: 0,
            deviceModel: '',
        },
        folio: '',
        incident_type: '',
        period: 0,
        status: '',
        updated_at: '',
        work: '',
        _id: '',
        technician_id: '',
        priority: '',
        arrival_time: '',
        time_duration: '',
    })

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<Incident>({
        folio: '',
        location_id: '',
        department_name: '',
        description: '',
        device_id: {
            _id: '',
            name: '',
            type: '',
            brand: '',
            specs: {},
            location_id: {
                _id: '',
                name: '',
                building_id: {
                    _id: '',
                    name: '',
                    description: '',
                    isShared: false,
                    departments: [
                        {
                            department_id: '',
                            build_manager: {
                                _id: '',
                                name: '',
                            },
                            _id: '',
                        },
                    ],
                    totalDevices: 0,
                },
            },
            status: '',
            purchaseDate: '',
            warrantyYears: 0,
            deviceModel: '',
        },
        date: '',
        incident_type: '',
        period: 0,
        status: '',
        updated_at: '',
        created_at: '',
        arrival_time: '',
        time_duration: '',
        technician_id: '',
        priority: '',
        work: '',
        _id: '',
    })

    const fetchDepartment = useCallback(async () => {
        if (!departmentId) {
            try {
                const id = await getUserDepartment()
                setDepartmentId(id ?? undefined)
            } catch (err) {
                console.error(err)
            }
        } else {
            try {
                const response = await fetch(`${API_BASE_URL}/departments/${departmentId}`, { credentials: 'include' })
                const data = await response.json()
                setDepartmentName(data.name)
            } catch (err) {
                console.error(err)
            }
        }
    }, [departmentId])

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/users-search?department_id=${technicianDepartmentId}&position=${rol}`,
                { credentials: 'include' },
            )
            const data = await response.json()
            const technician = data.find((user: any) => user._id === formState.technician_id)
            setTechnicianName(technician ? technician.name : undefined)
        } catch (err) {
            console.error(err)
        }
    }, [formState.technician_id])

    const fetchRole = useCallback(async () => {
        const role = await getUserRole()
        setUserRole(role)
    }, [])

    const fetchIncident = useCallback(async () => {
        if (incidentFetched.current) return // Para prevenir múltiples llamadas
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, { credentials: 'include' })
            const data = await response.json()
            setIncidentData(data)
            incidentFetched.current = true
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }, [incidentId, updateFields])

    useEffect(() => {
        const fetchData = async () => {
            await fetchDepartment()
            await fetchIncident()
            await fetchRole()
        }
        fetchData()
    }, [fetchIncident, fetchRole, fetchDepartment])

    useEffect(() => {
        if (incidentData) {
            updateFields(incidentData)
        }
    }, [incidentData.folio])

    useEffect(() => {
        fetchUsers()
    }, [departmentId, fetchUsers])

    useEffect(() => {
        // Solo actualizamos si la información cambia
        if (formState.arrival_time) {
            const arrivalOption = arriveHourOptions.find((option) => option.value === formState.arrival_time)
            // Si no es igual al estado actual, actualizamos el estado
            if (arrivalOption && arrivalOption.label !== arriveHour) {
                setArriveHour(arrivalOption.label)
            }
        }

        if (formState.time_duration) {
            const durationOption = timeDurationOptions.find((option) => option.value === formState.time_duration)
            // Si no es igual al estado actual, actualizamos el estado
            if (durationOption && durationOption.label !== timeDuration) {
                setTimeDuration(durationOption.label)
            }
        }

        // Solo cambiamos el color de estado si es necesario
        if (formState.status === 'REJECTED' && colorState !== 'r') {
            setColorState('r')
        } else if (formState.status !== 'REJECTED' && colorState !== undefined) {
            setColorState(undefined)
        }
    }, [formState.arrival_time, formState.time_duration, formState.status, arriveHour, timeDuration, colorState])

    useEffect(() => {
        updateFields({
            department_name: departmentName,
            created_at: formState.created_at ? new Date(formState.created_at).toLocaleDateString() : '',
            incident_type: formState.incident_type ? translateIncident(formState.incident_type, 'incident') : '',
            work: formState.work ? translateIncident(formState.work, 'work') : '',
            priority: formState.priority ? translateIncident(formState.priority, 'priority') : 'No asignado',
            arrival_time: arriveHour,
            time_duration: timeDuration,
            date: formState.date ? new Date(formState.date).toLocaleDateString() : '',
        })
    }, [incidentId, status, departmentId, departmentName, arriveHour, timeDuration])

    return (
        <>
            <div className={style.titleModal}>
                <InfoIcon size={40} />
                {status == 'REJECTED' ? <h2>Información de rechazo</h2> : <h2>Información</h2>}
            </div>
            <div className={style.modalDetail}>
                <div className={style.columnModal}>
                    <div className={style.rowModal}>
                        <section className={style.disabled}>
                            Folio
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="folio"
                                    value={formState.folio || ''}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        {status == 'REJECTED' ? (
                            <section className={style.disabled}>
                                Equipo
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="device"
                                        value={formState.device_id.name || ''}
                                        type="text"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                        ) : (
                            <section className={style.disabled}>
                                Edificio
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="building"
                                        value={formState.device_id.location_id.building_id.name || ''}
                                        type="text"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                        )}
                    </div>

                    {status == 'REJECTED' ? (
                        <>
                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Tipo de incidencia
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="incident_type"
                                            value={formState.incident_type || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                                <section className={style.disabled}>
                                    Trabajo
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="work"
                                            value={formState.work || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>
                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Estatus
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="status"
                                            value={formState.status || ''}
                                            type="text"
                                            color={colorState}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Sublocalización
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="location"
                                            value={formState.device_id.location_id.name || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                                <section className={style.disabled}>
                                    Equipo
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="device"
                                            value={formState.device_id.name || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>

                            {(userRole == 'ADMIN_TECHNICIANS' || userRole == 'TECHNICIAN') && (
                                <div className={style.rowModal}>
                                    <section className={style.disabled}>
                                        Departamento
                                        <div className={style.formInput}>
                                            <CustomInput
                                                isFormInput
                                                name="department_name"
                                                value={formState.department_name || ''}
                                                type="text"
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </section>
                                    <section className={style.disabled}>
                                        Fecha de solicitud
                                        <div className={style.formInput}>
                                            <CustomInput
                                                isFormInput
                                                name="created_at"
                                                value={formState.created_at || ''}
                                                type="text"
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </section>
                                </div>
                            )}

                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Tipo de incidencia
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="incident_type"
                                            value={formState.incident_type || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                                <section className={style.disabled}>
                                    Trabajo
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="work"
                                            value={formState.work || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>

                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Técnico
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="technician"
                                            value={technicianName || 'No asignado'}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                                <section className={style.disabled}>
                                    {userRole == 'ADMIN_TECHNICIANS' ? 'Prioridad' : 'Prioridad asignada'}
                                    <div className={`${style.formInput}`}>
                                        <CustomInput
                                            isFormInput
                                            name="priority"
                                            value={formState.priority || ''}
                                            type="text"
                                            color="g"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>

                            {(userRole == 'ADMIN_TECHNICIANS' || userRole == 'TECHNICIAN') && status != 'ASSIGNED' ? (
                                <>
                                    <div className={style.rowModal}>
                                        <section className={style.disabled}>
                                            Hora de llegada
                                            <div className={style.formInput}>
                                                <CustomInput
                                                    isFormInput
                                                    name="arrivaltime"
                                                    value={formState.arrival_time || ''}
                                                    type="text"
                                                    onChange={onInputChange}
                                                />
                                            </div>
                                        </section>
                                        <section className={style.disabled}>
                                            Tiempo de duración
                                            <div className={style.formInput}>
                                                <CustomInput
                                                    isFormInput
                                                    name="durationtime"
                                                    value={formState.time_duration || ''}
                                                    type="text"
                                                    onChange={onInputChange}
                                                />
                                            </div>
                                        </section>
                                    </div>

                                    <div className={style.rowModal}>
                                        <section className={style.disabled}></section>
                                        <section className={style.disabled}>
                                            Fecha de inicio
                                            <div className={style.formInput}>
                                                <CustomInput
                                                    isFormInput
                                                    name="durationtime"
                                                    value={formState.date || ''}
                                                    type="text"
                                                    onChange={onInputChange}
                                                />
                                            </div>
                                        </section>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {status != 'ASSIGNED' && userRole == 'ADMIN_TECHNICIANS' && (
                                        <>
                                            <div className={style.rowModal}>
                                                <section className={style.disabled}>
                                                    Fecha de solicitud
                                                    <div className={style.formInput}>
                                                        <CustomInput
                                                            isFormInput
                                                            name="arrivaltime"
                                                            value={formState.created_at || ''}
                                                            type="text"
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                </section>
                                                <section className={style.disabled}>
                                                    Fecha de inicio
                                                    <div className={style.formInput}>
                                                        <CustomInput
                                                            isFormInput
                                                            name="durationtime"
                                                            value={formState.date || ''}
                                                            type="text"
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                </section>
                                            </div>
                                            <div className={style.rowModal}>
                                                <section className={style.disabled}>
                                                    Hora de llegada
                                                    <div className={style.formInput}>
                                                        <CustomInput
                                                            isFormInput
                                                            name="arrivaltime"
                                                            value={formState.arrival_time || ''}
                                                            type="text"
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                </section>
                                                <section className={style.disabled}>
                                                    Tiempo de duración
                                                    <div className={style.formInput}>
                                                        <CustomInput
                                                            isFormInput
                                                            name="durationtime"
                                                            value={formState.time_duration || ''}
                                                            type="text"
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                </section>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {status == undefined && status != 'SENT' && (
                        <>
                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Fecha de solicitud
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="created_at"
                                            value={formState.created_at || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                                <section className={style.disabled}>
                                    Fecha de inicio
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="date_start"
                                            value={formState.date || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>

                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Hora de llegada
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="arrivaltime"
                                            value={formState.arrival_time || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                                <section className={style.disabled}>
                                    Tiempo de duración
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="durationtime"
                                            value={formState.time_duration || ''}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>
                        </>
                    )}
                    {status == 'REJECTED' ? (
                        <section className={style.disabled}>
                            Motivos
                            <div className={style.formDescription}>
                                <CustomTextArea
                                    isFormInput
                                    name="description"
                                    value={formState.comments || ''}
                                    type="description"
                                    onChange={onTextAreaChange}
                                />
                            </div>
                        </section>
                    ) : (
                        <section className={style.disabled}>
                            Descripción
                            <div className={style.formDescription}>
                                <CustomTextArea
                                    isFormInput
                                    name="description"
                                    value={formState.description || ''}
                                    type="description"
                                    onChange={onTextAreaChange}
                                />
                            </div>
                        </section>
                    )}
                </div>

                <div className={`${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.saveButton}>
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    )
}
