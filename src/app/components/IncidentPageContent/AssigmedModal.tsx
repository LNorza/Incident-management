import { useCallback, useEffect, useState } from 'react'
import { useForm } from '../../../hooks'
import {
    API_BASE_URL,
    getIncidentPriorityOptions,
    getIncidentTypeOptions,
    getUserDepartment,
    getUserRole,
    getWorkTypeOptions,
    IFormIncident,
    Incident,
    IOptions,
    translateIncident,
    UpdateIncidentDto,
} from '../../../utils'
import { CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import style from '../../style/modal.module.css'
import { Ban, UserRoundPlus } from 'lucide-react'
import { toast } from 'sonner'
import { getHoursIncident } from '../../utils'

interface Props {
    onClose: () => void
    incidentId?: string | undefined
    action?: string
}

export const AssigmedModal = ({ incidentId, onClose, action }: Props) => {
    const rol = 'TECHNICIAN'
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)
    const [technicians, setTechnicians] = useState<string | undefined>(undefined)
    const [priority, setPriority] = useState<string | undefined>(undefined)

    const [priorityOptions] = useState<IOptions[]>(getIncidentPriorityOptions)
    const [technicianOptions, setTechnicianOptions] = useState<IOptions[]>([])

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
        comments: '',
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
    const [updateIncident, setUpdateIncident] = useState<UpdateIncidentDto>({
        status: '',
        technician_id: '',
        priority: '',
    })

    const fetchUsers = useCallback(async () => {
        if (!departmentId) return
        try {
            const response = await fetch(`${API_BASE_URL}/users-search?department_id=${departmentId}&position=${rol}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setTechnicianOptions(
                data.map((technician: { _id: string; name: string }) => ({
                    label: technician.name,
                    value: technician._id,
                })),
            )
        } catch (err) {
            console.error(err)
        }
    }, [departmentId])

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id ?? undefined)
        } catch (err) {
            console.error(err)
        }
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
                toast.success(`Se actualizó' la incidencia correctamente`)
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
        fetchIncident()
    }, [])

    useEffect(() => {
        fetchDepartment()
        fetchUsers()
    }, [incidentData])

    useEffect(() => {
        if (action == 'REJECTED') {
            setUpdateIncident({
                status: 'REJECTED',
                comments: formState.comments,
            })
        } else {
            setUpdateIncident({
                status: 'ASSIGNED',
                technician_id: technicians,
                priority: priority,
            })
        }
    }, [priority, technicians])

    useEffect(() => {
        const createdAt = formState.created_at
        updateFields({
            work: translateIncident(formState.work, 'work'),
            incident_type: translateIncident(formState.incident_type, 'incident'),
            status: translateIncident(formState.status, 'status'),
            date: new Date(formState.date).toLocaleDateString(),
            arrived_date: getHoursIncident(new Date(incidentData.date)),
            created_at: createdAt ? new Date(createdAt).toLocaleDateString() : '',
        })
    }, [formState.date])

    console.log('action', action)

    return (
        <>
            <div className={style.titleModal}>
                {action != 'REJECTED' ? <UserRoundPlus size={40} /> : <Ban size={40} />}
                <h2>{action != 'REJECTED' ? 'Asignar incidencia' : 'Rechazar incidencia'}</h2>
                {/* <h2>Asignar incidencia</h2> */}
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

                    {action != 'REJECTED' && (
                        <div className={style.rowModal}>
                            <section>
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
                            <section>
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
