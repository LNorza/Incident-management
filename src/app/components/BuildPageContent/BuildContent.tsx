import { useState, useRef, useEffect } from 'react'
import { Building, ChevronDown, Pencil, Plus, Trash2 } from 'lucide-react'
import style from '../../style/BuildContainer.module.css'
import { BuildModalType, OfficeProps } from '../../../utils'
import API_BASE_URL from '../../../utils/api/apiConfig'
import Actions from '../../../ui/components/Actions'

interface BuildingProps {
    _id: string
    name: string
    description: string
    totalDevices: number
}

interface Props {
    building: BuildingProps
    updateLocations?: boolean
    departmentId: string | null
    setTypeModal: (
        modalType: BuildModalType,
        buildingId?: string,
        officeData?: OfficeProps,
        buildingName?: string,
        locationName?: string,
        locationId?: string,
    ) => void
    setUpdateLocations: (update: boolean) => void
}

export const BuildContent = ({ building, updateLocations, setUpdateLocations, departmentId, setTypeModal }: Props) => {
    const [showInfo, setShowInfo] = useState(false)
    const [locations, setLocations] = useState<OfficeProps[]>([])
    const contentRef = useRef<HTMLDivElement | null>(null)

    const handleShowInfo = () => {
        setShowInfo(!showInfo)
        fetchLocations()
    }

    useEffect(() => {
        if (updateLocations) {
            fetchLocations()
        }
    })

    const fetchLocations = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/locations-with-devices?buildingId=${building._id}&&departmentId=${departmentId}`,
                {
                    method: 'GET',
                    credentials: 'include',
                },
            )
            if (!response.ok) throw new Error('Error al obtener las ubicaciones')
            const data = await response.json()
            setLocations(data)
            setUpdateLocations(false)
        } catch (error) {
            console.error(error)
        }
    }

    const addDevicesListModal = (locationId: string) => () => {
        setTypeModal('DevicesList', undefined, undefined, undefined, undefined, locationId)
    }

    return (
        <section className={`${style.dropdownContainer}`}>
            <article className={`${style.dropdownBuild}`}>
                {/* Title of dropdown */}
                <section className={`${style.dropdownTitle} ${style.dropdownTitlePadding}`} onClick={handleShowInfo}>
                    <span>
                        <Building strokeWidth={1.75} />
                        {building.name}
                    </span>
                    <button className={`${style.buildButton} ${showInfo ? style.active : ''} `}>
                        <ChevronDown className={style.arrow} />
                    </button>
                </section>

                {/* Dropdown content */}
                <section
                    className={`${style.dropDownInfoContainer} ${showInfo ? style.showInfo : ''}`}
                    ref={contentRef}
                >
                    <div className={`${style.dropdownTitleOpen}`}>
                        <span className={`${style.totalDevicesText}`}>
                            Total de Equipos: <span className={`${style.p2}`}>{building.totalDevices}</span>
                        </span>
                        <div className={`${style.dropdownTitleOpen}`}>
                            <button
                                className={`${style.buildButton}`}
                                onClick={() => setTypeModal('EditBuild', building._id)}
                            >
                                <Pencil />
                                Editar edificio
                            </button>

                            <button
                                className={style.buildButton}
                                onClick={() =>
                                    setTypeModal('DeleteBuild', building._id, undefined, building.name, undefined)
                                }
                            >
                                <Trash2 />
                                Borrar edificio
                            </button>
                        </div>
                    </div>

                    <ul className={`${style.buildTable}`}>
                        <li className={style.buildTableHeader}>
                            Oficinas/Salones
                            <button
                                onClick={() => setTypeModal('AddOfficeClass', building._id)}
                                className={`${style.buildButton}`}
                            >
                                <Plus />
                                Agregar oficina/salon
                            </button>
                        </li>
                        {locations.map((location) => (
                            <li
                                key={location._id}
                                onClick={addDevicesListModal(location._id)}
                                className={style.buildInfo}
                            >
                                {location.name}
                                <div className={`${style.buildInfoList}`}>
                                    <span>
                                        Equipos: <span className={`${style.p2}`}>{location.totalDevices}</span>
                                    </span>
                                    <Actions
                                        row={''}
                                        parentRef={contentRef}
                                        actions={[
                                            {
                                                text: 'Editar',
                                                icon: Pencil,
                                                onClick: (row, e: React.MouseEvent<HTMLDivElement>) => {
                                                    e.stopPropagation()
                                                    const type = 'EditOfficeClass'
                                                    const officeData = location
                                                    setTypeModal(type, undefined, officeData)
                                                },
                                            },
                                            {
                                                text: 'Borrar',
                                                icon: Trash2,
                                                onClick: (row, e: React.MouseEvent<HTMLDivElement>) => {
                                                    e.stopPropagation()
                                                    setTypeModal(
                                                        'DeleteOfficeClass',
                                                        undefined,
                                                        undefined,
                                                        undefined,
                                                        location.name,
                                                        location._id,
                                                    )
                                                },
                                            },
                                        ]}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>
        </section>
    )
}
