import { useCallback, useEffect, useState } from 'react'
import { CustomInput, CustomTextArea, CustomCheckBox } from '../../../ui'
import {
    API_BASE_URL,
    getArriveHourOptions,
    getTimeDurationOptions,
    getSpecialtyOptions,
    translateIncident,
    IOptions,
    getUserRole,
    IncidentState,
    InfoIncident,
    IDepartment,
} from '../../../utils'
import { InfoIcon } from 'lucide-react'
import rating from '../../style/cardContainer.module.css'
import style from '../../style/modal.module.css'
import { useForm } from '../../../hooks'

interface Props {
    onClose: () => void
    incidentId?: string
    status?: IncidentState
}

export const InfoIncidentModal = ({ incidentId, onClose, status }: Props) => {
    const [userRole, setUserRole] = useState<string | null>(null)
    const [arriveHourOptions] = useState<IOptions[]>(getArriveHourOptions())
    const [timeDurationOptions] = useState<IOptions[]>(getTimeDurationOptions())
    const [specialtyOptions] = useState<IOptions[]>(getSpecialtyOptions)

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<InfoIncident>({
        folio: '',
        buildName: '',
        deviceName: '',
        locationName: '',
        responsableName: '',
        departmentName: '',
        created_at: '',
        incident_type: '',
        technicianName: '',
        priority: '',
        work: '',
        start_date: '',
        arrival_time: '',
        time_duration: '',
        description: '',
        diagnostic: '',
        comments: '',
        initial_time: '',
        end_time: '',
        status: '',
        specialty: '',
        qualification: 0,
        isProblem: false,
        problem_solution: '',
        root_cause: '',
    })

    const fetchRole = useCallback(async () => {
        const role = await getUserRole()
        setUserRole(role)
    }, [])

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

    const fetchIncident = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, { credentials: 'include' })
            const data = await response.json()

            const formatTime = (dateString: string) => {
                if (!dateString) return ''
                const date = new Date(dateString)
                const hours = String(date.getHours()).padStart(2, '0')
                const minutes = String(date.getMinutes()).padStart(2, '0')
                return `${hours}:${minutes}`
            }

            updateFields({
                folio: data.folio,
                buildName: data.device_id.location_id.building_id.name,
                deviceName: data.device_id.name,
                responsableName: data.device_id.location_id.building_id.departments[0].build_manager,
                locationName: data.device_id.location_id.name,
                departmentName: data.department_id.name,
                created_at: data.created_at ? new Date(data.created_at).toLocaleDateString() : '',
                incident_type: data.incident_type ? translateIncident(data.incident_type, 'incident') : '',
                technicianName: await getTechnicianName(data.technician_id),
                priority: translateIncident(data.priority, 'priority') || 'No asignado',
                work: data.work ? translateIncident(data.work, 'work') : '',
                start_date: data.start_date ? new Date(data.start_date).toLocaleDateString() : '',
                arrival_time: arriveHourOptions.find((option) => option.value === data.arrival_time)?.label,
                time_duration: timeDurationOptions.find((option) => option.value === data.time_duration)?.label,
                description: data.description,
                diagnostic: data.diagnostic,
                comments: data.comments,
                initial_time: formatTime(data.start_date),
                end_time: data.end_date ? formatTime(data.end_date) : '',
                status: translateIncident(data.status, 'status'),
                specialty: specialtyOptions.find((option) => option.value === data.technician_specialty)?.label,
                qualification: data.qualification,
                isProblem: data.isProblem,
                problem_solution: data.problem_solution,
                root_cause: data.root_cause,
            })

            fetchResponsable(
                data.device_id.location_id.building_id.departments.filter(
                    (department: IDepartment) => department.department_id === data.department_id._id,
                )[0].build_manager,
            )
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }, [incidentId])

    const fetchResponsable = async (userId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, { credentials: 'include' })
            const data = await response.json()
            updateFields({ responsableName: data.name })
        } catch (error) {
            console.error('Error fetching responsable:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            // await fetchDepartment()
            await fetchIncident()
            await fetchRole()
        }
        fetchData()
    }, [fetchIncident, fetchRole])

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
                    </div>
                    <div className={style.rowModal}>
                        <section className={style.disabled}>
                            Responsable del edificio
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="responsable"
                                    value={formState.responsableName}
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
                                        value={formState.deviceName || ''}
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
                                        value={formState.buildName || ''}
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
                                            color="r"
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

                            {(userRole == 'ADMIN_TECHNICIANS' || userRole == 'TECHNICIAN') && (
                                <div className={style.rowModal}>
                                    <section className={style.disabled}>
                                        Departamento
                                        <div className={style.formInput}>
                                            <CustomInput
                                                isFormInput
                                                name="department_name"
                                                value={formState.departmentName || ''}
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
                            {formState.isProblem ? 'Error conocido' : 'Descripción'}
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

                {status != 'REJECTED' && (
                    <>
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Técnico
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="technician"
                                        value={formState.technicianName || 'No asignado'}
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
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Especialidad de incidencia
                                <div className={style.formInput}>
                                    <CustomInput
                                        value={formState.specialty}
                                        placeholder="Selecciona la especialidad"
                                        type="text"
                                        id="specialty"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                            <section className={style.disabled}>
                                Hora max de llegada
                                <div className={style.formInput}>
                                    <CustomInput
                                        value={formState.arrival_time}
                                        placeholder="Selecciona la hora"
                                        type="text"
                                        id="arrival_time"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                        </div>
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Asignar como problema
                                <div className={style.formInput}>
                                    <CustomCheckBox checked={formState.isProblem} />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {status != 'REJECTED' && formState.isProblem && (
                    <>
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Técnico
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="technician"
                                        value={formState.technicianName || 'No asignado'}
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
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Especialidad de incidencia
                                <div className={style.formInput}>
                                    <CustomInput
                                        value={formState.specialty}
                                        placeholder="Selecciona la especialidad"
                                        type="text"
                                        id="specialty"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                            <section className={style.disabled}>
                                Hora max de llegada
                                <div className={style.formInput}>
                                    <CustomInput
                                        value={formState.arrival_time}
                                        placeholder="Selecciona la hora"
                                        type="text"
                                        id="arrival_time"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {status != 'SENT' && status != 'ASSIGNED' && status != 'REJECTED' && (
                    <>
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Tiempo de duración
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="time_duration"
                                        value={formState.time_duration}
                                        type="text"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                            {status == 'IN_PROCESS' ? (
                                <section className={style.disabled}>
                                    Hora de inicio
                                    <div className={`${style.formInput}`}>
                                        <CustomInput
                                            isFormInput
                                            name="priority"
                                            value={formState.initial_time}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            ) : status == 'RELEASED' || status === 'FINISHED' ? (
                                <section className={style.disabled}>
                                    Fecha de inicio
                                    <div className={`${style.formInput}`}>
                                        <CustomInput
                                            isFormInput
                                            name="start_date"
                                            value={formState.start_date}
                                            type="text"
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </section>
                            ) : (
                                <></>
                            )}
                        </div>

                        {formState.isProblem ? (
                            <section className={style.disabled}>
                                Causa raíz
                                <div className={style.formDescription}>
                                    <CustomTextArea
                                        isFormInput
                                        name="root_cause"
                                        value={formState.root_cause}
                                        placeholder="Ingresa la causa raíz"
                                        type="description"
                                        onChange={onTextAreaChange}
                                    />
                                </div>
                            </section>
                        ) : (
                            <section className={style.disabled}>
                                Diagnóstico
                                <div className={style.formDescription}>
                                    <CustomTextArea
                                        isFormInput
                                        name="diagnostic"
                                        value={formState.diagnostic || ''}
                                        type="description"
                                        onChange={onTextAreaChange}
                                    />
                                </div>
                            </section>
                        )}
                    </>
                )}

                {(status === 'FINISHED' || status == 'RELEASED') && (
                    <>
                        <div className={style.rowModal}>
                            <section className={style.disabled}>
                                Hora de inicio
                                <div className={`${style.formInput}`}>
                                    <CustomInput
                                        isFormInput
                                        name="priority"
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
                                        name="end_duration"
                                        value={formState.end_time}
                                        type="text"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                        </div>
                        {formState.isProblem && (
                            <section className={style.disabled}>
                                Solución del problema
                                <div className={style.formDescription}>
                                    <CustomTextArea
                                        isFormInput
                                        name="problem_solution"
                                        value={formState.problem_solution}
                                        placeholder="Ingresa la solución el problema"
                                        type="description"
                                        onChange={onTextAreaChange}
                                    />
                                </div>
                            </section>
                        )}

                        {status === 'RELEASED' && (
                            <>
                                <section className={style.disabled}>
                                    Calificación del técnico
                                    <div className={rating.ratingContainerInfo}>
                                        <div className={rating.rating}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <label
                                                    key={star}
                                                    style={{
                                                        color:
                                                            star <= formState.qualification
                                                                ? 'var(--MainGreenColor)'
                                                                : '#ccc',
                                                    }}
                                                ></label>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                                <section className={style.disabled}>
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
                            </>
                        )}
                    </>
                )}
                <div className={`${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.saveButton}>
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    )
}
