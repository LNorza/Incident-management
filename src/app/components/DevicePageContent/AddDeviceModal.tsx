import { useState } from 'react'
import { useForm } from '../../../hooks'
import { CustomCheckBox, CustomInput, CustomSelect } from '../../../ui'

import style from '../../style/modal.module.css'
import { IOptions } from '../../../utils/interface/options'

interface Props {
    onClose: () => void
}

export const AddDeviceModal = ({ onClose }: Props) => {
    const [temp1, setTemp1] = useState('Proyector') // Tipo temporal
    const [sharedBuilding, setSharedBuilding] = useState(false)
    const { onInputChange, formState } = useForm({
        name: '',
        model: '',
        buyDate: '',
        motherBoard: '',
        processor: '',
        graphicCard: '',
        ram: '',
        ramType: '',
        hardDrive: '',
        powerSupply: '',
        ip: '',
        mac: '',
        port: '',
        toner: '',
        potence: '',
        backupTime: '',
        brightness: '',
        scope: '',
    })
    const [optionTemp, setOptionTemp] = useState<IOptions[]>([
        { label: 'Opción 1', value: '1' },
        { label: 'Opción 2', value: '2' },
        { label: 'Opción 3', value: '3' },
    ])
    // const [type, setType] = useState<IOptions[]>([])

    //Funcion para manejar el select (Temporal)
    const handleSelect = (selected: { label: string; value: string }) => {
        console.log(selected)
    }

    return (
        <>
            <div className={style.titleModal}>
                <h2>Agregar Dispositivo</h2>
            </div>
            <div className={style.modalDetail}>
                {/*-------------------- Default elements --------------------*/}
                <div className={style.rowModal}>
                    <section>
                        Nombre
                        <CustomInput
                            isFormInput
                            name="name"
                            value={formState.name}
                            placeholder="Ingresa el nombre"
                            type="text"
                            onChange={onInputChange}
                            autoComplete="nameDevice"
                        />
                    </section>
                    <section>
                        Tipo
                        <CustomSelect textDefault="Selecciona el equipo" options={optionTemp} onSelect={handleSelect} />
                    </section>
                </div>

                <div className={style.rowModal}>
                    <section>
                        Modelo
                        <CustomInput
                            isFormInput
                            name="model"
                            value={formState.model}
                            placeholder="Ingresa el modelo"
                            type="text"
                            onChange={onInputChange}
                            autoComplete="modelDevice"
                        />
                    </section>
                    <section>
                        Marca
                        <CustomSelect textDefault="Selecciona la Marca" options={optionTemp} onSelect={handleSelect} />
                    </section>
                </div>

                <div className={style.rowModal}>
                    <section>
                        Edificio
                        <CustomSelect
                            textDefault="Selecciona el edificio"
                            options={optionTemp}
                            onSelect={handleSelect}
                        />
                    </section>
                    <section>
                        Oficina/Salon
                        <CustomSelect
                            textDefault="Selecciona la oficina/salon"
                            options={optionTemp}
                            onSelect={handleSelect}
                        />
                    </section>
                </div>

                <div className={style.rowModal}>
                    <section>
                        Fecha de compra
                        <CustomInput
                            isFormInput
                            name="model"
                            value={formState.model}
                            placeholder="Cambiar por input fecha"
                            type="text"
                            onChange={onInputChange}
                            autoComplete="modelDevice"
                        />
                    </section>
                    <section>
                        Años de garantía
                        <CustomSelect textDefault="Selecciona los años" options={optionTemp} onSelect={handleSelect} />
                    </section>
                </div>

                {/*-------------------- elements depends of type --------------------*/}
                {/*------------- elements depends of type -------------*/}
                {temp1 == 'PC' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                ¿Equipo compartido?
                                <CustomCheckBox checked={sharedBuilding} setChecked={setSharedBuilding} />
                            </section>
                            <section>
                                Usuario
                                <CustomSelect
                                    textDefault="Selecciona al usuario"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Sistema Operativo
                                <CustomSelect
                                    textDefault="Selecciona el sistema operativo"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                            <section>
                                Tarjeta madre
                                <CustomInput
                                    isFormInput
                                    name="motherBoard"
                                    value={formState.motherBoard}
                                    placeholder="Ingresa la tarjeta madre"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="motherBoardDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Procesador
                                <CustomInput
                                    isFormInput
                                    name="processor"
                                    value={formState.processor}
                                    placeholder="Ingresa el procesador"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="processorDevice"
                                />
                            </section>
                            <section>
                                Tarjeta Gráfica
                                <CustomInput
                                    isFormInput
                                    name="graphicCard"
                                    value={formState.graphicCard}
                                    placeholder="Ingresa la tarjeta gráfica"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="graphicCardDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Ram
                                <CustomInput
                                    isFormInput
                                    name="ram"
                                    value={formState.ram}
                                    placeholder="Ingresa el ramo de RAM"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="ramDevice"
                                />
                            </section>
                            <section>
                                Tipo de RAM
                                <CustomSelect
                                    textDefault="Selecciona tipo de RAM"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Disco Duro
                                <CustomInput
                                    isFormInput
                                    name="hardDrive"
                                    value={formState.hardDrive}
                                    placeholder="Ingresa el disco duro"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="hardDriveDevice"
                                />
                            </section>
                            <section>
                                Fuente de Poder
                                <CustomInput
                                    isFormInput
                                    name="powerSupply"
                                    value={formState.powerSupply}
                                    placeholder="Ingresa la fuente de poder"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="powerSupplyDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Dirección IP
                                <CustomInput
                                    isFormInput
                                    name="ip"
                                    value={formState.ip}
                                    placeholder="Ingresa el Dirección IP"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="ipDevice"
                                />
                            </section>
                            <section>
                                Dirección MAC
                                <CustomInput
                                    isFormInput
                                    name="mac"
                                    value={formState.mac}
                                    placeholder="Ingresa la Dirección MAC"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="macDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Puerto al que está conectado
                                <CustomInput
                                    isFormInput
                                    name="port"
                                    value={formState.port}
                                    placeholder="Ingresa el puerto"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="portDevice"
                                />
                            </section>
                        </div>
                    </>
                )}
                {temp1 == 'Laptop' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Sistema Operativo
                                <CustomSelect
                                    textDefault="Selecciona el sistema operativo"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                            <section>
                                Disco Duro
                                <CustomInput
                                    isFormInput
                                    name="hardDrive"
                                    value={formState.hardDrive}
                                    placeholder="Ingresa el disco duro"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="hardDriveDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Procesador
                                <CustomInput
                                    isFormInput
                                    name="processor"
                                    value={formState.processor}
                                    placeholder="Ingresa el procesador"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="processorDevice"
                                />
                            </section>
                            <section>
                                Tarjeta Gráfica
                                <CustomInput
                                    isFormInput
                                    name="graphicCard"
                                    value={formState.graphicCard}
                                    placeholder="Ingresa la tarjeta gráfica"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="graphicCardDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Ram
                                <CustomInput
                                    isFormInput
                                    name="ram"
                                    value={formState.ram}
                                    placeholder="Ingresa el ramo de RAM"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="ramDevice"
                                />
                            </section>
                            <section>
                                Tipo de RAM
                                <CustomSelect
                                    textDefault="Selecciona tipo de RAM"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Dirección IP
                                <CustomInput
                                    isFormInput
                                    name="ip"
                                    value={formState.ip}
                                    placeholder="Ingresa el Dirección IP"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="ipDevice"
                                />
                            </section>
                            <section>
                                Dirección MAC
                                <CustomInput
                                    isFormInput
                                    name="mac"
                                    value={formState.mac}
                                    placeholder="Ingresa la Dirección MAC"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="macDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Puerto al que está conectado
                                <CustomInput
                                    isFormInput
                                    name="port"
                                    value={formState.port}
                                    placeholder="Ingresa el puerto"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="portDevice"
                                />
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Impresora' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Tipo de impresora
                                <CustomSelect
                                    textDefault="Selecciona tipo de impresora"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                            <section>
                                Toner
                                <CustomInput
                                    isFormInput
                                    name="toner"
                                    value={formState.toner}
                                    placeholder="Ingresa el toner"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="tonerDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Tinta
                                <CustomSelect
                                    textDefault="Selecciona Tinta"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Scanner
                                <CustomCheckBox checked={sharedBuilding} setChecked={setSharedBuilding} />
                            </section>
                            <section>
                                Conexión inhalambrica
                                <CustomCheckBox checked={sharedBuilding} setChecked={setSharedBuilding} />
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Switch' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Dirección MAC
                                <CustomInput
                                    isFormInput
                                    name="mac"
                                    value={formState.mac}
                                    placeholder="Ingresa la Dirección MAC"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="macDevice"
                                />
                            </section>
                            <section>
                                Cantidad de puertos
                                <CustomInput
                                    isFormInput
                                    name="port"
                                    value={formState.port}
                                    placeholder="Ingresa el puerto"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="portDevice"
                                />
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Router' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Tipo de Router
                                <CustomSelect
                                    textDefault="Selecciona tipo de router"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                            <section>
                                Dirección IP
                                <CustomInput
                                    isFormInput
                                    name="ip"
                                    value={formState.ip}
                                    placeholder="Ingresa el ip"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="ipDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Dirección MAC
                                <CustomInput
                                    isFormInput
                                    name="mac"
                                    value={formState.mac}
                                    placeholder="Ingresa la Dirección MAC"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="macDevice"
                                />
                            </section>
                            <section>
                                Cantidad de puertos
                                <CustomInput
                                    isFormInput
                                    name="port"
                                    value={formState.port}
                                    placeholder="Ingresa el puerto"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="portDevice"
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Conectividad
                                <CustomSelect
                                    textDefault="Selecciona tipo de conectividad"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                            <section>
                                Capacidad
                                <CustomSelect
                                    textDefault="Selecciona rango de capacidad"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'No-break' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Potencia
                                <CustomInput
                                    isFormInput
                                    name="potence"
                                    value={formState.potence}
                                    placeholder="Ingresa la potencia"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="potenceDevice"
                                />
                            </section>
                            <section>
                                Cantidad de enchufes
                                <CustomSelect
                                    textDefault="Selecciona la cantidad"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Tiempo de respaldo
                                <CustomInput
                                    isFormInput
                                    name="backupTime"
                                    value={formState.backupTime}
                                    placeholder="Ingresa el tiempo de respaldo"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="backupTimeDevice"
                                />
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Regulador' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Potencia
                                <CustomInput
                                    isFormInput
                                    name="potence"
                                    value={formState.potence}
                                    placeholder="Ingresa la potencia"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="potenceDevice"
                                />
                            </section>
                            <section>
                                Cantidad de enchufes
                                <CustomSelect
                                    textDefault="Selecciona la cantidad"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Proyector' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Resolución
                                <CustomSelect
                                    textDefault="Selecciona la resolución"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                            <section>
                                Conectividad
                                <CustomSelect
                                    textDefault="Selecciona la conectividad"
                                    options={optionTemp}
                                    onSelect={handleSelect}
                                />
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Brillo
                                <CustomInput
                                    isFormInput
                                    name="brightness"
                                    value={formState.brightness}
                                    placeholder="Ingresa el tiempo de respaldo"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="brightnessDevice"
                                />
                            </section>
                            <section>
                                Alcance
                                <CustomInput
                                    isFormInput
                                    name="scope"
                                    value={formState.scope}
                                    placeholder="Ingresa el tiempo de respaldo"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="scopeDevice"
                                />
                            </section>
                        </div>
                    </>
                )}

                <div className={style.modalButtonContainer}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    <button className={style.saveButton}>Guardar</button>
                </div>
            </div>
        </>
    )
}
