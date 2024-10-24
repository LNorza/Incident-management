import { useState } from 'react'

export const useForm = <T extends object>(initialForm: T) => {
  const [formState, setFormState] = useState<T>(initialForm)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  const onResetForm = () => {
    setFormState(initialForm)
  }

  // Función para actualizar campos específicos
  const updateFields = (updatedFields: Partial<T>) => {
    setFormState((prevState) => ({
      ...prevState,
      ...updatedFields,
    }))
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onTextAreaChange,
    onResetForm,
    setFormState,
    updateFields,
  }
}