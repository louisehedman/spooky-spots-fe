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
  handleLogin: (parameter: string) => void;
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
