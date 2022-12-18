import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { fetchUsers } from '/src/features/users/usersSlice';

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const userStatus = useAppSelector(state => state.users.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);
  return (
    <div>UsersPage</div>
  )
}
