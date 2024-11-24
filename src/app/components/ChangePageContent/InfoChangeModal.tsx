import { InfoIcon } from 'lucide-react'
import style from '../../style/modal.module.css'
import { CustomInput, CustomTextArea } from '../../../ui'
import { API_BASE_URL, formatSparePartType, IChange, sparePartsFormatOptions } from '../../../utils'
import { useForm } from '../../../hooks'
import { useCallback, useEffect, useState } from 'react'

interface Props {
    onClose: () => void
    changeId: string | undefined
}

export const InfoChangeModal = ({ onClose, changeId }: Props) => {
    const [technicianName, setTechnicianName] = useState<string | undefined>()

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<IChange>({
        approval_date: '',
        created_at: '',
        description: '',
        device_type: '',
        incident: {
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
        },
        falsename: '',
        piece_to_change: '',
        price: '',
        spare_part: '',

        status: '',
        updatedAt: '',
        _id: '',
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

    const fetchChange = useCallback(async () => {
        try {
            const url = `${API_BASE_URL}/change-requests/${changeId}`
            const response = await fetch(url, {
                credentials: 'include',
            })
            const data = await response.json()
            console.log('data', data)

            const formattedData = {
                ...data,
                piece_to_change: sparePartsFormatOptions(data.piece_to_change),
                created_at: new Date(data.created_at).toLocaleDateString(),
                updatedAt: new Date(data.updatedAt).toLocaleDateString(),
            }
            updateFields(formattedData)
        } catch (error) {
            console.error('Error fetching incident:', error)
        }
    }, [changeId])

    useEffect(() => {
        fetchChange()
    }, [])

    useEffect(() => {
        const fetchTechnicianName = async () => {
            const techName = await getTechnicianName(formState.incident.technician_id)
            setTechnicianName(techName)
        }
        fetchTechnicianName()
    }, [formState.incident.technician_id])

    return (
        <>
            <div className={style.titleModal}>
                <InfoIcon size={40} />
                <h2>Información</h2>
            </div>
            <div className={style.modalDetail}>
                <div className={style.columnModal}>
                    <div className={style.rowModal}>
                        <section className={style.disabled}>
                            Folio de incidencia
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="incident_folio"
                                    value={formState.incident.folio}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        <section className={style.disabled}>
                            Fecha de cambio
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
                            Técnico
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="technician"
                                    value={technicianName}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        <section className={style.disabled}>
                            Fecha de cambio
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="updated_at"
                                    value={formState.updatedAt}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>
                    <div className={style.rowModal}>
                        <section className={style.disabled}>
                            Pieza
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="spare_part"
                                    value={formState.spare_part}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        <section className={style.disabled}>
                            Tipo de pieza
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="piece_type"
                                    value={formState.piece_to_change}
                                    type="text"
                                    onChange={onInputChange}
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

                <div className={`${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.saveButton}>
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    )
}
