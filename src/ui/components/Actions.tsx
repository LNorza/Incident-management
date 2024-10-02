import React, { useState, useRef, useEffect } from 'react'
import { LucideIcon, Ellipsis } from 'lucide-react'
import style from '../style/Actions.module.css'

interface Action {
    text: string
    icon: LucideIcon
    color?: string
    onClick: (row: unknown, e: React.MouseEvent<HTMLDivElement>) => void
}

interface EditActionsProps {
    row: unknown
    actions?: Action[]
    parentRef?: React.RefObject<HTMLDivElement>
}

const Actions: React.FC<EditActionsProps> = ({ row, parentRef, actions = [] }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [openUpwards, setOpenUpwards] = useState<boolean>(false)
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null)

    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation()
        if (!parentRef) {
            return
        }
        if (dropdownRef.current && parentRef.current) {
            const parentRect = parentRef.current.getBoundingClientRect()
            const buttonRect = dropdownRef.current.getBoundingClientRect()
            const dropdownHeight = 108
            const spaceBelow = parentRect.height - buttonRect.top

            if (spaceBelow > dropdownHeight) {
                setOpenUpwards(false)
            } else {
                setOpenUpwards(true)
            }
        }
        console.log('Action clicked')
        setIsOpen(!isOpen)
    }

    const handleOutsideClick = (event: Event) => {
        if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    // Ajuste en el tipo de evento para HTMLDivElement
    const handleActionClick =
        (actionFunction: (row: unknown, e: React.MouseEvent<HTMLDivElement>) => void) =>
        (e: React.MouseEvent<HTMLDivElement>) => {
            actionFunction(row, e)
            setIsOpen(false)
        }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    const showOrHide = (action: Action, index: number) => {
        const IconComponent = action.icon

        return (
            <div
                key={index}
                className={`${style.editActionsItem}`}
                onClick={handleActionClick(action.onClick)} // Aquí ahora es compatible con HTMLDivElement
                style={{ color: action.color }}
            >
                <IconComponent />
                <span className={`${style.editActionsText}`}>{action.text}</span>
            </div>
        )
    }

    return (
        <div className={`${style.editActions}`} ref={dropdownRef}>
            <button className={`${style.editActionsBtn}`} onClick={toggleDropdown}>
                <Ellipsis color="white" className={`${style.dots}`} />
            </button>
            {isOpen && (
                <div ref={dropdownMenuRef} className={`${style.editActionsMenu} ${openUpwards ? style.openUp : ''}`}>
                    {actions.map((action, index) => showOrHide(action, index))}
                </div>
            )}
        </div>
    )
}

export default Actions
