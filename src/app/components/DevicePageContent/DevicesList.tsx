import { useEffect, useState, useRef } from 'react'
import { Device } from '../../../utils'
import { API_BASE_URL } from '../../../utils/api'
import { createArrayDevices, headerDevices } from '../../utils/createArrayDevices'
import { toast } from 'sonner'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    locationId?: string
}

export const DevicesListModal = ({ locationId, onClose }: Props) => {
    const [devices, setDevices] = useState<Device[]>([])
    const [device, setDevice] = useState<string[]>([])
    const [getDeviceInfo, setGetDeviceInfo] = useState(false)
    const [deviceHeadersInfo, setDeviceHeadersInfo] = useState<string[]>([])

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchDevices()
    }, [locationId])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                // Si se hace clic fuera del modal, cerrar o regresar
                getDeviceInfo ? setGetDeviceInfo(false) : onClose()
            }
        }

        // Añadir evento al hacer clic
        document.addEventListener('mousedown', handleClickOutside)

        // Limpiar el evento al desmontar
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [getDeviceInfo, onClose])

    const handleDeviceInfo = (deviceId?: string) => {
        if (!getDeviceInfo) {
            const deviceInfo = devices.find((device) => deviceId === device?._id)
            const deviceHeaders = deviceInfo?.type ? headerDevices(deviceInfo.type) : []

            if (Array.isArray(deviceHeaders)) {
                setDeviceHeadersInfo(deviceHeaders)
            } else {
                toast.error(deviceHeaders) // Mostrar el mensaje de error
            }

            if (deviceInfo) {
                const deviceInfoArray = createArrayDevices(deviceInfo)
                if (deviceInfoArray) {
                    setDevice(deviceInfoArray) // Establecer el arreglo de información del dispositivo
                } else {
                    toast.error('Error al obtener la información del dispositivo')
                    setDevice([]) // Cambiar a un arreglo vacío si no se obtuvo información del dispositivo
                }
            }
            setGetDeviceInfo(true)
        }
    }

    const fetchDevices = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices-search?location_id=${locationId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setDevices(data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.largeModalInfoContainer} ref={modalRef}>
                <div className={style.titleModal}>
                    <h2>{!getDeviceInfo ? 'Equipos' : 'Información del dispositivo'}</h2>
                </div>
                <div className={style.devicesListContainer}>
                    {getDeviceInfo && (
                        <div className={style.deviceGetInfoContainer}>
                            {device.map((info, index) => (
                                <section key={index}>
                                    <div className={style.deviceInfoTitle}>{deviceHeadersInfo[index]}</div>
                                    <div
                                        className={`
                                        ${index >= device.length - 2 ? `${style.deviceInfoContent}` : ''}
                                        ${info === 'Expirada' ? `${style.expired}` : ''}
                                        `}
                                    >
                                        {info} {/* Renderiza la información del dispositivo */}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}

                    {!getDeviceInfo && (
                        <div className={style.deviceTableContainer}>
                            <div className={style.deviceTableHeader}>
                                <div className={style.deviceTableName}>Nombre del equipo</div>
                                <div className={style.deviceTableType}>Tipo</div>
                                <div className={style.deviceTableBrand}>Marca</div>
                            </div>

                            {devices.length > 0 ? (
                                devices.map((device) => (
                                    <div
                                        key={device._id}
                                        onClick={() => device._id && handleDeviceInfo(device._id)}
                                        className={style.deviceTableRow}
                                    >
                                        <div className={style.deviceTableName}>{device.name}</div>
                                        <div className={style.deviceTableType}>{device.type}</div>
                                        <div className={style.deviceTableBrand}>{device.brand}</div>
                                    </div>
                                ))
                            ) : (
                                <div className={`${style.deviceTableRow} ${style.deviceTableNoOptions}`}>
                                    No hay equipos en esta ubicación
                                </div>
                            )}
                        </div>
                    )}
                    <div className={` ${style.modalButtonContainer} ${style.add}`}>
                        <button
                            onClick={() => {
                                getDeviceInfo ? setGetDeviceInfo(false) : onClose()
                            }}
                            className={style.saveButton}
                        >
                            {getDeviceInfo ? 'Regresar' : 'Cerrar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
