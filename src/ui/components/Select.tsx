import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import style from '../style/select.module.css'

interface Option {
    label: string
    value: string
}

interface CustomSelectProps {
    textDefault?: string
    options: Option[]
    onSelect: (selected: Option) => void
    value?: string
}

export const CustomSelect = ({ textDefault, options, onSelect, value }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string>(textDefault || 'Seleccionar una opción')

    useEffect(() => {
        const preselectedOption = options.find((option) => option.value === value)
        if (preselectedOption) {
            setSelectedOption(preselectedOption.label)
        }
    }, [value, options])

    const toggleOptions = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option.label)
        onSelect(option)
        setIsOpen(false)
    }

    return (
        <div className={style.select}>
            <div className={`${style.selected} ${isOpen ? style.active : ''}`} onClick={toggleOptions}>
                <span>{selectedOption}</span>
                <ChevronDown size={20} className={style.arrow} />
            </div>

            {isOpen && (
                <div className={style.options}>
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
