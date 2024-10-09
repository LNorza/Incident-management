import { useEffect, useState } from 'react'
import { Device } from '../../../utils/enum/device.enum'
import API_BASE_URL from '../../../utils/api/apiConfig'

import style from '../../style/modal.module.css'
interface Props {
    onClose: () => void
    locationId?: string
}

export const DevicesListModal = ({ locationId, onClose }: Props) => {
    const [devices, setDevices] = useState<Device[]>([])

    useEffect(() => {
        fetchDevices()
    }, [locationId])

    const fetchDevices = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices-search?locationId=${locationId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            setDevices(data)
        } catch (err) {
            console.error(err)
        }

        console.log('Device: ', devices)
    }

    return (
        <div className={style.container}>
            <div className={style.largeModalInfoContainer}>
                <div className={style.titleModal}>
                    <h2>Equipos</h2>
                </div>
                <div className={style.devicesListContainer}>
                    <div className={style.deviceTableContainer}>
                        <div className={style.deviceTableHeader}>
                            <div className={style.deviceTableName}>Nombre del equipo</div>
                            <div className={style.deviceTableType}>Tipo</div>
                            <div className={style.deviceTableBrand}>Marca</div>
                        </div>

                        {devices.length > 0 ? (
                            devices.map((device) => (
                                <div key={device.location_id._id} className={style.deviceTableRow}>
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

                    <div className={` ${style.modalButtonContainer} ${style.add}`}>
                        <button onClick={onClose} className={style.saveButton}>
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
