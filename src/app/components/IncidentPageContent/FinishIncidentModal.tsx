import { CheckCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import style from '../../style/modal.module.css'
import { CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import { useForm } from '../../../hooks'
import {
    API_BASE_URL,
    getIncidentTypeOptions,
    getWorkTypeOptions,
    IFormIncident,
    Incident,
    IOptions,
    UpdateIncidentDto,
} from '../../../utils'
import { toast } from 'sonner'
import { DateInput } from 'rsuite'
import { Calification } from '../../../ui/components/calification'
import { getHoursIncident } from '../../utils/getHour'

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
        arrived_date: '',
        time_duration: '',
    })

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<IFormIncident>({
        folio: '',
        technician: '',
        building: '',
        location: '',
        device: '',
        incident_type: '',
        worktype: '',
        date: new Date(),
        priority: '',
        arrived_date: '',
        time_duration: '',
        description: '',
    })

    const fetchIncident = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setIncidentData(data)
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
        fetchIncident()
    }, [incidentId])

    useEffect(() => {
        const work = getWorkTypeOptions(incidentType)
        setWorkTypeOptions(work || []) // Asegura que sea siempre un array
    }, [incidentType])

    useEffect(() => {
        updateFields({
            folio: incidentData.folio,
            device: incidentData.device_id.name,
            date: new Date(incidentData.date),
            arrived_date: getHoursIncident(new Date(incidentData.date)),
            time_duration: incidentData.time_duration,
        })

        setIncidentType(incidentTypeOptions.find((incident) => incident.value === incidentData.incident_type)?.value)
        setWorkType(workTypeOptions.find((work) => work.value === incidentData.work)?.value)
        setDateStart(new Date(incidentData.date))
    }, [incidentData, incidentTypeOptions, workTypeOptions])

    useEffect(() => {
        if (action == 'RESENT') {
            setUpdateIncident({
                status: 'SENT',
                incident_type: incidentType,
                work: workType,
                description: formState.description,
            })
        } else {
            setUpdateIncident({
                work: workType,
                start_date: formState.date,
                qualification: calification,
                comments: formState.description,
            })
        }
    }, [incidentType, workType, formState])

    return (
        <>
            <div className={style.titleModal}>
                <CheckCheck size={40} />
                <h2>{action === 'RESENT' ? 'Reenviar incidencia' : 'Liberar incidencia'}</h2>
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
                                    value={formState.device}
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
                                            value={formState.technician}
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
                                <section>
                                    Trabajo
                                    <div className={style.formInput}>
                                        <CustomSelect
                                            value={workType}
                                            options={workTypeOptions}
                                            onSelect={(selected) => setWorkType(selected.value)}
                                        />
                                    </div>
                                </section>

                                <section>
                                    Fecha de inicio
                                    <div className={style.formInput}>
                                        <DateInput
                                            value={dateStart}
                                            onChange={(value: Date | null) => {
                                                setDateStart(value)
                                            }}
                                        />
                                    </div>
                                </section>
                            </div>

                            <div className={style.rowModal}>
                                <section>
                                    Hora de llegada
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="arrivaltime"
                                            value={formState.arrived_date}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                                <section>
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

                    <section>
                        {action === 'RESENT' ? 'Nueva descripción' : 'Comentarios'}
                        <div className={style.formDescription}>
                            <CustomTextArea
                                isFormInput
                                name="description"
                                value={formState.description}
                                placeholder={
                                    action === 'RESENT'
                                        ? 'Ingresa la nueva descripción'
                                        : 'Ingresa algún comentario sobre el servicio'
                                }
                                type="description"
                                onChange={onTextAreaChange}
                            />
                        </div>
                    </section>
                </div>
                <div className={`${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={saveIncident} className={style.saveButton}>
                        {action === 'RESENT' ? 'Reenviar' : 'Liberar'}
                    </button>
                </div>
            </div>
        </>
    )
}
