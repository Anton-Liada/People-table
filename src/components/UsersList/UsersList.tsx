import React, { useEffect } from 'react'
import { Loader } from '../Loader';
import { UserExcerpt } from '../UserExcerpt';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { fetchUsers } from '/src/features/users/usersSlice';
import { Status } from '/src/types/enums';



export const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const userStatus = useAppSelector(state => state.users.status);

  useEffect(() => {
    if (userStatus === Status.IDLE) {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  let content;

  if (userStatus === Status.LOADING) {
    content = <Loader />
  } else if (userStatus === Status.SUCCEEDED) {
    const orderedUsers = users
      .slice()
      .sort((a, b) => b.id - a.id);

    content = orderedUsers.map(user => (
      <UserExcerpt key={user.id} user={user} />
    ))
  } else if (userStatus === Status.FAILED) {
    content = <div>somthing went wrong</div>
  }

  return (
    <table className="content-table">
      <thead>
        <tr>
          <th className="content-table__th">ID</th>
          <th className="content-table__th">Name</th>
          <th className="content-table__th">Last Name</th>
          <th className="content-table__th">Sex</th>
          <th className="content-table__th">Email</th>
          <th className="content-table__th">Address</th>
          <th className="content-table__th">Actions</th>
        </tr>
      </thead>

      <tbody>
        {content}
      </tbody>
    </table>
  )
}
