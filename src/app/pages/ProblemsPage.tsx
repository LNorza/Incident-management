import { useState } from 'react'
// import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { ProblemsModal, ProblemsTable } from '../components'
import { ProblemsType } from '../../utils'

export const ProblemsPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)
    const [typeModal, setTypeModal] = useState<ProblemsType | undefined>(undefined)
    const [incidentId, setIncidentId] = useState<string | undefined>(undefined)

    const InfoModal = (incidentId: string) => {
        setTypeModal('InfoProblem')
        setIncidentId(incidentId)
        setRefreshTable(false)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setRefreshTable(true)
        setShowModal(false)
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Catálogo de problemas</h2>
                    <article>
                        {/* <span>Equipo</span> */}
                        <div className={style.actionSection}>
                            {/* <CustomSelect
                                menu
                                value={device}
                                options={deviceOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setDevice(selected.value)
                                }}
                            /> */}
                        </div>
                    </article>
                </section>

                <section>
                    <ProblemsTable refresh={refreshTable} infoProblem={InfoModal} />
                </section>

                <ProblemsModal
                    isOpen={showModal}
                    onClose={onCloseModal}
                    typeModal={typeModal}
                    incidentId={incidentId}
                />
            </div>
        </>
    )
}
