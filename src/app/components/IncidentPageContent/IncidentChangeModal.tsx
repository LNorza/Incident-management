import { useCallback, useEffect, useState } from 'react'
import { CustomCheckBox, CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import {
    API_BASE_URL,
    getUserDepartment,
    getUserRole,
    ICreateChange,
    Incident,
    IncidentState,
    IOptions,
} from '../../../utils'
import { ArrowLeftRight } from 'lucide-react'
import style from '../../style/modal.module.css'
import { useForm } from '../../../hooks'

interface Props {
    onClose: () => void
    incidentId?: string
    status?: IncidentState
}

export const IncidentChangeModal = ({ incidentId, onClose }: Props) => {
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)

    const [partsToChangeOptions, setPartsToChangeOptions] = useState<IOptions[]>([])
    const [partsToReplaceOptions, setPartsToReplaceOptions] = useState<IOptions[]>([])
    const [partTypeOptions, setPartTypeOptions] = useState<IOptions[]>([])

    const [partsToChange, setPartsToChange] = useState<string | undefined>(undefined)
    const [partsToReplace, setPartsToReplace] = useState<string | undefined>(undefined)
    const [partType, setPartType] = useState<string | undefined>(undefined)
    const [existPart, setExistPart] = useState(false)

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

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<ICreateChange>({
        piece_to_change: '',
        spare_part: '',
        device_type: '',
        make_request: false,
        name: '',
        price: '',
        piece_type: '',
        description: '',
        incident: incidentId ?? '',
    })

    const fetchDepartment = useCallback(async () => {
        if (!departmentId) {
            try {
                const id = await getUserDepartment()
                setDepartmentId(id ?? undefined)
            } catch (err) {
                console.error(err)
            }
        }
    }, [departmentId])

    const fetchIncident = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, { credentials: 'include' })
            const data = await response.json()
            setIncidentData(data)
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }, [incidentId])

    useEffect(() => {
        const fetchData = async () => {
            await fetchDepartment()
            await fetchIncident()
        }
        fetchData()
    }, [])

    return (
        <>
            <div className={style.titleModal}>
                <ArrowLeftRight size={40} />
                <h2>Realizar cambios</h2>
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
                                    value={incidentData.folio}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>

                        <section className={style.disabled}>
                            Edificio
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="device"
                                    value={incidentData.device_id.location_id.building_id.name}
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
                                    name="folio"
                                    value={incidentData.device_id.location_id.name}
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
                                    value={incidentData.device_id.name}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Pieza a cambiar
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={partsToChange}
                                    placeholder="Selecciona la pieza a cambiar"
                                    options={partsToChangeOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setPartsToChange(selected.value)
                                    }}
                                />
                            </div>
                        </section>

                        <section>
                            Pieza de repuesto
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={partsToReplace}
                                    placeholder="Selecciona la pieza de repuesto"
                                    options={partsToReplaceOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setPartsToReplace(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            ¿La pieza de repuesto se encuentra en las opciones?
                            <CustomCheckBox checked={existPart} setChecked={setExistPart} />
                        </section>

                        <section>
                            Nombre de la pieza
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="namePart"
                                    value={''}
                                    placeholder="Ingresa el nombre"
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Precio aproximado
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="price"
                                    value={''}
                                    placeholder="Ingresa el precio"
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>

                        <section className={style.disabled}>
                            Tipo de pieza
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={partType}
                                    placeholder="Selecciona el tipo de pieza"
                                    options={partTypeOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setPartType(selected.value)
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
                                value={formState.description || ''}
                                type="description"
                                onChange={onTextAreaChange}
                            />
                        </div>
                    </section>
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
