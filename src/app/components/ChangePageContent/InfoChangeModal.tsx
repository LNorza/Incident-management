import { InfoIcon } from 'lucide-react'
import style from '../../style/modal.module.css'
import { CustomInput, CustomTextArea } from '../../../ui'
import { API_BASE_URL, InfoChangeRequest, sparePartsFormatOptions } from '../../../utils'
import { useForm } from '../../../hooks'
import { useCallback, useEffect, useState } from 'react'

interface Props {
    onClose: () => void
    changeId: string | undefined
}

export const InfoChangeModal = ({ onClose, changeId }: Props) => {
    const [technicianName, setTechnicianName] = useState<string | undefined>()

    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<InfoChangeRequest>({
        folio: '',
        created_at: '',
        technician_id: '',
        technician_name: '',
        device_name: '',
        spare_part: '',
        piece_to_change: '',
        price: '',
        description: '',
        approval_date: '',
        status: '',
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

            updateFields({
                folio: data.incident.folio,
                technician_id: data.incident.technician_id,
                device_name: data.incident.device_id.name,
                spare_part: data.spare_part,
                piece_to_change: sparePartsFormatOptions(data.piece_to_change),
                created_at: new Date(data.created_at).toLocaleDateString(),
                approval_date: new Date(data.approval_date).toLocaleDateString(),
                price: data.price,
                description: data.description,
                status: data.status,
            })
        } catch (error) {
            console.error('Error fetching incident:', error)
        }
    }, [])

    const fetchTechnicianName = useCallback(async () => {
        const techName = await getTechnicianName(formState.technician_id)
        setTechnicianName(techName)
    }, [formState.technician_id])

    useEffect(() => {
        const fetchData = async () => {
            await fetchChange()
            await fetchTechnicianName()
        }
        fetchData()
    }, [changeId, fetchChange, fetchTechnicianName])

    return (
        <>
            <div className={style.titleModal}>
                <InfoIcon size={40} />
                <h2>Información</h2>
            </div>
            <div className={style.modalDetail}>
                <div className={style.columnModal}>
                    <div className={style.rowModal}>
                        <section>
                            Folio de incidencia
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomInput
                                    isFormInput
                                    name="incident_folio"
                                    value={formState.folio}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        <section>
                            Fecha de solicitud
                            <div className={`${style.formInput}  ${style.disabled}`}>
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
                        <section>
                            Técnico
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomInput
                                    isFormInput
                                    name="technician"
                                    value={technicianName}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        <section>
                            Equipo
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomInput
                                    isFormInput
                                    name="device_name"
                                    value={formState.device_name}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                    </div>
                    <div className={style.rowModal}>
                        <section>
                            Pieza
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomInput
                                    isFormInput
                                    name="spare_part"
                                    value={formState.spare_part}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        <section>
                            Tipo de pieza
                            <div className={`${style.formInput}  ${style.disabled}`}>
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
                    <div className={style.rowModal}>
                        <section>
                            Precio
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomInput
                                    isFormInput
                                    name="price"
                                    value={formState.price}
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        {formState.status === 'APPROVED' && (
                            <section>
                                Fecha de aprobación
                                <div className={`${style.formInput}  ${style.disabled}`}>
                                    <CustomInput
                                        isFormInput
                                        name="approval_date"
                                        value={formState.approval_date}
                                        type="text"
                                        onChange={onInputChange}
                                    />
                                </div>
                            </section>
                        )}
                    </div>
                    <section>
                        Descripción
                        <div className={`${style.formDescription} ${style.disabled}`}>
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
