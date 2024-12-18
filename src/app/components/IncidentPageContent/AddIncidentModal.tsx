import { useCallback, useEffect, useState } from 'react'
import { CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import {
    API_BASE_URL,
    getIncidentTypeOptions,
    getUserDepartment,
    getWorkTypeOptions,
    ICreateIncident,
    IFormIncident,
    Incident,
    IOptions,
    UpdateIncidentDto,
} from '../../../utils'
import { useForm } from '../../../hooks'
import { CircleX } from 'lucide-react'
import { toast } from 'sonner'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    incidentId?: string | undefined
}

export const AddIncidentModal = ({ incidentId, onClose }: Props) => {
    const [buildingId, setBuildingId] = useState<string | undefined>(undefined)
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)

    const [buildingsOptions, setBuildingsOptions] = useState<IOptions[]>([])
    const [officesOptions, setOfficesOptions] = useState<IOptions[]>([])
    const [deviceOptions, setDeviceOptions] = useState<IOptions[]>([])
    const [incidentTypeOptions] = useState<IOptions[]>(getIncidentTypeOptions)
    const [workTypeOptions, setWorkTypeOptions] = useState<IOptions[]>()

    const [building, setBuilding] = useState<string | undefined>(undefined)
    const [location, setLocation] = useState<string | undefined>(undefined)
    const [device, setDevice] = useState<string | undefined>(undefined)
    const [incidentType, setIncidentType] = useState<string | undefined>(undefined)
    const [workType, setWorkType] = useState<string | undefined>(undefined)
    //State para nueva incidencia
    const [newIncident, setNewIncident] = useState<ICreateIncident>({
        folio: '',
        device_id: '',
        date: new Date(),
        status: 'SENT',
        incident_type: '',
        work: '',
        period: 1,
        description: '',
        department_id: '',
        isProblem: false,
        root_cause: '',
        problem_solution: '',
    })

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
        technician_specialty: '',
        diagnostic: '',
        isProblem: false,
        root_cause: '',
        problem_solution: '',
    })

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<IFormIncident>({
        folio: '',
        building: '',
        location: '',
        device: '',
        incident_type: '',
        worktype: '',
        description: '',
    })

    const fetchFolio = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents-folio`, {
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`)
            }

            const { folio } = await response.json()
            updateFields({ folio: folio.toString() })
        } catch (error) {
            console.error('Error al obtener el folio:', error)
        }
    }

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id ?? undefined)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchDevices = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices-search?location_id=${location}`, {
                credentials: 'include',
            })
            const data = await response.json()

            setDeviceOptions(
                data.map((building: { _id: string; name: string }) => ({
                    label: building.name,
                    value: building._id,
                })),
            )
        } catch (err) {
            toast.error('Error al obtener los dispositivos')
        }
    }

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

    const fetchBuildings = useCallback(async () => {
        if (departmentId) {
            try {
                const response = await fetch(`${API_BASE_URL}/buildings-search?department_id=${departmentId}`, {
                    credentials: 'include',
                })
                const data = await response.json()
                setBuildingsOptions(
                    data.map((building: { _id: string; name: string }) => ({
                        label: building.name,
                        value: building._id,
                    })),
                )
            } catch (error) {
                toast.error('Error al obtener los edificios')
            }
        }
    }, [departmentId])

    const fetchOffices = useCallback(async () => {
        if (building) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/locations-search?building_id=${buildingId}&location_id=${departmentId}`,
                    {
                        credentials: 'include',
                    },
                )
                const data = await response.json()
                setOfficesOptions(
                    data.map((office: { _id: string; name: string }) => ({
                        label: office.name,
                        value: office._id,
                    })),
                )
            } catch (error) {
                console.error('Error al obtener las oficinas/salones')
            }
        }
    }, [building])

    const validateFields = () => {
        if (building === undefined) {
            toast.error('Selecciona un edificio')
            return false
        }

        if (location === undefined) {
            toast.error('Selecciona una sublocalización')
            return false
        }

        if (device === undefined) {
            toast.error('Selecciona un equipo')
            return false
        }

        if (incidentType === undefined) {
            toast.error('Selecciona un tipo de incidencia')
            return false
        }

        if (workType === undefined) {
            toast.error('Selecciona un tipo de trabajo')
            return false
        }

        if (formState.description === '') {
            toast.error('Ingresa una descripción')
            return false
        }
        return true
    }

    const saveIncident = async () => {
        const validate = validateFields()

        if (validate === false) {
            return
        }

        const url = `${API_BASE_URL}/incidents${incidentId ? `/${incidentId}` : ''}`
        const method = incidentId ? 'PUT' : 'POST'
        const incidentData = incidentId ? updateIncident : newIncident

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(incidentData),
            })

            if (response.ok) {
                toast.success(`Se ${incidentId ? 'actualizó' : 'creó'} la incidencia correctamente`)
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
        fetchFolio()
        fetchDepartment()
    }, [])

    useEffect(() => {
        fetchOffices()
        if (building != undefined && location != undefined) {
            fetchDevices()
        }
    }, [buildingId, fetchOffices, location])

    useEffect(() => {
        const fetchData = async () => {
            await fetchBuildings()
            if (incidentId) {
                await fetchFolio()
                await fetchIncident()
            }
        }
        fetchData()
    }, [incidentId, departmentId, fetchBuildings])

    useEffect(() => {
        const work = getWorkTypeOptions(incidentType)
        setWorkTypeOptions(work)
    }, [incidentType])

    useEffect(() => {
        updateFields({
            building: building,
            device: device,
            location: location,
            incident_type: incidentType,
            worktype: workType,
        })
    }, [workType])

    useEffect(() => {
        setNewIncident({
            folio: formState.folio,
            device_id: formState.device,
            date: new Date(),
            status: 'SENT',
            incident_type: formState.incident_type,
            work: formState.worktype,
            period: 1,
            description: formState.description,
            department_id: departmentId ?? '',
            isProblem: false,
            root_cause: '',
            problem_solution: '',
        })
    }, [formState.description])

    useEffect(() => {
        setUpdateIncident({
            incident_type: formState.incident_type,
            work: formState.worktype,
            description: formState.description,
        })
    }, [formState.incident_type, formState.worktype, formState.description])

    useEffect(() => {
        updateFields({
            folio: incidentData.folio,
            description: incidentData.description,
        })
        setBuilding(
            buildingsOptions.find((building) => building.value === incidentData.device_id.location_id.building_id._id)
                ?.value,
        )
        setBuildingId(incidentData.device_id.location_id.building_id._id)
        setLocation(officesOptions.find((office) => office.value === incidentData.device_id.location_id._id)?.value)
        setDevice(deviceOptions.find((device) => device.value === incidentData.device_id._id)?.value)
        setIncidentType(incidentTypeOptions.find((incident) => incident.value === incidentData.incident_type)?.value)
        setWorkType(workTypeOptions?.find((work) => work.value === incidentData.work)?.value)

        updateFields({
            device: device,
            incident_type: incidentType,
            worktype: workType,
        })
    }, [incidentData, incidentId])

    return (
        <>
            <div className={style.titleModal}>
                <CircleX />
                <h2>{!incidentId ? 'Agregar Incidencia' : 'Editar Incidencia'}</h2>
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
                        <section className={`${incidentId != undefined ? style.disabled : ''}`}>
                            Edificio
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={building}
                                    placeholder="Selecciona el edificio"
                                    options={buildingsOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setBuildingId(selected.value)
                                        setBuilding(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section className={`${incidentId != undefined ? style.disabled : ''}`}>
                            Sublocalización
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={location}
                                    placeholder="Selecciona la oficina/salon"
                                    options={officesOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setLocation(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                        <section className={`${incidentId != undefined ? style.disabled : ''}`}>
                            Equipo
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={device}
                                    placeholder="Selecciona el equipo"
                                    options={deviceOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setDevice(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Tipo de Incidencia
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={incidentType}
                                    placeholder="Selecciona el tipo de incidencia"
                                    options={incidentTypeOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setIncidentType(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                        <section>
                            Trabajo
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={workType}
                                    placeholder="Selecciona el tipo de trabajo"
                                    options={workTypeOptions ?? []}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setWorkType(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <section>
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
