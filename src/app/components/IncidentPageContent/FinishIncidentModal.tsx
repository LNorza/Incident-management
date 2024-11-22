import { CheckCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
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
    FinishIncident,
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

    const [incidentType, setIncidentType] = useState<string | undefined>(undefined)
    const [workType, setWorkType] = useState<string | undefined>(undefined)
    const [arriveHourOptions] = useState<IOptions[]>(getArriveHourOptions())
    const [timeDurationOptions] = useState<IOptions[]>(getTimeDurationOptions())

    const [updateIncident, setUpdateIncident] = useState<UpdateIncidentDto>({
        incident_type: '',
        work: '',
        description: '',
        qualification: 0,
    })

    const [incidentData, setIncidentData] = useState<Incident | null>(null)

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<FinishIncident>({
        folio: '',
        deviceName: '',
        technicianName: '',
        priority: '',
        start_date: '',
        arrival_time: '',
        time_duration: '',
        description: '',
        comments: '',
        diagnostic: '',
        initial_time: '',
        end_time: '',
        qualification: 0,
    })

    const getTechnicianName = async (technicianId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${technicianId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            return data.name
        } catch (error) {
            console.error('Error fetching technician:', error)
        }
    }

    const fetchIncident = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setIncidentData(data)

            const formatTime = (dateString: string) => {
                if (!dateString) return ''
                const date = new Date(dateString)
                const hours = String(date.getHours()).padStart(2, '0')
                const minutes = String(date.getMinutes()).padStart(2, '0')
                return `${hours}:${minutes}`
            }

            updateFields({
                folio: data.folio,
                deviceName: data.device_id.name,
                technicianName: await getTechnicianName(data.technician_id),
                priority: translateIncident(data.priority, 'priority') || 'No asignado',
                start_date: data.start_date ? new Date(data.start_date).toLocaleDateString() : '',
                arrival_time: arriveHourOptions.find((option) => option.value === data.arrival_time)?.label,
                time_duration: timeDurationOptions.find((option) => option.value === data.time_duration)?.label,
                description: data.description,
                comments: data.comments,
                diagnostic: data.diagnostic,
                initial_time: formatTime(data.start_date),
                end_time: data.end_date ? formatTime(data.end_date) : '',
            })
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }

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
        const fetchData = async () => {
            await fetchIncident()
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (incidentType) {
            setWorkTypeOptions(getWorkTypeOptions(incidentType))
        }
    }, [incidentType])

    useEffect(() => {
        if (incidentData) {
            setIncidentType(incidentData.incident_type)
            setWorkType(incidentData.work)
        }
    }, [incidentData])

    useEffect(() => {
        switch (action) {
            case 'RESENT':
                setUpdateIncident({
                    status: 'SENT',
                    incident_type: incidentType,
                    work: workType,
                    description: formState.description,
                })
                break
            case 'FINISHED':
                setUpdateIncident({
                    status: 'FINISHED',
                    end_date: new Date(),
                })
                break
            default:
                setUpdateIncident({
                    status: 'RELEASED',
                    qualification: formState.qualification,
                    comments: formState.comments,
                })
                break
        }
    }, [incidentType, workType, formState.description, formState.comments, formState.qualification, action])

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
                                        value={formState.deviceName}
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
                                                value={formState.technicianName}
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
                                                name="date"
                                                value={formState.start_date}
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

                                <div className={style.rowModal}>
                                    <section className={style.disabled}>
                                        Hora de inicio
                                        <div className={style.formInput}>
                                            <CustomInput
                                                isFormInput
                                                name="initialTime"
                                                value={formState.initial_time}
                                                type="text"
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </section>
                                    <section className={style.disabled}>
                                        Hora de terminación
                                        <div className={style.formInput}>
                                            <CustomInput
                                                isFormInput
                                                name="endTime"
                                                value={formState.end_time}
                                                type="text"
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </>
                        )}

                        {action != 'RESENT' && (
                            <Calification
                                onRatingChange={(rating) => {
                                    updateFields({ qualification: rating })
                                }}
                            />
                        )}

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
