import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { UserExcerpt } from '../UserExcerpt';
import './UsersList.scss';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { fetchUsers } from '/src/features/users/usersSlice';
import { Status } from '/src/types/enums';
import { IUser } from '/src/types/types';

type Props = {
  isOpenModal: (user: IUser | null) => void;
};

export const UsersList: React.FC<Props> = ({ isOpenModal }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const fetchRequestStatus = useAppSelector(state => state.users.status);
  const errorMessage = useAppSelector(state => state.users.error);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchRequestStatus === Status.IDLE) {
      dispatch(fetchUsers());
    }

    setIsLoading(true);
  }, [fetchRequestStatus, dispatch]);

  let content;

  if (fetchRequestStatus === Status.SUCCEEDED) {
    const orderedUsers = users.slice().sort((a, b) => b.id - a.id);

    content = orderedUsers.map(user => (
      <UserExcerpt key={user.id} user={user} isOpenModal={isOpenModal} />
    ));
  }

  return (
    <>
      {!isLoading && <Loader />}

      {fetchRequestStatus === Status.FAILED && <p>{errorMessage}</p>}

      {fetchRequestStatus === Status.SUCCEEDED && (
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

          <tbody>{content}</tbody>
        </table>
      )}
    </>
  );
};
