export interface IUser {
  _id: string;
  username: string | undefined;
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

export interface ICreateUser {
  username?: string;
  email?: string;
  password?: string;
  isAdmin: boolean;
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

export interface ICommunitySubject {
  _id: string;
  title: string | undefined;
  description: string | undefined;
  threads?: Array<ICommunityThread>;
}

export interface ICommunityThread {
  _id: string;
  subjectID: string;
  title: string | undefined;
  createdAt: Date;
  user: string | undefined;
  username: string | undefined;
}

export interface IPost {
  _id: string;
  threadID: string;
  title: string;
  text: string;
  username: string;
  createdAt: Date;
  user: string;
}

export interface IComment {
  _id: string;
  postID: string;
  username: string;
  user: string;
  content: string;
  createdAt: Date;
}
