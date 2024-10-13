import { useState, useRef, useEffect } from 'react'
import { BuildModalType, OfficeProps, BuildingProps } from '../../../utils'
import { API_BASE_URL } from '../../../utils/api'
import { Actions } from '../../../ui'
import { Building, ChevronDown, Pencil, Plus, Trash2 } from 'lucide-react'
import style from '../../style/BuildContainer.module.css'

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
                    <button className={`${style.arrowButton} ${showInfo ? style.active : ''} `}>
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
                            Responsable:
                            <span className={`${style.p2}`}>
                                {` ${building.build_manager?.name ? building.build_manager.name : ''}`}
                            </span>
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

                    <div className={`${style.dropdownTitleOpen}`}>
                        <span className={`${style.totalDevicesText}`}>
                            Total de Equipos: <span className={`${style.p2}`}>{building.totalDevices}</span>
                        </span>
                        <div className={`${style.dropdownTitleOpen}`}>
                            <button
                                onClick={() => setTypeModal('AddOfficeClass', building._id)}
                                className={`${style.buildButton}`}
                            >
                                <Plus />
                                Agregar sublocalización
                            </button>
                        </div>
                    </div>

                    <ul className={`${style.buildTable}`}>
                        <li className={style.buildTableHeader}>
                            <div className={style.buildTableHeaderName}>
                                <span className={style.buildTableHeaderText}>Sublocalizaciones</span>
                            </div>

                            <div className={style.buildTableHeaderActions}>
                                <span className={style.buildTableHeaderText}>Equipos</span>
                                <span className={style.buildTableHeaderText}>Acciones</span>
                            </div>
                        </li>
                        {locations.map((location) => (
                            <li
                                key={location._id}
                                onClick={addDevicesListModal(location._id)}
                                className={style.buildInfo}
                            >
                                {location.name}
                                <div className={`${style.buildTableHeaderActions}`}>
                                    <span>
                                        Equipos: <span className={`${style.p2}`}>{location.totalDevices}</span>
                                    </span>
                                    <div className={style.buildTableActions}>
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
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>
        </section>
    )
}
