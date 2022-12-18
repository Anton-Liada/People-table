import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "/src/types/types";

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

  return (
    <tr key={id}>
      <td>
        {id}
      </td>
      <td>
        {first_name}
      </td>
      <td>
        {last_name}
      </td>
      <td>
        {gender}
      </td>
      <td>
        {email}
      </td>
      <td>
        {address}
      </td>

      <td>
        <Link to={{
          pathname: `/user/${id}`,
          search: location.search,
        }}>
          <button>
            update
          </button>
        </Link>

        <button>
          delete
        </button>
      </td>
    </tr >
  );
};