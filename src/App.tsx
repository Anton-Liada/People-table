import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './features/hooks/hooks';
import { fetchUsers } from './features/users/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const userStatus = useAppSelector(state => state.users.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  console.log(users)

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};
