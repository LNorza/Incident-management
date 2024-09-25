export interface ISignin {
  access_token: string;
  user: IUser;
}

export interface IUser {
  username: string;
  password: string;
}
