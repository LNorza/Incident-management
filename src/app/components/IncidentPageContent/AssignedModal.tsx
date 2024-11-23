import { useCallback, useEffect, useState } from 'react'
import { useForm } from '../../../hooks'
import {
    API_BASE_URL,
    getArriveHourOptions,
    getIncidentPriorityOptions,
    getTimeDurationOptions,
    getSpecialtyOptions,
    getUserRole,
    Incident,
    FormIncident,
    IOptions,
    translateIncident,
    UpdateIncidentDto,
} from '../../../utils'
import { CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import style from '../../style/modal.module.css'
import { Ban, UserRoundPlus } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
    onClose: () => void
    incidentId?: string | undefined
    action?: string
}

export const AssignedModal = ({ incidentId, onClose, action }: Props) => {
    const [specialty, setSpecialty] = useState<string | undefined>(undefined)
    const [priority, setPriority] = useState<string | undefined>(undefined)
    const [technicians, setTechnicians] = useState<string | undefined>(undefined)
    const [arriveHour, setArriveHour] = useState<string | undefined>(undefined)
    const [timeDuration, setTimeDuration] = useState<string | undefined>(undefined)
    const [userRole, setUserRole] = useState<string | null>(null)

    const [specialtyOptions] = useState<IOptions[]>(getSpecialtyOptions)
    const [priorityOptions] = useState<IOptions[]>(getIncidentPriorityOptions)
    const [technicianOptions, setTechnicianOptions] = useState<IOptions[]>([])
    const [arriveHourOptions] = useState<IOptions[]>(getArriveHourOptions())
    const [timeDurationOptions] = useState<IOptions[]>(getTimeDurationOptions())

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<FormIncident>({
        folio: '',
        buildName: '',
        deviceName: '',
        locationName: '',
        departmentName: '',
        created_at: '',
        incident_type: '',
        work: '',
        description: '',
        comments: '',
        diagnostic: '',
    })

    const [incidentData, setIncidentData] = useState<Incident | null>(null)

    const [updateIncident, setUpdateIncident] = useState<UpdateIncidentDto>({
        status: '',
        technician_id: '',
        priority: '',
        time_duration: '',
        arrival_time: '',
        technician_specialty: '',
    })

    const fetchRole = async () => {
        const role = await getUserRole()
        setUserRole(role)
    }

    const fetchUsers = useCallback(async (position: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/technicians?position=${position}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setTechnicianOptions(
                data.map((technician: { _id: string; name: string; incidents: number }) => ({
                    label: `${technician.name}: ${technician.incidents} `,
                    value: technician._id,
                })),
            )
        } catch (err) {
            console.error(err)
        }
    }, [])

    const fetchIncident = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setIncidentData(data)
            updateFields({
                folio: data.folio,
                buildName: data.device_id.location_id.building_id.name,
                deviceName: data.device_id.name,
                locationName: data.device_id.location_id.name,
                departmentName: data.department_id.name,
                created_at: data.created_at ? new Date(data.created_at).toLocaleDateString() : '',
                incident_type: data.incident_type ? translateIncident(data.incident_type, 'incident') : '',
                work: data.work ? translateIncident(data.work, 'work') : '',
                description: data.description,
            })
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }

    const saveIncident = async () => {
        const url = `${API_BASE_URL}/incidents${incidentId ? `/${incidentId}` : ''}`
        const method = 'PUT'
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updateIncident),
            })

            if (response.ok) {
                toast.success(`Se actualizó la incidencia correctamente`)
                onClose()
            } else {
                const errorData = await response.json()
                console.error('Error en la respuesta:', errorData)
                toast.error('Error en la solicitud')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al procesar la solicitud')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchIncident()
            await fetchRole()
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (specialty) {
            let position = ''
            if (specialty === 'SOFTWARE') {
                position = 'TECHNICIAN_SOFTWARE'
            } else if (specialty === 'HARDWARE') {
                position = 'TECHNICIAN_HARDWARE'
            } else if (specialty === 'DEVELOPMENT') {
                position = 'TECHNICIAN_DEVELOPMENT'
            } else if (specialty === 'NETWORK') {
                position = 'TECHNICIAN_NETWORKS'
            }

            fetchUsers(position)
        }
    }, [specialty, fetchUsers])

    useEffect(() => {
        if (incidentData && userRole === 'TECHNICIAN') {
            setSpecialty(incidentData.technician_specialty)
            setPriority(incidentData.priority)
            setTechnicians(incidentData.technician_id)
            setArriveHour(incidentData.arrival_time)
        }
    }, [incidentData, userRole])

    useEffect(() => {
        if (action === 'REJECTED') {
            setUpdateIncident({
                status: 'REJECTED',
                rejected_reason: formState.comments,
            })
        } else {
            if (action == 'ASSIGNED' && userRole === 'TECHNICIAN') {
                setUpdateIncident({
                    status: 'IN_PROCESS',
                    arrival_time: arriveHour,
                    time_duration: timeDuration,
                    diagnostic: formState.diagnostic,
                    start_date: new Date(),
                })
            } else {
                setUpdateIncident({
                    status: 'ASSIGNED',
                    technician_specialty: specialty,
                    priority: priority,
                    technician_id: technicians,
                    arrival_time: arriveHour,
                })
            }
        }
    }, [
        priority,
        technicians,
        formState.comments,
        arriveHour,
        timeDuration,
        action,
        userRole,
        specialty,
        formState.diagnostic,
    ])

    return (
        <>
            <div className={style.titleModal}>
                {action != 'REJECTED' ? <UserRoundPlus size={40} /> : <Ban size={40} />}
                <h2>{action != 'REJECTED' ? 'Asignar incidencia' : 'Rechazar incidencia'}</h2>
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
                                    value={formState.folio}
                                    placeholder="Ingresa el folio"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="folio"
                                />
                            </div>
                        </section>
                        <section className={style.disabled}>
                            Edificio
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="buildName"
                                    value={formState.buildName}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section className={style.disabled}>
                            Sublocalización
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="location"
                                    value={formState.locationName}
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
                                    value={formState.deviceName}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section className={style.disabled}>
                            Departamento
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="departmentName"
                                    value={formState.departmentName}
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
                                    value={formState.created_at}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section className={style.disabled}>
                            Tipo de incidencia
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="incident_type"
                                    value={formState.incident_type}
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
                                    value={formState.work}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>

                    <section className={style.disabled}>
                        Descripción
                        <div className={style.formDescription}>
                            <CustomTextArea
                                isFormInput
                                name="description"
                                value={formState.description}
                                placeholder="Ingresa la descripción"
                                type="description"
                                onChange={onTextAreaChange}
                            />
                        </div>
                    </section>

                    {action != 'REJECTED' && (
                        <div className={style.rowModal}>
                            <section className={userRole == 'TECHNICIAN' ? style.disabled : ''}>
                                Especialidad de incidencia
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={specialty}
                                        placeholder="Selecciona la especialidad"
                                        options={specialtyOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setSpecialty(selected.value)
                                            setTechnicians(undefined)
                                        }}
                                    />
                                </div>
                            </section>
                            <section className={userRole == 'TECHNICIAN' ? style.disabled : ''}>
                                Prioridad
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={priority}
                                        placeholder="Selecciona el equipo"
                                        options={priorityOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setPriority(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                    )}

                    {action != 'REJECTED' && (
                        <div className={style.rowModal}>
                            <section className={userRole == 'TECHNICIAN' ? style.disabled : ''}>
                                Técnico
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={technicians}
                                        placeholder="Selecciona al técnico"
                                        options={technicianOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setTechnicians(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                            <section className={userRole == 'TECHNICIAN' ? style.disabled : ''}>
                                Hora max de llegada
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={arriveHour}
                                        placeholder="Selecciona la hora"
                                        options={arriveHourOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setArriveHour(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                    )}

                    {userRole == 'TECHNICIAN' && (
                        <div className={style.rowModal}>
                            <section>
                                Tiempo de duración
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={timeDuration}
                                        placeholder="Selecciona el equipo"
                                        options={timeDurationOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setTimeDuration(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                    )}

                    {userRole == 'TECHNICIAN' && (
                        <section>
                            Diagnóstico
                            <div className={style.formDescription}>
                                <CustomTextArea
                                    isFormInput
                                    name="diagnostic"
                                    value={formState.diagnostic}
                                    placeholder="Ingresa el diagnóstico"
                                    type="description"
                                    onChange={onTextAreaChange}
                                />
                            </div>
                        </section>
                    )}

                    {action == 'REJECTED' && (
                        <section>
                            Motivos
                            <div className={style.formDescription}>
                                <CustomTextArea
                                    isFormInput
                                    name="comments"
                                    value={formState.comments}
                                    placeholder="Ingresa los motivos "
                                    type="description"
                                    onChange={onTextAreaChange}
                                />
                            </div>
                        </section>
                    )}
                </div>
                <div className={` ${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={saveIncident} className={style.saveButton}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    )
}
