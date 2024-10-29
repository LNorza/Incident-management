import { useEffect, useState } from 'react'
import { CustomInput, CustomTextArea } from '../../../ui'
import { API_BASE_URL, getUserRole, Incident, IncidentState } from '../../../utils'
import { InfoIcon } from 'lucide-react'
import style from '../../style/modal.module.css'
import { useForm } from '../../../hooks'
import { translateIncident } from '../../../utils/formatter/incident.formatter'
import { getHoursIncident } from '../../utils/getHour'

interface Props {
    onClose: () => void
    incidentId?: string
    status?: IncidentState
}

export const InfoIncidentModal = ({ incidentId, onClose, status }: Props) => {
    const [colorState, setColorState] = useState<string | undefined>(undefined)
    const [userRole, setUserRole] = useState<string | null>(null)

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<Incident>({
        folio: '',
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
        date: '',
        incident_type: '',
        period: 0,
        status: '',
        updated_at: '',
        created_at: '',
        technician_id: '',
        arrived_date: '',
        time_duration: '',
        priority: '',
        work: '',
        _id: '',
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

    const fetchRole = async () => {
        const role = await getUserRole() // Obtener el rol del usuario
        setUserRole(role) // Guardar el rol en el estado
    }

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

    useEffect(() => {
        fetchIncident()
        fetchRole()
    }, [])

    useEffect(() => {
        const createdAt = formState.created_at

        setColorState(status == 'REJECTED' ? 'r' : undefined)

        updateFields({
            work: translateIncident(formState.work, 'work'),
            incident_type: translateIncident(formState.incident_type, 'incident'),
            status: translateIncident(formState.status, 'status'),
            date: new Date(formState.date).toLocaleDateString(),
            arrived_date: getHoursIncident(new Date(incidentData.date)),
            created_at: createdAt ? new Date(createdAt).toLocaleDateString() : '',
        })
    }, [formState.date])
    return (
        <>
            <div className={style.titleModal}>
                <InfoIcon size={40} />
                {status == 'REJECTED' ? <h2>Información de rechaza</h2> : <h2>Información</h2>}
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
                                        value={formState.device_id.name}
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
                                        value={formState.device_id.location_id.building_id.name}
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
                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Estatus
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="status"
                                            value={formState.status}
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
                                            value={formState.device_id.location_id.name}
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
                                            value={formState.device_id.name}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>

                            {status == 'FINISHED' ||
                                (userRole == 'ADMIN_TECHNICIANS' && (
                                    <div className={style.rowModal}>
                                        <section className={style.disabled}>
                                            Departamento
                                            <div className={style.formInput}>
                                                <CustomInput
                                                    isFormInput
                                                    name="location"
                                                    value={formState.device_id.location_id.name}
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
                                                    name="device"
                                                    value={formState.device_id.name}
                                                    type="text"
                                                    onChange={onInputChange}
                                                />
                                            </div>
                                        </section>
                                    </div>
                                ))}

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

                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Técnico
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="technician"
                                            value={formState.technician_id}
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
                                            value={formState.work}
                                            type="text"
                                            color="g"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            </div>

                            {userRole == 'ADMIN_TECHNICIANS' && status != 'ASSIGNED' ? (
                                <>
                                    <div className={style.rowModal}>
                                        <section className={style.disabled}>
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
                                        <section className={style.disabled}></section>
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
                                                            value={formState.created_at}
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
                                                            value={formState.arrived_date}
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
                                </>
                            )}
                        </>
                    )}

                    {status == undefined && (
                        <>
                            <div className={style.rowModal}>
                                <section className={style.disabled}>
                                    Fecha de solicitud
                                    <div className={style.formInput}>
                                        <CustomInput
                                            isFormInput
                                            name="date"
                                            value={formState.created_at}
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
                                            name="datastart"
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
                                            value={formState.arrived_date}
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
                    <section className={style.disabled}>
                        Descripción
                        <div className={style.formDescription}>
                            <CustomTextArea
                                isFormInput
                                name="description"
                                value={formState.description}
                                type="description"
                                onChange={onTextAreaChange}
                            />
                        </div>
                    </section>
                </div>

                <div className={` ${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    <button className={style.saveButton}>Guardar</button>
                </div>
            </div>
        </>
    )
}
