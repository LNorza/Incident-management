import {
    API_BASE_URL,
    getDeviceTypeOptions,
    IOptions,
    getTimeDurationOptions,
    getIncidentTypeOptions,
    IServices,
    formatDeviceType,
    IServicesModal,
} from '../../../utils'
import { BookText } from 'lucide-react'
import { CustomInput, CustomSelect, CustomTextArea } from '../../../ui'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useForm } from '../../../hooks'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    serviceData?: IServices | undefined
}

export const AddServicesModal = ({ onClose, serviceData }: Props) => {
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

    const saveService = async () => {
        const url = `${API_BASE_URL}/services${serviceData ? `/${serviceData._id}` : ''}`
        const method = serviceData ? 'PUT' : 'POST'
        const data = {
            service: formState.service,
            type: incidentType,
            device_type: deviceType,
            description: formState.description,
            duration: duration,
        }

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            })

            if (response.ok) {
                const message = serviceData ? 'actualizó' : 'creó'
                toast.success(`Se ${message} el servicio correctamente`)
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

    return (
        <>
            <div className={style.titleModal}>
                <BookText />
                <h2>Agregar servicio</h2>
            </div>
            <div className={style.modalDetail}>
                <div className={style.columnModal}>
                    <div className={style.rowModal}>
                        <section>
                            Servicio
                            <div className={style.formInput}>
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
                            <div className={style.formInput}>
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
                            <div className={style.formInput}>
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
                            <div className={style.formInput}>
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
                    <button onClick={saveService} className={style.saveButton}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    )
}
