import { ChangeModalType } from '../../../utils'
import style from '../../style/modal.module.css'
import { ApproveOrRejectedModal } from './ApproveOrRejectedModal'
import { InfoChangeModal } from './InfoChangeModal'

interface Props {
    isOpen: boolean
    changeId: string | undefined
    onClose: () => void
    actionModal?: string
    type?: ChangeModalType
}

export const ChangeModal = ({ isOpen, changeId, type = 'InfoChange', onClose, actionModal }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    {type === 'InfoChange' ? (
                        <section className={style.largeModalInfoContainer}>
                            <InfoChangeModal onClose={onClose} changeId={changeId} />
                        </section>
                    ) : (
                        <section className={style.modalInfoContainer}>
                            <ApproveOrRejectedModal onClose={onClose} action={actionModal} changeId={changeId} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
