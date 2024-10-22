import { IUserData } from '../interface'
import { API_BASE_URL } from './apiConfig'

const getPosition = (position: string): string => {
    switch (position) {
        case 'HEAD_SYSTEMS_DEPARTMENT':
            return 'Jefe del departamento de sistemas'
        case 'HEAD_BIOCHEMISTRY_DEPARTMENT':
            return 'Jefe del departamento de bioquímica'
        case 'LAB_CHIEF':
            return 'Jefe de laboratorio'
        case 'TEACHER':
            return 'Docente'
        default:
            return 'Desconocido'
    }
}

const getRole = (role: string): string => {
    switch (role) {
        case 'ADMIN':
            return 'Administrador'
        case 'ADMIN_DEPARTMENT':
            return 'Administrador de departamento'
        case 'ADMIN_TECHNICIANS':
            return 'Administrador de técnicos'
        case 'TECHNICIAN':
            return 'Técnico'
        case 'ADMIN_LAB':
            return 'Administrador de laboratorio'
        case 'ONLY_READ':
            return 'Solo lectura'
        default:
            return 'Usuario'
    }
}

export const getUserData = async (): Promise<IUserData | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error('Error fetching user data')
        }

        const user = await response.json()

        const userData: IUserData = {
            _id: user._id,
            name: user.name,
            position: getPosition(user.position),
            department: user.department_id,
            role: getRole(user.role),
            email: user.email,
            username: user.username,
            imageUrl: user.imageUrl,
        }

        return userData
    } catch (error) {
        console.error('Error fetching user data:', error)
        return null
    }
}

export const getUserDepartment = async (): Promise<string | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error('Error fetching user data')
        }
        const user = await response.json()

        if (user && user.department_id._id) {
            return user.department_id._id
        }

        return null
    } catch (error) {
        console.error('Error fetching department ID:', error)
        return null
    }
}

export const getUserRole = async (): Promise<string | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error('Error fetching user data')
        }

        const user = await response.json()

        if (user && user.role) {
            return user.role
        }

        return null
    } catch (error) {
        console.error('Error fetching user role:', error)
        return null
    }
}
