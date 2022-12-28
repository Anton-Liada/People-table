import React, { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { fetchUsers } from '../../features/users/usersSlice';
import { Status } from '../../types/enums';
import { IOnPageChange, IUser } from '../../types/types';
import { Loader } from '../Loader';
import { UserExcerpt } from '../UserExcerpt';
import './UsersList.scss';

type Props = {
  isOpenModal: (user: IUser | null) => void;
};

export const UsersList: React.FC<Props> = ({ isOpenModal }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const fetchRequestStatus = useAppSelector(state => state.users.status);
  const errorMessage = useAppSelector(state => state.users.error);

  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (fetchRequestStatus === Status.IDLE) {
      dispatch(fetchUsers());
    }
  }, [fetchRequestStatus, dispatch]);

  const offset = currentPage * itemsPerPage;

  const filteredUsers = useMemo(() => {
    return users.filter(({ last_name }) =>
      last_name?.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, fetchRequestStatus, users]);

  let content;

  if (fetchRequestStatus === Status.SUCCEEDED) {
    const usersPerPage = filteredUsers.slice(offset, offset + itemsPerPage);

    content = usersPerPage.map(user => (
      <UserExcerpt key={user.id} user={user} isOpenModal={isOpenModal} />
    ));
  }

  const handlePageClicked = ({ selected: selectedPage }: IOnPageChange) => {
    setCurrentPage(selectedPage);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
      <label className="filter-label">Find user by last name</label>

      <input
        className="filter-input"
        placeholder="Last name"
        type="text"
        value={value}
        onChange={onChangeInput}
      />

      {fetchRequestStatus === Status.LOADING && <Loader />}

      {fetchRequestStatus === Status.FAILED && <p>{errorMessage}</p>}

      {fetchRequestStatus === Status.SUCCEEDED && (
        <>
          <table className="content-table">
            <thead>
              <tr>
                <th className="content-table__th">ID</th>
                <th className="content-table__th">Name</th>
                <th className="content-table__th">Last Name</th>
                <th className="content-table__th">Email</th>
                <th className="content-table__th">Address</th>
                <th className="content-table__th">Sex</th>
                <th className="content-table__th">Actions</th>
              </tr>
            </thead>

            <tbody>{content}</tbody>
          </table>

          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            pageCount={pageCount}
            onPageChange={handlePageClicked}
            marginPagesDisplayed={3}
            containerClassName="pagination-list"
            previousLinkClassName="pagination-previous"
            pageLinkClassName="pagination-link"
            nextLinkClassName="pagination-next"
            disabledClassName="pagination__link--disabled"
            activeClassName="pagination__link-active"
          />
        </>
      )}
    </>
  );
};
