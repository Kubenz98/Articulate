import Post from "./PostItem";
import ReactPaginate from "react-paginate";
import useSearcher from "../../hooks/useSearcher";
import Searcher from "../UI/Searcher";
import usePaginate from "../../hooks/usePaginate";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const posts = props.data;

  const { filteredItems: filteredPosts, inputChangeHandler } =
    useSearcher(posts);

  const { currentItems, pageCount, handlePageClick } = usePaginate(
    filteredPosts,
    8
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

  return (
    <>
      {!props.isOnUserProfile && (
        <Searcher
          title="All Posts"
          onChange={inputChangeHandler}
          placeholder="search by title"
        />
      )}
      {!props.isOnUserProfile && (
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
          initialPage={0}
        />
      }
    </>
  );
};

export default Posts;
