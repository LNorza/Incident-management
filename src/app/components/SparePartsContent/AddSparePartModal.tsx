import {
    API_BASE_URL,
    getDeviceTypeOptions,
    IOptions,
    ISparePartsModal,
    ISpareParts,
    getSparePartOptions,
    formatSparePartType,
    formatDeviceType,
    getSpareUnitsOptions,
} from '../../../utils'
import { Cpu } from 'lucide-react'
import { CustomInput, CustomSelect } from '../../../ui'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useForm } from '../../../hooks'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    spareData?: ISpareParts | undefined
}

export const AddSparePartModal = ({ onClose, spareData }: Props) => {
    const [deviceOptions] = useState<IOptions[]>(getDeviceTypeOptions)
    const [device, setDevice] = useState<string | undefined>(undefined)
    const [spareTypeOptions, setSpareTypeOptions] = useState<IOptions[]>([])
    const [spareType, setSpareType] = useState<string | undefined>(undefined)
    const [spareQuantityOptions] = useState<IOptions[]>(getSpareUnitsOptions)
    const [spareQuantity, setSpareQuantity] = useState<string | undefined>(undefined)

    const { onInputChange, formState, updateFields } = useForm<ISparePartsModal>({
        name: '',
        device_type: '',
        type: '',
        quantity: '',
        description: '',
        price: '',
    })
    useEffect(() => {
        if (spareData) {
            updateFields({
                name: spareData.name,
                description: spareData.description,
                price: spareData.price.toString(),
            })
            const formattedData = {
                ...spareData,
                device_type: formatDeviceType(spareData.device_type),
            }
            setDevice(formattedData.device_type)
            const selectedQuantity = spareQuantityOptions.find(
                (option) => option.value === formattedData.quantity.toString(),
            )?.value
            setSpareQuantity(selectedQuantity)
        }
    }, [spareData, deviceOptions, spareQuantityOptions])

    useEffect(() => {
        if (device) {
            const options = getSparePartOptions(device)
            setSpareTypeOptions(options)
        }
    }, [device])

    useEffect(() => {
        if (spareData && spareTypeOptions.length > 0) {
            const formattedType = formatSparePartType(spareData.type)
            setSpareType(spareTypeOptions.find((option) => option.value === formattedType)?.value)
        }
    }, [spareData, spareTypeOptions])

    const saveIncident = async () => {
        const url = `${API_BASE_URL}/spare-parts${spareData ? `/${spareData._id}` : ''}`
        const method = spareData ? 'PUT' : 'POST'
        const data = {
            name: formState.name,
            device_type: device,
            type: spareType,
            quantity: spareQuantity,
            description: formState.description,
            price: formState.price,
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
                const message = spareData ? 'actualizó' : 'creó'
                toast.success(`Se ${message} la pieza de repuesto correctamente`)
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
                <Cpu />
                <h2>Agregar pieza de repuesto</h2>
            </div>
            <div className={style.modalDetail}>
                <div className={style.columnModal}>
                    <div className={style.rowModal}>
                        <section>
                            Nombre de la pieza
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="name"
                                    value={formState.name}
                                    placeholder="Ingresa el nombre"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="name"
                                />
                            </div>
                        </section>
                        <section className={`${spareData != undefined ? style.disabled : ''}`}>
                            Tipo de equipo
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={device}
                                    placeholder="Selecciona el tipo de equipo"
                                    options={deviceOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setDevice(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section className={`${spareData != undefined ? style.disabled : ''}`}>
                            Tipo de pieza
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={spareType}
                                    placeholder="Selecciona el tipo de pieza"
                                    options={spareTypeOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setSpareType(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                        <section className={`${spareData != undefined ? style.disabled : ''}`}>
                            Unidades
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={spareQuantity}
                                    placeholder="Selecciona las unidades"
                                    options={spareQuantityOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setSpareQuantity(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Descripción
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="description"
                                    value={formState.description}
                                    placeholder="Ingresa la descripción"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="description"
                                />
                            </div>
                        </section>
                        <section>
                            Precio por unidad
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="price"
                                    value={formState.price}
                                    placeholder="Ingresa el precio"
                                    type="number"
                                    onChange={onInputChange}
                                    autoComplete="price"
                                />
                            </div>
                        </section>
                    </div>
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
