import React, { useState, useRef, useEffect } from 'react'
import { LucideIcon, Ellipsis } from 'lucide-react'
import ReactDOM from 'react-dom'
import style from '../style/actions.module.css'

export interface Action {
    text: string
    icon: LucideIcon
    color?: string
    onClick: (row: unknown, e: React.MouseEvent<HTMLDivElement>) => void
}

interface EditActionsProps {
    row: unknown
    table?: boolean
    actions?: Action[]
    parentRef?: React.RefObject<HTMLDivElement>
}

export const Actions: React.FC<EditActionsProps> = ({ row, table, parentRef, actions = [] }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null)
    const [openUpwards, setOpenUpwards] = useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation()

        if (!dropdownRef.current) return
        if (!parentRef) return

        const rect = dropdownRef.current.getBoundingClientRect()
        const dropdownHeight = 220
        const dropdownTableHeight = 108
        if (table) {
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            if (spaceBelow < dropdownTableHeight && spaceAbove > dropdownTableHeight) {
                setMenuPosition({
                    top: rect.top - dropdownTableHeight,
                    left: rect.left,
                })
            } else {
                setMenuPosition({
                    top: rect.bottom,
                    left: rect.left,
                })
            }

            setIsOpen((prev) => !prev)
        } else {
            if (dropdownRef.current && parentRef.current) {
                const parentRect = parentRef.current.getBoundingClientRect()
                const spaceBelow = parentRect.height - rect.top

                if (spaceBelow > dropdownHeight) {
                    setOpenUpwards(false)
                } else {
                    setOpenUpwards(true)
                }
            }

            setIsOpen((prev) => !prev)
        }
    }

    const handleOutsideClick = (event: Event) => {
        if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    const handleActionClick =
        (actionFunction: (row: unknown, e: React.MouseEvent<HTMLDivElement>) => void) =>
        (e: React.MouseEvent<HTMLDivElement>) => {
            actionFunction(row, e)
            setIsOpen(false)
        }

    const handleScroll = () => {
        setIsOpen(false) // Cierra el menú al hacer scroll
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        window.addEventListener('scroll', handleScroll, true) // Se agrega el evento de scroll a la ventana

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            window.removeEventListener('scroll', handleScroll, true) // Elimina el listener al desmontar el componente
        }
    }, [])

    const showOrHide = (action: Action, index: number) => {
        const IconComponent = action.icon

        return (
            <div
                key={index}
                className={style.editActionsItem}
                onClick={handleActionClick(action.onClick)}
                style={{ color: action.color }}
            >
                <IconComponent />
                <span className={style.editActionsText}>{action.text}</span>
            </div>
        )
    }

    return (
        <div className={style.editActions} ref={dropdownRef}>
            <button className={style.editActionsBtn} onClick={toggleDropdown}>
                <Ellipsis color="white" className={style.dots} />
            </button>
            {isOpen && !table && (
                <div ref={dropdownMenuRef} className={`${style.editActionsMenu} ${openUpwards ? style.openUp : ''}`}>
                    {actions.map((action, index) => showOrHide(action, index))}
                </div>
            )}
            {isOpen &&
                table &&
                ReactDOM.createPortal(
                    <div
                        ref={dropdownMenuRef}
                        className={style.editActionsMenu}
                        style={{
                            position: 'absolute',
                            top: `${menuPosition.top}px`,
                            left: '82%',
                        }}
                    >
                        {actions.map((action, index) => showOrHide(action, index))}
                    </div>,
                    document.body,
                )}
        </div>
    )
}
