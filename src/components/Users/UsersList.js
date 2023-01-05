import UserItem from "./UserItem";
import useSearcher from "../../hooks/useSearcher";
import Searcher from "../UI/Searcher";
import ReactPaginate from "react-paginate";
import usePaginate from "../../hooks/usePaginate";
import { useLocation } from "react-router-dom";

const UsersList = (props) => {
  const { users } = props;
  const { filteredItems: filteredUsers, inputChangeHandler } = useSearcher(
    users,
    true
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get("page");

  const { currentItems, pageCount, handlePageClick, itemOffset } = usePaginate(
    filteredUsers,
    21,
    'usersList',
    currentPage
  );

  if (filteredUsers.length === 0) {
    return (
      <>
        <Searcher
          title="All Users"
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
        title="All Users"
        onChange={inputChangeHandler}
        placeholder="search by username"
      />
      <ul className="list">
        {currentItems.map((user) => (
          <UserItem
            key={user.userId}
            id={user.userId}
            image={user.image}
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
        renderOnZeroPageCount={null}
        containerClassName={"controls"}
        pageLinkClassName={"pageLink"}
        previousLinkClassName={"prevLink"}
        nextLinkClassName={"prevLink"}
        activeLinkClassName={"activeLink"}
        forcePage={(itemOffset.page*1) - 1}
      />
    </>
  );
};

export default UsersList;
