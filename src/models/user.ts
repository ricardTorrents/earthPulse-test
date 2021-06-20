export interface IUser {
  uid: string;
  name: string;
  lastname: string;
  email: string;
  latitude: number;
  longitude: number;
}

export interface IUserPositions {
  latitude: number;
  longitude: number;
  name: string;
}
