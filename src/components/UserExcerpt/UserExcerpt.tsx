import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../features/users/usersSlice";
import { IUser } from "../../types/types";
import { useAppDispatch } from "/src/features/hooks/hooks";
import { Status } from "/src/types/enums";

type Props = {
  user: IUser;
}

export const UserExcerpt: React.FC<Props> = ({ user }) => {
  const {
    id,
    first_name,
    last_name,
    gender,
    email,
    address,
  } = user;
  const dispatch = useAppDispatch();

  const handleRemoveUser = async () => {
    await dispatch(deleteUser(id))
  }

  return (
    <tr key={id}>
      <td>{id}</td>

      <td>{first_name}</td>

      <td>{last_name}</td>

      <td>{gender}</td>

      <td>{email}</td>

      <td>{address}</td>

      <td>
        <Link to={{
          pathname: `/user/${id}`,
          search: location.search,
        }}>
          <button>
            update
          </button>
        </Link>

        <button onClick={handleRemoveUser}>
          delete
        </button>
      </td>
    </tr >
  );
};