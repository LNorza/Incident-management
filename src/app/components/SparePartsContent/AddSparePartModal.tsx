import { useEffect, useState } from 'react'
import { useForm } from '../../../hooks'
import { CustomInput, CustomSelect } from '../../../ui'
import style from '../../style/modal.module.css'
import { Cpu } from 'lucide-react'
import { IOptions, ISparePartsModal } from '../../../utils'
import { toast } from 'sonner'

interface Props {
    onClose: () => void
    incidentId?: string | undefined
}

export const AddSparePartModal = ({ onClose, incidentId }: Props) => {
    const [device, setDevice] = useState<string | undefined>(undefined)
    const [spareType, setSpareType] = useState<string | undefined>(undefined)
    const [spareUnits, setSpareUnits] = useState<string | undefined>(undefined)

    const [deviceTypeOptions, setDeviceTypeOptions] = useState<IOptions[]>([])
    const [spareTypeOptions, setSpareTypeOptions] = useState<IOptions[]>([])
    const [spareUnitsOptions, setSpareUnitsOptions] = useState<IOptions[]>([])

    const { onInputChange, formState, updateFields } = useForm<ISparePartsModal>({
        name: '',
        device_type: '',
        spare_Type: '',
        units: '',
        description: '',
        unit_price: '',
    })

    const saveIncident = async () => {
        toast.success('Pieza de repuesto agregada correctamente')
        console.log('formState', formState)
        onClose()
    }

    useEffect(() => {
        updateFields({
            name: formState.name,
            device_type: device,
            spare_Type: spareType,
            units: spareUnits,
            description: formState.description,
            unit_price: formState.unit_price,
        })
    }, [formState.description, device, spareType, spareUnits])

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
                        <section className={`${incidentId != undefined ? style.disabled : ''}`}>
                            Tipo de equipo
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={device}
                                    placeholder="Selecciona el tipo de equipo"
                                    options={deviceTypeOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setDevice(selected.value)
                                        // setBuildingId(selected.value)
                                        // setBuilding(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section className={`${incidentId != undefined ? style.disabled : ''}`}>
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
                        <section className={`${incidentId != undefined ? style.disabled : ''}`}>
                            Unidades
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={spareUnits}
                                    placeholder="Selecciona las unidades"
                                    options={spareUnitsOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setSpareUnits(selected.value)
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
                                    name="unit_price"
                                    value={formState.unit_price}
                                    placeholder="Ingresa el precio"
                                    type="number"
                                    onChange={onInputChange}
                                    autoComplete="unit_price"
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
