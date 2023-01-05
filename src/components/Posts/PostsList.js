import Post from "./PostItem";
import ReactPaginate from "react-paginate";
import useSearcher from "../../hooks/useSearcher";
import Searcher from "../UI/Searcher";
import usePaginate from "../../hooks/usePaginate";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context.js";

const Posts = (props) => {
  const posts = props.data;
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const { filteredItems: filteredPosts, inputChangeHandler } =
    useSearcher(posts);

  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get("page");

  const { currentItems, pageCount, handlePageClick, itemOffset } = usePaginate(
    filteredPosts,
    8,
    "postList",
    currentPage,
    props.isOnUserProfile
  );

  if (posts.length === 0 && props.isOnUserProfile) {
    return <p className="error">This user hasn't added any post yet.</p>;
  }

  if (filteredPosts.length === 0) {
    return (
      <>
        <Searcher
          title="All Posts"
          onChange={inputChangeHandler}
          placeholder="search by title"
        />
        <p className="error">There are no posts added yet.</p>
      </>
    );
  }

  return props.isOnUserProfile ? (
    <ul className="list">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          tags={post.tags}
          body={post.body}
          imageLink={post.imageLink}
        />
      ))}
    </ul>
  ) : (
    <>
      <Searcher
        title="All Posts"
        onChange={inputChangeHandler}
        placeholder="search by title"
      />
      {authCtx.isLoggedIn && (
        <div className="link-container">
          <Link to="new" className="button button--link">
            Add Post
          </Link>
        </div>
      )}
      {
        <ul className="list">
          {currentItems.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              tags={post.tags}
              body={post.body}
              imageLink={post.imageLink}
            />
          ))}
        </ul>
      }
      {
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
          forcePage={itemOffset.page * 1 - 1}
        />
      }
    </>
  );
};
export default Posts;
