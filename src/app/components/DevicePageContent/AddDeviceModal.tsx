import { useEffect, useState, useCallback } from 'react'
import { getUserDepartment } from '../../../utils/api/userData'
import { useForm } from '../../../hooks'
import { CustomCheckBox, CustomInput, CustomSelect } from '../../../ui'
import { Laptop } from 'lucide-react'
import { toast } from 'sonner'
import style from '../../style/modal.module.css'
import { DateInput } from 'rsuite'
import { IOptions } from '../../../utils/interface/options'
import API_BASE_URL from '../../../utils/api/apiConfig'

interface Props {
    onClose: () => void
}

export const AddDeviceModal = ({ onClose }: Props) => {
    const [temp1, setTemp1] = useState('') // Tipo temporal
    const [sharedBuilding, setSharedBuilding] = useState(false)
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const [optionTemp] = useState<IOptions[]>([
        { label: 'Opción 1', value: '1' },
        { label: 'Opción 2', value: '2' },
        { label: 'Opción 3', value: '3' },
    ])
    const deviceTypeOptions: IOptions[] = [
        { label: 'PC', value: 'PC' },
        { label: 'Laptop', value: 'Laptop' },
        { label: 'Impresora', value: 'Impresora' },
        { label: 'Switch', value: 'Switch' },
        { label: 'Router', value: 'Router' },
        { label: 'No-break', value: 'No-break' },
        { label: 'Regulador', value: 'Regulador' },
        { label: 'Proyector', value: 'Proyector' },
    ]
    const brandOptions: IOptions[] = [
        { label: 'HP', value: 'HP' },
        { label: 'Dell', value: 'DELL' },
        { label: 'Lenovo', value: 'LENOVO' },
        { label: 'Asus', value: 'ASUS' },
        { label: 'Acer', value: 'ACER' },
        { label: 'Apple', value: 'APPLE' },
        { label: 'Samsung', value: 'SAMSUNG' },
        { label: 'Sony', value: 'SONY' },
        { label: 'Toshiba', value: 'TOSHIBA' },
    ]
    const warrantyYearsOptions: IOptions[] = [
        { label: '1 año', value: '1' },
        { label: '2 años', value: '2' },
        { label: '3 años', value: '3' },
        { label: '4 años', value: '4' },
        { label: '5 años', value: '5' },
    ]
    const userOptions: IOptions[] = [
        { label: 'Usuario 1', value: '1' },
        { label: 'Usuario 2', value: '2' },
        { label: 'Usuario 3', value: '3' },
        { label: 'Usuario 4', value: '4' },
        { label: 'Usuario 5', value: '5' },
    ]
    const osOptions: IOptions[] = [
        { label: 'Windows 10', value: 'WINDOWS_10' },
        { label: 'Windows 8', value: 'WINDOWS_8' },
        { label: 'Windows 7', value: 'WINDOWS_7' },
        { label: 'Windows XP', value: 'WINDOWS_XP' },
        { label: 'Windows Vista', value: 'WINDOWS_VISTA' },
        { label: 'Linux', value: 'LINUX' },
        { label: 'Mac OS', value: 'MAC_OS' },
    ]
    const ramTypeOptions: IOptions[] = [
        { label: 'DDR4', value: 'DDR4' },
        { label: 'DDR5', value: 'DDR%' },
    ]

    const { onInputChange, formState } = useForm({
        name: '',
        model: '',
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
    const printerTypeOptions: IOptions[] = [
        { label: 'Laser', value: 'LASER' },
        { label: 'Inyección de tinta', value: 'INKJET' },
        { label: 'Matriz de punto', value: 'DOT_MATRIX' },
    ]
    const inkOptions: IOptions[] = [
        { label: 'Tinta a base de agua', value: 'WATER_BASED_INK' },
        { label: 'Tinta a base de aceite', value: 'OIL_BASED_INK' },
        { label: 'Tinta a base de solvente', value: 'SOLVENT_BASED_INK' },
    ]
    const [buyDate, setBuyDate] = useState<Date | null>(null)
    const [selectedDeviceType, setSelectedDeviceType] = useState<IOptions | null>(null)
    const [brand, setBrand] = useState<string | null>(null)
    const [buildingsOptions, setBuildingsOptions] = useState<IOptions[]>([])
    const [building, setBuilding] = useState<string | null>(null)
    const [officesOptions, setOfficesOptions] = useState<IOptions[]>([])
    const [location, setLocation] = useState<string | null>(null)
    const [warrantyYears, setWarrantyYears] = useState<string | null>(null)
    const [user, setUser] = useState<string | null>(null)
    const [os, setOs] = useState<string | null>(null)
    const [ramType, setRamType] = useState<string | null>(null)
    const [laptopWifiConnection, setLaptopWifiConnection] = useState(false)
    const [printerType, setPrinterType] = useState<string | null>(null)
    const [inkType, setInkType] = useState<string | null>(null)
    const [scanner, setScanner] = useState(false)
    const [wifiConnection, setWifiConnection] = useState(false)

    useEffect(() => {
        fetchDepartment()
    })

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchBuildings = useCallback(async () => {
        if (departmentId) {
            try {
                const response = await fetch(`${API_BASE_URL}/buildings-search?departmentId=${departmentId}`, {
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
                console.error('Error fetching buildings:', error)
            }
        }
    }, [departmentId])

    useEffect(() => {
        fetchBuildings()
    }, [departmentId, fetchBuildings])

    useEffect(() => {
        fetchOffices()
    }, [building])

    const fetchOffices = useCallback(async () => {
        if (building) {
            try {
                const response = await fetch(`${API_BASE_URL}/locations-search?buildingId=${building}`, {
                    credentials: 'include',
                })
                const data = await response.json()
                setOfficesOptions(
                    data.map((office: { _id: string; name: string }) => ({
                        label: office.name,
                        value: office._id,
                    })),
                )
            } catch (error) {
                console.error('Error fetching offices:', error)
            }
        }
    }, [building])

    const handleSelect = (selected: { label: string; value: string }) => {
        console.log(selected)
    }

    const handleSelectType = (selected: { label: string; value: string }) => {
        setSelectedDeviceType(selected)
        setTemp1(selected.value)
    }

    const saveDevice = () => {
        console.log(formState)

        if (selectedDeviceType === null) {
            toast.error('No se ha seleccionado el tipo de dispositivo')
            return
        }

        let deviceData = {}
        if (selectedDeviceType.value === 'PC') {
            deviceData = {
                name: formState.name,
                type: 'PC',
                status: 'ACTIVE',
                specs: {
                    os: os,
                    motherBoard: formState.motherBoard,
                    cpu: formState.processor,
                    gpu: formState.graphicCard,
                    ram: formState.ram,
                    ramType: ramType,
                    storage: formState.hardDrive,
                    powerSupply: formState.powerSupply,
                    ipAddress: formState.ip,
                    macAddress: formState.mac,
                    connectedPort: formState.port,
                    isShared: sharedBuilding,
                    user_id: user,
                },
                deviceModel: formState.model,
                brand: brand,
                purchaseDate: buyDate,
                warrantyYears: warrantyYears,
                location_id: location,
            }
        } else if (selectedDeviceType.value === 'Laptop') {
            deviceData = {
                name: formState.name,
                type: 'LAPTOP',
                status: 'ACTIVE',
                specs: {
                    os: os,
                    storage: formState.hardDrive,
                    cpu: formState.processor,
                    gpu: formState.graphicCard,
                    ram: formState.ram,
                    ramType: ramType,
                    wifiConnection: laptopWifiConnection,
                    ipAddress: formState.ip,
                    macAddress: formState.mac,
                    connectedPort: formState.port,
                    user_id: user,
                },
                deviceModel: formState.model,
                brand: brand,
                purchaseDate: buyDate,
                warrantyYears: warrantyYears,
                location_id: location,
            }
        } else if (selectedDeviceType.value === 'Impresora') {
            deviceData = {
                name: formState.name,
                type: 'PRINTER',
                status: 'ACTIVE',
                specs: {
                    printerType: printerType,
                    tonerType: formState.toner,
                    printerInk: inkType,
                    scanner: scanner,
                    wifiConnection: wifiConnection,
                },
                deviceModel: formState.model,
                brand: brand,
                purchaseDate: buyDate,
                warrantyYears: warrantyYears,
                location_id: location,
            }
        }

        console.log(deviceData)

        try {
            fetch(`${API_BASE_URL}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(deviceData),
            })
                .then((response) => {
                    if (response.ok) {
                        toast.success('Dispositivo agregado')
                        onClose()
                    } else {
                        toast.error('Error al agregar el dispositivo')
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                    toast.error('Error al agregar el dispositivo')
                })
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al agregar el dispositivo')
        }
    }

    return (
        <>
            <div className={style.titleModal}>
                <Laptop size={34} />
                <h2>Agregar Dispositivo</h2>
            </div>
            <div className={style.modalDetail}>
                {/*-------------------- Default elements --------------------*/}
                <div className={style.rowModal}>
                    <section>
                        Nombre
                        <div className={style.formInput}>
                            <CustomInput
                                isFormInput
                                name="name"
                                value={formState.name}
                                placeholder="Ingresa el nombre"
                                type="text"
                                onChange={onInputChange}
                                autoComplete="nameDevice"
                            />
                        </div>
                    </section>
                    <section>
                        Tipo
                        <div className={style.formInput}>
                            <CustomSelect
                                placeholder="Selecciona el equipo"
                                options={deviceTypeOptions}
                                onSelect={handleSelectType}
                            />
                        </div>
                    </section>
                </div>

                <div className={style.rowModal}>
                    <section>
                        Modelo
                        <div className={style.formInput}>
                            <CustomInput
                                isFormInput
                                name="model"
                                value={formState.model}
                                placeholder="Ingresa el modelo"
                                type="text"
                                onChange={onInputChange}
                                autoComplete="modelDevice"
                            />
                        </div>
                    </section>
                    <section>
                        Marca
                        <div className={style.formInput}>
                            <CustomSelect
                                placeholder="Selecciona la Marca"
                                options={brandOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setBrand(selected.value)
                                }}
                            />
                        </div>
                    </section>
                </div>

                <div className={style.rowModal}>
                    <section>
                        Edificio
                        <div className={style.formInput}>
                            <CustomSelect
                                placeholder="Selecciona el edificio"
                                options={buildingsOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setBuilding(selected.value)
                                }}
                            />
                        </div>
                    </section>
                    <section>
                        Oficina/Salon
                        <div className={style.formInput}>
                            <CustomSelect
                                placeholder="Selecciona la oficina/salon"
                                options={officesOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setLocation(selected.value)
                                }}
                            />
                        </div>
                    </section>
                </div>

                <div className={style.rowModal}>
                    <section>
                        Fecha de compra
                        <div className={style.formInput}>
                            {/* <CustomInput
                                isFormInput
                                name="buyDate"
                                value={formState.buyDate}
                                placeholder="Introduce la fecha"
                                type="text"
                                onChange={onInputChange}
                                autoComplete="buyDate"
                            /> */}
                            <DateInput
                                value={buyDate}
                                onChange={(value: Date | null) => {
                                    setBuyDate(value)
                                }}
                            />
                        </div>
                    </section>
                    <section>
                        Años de garantía
                        <div className={style.formInput}>
                            <CustomSelect
                                placeholder="Selecciona los años"
                                options={warrantyYearsOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setWarrantyYears(selected.value)
                                }}
                            />
                        </div>
                    </section>
                </div>

                {/*-------------------- elements depends of type --------------------*/}
                {/*------------- elements depends of type -------------*/}
                {temp1 == 'PC' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                ¿Equipo compartido?
                                <div className={style.formInput}>
                                    <CustomCheckBox checked={sharedBuilding} setChecked={setSharedBuilding} />
                                </div>
                            </section>
                            <section>
                                Usuario
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona al usuario"
                                        options={userOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setUser(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Sistema Operativo
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona el sistema operativo"
                                        options={osOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setOs(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                            <section>
                                Tarjeta madre
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="motherBoard"
                                        value={formState.motherBoard}
                                        placeholder="Ingresa la tarjeta madre"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="motherBoardDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Procesador
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="processor"
                                        value={formState.processor}
                                        placeholder="Ingresa el procesador"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="processorDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Tarjeta Gráfica
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="graphicCard"
                                        value={formState.graphicCard}
                                        placeholder="Ingresa la tarjeta gráfica"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="graphicCardDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Ram
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="ram"
                                        value={formState.ram}
                                        placeholder="Ingresa el ramo de RAM"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="ramDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Tipo de RAM
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona tipo de RAM"
                                        options={ramTypeOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setRamType(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Disco Duro
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="hardDrive"
                                        value={formState.hardDrive}
                                        placeholder="Ingresa el disco duro"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="hardDriveDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Fuente de Poder
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="powerSupply"
                                        value={formState.powerSupply}
                                        placeholder="Ingresa la fuente de poder"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="powerSupplyDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Dirección IP
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="ip"
                                        value={formState.ip}
                                        placeholder="Ingresa el Dirección IP"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="ipDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Dirección MAC
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="mac"
                                        value={formState.mac}
                                        placeholder="Ingresa la Dirección MAC"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="macDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Puerto al que está conectado
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="port"
                                        value={formState.port}
                                        placeholder="Ingresa el puerto"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="portDevice"
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}
                {temp1 == 'Laptop' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Sistema Operativo
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona el sistema operativo"
                                        options={osOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setOs(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                            <section>
                                Disco Duro
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="hardDrive"
                                        value={formState.hardDrive}
                                        placeholder="Ingresa el disco duro"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="hardDriveDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Procesador
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="processor"
                                        value={formState.processor}
                                        placeholder="Ingresa el procesador"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="processorDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Tarjeta Gráfica
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="graphicCard"
                                        value={formState.graphicCard}
                                        placeholder="Ingresa la tarjeta gráfica"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="graphicCardDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Ram
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="ram"
                                        value={formState.ram}
                                        placeholder="Ingresa el ramo de RAM"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="ramDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Tipo de RAM
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona tipo de RAM"
                                        options={ramTypeOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setRamType(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Dirección IP
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="ip"
                                        value={formState.ip}
                                        placeholder="Ingresa el Dirección IP"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="ipDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Dirección MAC
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="mac"
                                        value={formState.mac}
                                        placeholder="Ingresa la Dirección MAC"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="macDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Conexión inalambrica
                                <div className={style.formInput}>
                                    <CustomCheckBox
                                        checked={laptopWifiConnection}
                                        setChecked={setLaptopWifiConnection}
                                    />
                                </div>
                            </section>
                            <section>
                                Puerto al que está conectado
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="port"
                                        value={formState.port}
                                        placeholder="Ingresa el puerto"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="portDevice"
                                    />
                                </div>
                            </section>
                        </div>
                        <div className={style.rowModal}>
                            <section>
                                Usuario
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona al usuario"
                                        options={userOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setUser(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Impresora' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Tipo de impresora
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona tipo de impresora"
                                        options={printerTypeOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setPrinterType(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                            <section>
                                Toner
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="toner"
                                        value={formState.toner}
                                        placeholder="Ingresa el toner"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="tonerDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Tinta
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona Tinta"
                                        options={inkOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setInkType(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Scanner
                                <div className={style.formInput}>
                                    <CustomCheckBox checked={scanner} setChecked={setScanner} />
                                </div>
                            </section>
                            <section>
                                Conexión inalambrica
                                <div className={style.formInput}>
                                    <CustomCheckBox checked={wifiConnection} setChecked={setWifiConnection} />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Switch' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Dirección MAC
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="mac"
                                        value={formState.mac}
                                        placeholder="Ingresa la Dirección MAC"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="macDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Cantidad de puertos
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="port"
                                        value={formState.port}
                                        placeholder="Ingresa el puerto"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="portDevice"
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Router' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Tipo de Router
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona tipo de router"
                                        options={optionTemp}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </section>
                            <section>
                                Dirección IP
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="ip"
                                        value={formState.ip}
                                        placeholder="Ingresa el ip"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="ipDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Dirección MAC
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="mac"
                                        value={formState.mac}
                                        placeholder="Ingresa la Dirección MAC"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="macDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Cantidad de puertos
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="port"
                                        value={formState.port}
                                        placeholder="Ingresa el puerto"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="portDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Conectividad
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona tipo de conectividad"
                                        options={optionTemp}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </section>
                            <section>
                                Capacidad
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona rango de capacidad"
                                        options={optionTemp}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'No-break' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Potencia
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="potence"
                                        value={formState.potence}
                                        placeholder="Ingresa la potencia"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="potenceDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Cantidad de enchufes
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona la cantidad"
                                        options={optionTemp}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Tiempo de respaldo
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="backupTime"
                                        value={formState.backupTime}
                                        placeholder="Ingresa el tiempo de respaldo"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="backupTimeDevice"
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Regulador' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Potencia
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="potence"
                                        value={formState.potence}
                                        placeholder="Ingresa la potencia"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="potenceDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Cantidad de enchufes
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona la cantidad"
                                        options={optionTemp}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {temp1 == 'Proyector' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Resolución
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona la resolución"
                                        options={optionTemp}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </section>
                            <section>
                                Conectividad
                                <div className={style.formInput}>
                                    <CustomSelect
                                        placeholder="Selecciona la conectividad"
                                        options={optionTemp}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Brillo
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="brightness"
                                        value={formState.brightness}
                                        placeholder="Ingresa el tiempo de respaldo"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="brightnessDevice"
                                    />
                                </div>
                            </section>
                            <section>
                                Alcance
                                <div className={style.formInput}>
                                    <CustomInput
                                        isFormInput
                                        name="scope"
                                        value={formState.scope}
                                        placeholder="Ingresa el tiempo de respaldo"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="scopeDevice"
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                <div className={` ${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    <button className={style.saveButton} onClick={saveDevice}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    )
}
