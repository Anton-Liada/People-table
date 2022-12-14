import React from 'react';
import { deleteUser } from '../../features/users/usersSlice';
import { IUser } from '../../types/types';
import { Button } from '../Button';
import { useAppDispatch } from '/src/features/hooks/hooks';

type Props = {
  user: IUser;
  isOpenModal: (value: IUser | null) => void;
};

export const UserExcerpt: React.FC<Props> = ({ user, isOpenModal }) => {
  const { id, first_name, last_name, gender, email, address } = user;
  const dispatch = useAppDispatch();

  const handleRemoveUser = async () => {
    await dispatch(deleteUser(id));
  };

  return (
    <tr key={id}>
      <td>{id}</td>

      <td>{first_name}</td>

      <td>{last_name}</td>

      <td>{email}</td>

      <td>{address}</td>

      <td>{gender}</td>

      <td>
        <button className="table-button" onClick={() => isOpenModal(user)}>
          update
        </button>
        
        <Button onClick={handleRemoveUser} content="delete" />
      </td>
    </tr>
  );
};
