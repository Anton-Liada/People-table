export interface IUser {
  id: number | 0;
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

export interface IOnPageChange {
  selected: number;
}
