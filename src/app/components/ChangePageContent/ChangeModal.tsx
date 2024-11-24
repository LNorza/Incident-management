import { ChangeModalType } from '../../../utils'
import style from '../../style/modal.module.css'
import { AproveOrRejectedModal } from './AproveOrRejectedModal'
import { InfoChangeModal } from './InfoChangeModal'

interface Props {
    isOpen: boolean
    changeId: string
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
                            <AproveOrRejectedModal onClose={onClose} action={actionModal} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}