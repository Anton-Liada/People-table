export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
}

export interface IUsersState {
  users: IUser[];
  status: string;
  error: string | null;
}
