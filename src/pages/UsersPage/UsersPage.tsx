import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { IconAdd } from '../../components/Icons/IconAdd';
import { Modal } from '../../components/Modal';
import { UsersList } from '../../components/UsersList';
import { IUser } from '/src/types/types';

export const UsersPage: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>();

  const handleOpenEditingModal = (user: IUser | null) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleOpenAddingModal = () => {
    setIsAdding(true);
  };

  console.log(currentUser);

  return (
    <>
      <div className="users-page-wrapper">
        <h2 className="page-title">Users Page</h2>

        <Button
          onClick={handleOpenAddingModal}
          content="add user"
          icon={<IconAdd />}
        />
      </div>

      {isAdding && <Modal setIsOpenModal={setIsAdding} isAdding={isAdding} />}

      {isEditing && <Modal setIsOpenModal={setIsEditing} user={currentUser} />}

      <UsersList isOpenModal={handleOpenEditingModal} />
    </>
  );
};
