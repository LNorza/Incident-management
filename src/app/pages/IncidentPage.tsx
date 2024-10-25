import { useState } from 'react'
import { CustomSelect } from '../../ui'
import { API_BASE_URL, IncidentModalType, IOptions } from '../../utils'
import { IncidentModal, IncidentTable } from '../components'

import { Plus } from 'lucide-react'
import style from '../style/deviceContainer.module.css'

export const IncidentPage = () => {
    const [incident, setIncident] = useState<string>('ALL')
    const [incidentOptions, setIncidentOptions] = useState<IOptions[]>([])
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState<IncidentModalType>()
    const [refreshTable, setRefreshTable] = useState(false)
    const [incidentId, setIncidentId] = useState<string | undefined>(undefined)
    const [deleteName, setDeleteName] = useState<string>('')

    const handleSelect = (selected: { label: string; value: string }) => {
        console.log(selected)
        setIncident(selected.value)
        setRefreshTable(true)
    }

    const onOpenModal = () => {
        setTypeModal('AddIncident')
        setIncidentId(undefined)
        setShowModal(true)
    }

    const handleEditModal = (id: string) => {
        setTypeModal('EditIncident')
        setIncidentId(id)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleDeleteModal = (id: string, incidentName: string) => {
        setTypeModal('DeleteIncident')
        setIncidentId(id)
        setDeleteName(incidentName)
        setRefreshTable(false)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setIncidentId(undefined)
        setDeleteName('')
        setRefreshTable(true)
        setShowModal(false)
    }

    const deleteIncident = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar la incidencia')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Incidencias</h2>
                    <article className={style.actionArticle}>
                        <div className={style.actioncontainer}>
                            <span>Tipo</span>
                            <div>
                                <CustomSelect
                                    menu
                                    value={incident}
                                    options={incidentOptions}
                                    onSelect={handleSelect}
                                    placeholder="Todos"
                                />
                            </div>
                        </div>
                        <div className={style.actioncontainer}>
                            <div>
                                <span>Estado</span>
                                <div>
                                    <CustomSelect
                                        menu
                                        value={incident}
                                        options={incidentOptions}
                                        onSelect={handleSelect}
                                        placeholder="Todos"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.actioncontainer}>
                            <span className={style.hideText}>add</span>
                            <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button>
                        </div>
                    </article>
                </section>

                <section>
                    <IncidentTable
                        refresh={refreshTable}
                        building={incident}
                        editIncident={handleEditModal}
                        deleteIncident={handleDeleteModal}
                    />
                </section>
            </div>

            <IncidentModal
                isOpen={showModal}
                onClose={onCloseModal}
                type={typeModal}
                incidentId={incidentId}
                deleteFunction={deleteIncident}
                deleteName={deleteName}
            />
        </>
    )
}
