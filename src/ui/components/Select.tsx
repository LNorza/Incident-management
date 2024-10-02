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
}

export const CustomSelect = ({ placeholder, options, onSelect, value }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down')
    const [selectedOption, setSelectedOption] = useState<string>(placeholder || 'Seleccionar una opción')

    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const preselectedOption = options.find((option) => option.value === value)
        if (preselectedOption) {
            setSelectedOption(preselectedOption.label)
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
        setSelectedOption(option.label)
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

        // Cleanup listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const isPlaceholder = selectedOption === placeholder || selectedOption === 'Seleccionar una opción'

    return (
        <div ref={selectRef} className={style.select}>
            <div className={`${style.selected} ${isOpen ? style.active : ''}`} onClick={toggleOptions}>
                <span className={isPlaceholder ? style.placeholder : ''}>{selectedOption}</span>
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
