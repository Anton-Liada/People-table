import React, { useEffect } from 'react'
import { Loader } from '../Loader';
import { UserExcerpt } from '../UserExcerpt';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { fetchUsers } from '/src/features/users/usersSlice';
import { Status } from '/src/types/enums';

type Props = {
  isOpenModal: () => void;
}

export const UsersList: React.FC<Props> = ({ isOpenModal }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const userStatus = useAppSelector(state => state.users.status);
  const errorMessage = useAppSelector(state => state.users.error)

  useEffect(() => {
    if (userStatus === Status.IDLE) {
      dispatch(fetchUsers());
    }

  }, [userStatus, dispatch]);

  let content;

  if (userStatus === Status.SUCCEEDED) {
    const orderedUsers = users
      .slice()
      .sort((a, b) => b.id - a.id);

    content = orderedUsers.map(user => (
      <UserExcerpt
        key={user.id}
        user={user}
        isOpenModal={isOpenModal}
      />
    ))
  }

  return (
    <>
      {(userStatus === Status.LOADING) && <Loader />}

      {(userStatus === Status.FAILED) && <p>{errorMessage}</p>}

      {(userStatus === Status.SUCCEEDED) &&
        (<table className="content-table">
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
        </table>)
      }
    </>
  )
}
