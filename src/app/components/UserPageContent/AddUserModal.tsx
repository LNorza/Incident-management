import { useEffect, useState, useCallback } from 'react'
import { Device, IOptions } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { CustomInput } from '../../../ui'
import { useForm } from '../../../hooks'
import { toast } from 'sonner'
import { Laptop } from 'lucide-react'
import style from '../../style/modal.module.css'

interface Props {
    deviceId?: string | undefined
    onClose: () => void
}

export const AddUserModal = ({ deviceId, onClose }: Props) => {
    const [deviceType, setDeviceType] = useState<string | undefined>('')
    const [isShared, setIsShared] = useState<boolean | undefined>(false)
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)

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
    // const [deviceData, setDeviceData] = useState<Device>({
    //     name: '',
    //     type: '',
    //     status: '',
    //     specs: {},
    //     purchaseDate: '',
    //     warrantyYears: 0,
    //     deviceModel: '',
    //     brand: '',
    //     location_id: {
    //         _id: '',
    //         name: '',
    //         building_id: '',
    //     },
    // })

    const handleSelectType = (selected: IOptions) => {
        // setSelectedDeviceType(selected)
        // setDeviceType(selected.value)
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
        // if (departmentId) {
        //     try {
        //         const response = await fetch(`${API_BASE_URL}/buildings-search?departmentId=${departmentId}`, {
        //             credentials: 'include',
        //         })
        //         const data = await response.json()
        //         setBuildingsOptions(
        //             data.map((building: { _id: string; name: string }) => ({
        //                 label: building.name,
        //                 value: building._id,
        //             })),
        //         )
        //     } catch (error) {
        //         console.error('Error fetching buildings:', error)
        //     }
        // }
    }, [departmentId])

    // const fetchOffices = useCallback(async () => {
    //     if (building) {
    //         try {
    //             const response = await fetch(
    //                 `${API_BASE_URL}/locations-search?buildingId=${buildingId}&departmentId=${departmentId}`,
    //                 {
    //                     credentials: 'include',
    //                 },
    //             )
    //             const data = await response.json()
    //             setOfficesOptions(
    //                 data.map((office: { _id: string; name: string }) => ({
    //                     label: office.name,
    //                     value: office._id,
    //                 })),
    //             )
    //         } catch (error) {
    //             console.error('Error fetching offices:', error)
    //         }
    //     }
    // }, [building])

    // const fetchDevice = async () => {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
    //             credentials: 'include',
    //         })
    //         const data = await response.json()
    //         setDeviceData(data)
    //     } catch (error) {
    //         console.error('Error fetching device:', error)
    //     }
    // }

    // useEffect(() => {
    //     fetchDepartment()
    // }, [])

    // useEffect(() => {
    //     fetchOffices()
    // }, [buildingId, fetchOffices])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await fetchBuildings()
    //         if (deviceId) {
    //             await fetchDevice()
    //         }
    //     }
    //     fetchData()
    // }, [deviceId, departmentId, fetchBuildings])
    // useEffect(() => {
    //     if (deviceId) {
    //         setLocation(locationEdit)
    //     }
    // }, [building])

    // const saveDevice = () => {
    //     if (!formState.name) {
    //         toast.error('No se ha ingresado el nombre del dispositivo')
    //         return
    //     }
    //     if (!deviceType) {
    //         toast.error('No se ha seleccionado el tipo de dispositivo')
    //         return
    //     }
    //     if (!buyDate) {
    //         toast.error('No se ha ingresado la fecha de compra')
    //         return
    //     }
    //     if (!selectedDeviceType) {
    //         toast.error('No se ha seleccionado el tipo de dispositivo')
    //         return
    //     }

    //     const commonSpecs = {
    //         name: formState.name,
    //         type: selectedDeviceType.value,
    //         status: 'ACTIVE',
    //         deviceModel: formState.model,
    //         brand: brand,
    //         purchaseDate: buyDate,
    //         warrantyYears: warrantyYears,
    //         location_id: location,
    //     }

    //     try {
    //         const method = deviceId ? 'PUT' : 'POST'
    //         const url = `${API_BASE_URL}/devices${deviceId ? `/${deviceId}` : ''}`

    //         fetch(url, {
    //             method,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify(deviceData),
    //         }).then((response) => {
    //             if (response.ok) {
    //                 toast.success(`${!deviceId ? 'Dispositivo agregado' : 'Dispositivo actualizado'}`)
    //                 onClose()
    //             }
    //         })
    //     } catch (error) {
    //         console.error('Error:', error)
    //         toast.success(`${!deviceId ? 'Error al agregar el dispositivo' : 'Error al editar el dispositivo'}`)
    //     }
    // }

    return (
        <>
            <div className={style.titleModal}>
                <Laptop size={34} />
                {/* <h2>{!deviceId ? 'Agregar Usuario' : 'Editar equipo'}</h2> */}
                <h2>Agregar Usuario</h2>
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
                </div>

                <div className={` ${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    {/* <button className={style.saveButton} onClick={saveDevice}> */}
                    <button className={style.saveButton}>Guardar</button>
                </div>
            </div>
        </>
    )
}
