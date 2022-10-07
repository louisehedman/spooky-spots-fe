export interface IUser {
  _id: string;
  username: string | undefined;
  avatar?: string | undefined;
  password?: string | undefined;
  email: string | undefined;
  isAdmin: boolean | undefined;
  spookySpotList: Array<ISpookySpotListItem>;
}

export interface IUserDetails {
  username?: string;
  email?: string;
  password?: string;
}

export interface IEditUser {
  isAdmin?: boolean | undefined;
  email?: string | undefined;
}

export interface IAuthContext {
  signedIn: boolean | undefined;
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

export interface ISpookySpotListItem {
  _id?: string | undefined;
  spookySpotId: string | undefined;
  comment: string | undefined;
  hasVisited: boolean | undefined;
  spookySpot?: ISpookySpot | undefined;
}

export interface IEditListItem {
  comment?: string | undefined;
  hasVisited?: boolean | undefined;
}

export interface IEditSettings {
  email?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

