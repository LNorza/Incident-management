import { CheckCheck } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import style from '../../style/modal.module.css'
import { CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import { useForm } from '../../../hooks'
import {
    API_BASE_URL,
    getArriveHourOptions,
    getIncidentTypeOptions,
    getTimeDurationOptions,
    getWorkTypeOptions,
    Incident,
    IOptions,
    translateIncident,
    UpdateIncidentDto,
} from '../../../utils'
import { toast } from 'sonner'
import { Calification } from '../../../ui/components/calification'

interface Props {
    onClose: () => void
    incidentId?: string | undefined
    action?: string
}

export const FinishIncidentModal = ({ incidentId, onClose, action }: Props) => {
    const [incidentTypeOptions] = useState<IOptions[]>(getIncidentTypeOptions)
    const [workTypeOptions, setWorkTypeOptions] = useState<IOptions[]>([])

    const [dateStart, setDateStart] = useState<Date | null>(null)
    const [calification, setCalification] = useState(0)
    const [incidentType, setIncidentType] = useState<string | undefined>(undefined)
    const [workType, setWorkType] = useState<string | undefined>(undefined)

    const [rol] = useState('TECHNICIAN')
    const [departmentId] = useState('67206b309acf1976ca32173b')
    const [arriveHourOptions] = useState<IOptions[]>(getArriveHourOptions())
    const [timeDurationOptions] = useState<IOptions[]>(getTimeDurationOptions())
    const [arriveHour, setArriveHour] = useState<string | undefined>(undefined)
    const [timeDuration, setTimeDuration] = useState<string | undefined>(undefined)
    const [technicianName, setTechnicianName] = useState<string | undefined>(undefined)

    const [updateIncident, setUpdateIncident] = useState<UpdateIncidentDto>({
        incident_type: '',
        work: '',
        description: '',
    })

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

    const fetchIncident = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            updateFields(data)
            setIncidentData(data)
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users-search?department_id=${departmentId}&position=${rol}`, {
                credentials: 'include',
            })
            const data = await response.json()
            data.forEach((user: any) => {
                if (user._id === formState.technician_id) {
                    setTechnicianName(user.name)
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, [departmentId, formState.technician_id])

    const saveIncident = async () => {
        try {
            const url = `${API_BASE_URL}/incidents/${incidentId}`

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updateIncident),
            }).then((response) => {
                if (response.ok) {
                    toast.success('Se actualizó la incidencia correctamente')
                    onClose()
                }
            })
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al procesar la solicitud')
        }
    }

    useEffect(() => {
        fetchIncident()
    }, [incidentId])

    useEffect(() => {
        fetchUsers()
    }, [departmentId, rol, formState.technician_id])

    useEffect(() => {
        if (incidentType) {
            setWorkTypeOptions(getWorkTypeOptions(incidentType))
        }
    }, [incidentType])

    useEffect(() => {
        if (incidentData) {
            setIncidentType(incidentData.incident_type)
            setWorkType(incidentData.work)
            setDateStart(new Date(incidentData.date))
        }
    }, [incidentData])

    useEffect(() => {
        const createdAt = formState.created_at
        if (formState.arrival_time) {
            setArriveHour(arriveHourOptions.find((option) => option.value === formState.arrival_time)?.label)
        }
        if (formState.time_duration) {
            setTimeDuration(timeDurationOptions.find((option) => option.value === formState.time_duration)?.label)
        }

        updateFields({
            description: '',
            priority: translateIncident(formState.priority, 'priority') || 'No asignado',
            work: translateIncident(formState.work, 'work'),
            incident_type: translateIncident(formState.incident_type, 'incident'),
            status: translateIncident(formState.status, 'status'),
            date: new Date(formState.date).toLocaleDateString(),
            created_at: createdAt ? new Date(createdAt).toLocaleDateString() : '',
            arrival_time: arriveHour,
            time_duration: timeDuration,
        })
    }, [formState.folio, arriveHourOptions, timeDurationOptions, arriveHour, timeDuration])

    useEffect(() => {
        if (action == 'RESENT') {
            setUpdateIncident({
                status: 'SENT',
                incident_type: incidentType,
                work: workType,
                description: formState.description,
            })
        }
        if (action == 'FINISHED') {
            setUpdateIncident({
                status: 'FINISHED',
            })
        } else {
            setUpdateIncident({
                status: 'RELEASED',
                qualification: calification,
                comments: formState.comments,
            })
        }
    }, [incidentType, workType])

    return (
        <>
            <div className={style.titleModal}>
                <CheckCheck size={40} />
                <h2>
                    {action == 'FINISHED'
                        ? 'Finalizar incidencia'
                        : action === 'RESENT'
                        ? 'Reenviar incidencia'
                        : 'Liberar incidencia'}
                </h2>
            </div>
            <div className={style.modalDetail}>
                {action == 'FINISHED' ? (
                    <>
                        <div className={style.modalDeleteText}>
                            <span className={style.p1}>¿Estás seguro de que quieres finalizar la incidencia?</span>
                            <span className={style.p2}>
                                Una vez finalizada no podrás hacer ningún cambio en el equipo asignado y serás
                                calificado por el usuario
                            </span>
                        </div>
                    </>
                ) : (
                    <div className={style.columnModal}>
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Folio
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="folio"
                                        value={formState.folio}
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="folio"
                                    />
                                </div>
                            </section>

                            <section className={style.disabled}>
                                Equipo
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="device"
                                        value={formState.device_id.name}
                                        type="text"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                        </div>

                        {action === 'RESENT' ? (
                            <div className={style.rowModal}>
                                <section>
                                    Tipo de Incidencia
                                    <div className={style.formInput}>
                                        <CustomSelect
                                            value={incidentType}
                                            options={incidentTypeOptions}
                                            onSelect={(selected) => setIncidentType(selected.value)}
                                        />
                                    </div>
                                </section>
                                <section>
                                    Trabajo
                                    <div className={style.formInput}>
                                        <CustomSelect
                                            value={workType}
                                            options={workTypeOptions ?? []}
                                            onSelect={(selected) => setWorkType(selected.value)}
                                        />
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <>
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
                                        Prioridad asignada
                                        <div className={`${style.formInput}`}>
                                            <CustomInput
                                                isFormInput
                                                name="priority"
                                                value={formState.priority}
                                                type="text"
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </section>
                                </div>
                                <div className={style.rowModal}>
                                    <section className={style.disabled}>
                                        Trabajo
                                        <div className={style.formInput}>
                                            <CustomSelect
                                                value={workType}
                                                options={workTypeOptions}
                                                onSelect={(selected) => setWorkType(selected.value)}
                                            />
                                        </div>
                                    </section>

                                    <section className={style.disabled}>
                                        Fecha de inicio
                                        <div className={style.formInput}>
                                            <CustomInput
                                                isFormInput
                                                name="durationtime"
                                                value={formState.date}
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
                                                value={formState.arrival_time}
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
                                                value={formState.time_duration}
                                                type="text"
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </>
                        )}

                        {action != 'RESENT' && <Calification onRatingChange={(rating) => setCalification(rating)} />}

                        {action === 'RESENT' ? (
                            <section>
                                Nueva descripción
                                <div className={style.formDescription}>
                                    <CustomTextArea
                                        isFormInput
                                        name="description"
                                        value={formState.description}
                                        placeholder="Ingresa la nueva descripción "
                                        type="description"
                                        onChange={onTextAreaChange}
                                    />
                                </div>
                            </section>
                        ) : (
                            <section>
                                Comentarios
                                <div className={style.formDescription}>
                                    <CustomTextArea
                                        isFormInput
                                        name="comments"
                                        value={formState.comments}
                                        placeholder="Ingresa algún comentario sobre el servicio"
                                        type="description"
                                        onChange={onTextAreaChange}
                                    />
                                </div>
                            </section>
                        )}
                    </div>
                )}

                <div className={`${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    {action == 'FINISHED' ? (
                        <button onClick={saveIncident} className={style.saveButton}>
                            Finalizar
                        </button>
                    ) : (
                        <button onClick={saveIncident} className={style.saveButton}>
                            {action === 'RESENT' ? 'Reenviar' : 'Liberar'}
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
