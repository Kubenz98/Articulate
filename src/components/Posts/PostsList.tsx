import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import PostItem from "./PostItem";
import useSearcher from "../../hooks/useSearcher";
import usePaginate from "../../hooks/usePaginate";
import AuthContext from "src/store/auth-context";
import Searcher from "../UI/Searcher";
import ReactPaginate from "react-paginate";
import classes from "./PostsList.module.scss";

import { Post } from "src/ts/postInterfaces";

interface ListProps {
  data: Post[];
  isOnUserProfile?: boolean;
}

const Posts = (props: ListProps) => {
  const posts = props.data;
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const { filteredItems: filteredPosts, inputChangeHandler } =
    useSearcher(posts);
    
  const queryParams = new URLSearchParams(location.search);
  const currentPage = +queryParams.get("page")!;

  let postSectionNavigation = (
    <Link to="/posts/queue?page=1" className="link">
      Posts Queue <span>→</span>
    </Link>
  );
  if (location.pathname === "/posts/queue") {
    postSectionNavigation = (
      <Link to="/posts?page=1" className="link">
        Main Posts <span>→</span>
      </Link>
    );
  }

  const { currentItems, pageCount, handlePageClick, itemOffset } = usePaginate(
    filteredPosts,
    6,
    "postList",
    currentPage,
    props.isOnUserProfile!
  );

  if (posts.length === 0 && props.isOnUserProfile) {
    return <p className="error">This user hasn't added any post yet.</p>;
  }

  if (filteredPosts.length === 0) {
    return (
      <>
        <Searcher
          path={location.pathname}
          onChange={inputChangeHandler}
          placeholder="search by title"
        />
        {authCtx.isLoggedIn ? (
          <div className={classes.buttons}>
            {postSectionNavigation}
            <Link to="/posts/new" className="button button--link">
              Add Post
            </Link>
          </div>
        ) : (
          <div className={classes.button}>{postSectionNavigation}</div>
        )}
        <p className="error">There are no posts added yet.</p>
      </>
    );
  }

  return props.isOnUserProfile ? (
    <ul className="list">
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </ul>
  ) : (
    <>
      <Searcher
        path={location.pathname}
        onChange={inputChangeHandler}
        placeholder="search by title"
      />
      {authCtx.isLoggedIn ? (
        <div className={classes.buttons}>
          {postSectionNavigation}
          <Link to="/posts/new" className="button button--link">
            Add Post
          </Link>
        </div>
      ) : (
        <div className={classes.button}>{postSectionNavigation}</div>
      )}
      {
        <ul className="list">
          {currentItems.map((post: Post) => (
            <PostItem key={post.id} {...post} />
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
