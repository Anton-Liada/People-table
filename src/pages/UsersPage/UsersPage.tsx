import React from 'react'
import { Link } from 'react-router-dom'
import { UsersList } from '/src/components/UsersList'


export const UsersPage: React.FC = () => {


  return (
    <>
      <h2>UsersPage</h2>
      <Link to='/addUserForm'>
        <button>
          Add new User
        </button>
      </Link>

      <UsersList />
    </>
  )
}
