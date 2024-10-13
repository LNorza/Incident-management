import { useState, useEffect, useCallback } from 'react'
import { BuildContent, BuildModal } from '../components'
import { BuildingProps, BuildModalType, OfficeProps } from '../../utils'
import { API_BASE_URL, getUserDepartment } from '../../utils/api'
import { Plus } from 'lucide-react'
import style from '../style/BuildContainer.module.css'

export const BuildingPage = () => {
    const [buildings, setBuildings] = useState<BuildingProps[]>([])
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState<BuildModalType>()
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const [currentBuildingId, setCurrentBuildingId] = useState<string | undefined>('')
    const [buildingData, setBuildingData] = useState<BuildingProps | undefined>(undefined)
    const [locations, setUpdateLocations] = useState<boolean>(false)
    const [officeData, setOfficeData] = useState<OfficeProps | undefined>(undefined)
    const [deleteName, setDeleteName] = useState<string>('')
    const [deleteFunction, setDeleteFunction] = useState<() => void>(() => () => {})
    const [locationId, setLocationId] = useState<string | undefined>('')

    useEffect(() => {
        fetchDepartment()
    }, [])

    const fetchBuildings = useCallback(async () => {
        if (departmentId) {
            try {
                const response = await fetch(`${API_BASE_URL}/buildings-search?departmentId=${departmentId}`, {
                    credentials: 'include',
                })
                const data = await response.json()
                setBuildings(data)
            } catch (error) {
                console.error('Error fetching buildings:', error)
            }
        }
    }, [departmentId])

    useEffect(() => {
        fetchBuildings()
    }, [departmentId, fetchBuildings])

    const handleTypeModal = (
        modalType: BuildModalType,
        buildingId?: string,
        officeData?: OfficeProps,
        buildingName?: string,
        locationName?: string,
        locationId?: string,
    ) => {
        setTypeModal(modalType)
        if (modalType === 'AddOfficeClass') {
            setCurrentBuildingId(buildingId)
        }
        if (modalType === 'EditBuild' && buildingId) {
            const buildingToEdit = buildings.find((b) => b._id === buildingId)
            if (buildingToEdit) {
                setBuildingData(buildingToEdit)
            }
        }
        if (modalType === 'EditOfficeClass') {
            setOfficeData(officeData)
        }
        if (modalType === 'DeleteBuild') {
            setDeleteName(buildingName || '')
            setDeleteFunction(() => () => deleteBuilding(buildingId))
        }
        if (modalType === 'DeleteOfficeClass') {
            setDeleteName(locationName || '')
            setDeleteFunction(() => () => deleteLocation(locationId))
        }
        if (modalType === 'DevicesList') {
            setLocationId(locationId)
        }
        onOpenModal()
    }

    const onOpenModal = () => {
        setShowModal(true)
    }

    const onCloseModal = () => {
        setShowModal(false)
        fetchBuildings()
        setUpdateLocations(true)
    }

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id)
        } catch (err) {
            console.error(err)
        }
    }

    const deleteBuilding = async (buildingId?: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/buildings/${buildingId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar edificio')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    const deleteLocation = async (buildingId?: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/locations/${buildingId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar ubicación')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className={`${style.container}`}>
                <section className={`${style.headerBuild}`}>
                    <h2>Edificios</h2>
                    <button onClick={() => handleTypeModal('AddBuild')} className={`${style.buildAddButton}`}>
                        <Plus strokeWidth={1.75} />
                        Agregar
                    </button>
                </section>
                <section className={`${style.buildingsContainer}`}>
                    {buildings.length > 0 ? (
                        buildings.map((building) => (
                            <BuildContent
                                key={building._id}
                                building={building}
                                updateLocations={locations}
                                departmentId={departmentId}
                                setTypeModal={handleTypeModal}
                                setUpdateLocations={setUpdateLocations}
                            />
                        ))
                    ) : (
                        <div></div>
                    )}
                </section>
            </div>

            <BuildModal
                isOpen={showModal}
                type={typeModal}
                onClose={onCloseModal}
                buildingId={currentBuildingId}
                buildingData={buildingData}
                locationId={locationId}
                officeData={officeData}
                deleteFunction={deleteFunction}
                deleteName={deleteName}
            />
        </>
    )
}
