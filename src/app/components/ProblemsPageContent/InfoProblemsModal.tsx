import {
    getDeviceTypeOptions,
    IOptions,
    getTimeDurationOptions,
    getIncidentTypeOptions,
    formatDeviceType,
    IServicesModal,
    IServices,
} from '../../../utils'
import { InfoIcon } from 'lucide-react'
import { CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import { useEffect, useState } from 'react'
import { useForm } from '../../../hooks'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    serviceData?: IServices | undefined
}

export const InfoProblemsModal = ({ onClose, serviceData }: Props) => {
    const [deviceType, setDeviceType] = useState<string | undefined>(undefined)
    const [deviceTypeOptions] = useState<IOptions[]>(getDeviceTypeOptions)

    const [duration, setDuration] = useState<string | undefined>(undefined)
    const [durationOptions] = useState<IOptions[]>(getTimeDurationOptions())

    const [incidentType, setIncidentType] = useState<string | undefined>(undefined)
    const [incidentTypeOptions] = useState<IOptions[]>(getIncidentTypeOptions)

    const { onInputChange, formState, onTextAreaChange, updateFields } = useForm<IServicesModal>({
        service: '',
        description: '',
    })

    useEffect(() => {
        if (serviceData) {
            console.log(serviceData)
            updateFields({
                service: serviceData.service,
                description: serviceData.description,
            })
            setIncidentType(incidentTypeOptions.find((option) => option.label === serviceData.type)?.value)
            setDeviceType(
                deviceTypeOptions.find((option) => option.value === formatDeviceType(serviceData.device_type))?.value,
            )
            setDuration(durationOptions.find((option) => option.label === serviceData.duration.toString())?.value)
        }
    }, [serviceData])

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
                            Servicio
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomInput
                                    isFormInput
                                    name="service"
                                    value={formState.service}
                                    placeholder="Ingresa el servicio"
                                    type="text"
                                    onChange={onInputChange}
                                />
                            </div>
                        </section>
                        <section>
                            Tipo de incidencia
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomSelect
                                    value={incidentType}
                                    placeholder="Selecciona el tipo de equipo"
                                    options={incidentTypeOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setIncidentType(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Tipo de equipo
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomSelect
                                    value={deviceType}
                                    placeholder="Selecciona el tipo de pieza"
                                    options={deviceTypeOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setDeviceType(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                        <section>
                            Duración
                            <div className={`${style.formInput}  ${style.disabled}`}>
                                <CustomSelect
                                    value={duration}
                                    placeholder="Selecciona las unidades"
                                    options={durationOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setDuration(selected.value)
                                    }}
                                />
                            </div>
                        </section>
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
                <div className={` ${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.saveButton}>
                        Aceptar
                    </button>
                </div>
            </div>
        </>
    )
}
