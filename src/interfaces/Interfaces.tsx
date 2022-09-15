export interface IUser {
    _id: string;
    username: string | undefined;
    avatar?: string | undefined;
    password: string | undefined;
    email: string | undefined;
    role: number;
  }

  export interface IUserDetails {
    username?: string;
    email?: string;
    password?: string;
  }