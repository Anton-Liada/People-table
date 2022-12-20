import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser, IUsersState } from '../../types/types';
import { Status } from '/src/types/enums';

const initialState: IUsersState = {
  users: [],
  status: Status.IDLE,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers',
  async () => {
    const response = await axios.get('http://localhost:4000/users');

    return response.data;
  }
);

export const addNewUser = createAsyncThunk('users/addNewUser',
  async (newUser: IUser) => {
    const response = await axios.post('http://localhost:4000/users', newUser)

    return response.data;
  }
);

export const deleteUser = createAsyncThunk('users/deleteNewUser',
  async (id: number) => {
    await axios.delete(`http://localhost:4000/users/${id}`)

    return id;
  }
);

const setStatus = (state: IUsersState) => {
  state.status = Status.LOADING;
};

const setError = (state: IUsersState) => {
  state.status = Status.FAILED;
  state.error = 'Something went wrong';
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, setStatus)
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.status = Status.SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, setError);

    builder
      .addCase(addNewUser.pending, setStatus)
      .addCase(addNewUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = Status.SUCCEEDED;
        state.users.push(action.payload)
      })
      .addCase(addNewUser.rejected, setError);

    builder
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = Status.SUCCEEDED;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, setError);
  },
});

export default usersSlice.reducer;
