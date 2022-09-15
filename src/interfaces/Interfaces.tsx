export interface IUser {
    _id: string;
    username: string;
    avatar?: string | undefined;
    password: string | undefined;
    email: string | undefined;
    role: number;
  }