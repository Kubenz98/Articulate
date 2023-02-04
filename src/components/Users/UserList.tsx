import React from "react";
import UserItem from "./UserItem";
import useSearcher from "../../hooks/useSearcher";
import Searcher from "../UI/Searcher";
import ReactPaginate from "react-paginate";
import usePaginate from "../../hooks/usePaginate";
import { useLocation } from "react-router-dom";
import { User } from "src/ts/userInterfaces";

const UserList = (props: { users: User[] }) => {
  const { users } = props;
  const { filteredItems: filteredUsers, inputChangeHandler } = useSearcher(
    users,
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = +queryParams.get("page")!;

  const { currentItems, pageCount, handlePageClick, itemOffset } = usePaginate(
    filteredUsers,
    21,
    "usersList",
    currentPage,
    false
  );

  if (filteredUsers.length === 0) {
    return (
      <>
        <Searcher
          path={location.pathname}
          onChange={inputChangeHandler}
          placeholder="search by username"
        />
        <p className="error">No users found.</p>
      </>
    );
  }

  return (
    <>
      <Searcher
        path={location.pathname}
        onChange={inputChangeHandler}
        placeholder="search by username"
      />
      <ul className="list">
        {currentItems.map((user: User) => (
          <UserItem
            key={user.userId}
            userId={user.userId}
            profile_picture={user.profile_picture}
            username={user.username}
            email={user.email}
          />
        ))}
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName={"controls"}
        pageLinkClassName={"pageLink"}
        previousLinkClassName={"prevLink"}
        nextLinkClassName={"prevLink"}
        activeLinkClassName={"activeLink"}
        forcePage={itemOffset.page * 1 - 1}
      />
    </>
  );
};

export default UserList;
