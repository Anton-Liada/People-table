import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { fetchUsers } from '../../features/users/usersSlice';
import { Status } from '../../types/enums';
import { IUser } from '../../types/types';
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
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (fetchRequestStatus === Status.IDLE) {
      dispatch(fetchUsers());
    }

    setIsLoading(true);
  }, [fetchRequestStatus, dispatch]);

  const offset = currentPage * itemsPerPage;

  let content;

  if (fetchRequestStatus === Status.SUCCEEDED) {
    const orderedUsers = users
      .slice()
      .sort((a, b) => b.id - a.id)
      .slice(offset, offset + itemsPerPage);

    content = orderedUsers.map(user => (
      <UserExcerpt key={user.id} user={user} isOpenModal={isOpenModal} />
    ));
  }

  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(users.length / itemsPerPage);

  return (
    <>
      {!isLoading && <Loader />}

      {fetchRequestStatus === Status.FAILED && <p>{errorMessage}</p>}

      {isLoading && (
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

      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        pageCount={pageCount}
        onPageChange={handlePageClick}
        marginPagesDisplayed={3}
        containerClassName="pagination-list"
        previousLinkClassName="pagination-previous"
        nextLinkClassName="pagination-next"
        pageLinkClassName="pagination-link"
        disabledClassName="pagination__link--disabled"
        activeClassName="pagination__link-active"
      />
    </>
  );
};
