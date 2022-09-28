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

export interface IAuthContext {
  signedIn: boolean | undefined;
  role: string | undefined;
  admin: boolean | undefined;
  defaultUser: boolean | undefined;
  handleLogin: (parameter1: string, parameter2: string) => void;
  handleLogout: () => void;
  auth: () => boolean;
}

export interface IGhostType {
  _id: string | undefined;
  type: string | undefined;
  description: string | undefined;
}

export interface ISpookySpot {
  _id: string | undefined;
  name: string | undefined;
  address: string | undefined;
  postalCode?: string | undefined;
  country: string | undefined;
  location: {
    type: string;
    coordinates: number[];
  };
  description: string | undefined;
  image?: string | undefined;
  createdAt: Date;
  rating: number | undefined;
  ghostTypes: [
    {
      type: string;
    }
  ];
}
