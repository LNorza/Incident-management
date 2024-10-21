import { useCallback, useEffect, useState } from 'react'
import { Device, IOptions } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { CustomInput, CustomSelect } from '../../../ui'
import { useForm } from '../../../hooks'
import { toast } from 'sonner'
import { CircleX } from 'lucide-react'
import style from '../../style/modal.module.css'
import { getIncidentTypeOptions, getWorkTypeOptions } from '../../../utils/selectOptions/incidentOptions'
import { ICreateIncident } from '../../../utils/interface/incident'

interface Props {
    onClose: () => void
}

export const AddIncidentModal = ({ onClose }: Props) => {
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

    const { onInputChange, formState, updateFields } = useForm<ICreateIncident>({
        folio: '',
        device_id: '',
        date: new Date(),
        status: 'SENT',
        incident_type: '',
        work: '',
        period: 1,
        description: '',
        department_id: '',
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
                    `${API_BASE_URL}/locations-search?building_id=${buildingId}&department_id=${departmentId}`,
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

    const fetchDevices = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices-search?locationId=${location}`, {
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

    const handleTestSubmit = () => {
        // updateFields({
        //     department_id: building,
        //     device_id: device,
        //     incident_type: incidentType,
        //     work: workType,
        // })
        console.log('Soy el submit', formState)
        try {
            // const method = deviceId ? 'PUT' : 'POST'
            const url = `${API_BASE_URL}/incidents`

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formState),
            }).then((response) => {
                if (response.ok) {
                    toast.success('Se creo la incidencia correctamente')
                    onClose()
                }
            })
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al crear la incidencia')
        }
    }

    useEffect(() => {
        updateFields({
            department_id: building,
            device_id: device,
            incident_type: incidentType,
            work: workType,
        })
    }, [workType])

    useEffect(() => {
        fetchDepartment()
        fetchFolio()
    }, [])

    useEffect(() => {
        fetchDevices()
    }, [location])

    useEffect(() => {
        fetchOffices()
    }, [buildingId, fetchOffices])

    useEffect(() => {
        fetchBuildings()
    }, [departmentId, fetchBuildings])

    useEffect(() => {
        const work = getWorkTypeOptions(incidentType)
        setWorkTypeOptions(work)
    }, [incidentType])

    return (
        <>
            <div className={style.titleModal}>
                <CircleX />
                <h2>Agregar Incidencia</h2>
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
                        <section>
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
                        <section>
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
                        <section>
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
                            <CustomInput
                                isFormInput
                                name="description"
                                value={formState.description}
                                placeholder="Ingresa la descripción"
                                type="description"
                                onChange={onInputChange}
                                autoComplete="description"
                            />
                        </div>
                    </section>
                </div>
                <div className={` ${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={handleTestSubmit} className={style.saveButton}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    )
}
