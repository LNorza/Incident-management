import { useEffect, useState, useCallback } from 'react'
import { getUserDepartment } from '../../../utils/api/userData'
import { useForm } from '../../../hooks'
import { CustomCheckBox, CustomInput, CustomSelect } from '../../../ui'
import {
    Device,
    IComputerSpecs,
    ILaptop,
    IPrinter,
    IRouter,
    ISwitch,
    IProjector,
    IVoltageRegulator,
    INoBreak,
} from '../../../utils'
import { Laptop } from 'lucide-react'
import { toast } from 'sonner'
import style from '../../style/modal.module.css'
import { DateInput } from 'rsuite'
import { IOptions } from '../../../utils/interface/options'
import API_BASE_URL from '../../../utils/api/apiConfig'

interface Props {
    deviceId?: string | undefined
    onClose: () => void
}

export const AddDeviceModal = ({ deviceId, onClose }: Props) => {
    const [deviceType, setDeviceType] = useState<string | undefined>('')
    const [isShared, setIsShared] = useState<boolean | undefined>(false)
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)
    const deviceTypeOptions: IOptions[] = [
        { label: 'PC', value: 'PC' },
        { label: 'Laptop', value: 'LAPTOP' },
        { label: 'Impresora', value: 'PRINTER' },
        { label: 'Switch', value: 'SWITCH' },
        { label: 'Router', value: 'ROUTER' },
        { label: 'Proyector', value: 'PROJECTOR' },
        { label: 'Regulador', value: 'VOLTAGE-REGULATOR' },
        { label: 'No-break', value: 'NO-BREAK' },
    ]
    const brandOptions: IOptions[] = [
        { label: 'HP', value: 'HP' },
        { label: 'Dell', value: 'DELL' },
        { label: 'Lenovo', value: 'LENOVO' },
        { label: 'Asus', value: 'ASUS' },
        { label: 'Acer', value: 'ACER' },
        { label: 'Apple', value: 'APPLE' },
        { label: 'Samsung', value: 'SAMSUNG' },
        { label: 'Cisco', value: 'CISCO' },
        { label: 'Linksys', value: 'LINKSYS' },
        { label: 'Koblenz', value: 'KOBLENZ' },
        { label: 'Epson', value: 'EPSON' },
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
        { label: 'Windows 11', value: 'WINDOWS_11' },
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
        { label: 'DDR5', value: 'DDR5' },
    ]
    const [routerTypeOptions] = useState<IOptions[]>([
        { label: 'ADSL', value: 'ADSL' },
        { label: 'Cable', value: 'CABLE' },
        { label: 'Fibra óptica', value: 'FIBER_OPTIC' },
        { label: 'Satelital', value: 'SATELLITE' },
        { label: '4G', value: '4G' },
        { label: '5G', value: '5G' },
    ])
    const [connectivityRouterOptions] = useState<IOptions[]>([
        { label: 'Inalámbrica', value: 'WIRELESS' },
        { label: 'Cableada', value: 'WIRED' },
    ])
    const [routerCapacityOptions] = useState<IOptions[]>([
        { label: '< 16 MB', value: '<16MB' },
        { label: '16-128 MB', value: '16-128MB' },
        { label: '128-1000 MB', value: '128-1000MB' },
        { label: '1000MB - 4GB', value: '1000MB-4GB' },
        { label: '4-16 GB', value: '4-16GB' },
        { label: '16-64 GB', value: '16-64GB' },
        { label: '>64 GB', value: '>64GB' },
    ])
    const [projectorResolutionOptions] = useState<IOptions[]>([
        { label: 'SVGA (800x600)', value: 'SVGA' },
        { label: 'XGA (1024x768)', value: 'XGA' },
        { label: 'WXGA (1280x800)', value: 'WXGA' },
        { label: 'HD (1366x768)', value: 'HD' },
        { label: 'FHD (1920x1080)', value: 'FHD' },
        { label: '4K (3840x2160)', value: '4K' },
    ])
    const [projectorConnectivityOptions] = useState<IOptions[]>([
        { label: 'HDMI', value: 'HDMI' },
        { label: 'VGA', value: 'VGA' },
        { label: 'USB', value: 'USB' },
    ])

    const { onInputChange, formState, updateFields } = useForm({
        name: '',
        model: '',
        motherBoard: '',
        processor: '',
        graphicCard: '',
        ram: '',
        hardDrive: '',
        powerSupply: '',
        ip: '',
        mac: '',
        port: '',
        ports: '',
        plugs: '',
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
    const [brand, setBrand] = useState<string | undefined>(undefined)
    const [buildingId, setBuildingId] = useState<string | undefined>(undefined)
    const [buildingsOptions, setBuildingsOptions] = useState<IOptions[]>([])
    const [building, setBuilding] = useState<string | undefined>(undefined)
    const [officesOptions, setOfficesOptions] = useState<IOptions[]>([])
    const [location, setLocation] = useState<string | undefined>(undefined)
    const [warrantyYears, setWarrantyYears] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<string | undefined>(undefined)
    const [os, setOs] = useState<string | undefined>(undefined)
    const [ramType, setRamType] = useState<string | undefined>(undefined)
    const [laptopWifiConnection, setLaptopWifiConnection] = useState<boolean | undefined>(false)
    const [printerType, setPrinterType] = useState<string | undefined>(undefined)
    const [inkType, setInkType] = useState<string | undefined>(undefined)
    const [scanner, setScanner] = useState<boolean | undefined>(false)
    const [printerWifiConnection, setPrinterWifiConnection] = useState<boolean | undefined>(false)
    const [routerType, setRouterType] = useState<string | undefined>(undefined)
    const [routerConnectivity, setRouterConnectivity] = useState<string | undefined>(undefined)
    const [routerCapacity, setRouterCapacity] = useState<string | undefined>(undefined)
    const [projectorResolution, setProjectorResolution] = useState<string | undefined>(undefined)
    const [projectorConnectivity, setProjectorConnectivity] = useState<string | undefined>(undefined)
    const [control, setControl] = useState<boolean | undefined>(false)
    const [deviceData, setDeviceData] = useState<Device>({
        name: '',
        type: '',
        status: '',
        specs: {},
        purchaseDate: '',
        warrantyYears: 0,
        deviceModel: '',
        brand: '',
        location_id: {
            _id: '',
            name: '',
            building_id: '',
        },
    })
    const [locationEdit, setLocationEdit] = useState<string | undefined>(undefined)

    const handleSelectType = (selected: { label: string; value: string }) => {
        setSelectedDeviceType(selected)
        setDeviceType(selected.value)
    }

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id ?? undefined)
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

    const fetchOffices = useCallback(async () => {
        if (building) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/locations-search?buildingId=${buildingId}&departmentId=${departmentId}`,
                    {
                        credentials: 'include',
                    },
                )
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

    const fetchDevice = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setDeviceData(data)
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }

    useEffect(() => {
        fetchDepartment()
    }, [])

    useEffect(() => {
        fetchOffices()
    }, [buildingId, fetchOffices])

    useEffect(() => {
        const fetchData = async () => {
            await fetchBuildings()
            if (deviceId) {
                await fetchDevice()
            }
        }
        fetchData()
    }, [deviceId, departmentId, fetchBuildings])

    useEffect(() => {
        updateFields({
            name: deviceData.name,
            model: deviceData.deviceModel,
        })
        setSelectedDeviceType(deviceTypeOptions.find((device) => device.value === deviceData.type) || null)
        setBrand(brandOptions.find((brand) => brand.value === deviceData.brand)?.value)
        setBuilding(buildingsOptions.find((building) => building.value === deviceData.location_id.building_id)?.value)
        setBuildingId(deviceData.location_id.building_id)
        setLocation(officesOptions.find((office) => office.value === deviceData.location_id._id)?.value)
        setLocationEdit(deviceData.location_id._id)
        setBuyDate(new Date(deviceData.purchaseDate))
        setWarrantyYears(
            warrantyYearsOptions.find((years) => years.value === deviceData.warrantyYears.toString())?.value,
        )
        setDeviceType(deviceTypeOptions.find((device) => device.value === deviceData.type)?.value)
        console.log(deviceData)
        if (deviceData.type === 'PC') {
            const pcSpecs = deviceData.specs as IComputerSpecs
            updateFields({
                motherBoard: pcSpecs.motherBoard,
                processor: pcSpecs.cpu,
                graphicCard: pcSpecs.gpu,
                ram: pcSpecs.ram,
                hardDrive: pcSpecs.storage,
                powerSupply: pcSpecs.powerSupply,
                ip: pcSpecs.ipAddress,
                mac: pcSpecs.macAddress,
                port: pcSpecs.connectedPort,
            })
            setOs(osOptions.find((os) => os.value === pcSpecs.os)?.value)
            setRamType(ramTypeOptions.find((ramType) => ramType.value === pcSpecs.ramType)?.label)
            setIsShared(pcSpecs.isShared)
            setUser(userOptions.find((user) => user.value === pcSpecs.user_id)?.value)
        }

        if (deviceData.type === 'LAPTOP') {
            const laptopSpecs = deviceData.specs as ILaptop
            updateFields({
                processor: laptopSpecs.cpu,
                graphicCard: laptopSpecs.gpu,
                ram: laptopSpecs.ram,
                hardDrive: laptopSpecs.storage,
                ip: laptopSpecs.ipAddress,
                mac: laptopSpecs.macAddress,
                port: laptopSpecs.connectedPort,
            })
            setOs(osOptions.find((os) => os.value === laptopSpecs.os)?.value)
            setRamType(ramTypeOptions.find((ramType) => ramType.value === laptopSpecs.ramType)?.label)
            setLaptopWifiConnection(laptopSpecs.wifiConnection)
            setUser(userOptions.find((user) => user.value === laptopSpecs.user_id)?.value)
        }

        if (deviceData.type === 'PRINTER') {
            const printerSpecs = deviceData.specs as IPrinter
            updateFields({
                toner: printerSpecs.tonerType,
                ip: printerSpecs.ipAddress,
                mac: printerSpecs.macAddress,
            })
            setPrinterType(
                printerTypeOptions.find((printerType) => printerType.value === printerSpecs.printerType)?.value,
            )
            setInkType(inkOptions.find((inkType) => inkType.value === printerSpecs.printerInk)?.value)
            setScanner(printerSpecs.scanner)
            setPrinterWifiConnection(printerSpecs.wifiConnection)
        }

        if (deviceData.type === 'SWITCH') {
            const switchSpecs = deviceData.specs as ISwitch
            updateFields({
                ports: (switchSpecs.ports ?? '').toString(),
                mac: switchSpecs.macAddress,
            })
        }

        if (deviceData.type === 'ROUTER') {
            const routerSpecs = deviceData.specs as IRouter
            updateFields({
                ip: routerSpecs.ipAddress,
                mac: routerSpecs.macAddress,
                ports: (routerSpecs.ports ?? '').toString(),
            })
            setRouterType(routerTypeOptions.find((routerType) => routerType.value === routerSpecs.routerType)?.value)
            setRouterConnectivity(
                connectivityRouterOptions.find(
                    (routerConnectivity) => routerConnectivity.value === routerSpecs.connectivity,
                )?.value,
            )
            setRouterCapacity(
                routerCapacityOptions.find((routerCapacity) => routerCapacity.value === routerSpecs.capacity)?.value,
            )
        }

        if (deviceData.type === 'PROJECTOR') {
            const projectorSpecs = deviceData.specs as IProjector
            updateFields({
                brightness: projectorSpecs.brightness,
                scope: projectorSpecs.scope,
            })
            setProjectorResolution(
                projectorResolutionOptions.find(
                    (projectorResolution) => projectorResolution.value === projectorSpecs.resolution,
                )?.value,
            )
            setProjectorConnectivity(
                projectorConnectivityOptions.find(
                    (projectorConnectivity) => projectorConnectivity.value === projectorSpecs.connectivity,
                )?.value,
            )
            setControl(projectorSpecs.control)
        }

        if (deviceData.type === 'NO-BREAK') {
            const noBreakSpecs = deviceData.specs as INoBreak
            updateFields({
                potence: noBreakSpecs.powerCapacity,
                plugs: (noBreakSpecs.ports ?? '').toString(),
                backupTime: noBreakSpecs.backupTime,
            })
        }

        if (deviceData.type === 'VOLTAGE-REGULATOR') {
            const voltageRegulatorSpecs = deviceData.specs as IVoltageRegulator
            updateFields({
                potence: voltageRegulatorSpecs.powerCapacity,
                plugs: (voltageRegulatorSpecs.ports ?? '').toString(),
            })
        }

        if (deviceData.type === 'PROJECTOR') {
            const projectorSpecs = deviceData.specs as IProjector
            updateFields({
                brightness: projectorSpecs.brightness,
                scope: projectorSpecs.scope,
            })
            setProjectorResolution(
                projectorResolutionOptions.find(
                    (projectorResolution) => projectorResolution.value === projectorSpecs.resolution,
                )?.value,
            )
            setProjectorConnectivity(
                projectorConnectivityOptions.find(
                    (projectorConnectivity) => projectorConnectivity.value === projectorSpecs.connectivity,
                )?.value,
            )
            setControl(projectorSpecs.control)
        }
    }, [deviceData])

    useEffect(() => {
        if (deviceId) {
            setLocation(locationEdit)
        }
    }, [building])

    const saveDevice = () => {
        if (!formState.name) {
            toast.error('No se ha ingresado el nombre del dispositivo')
            return
        }
        if (!deviceType) {
            toast.error('No se ha seleccionado el tipo de dispositivo')
            return
        }
        if (!buyDate) {
            toast.error('No se ha ingresado la fecha de compra')
            return
        }
        if (!selectedDeviceType) {
            toast.error('No se ha seleccionado el tipo de dispositivo')
            return
        }

        const commonSpecs = {
            name: formState.name,
            type: selectedDeviceType.value,
            status: 'ACTIVE',
            deviceModel: formState.model,
            brand: brand,
            purchaseDate: buyDate,
            warrantyYears: warrantyYears,
            location_id: location,
        }

        const deviceSpecsByType: { [key: string]: unknown } = {
            PC: {
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
                    isShared: isShared,
                    user_id: user,
                },
            },
            LAPTOP: {
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
            },
            PRINTER: {
                specs: {
                    printerType: printerType,
                    tonerType: formState.toner,
                    printerInk: inkType,
                    scanner: scanner,
                    wifiConnection: printerWifiConnection,
                    ipAddress: formState.ip,
                    macAddress: formState.mac,
                },
            },
            SWITCH: {
                specs: {
                    ports: formState.ports,
                    macAddress: formState.mac,
                },
            },
            ROUTER: {
                specs: {
                    routerType: routerType,
                    ipAddress: formState.ip,
                    macAddress: formState.mac,
                    ports: formState.ports,
                    connectivity: routerConnectivity,
                    capacity: routerCapacity,
                },
            },
            'NO-BREAK': {
                specs: {
                    powerCapacity: formState.potence,
                    ports: formState.plugs,
                    backupTime: formState.backupTime,
                },
            },
            'VOLTAGE-REGULATOR': {
                specs: {
                    powerCapacity: formState.potence,
                    ports: formState.plugs,
                },
            },
            PROJECTOR: {
                specs: {
                    resolution: projectorResolution,
                    connectivity: projectorConnectivity,
                    brightness: formState.brightness,
                    scope: formState.scope,
                    control: control,
                },
            },
        }

        const deviceData = {
            ...commonSpecs,
            ...(deviceSpecsByType[selectedDeviceType.value] || {}),
        }

        try {
            const method = deviceId ? 'PUT' : 'POST'
            const url = `${API_BASE_URL}/devices${deviceId ? `/${deviceId}` : ''}`

            fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(deviceData),
            }).then((response) => {
                if (response.ok) {
                    toast.success(`${!deviceId ? 'Dispositivo agregado' : 'Dispositivo actualizado'}`)
                    onClose()
                }
            })
        } catch (error) {
            console.error('Error:', error)
            toast.success(`${!deviceId ? 'Error al agregar el dispositivo' : 'Error al editar el dispositivo'}`)
        }
    }

    return (
        <>
            <div className={style.titleModal}>
                <Laptop size={34} />
                <h2>{!deviceId ? 'Agregar equipo' : 'Editar equipo'}</h2>
            </div>
            <div className={style.modalDetail}>
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
                                value={selectedDeviceType?.value}
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
                                value={brand}
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
                                value={building}
                                placeholder="Selecciona el edificio"
                                options={buildingsOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setBuildingId(selected.value)
                                    setBuilding(selected.value)
                                }}
                            />
                        </div>
                    </section>
                    <section>
                        Oficina/Salon
                        <div className={style.formInput}>
                            <CustomSelect
                                value={location}
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
                                value={warrantyYears}
                                placeholder="Selecciona los años"
                                options={warrantyYearsOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setWarrantyYears(selected.value)
                                }}
                            />
                        </div>
                    </section>
                </div>

                {deviceType == 'PC' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                ¿Equipo compartido?
                                <div className={style.formInput}>
                                    <CustomCheckBox checked={isShared} setChecked={setIsShared} />
                                </div>
                            </section>
                            <section className={`${isShared ? style.disabled : ''}`}>
                                Usuario
                                <div className={`${style.formInput}`}>
                                    <CustomSelect
                                        value={user}
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
                                        value={os}
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
                                        placeholder="Ingresa la RAM"
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
                                        value={ramType}
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
                {deviceType == 'LAPTOP' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Sistema Operativo
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={os}
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
                                        placeholder="Ingresa la RAM"
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
                                        value={ramType}
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
                            <section className={` ${laptopWifiConnection ? style.disabled : ''}`}>
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
                                        value={user}
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

                {deviceType == 'PRINTER' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Tipo de impresora
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={printerType}
                                        placeholder="Selecciona el tipo"
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
                                        value={inkType}
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
                                    <CustomCheckBox
                                        checked={printerWifiConnection}
                                        setChecked={setPrinterWifiConnection}
                                    />
                                </div>
                            </section>
                        </div>
                        {printerWifiConnection && (
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
                        )}
                    </>
                )}

                {deviceType == 'SWITCH' && (
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
                                        name="ports"
                                        value={formState.ports}
                                        placeholder="Ingresa el puerto"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="portsDevice"
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {deviceType == 'ROUTER' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Tipo de router
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={routerType}
                                        placeholder="Selecciona tipo de router"
                                        options={routerTypeOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setRouterType(selected.value)
                                        }}
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
                                        placeholder="Ingresa la dirección MAC"
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
                                        name="ports"
                                        value={formState.ports}
                                        placeholder="Ingresa el puerto"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="portsDevice"
                                    />
                                </div>
                            </section>
                        </div>

                        <div className={style.rowModal}>
                            <section>
                                Conectividad
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={routerConnectivity}
                                        placeholder="Selecciona tipo de conectividad"
                                        options={connectivityRouterOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setRouterConnectivity(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                            <section>
                                Capacidad
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={routerCapacity}
                                        placeholder="Selecciona rango de capacidad"
                                        options={routerCapacityOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setRouterCapacity(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {deviceType == 'NO-BREAK' && (
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
                                    <CustomInput
                                        isFormInput
                                        name="plugs"
                                        value={formState.plugs}
                                        placeholder="Ingresa la cantidad"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="plugsQuantity"
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

                {deviceType == 'VOLTAGE-REGULATOR' && (
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
                                    <CustomInput
                                        isFormInput
                                        name="plugs"
                                        value={formState.plugs}
                                        placeholder="Ingresa la cantidad"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="plugsQuantity"
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {deviceType == 'PROJECTOR' && (
                    <>
                        <div className={style.rowModal}>
                            <section>
                                Resolución
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={projectorResolution}
                                        placeholder="Selecciona la resolución"
                                        options={projectorResolutionOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setProjectorResolution(selected.value)
                                        }}
                                    />
                                </div>
                            </section>
                            <section>
                                Conectividad
                                <div className={style.formInput}>
                                    <CustomSelect
                                        value={projectorConnectivity}
                                        placeholder="Selecciona la conectividad"
                                        options={projectorConnectivityOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setProjectorConnectivity(selected.value)
                                        }}
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
                        <div className={style.rowModal}>
                            <section>
                                Control
                                <div className={style.formInput}>
                                    <CustomCheckBox checked={control} setChecked={setControl} />
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
