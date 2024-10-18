import { IUser } from '../interface'
import { API_BASE_URL } from './apiConfig'

let userRole: string;

export const getUserData = async (): Promise<IUser | null> => {
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

    const userData: IUser = {
      _id: user._id,
      name: user.name,
      position:
        user.position === 'HEAD_SYSTEMS_DEPARTMENT'
          ? 'Jefe del departamento de sistemas'
          : user.position === 'HEAD_BIOCHEMISTRY_DEPARTMENT'
            ? 'Jefe del departamento de bioquímica'
            : user.position === 'TEACHER'
              ? 'Docente'
              : 'Desconocido',
      department_id: user.department_id.toString(),
      role: user.role,
      email: user.email,
      username: user.username,
      imageUrl: user.imageUrl,
    }

    userRole = user.role;

    return userData
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

export const getUserRole = (): string => {
  console.log('User role:', userRole);
  return userRole;
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


    if (user && user.department_id) {
      return user.department_id.toString()
    }

    return null
  } catch (error) {
    console.error('Error fetching department ID:', error)
    return null
  }
}
