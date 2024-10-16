export interface ISignin {
    access_token: string
    user: IUser
}

export interface IUser {
    _id: string
    name: string
    email: string
    username?: string
    password?: string
    position: string
    role: string
    department_id: string
    imageUrl?: string
}

export interface IUserLogin {
    username: string
    password: string
}
