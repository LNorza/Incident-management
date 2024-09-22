import { useState } from 'react'

export const useForm = <T>(initialForm: T) => {
    const [formState, setFormState] = useState<T>(initialForm)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setFormState,
    }
}
