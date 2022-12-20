import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { UsersList } from '../../components/UsersList'

export const UsersPage: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEditingModal = () => {
    setIsEditing(true);
  };

  const handleOpenAddingModal = () => {
    setIsAdding(true);
  };

  return (
    <>
      <h2>Users Page</h2>
      {/* <Link to='/addUserForm'>
        <button>
          Add new User
        </button>
      </Link> */}

      {isAdding &&
        < Modal
          setIsOpenModal={setIsAdding}
          isAdding={isAdding}
        />}

      {isEditing &&
        <Modal
          setIsOpenModal={setIsEditing}
        />}

      <Button
        onClick={handleOpenAddingModal}
        content="Add Person"
      />

      <UsersList isOpenModal={handleOpenEditingModal} />
    </>
  )
}
