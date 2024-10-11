export interface ISignin {
  access_token: string
  user: IUser
}

export interface IUser {
  id: number
  name: string
  position: string
  username?: string
  password?: string
  department_id: string
}

export interface IUserLogin {
  username: string
  password: string
}
