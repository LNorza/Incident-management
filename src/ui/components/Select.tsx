import { useEffect, useState } from 'react'
import style from '../style/select.module.css'

interface Option {
    label: string
    value: string
}

interface CustomSelectProps {
    options: Option[]
    onSelect: (selected: Option) => void
    value?: string
}

export const CustomSelect = ({ options, onSelect, value }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string>('Seleccione una opción')

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
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={style.arrow}>
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
            </div>

            {isOpen && (
                <div className={style.options}>
                    {options.map((option) => (
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
                    ))}
                </div>
            )}
        </div>
    )
}
