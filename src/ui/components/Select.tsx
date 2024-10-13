import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import style from '../style/select.module.css'

interface Option {
    label: string
    value: string
}

interface CustomSelectProps {
    placeholder?: string
    options: Option[]
    onSelect: (selected: Option) => void
    value?: string
    initialValue?: Option
    menu?: boolean
}

export const CustomSelect = ({ placeholder, options, onSelect, value, initialValue, menu }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down')

    // No seleccionar valor por defecto si `value` es undefined
    const [selectedOption, setSelectedOption] = useState<Option | null>(initialValue || null)

    const selectRef = useRef<HTMLDivElement>(null)

    // Actualizar el valor del select cuando el prop `value` cambie
    useEffect(() => {
        if (value === undefined) {
            setSelectedOption(null) // No seleccionar ninguna opción
        } else {
            const preselectedOption = options.find((option) => option.value === value)
            if (preselectedOption) {
                setSelectedOption(preselectedOption)
            }
        }
    }, [value, options])

    const toggleOptions = () => {
        if (selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top

            if (spaceBelow < 240 && spaceAbove > spaceBelow) {
                setOpenDirection('up')
            } else {
                setOpenDirection('down')
            }
        }
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option)
        onSelect(option)
        setIsOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const isPlaceholder = placeholder && (!selectedOption || selectedOption.label === placeholder)

    return (
        <div ref={selectRef} className={style.select}>
            <div
                className={`${style.selected} ${isOpen ? style.active : ''} ${
                    isOpen && !menu ? style.colorBorder : ''
                }`}
                onClick={toggleOptions}
            >
                <span className={isPlaceholder ? style.placeholder : ''}>
                    {selectedOption ? selectedOption.label : placeholder || ''}
                </span>
                <ChevronDown size={20} className={style.arrow} />
            </div>

            {isOpen && (
                <div
                    className={style.options}
                    style={{
                        top: openDirection === 'down' ? '115%' : 'auto',
                        bottom: openDirection === 'up' ? '115%' : 'auto',
                    }}
                >
                    {options.length === 0 ? (
                        <div className={style.noOptions}>No hay opciones disponibles</div>
                    ) : (
                        options.map((option) => (
                            <div key={option.value} title={option.label}>
                                <input
                                    id={`option-${option.value}`}
                                    name="option"
                                    type="radio"
                                    onClick={() => handleOptionClick(option)}
                                />
                                <label className={style.option} htmlFor={`option-${option.value}`}>
                                    {option.label}
                                </label>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
