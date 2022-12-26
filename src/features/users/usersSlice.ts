import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from '../../types/enums';
import { IUser, IUsersState } from '../../types/types';

const initialState: IUsersState = {
  users: [],
  status: Status.IDLE,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(
    'https://crud-server-g9cq.onrender.com/users'
  );

  return response.data;
});

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (newUser: IUser) => {
    const response = await axios.post(
      'https://crud-server-g9cq.onrender.com/users',
      newUser
    );

    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: IUser) => {
    const response = await axios.put(
      `https://crud-server-g9cq.onrender.com/users/${user.id}`,
      user
    );

    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteNewUser',
  async (id: number) => {
    await axios.delete(`https://crud-server-g9cq.onrender.com/users/${id}`);

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
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.status = Status.SUCCEEDED;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, setError);

    builder
      .addCase(addNewUser.pending, setStatus)
      .addCase(addNewUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = Status.SUCCEEDED;
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, setError);

    builder
      .addCase(updateUser.pending, setStatus)
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = Status.SUCCEEDED;
        const { id, first_name, last_name, gender, address, email } =
          action.payload;
        const existingUser = state.users.find(user => user.id === id);

        if (existingUser) {
          existingUser.first_name = first_name;
          existingUser.last_name = last_name;
          existingUser.gender = gender;
          existingUser.address = address;
          existingUser.email = email;
        }
      })
      .addCase(updateUser.rejected, setError);

    builder
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = Status.SUCCEEDED;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, setError);
  },
});

export default usersSlice.reducer;
