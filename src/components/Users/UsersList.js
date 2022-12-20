import UserItem from "./UserItem";
import useSearcher from "../../hooks/useSearcher";
import Searcher from "../UI/Searcher";
import ReactPaginate from "react-paginate";
import usePaginate from "../../hooks/usePaginate";

const UsersList = (props) => {
  const { users } = props;

  const { filteredItems: filteredUsers, inputChangeHandler } = useSearcher(
    users,
    true
  );

  const { currentItems, pageCount, handlePageClick } = usePaginate(
    filteredUsers,
    21
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
            key={user.id}
            id={user.id}
            image={user.image}
            username={user.username}
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
      />
    </>
  );
};

export default UsersList;
