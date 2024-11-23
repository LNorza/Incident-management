import { InfoIcon } from 'lucide-react'
import style from '../../style/modal.module.css'
import { CustomInput, CustomTextArea } from '../../../ui'
import { IChange } from '../../../utils'
import { useForm } from '../../../hooks'

interface Props {
    onClose: () => void
}

export const InfoChangeModal = ({ onClose }: Props) => {
    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<IChange>({
        _id: '',
        incident_folio: '',
        updatedAt: '',
        created_at: '',
        incident: [],
        technician: '',
        device_type: '',
        spare_part: '',
        status: '',
        piece_type: '',
        description: '',
    })
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
                                    value={formState.incident_folio}
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
                                    value={formState.technician}
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
                                    value={formState.piece_type}
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
