import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePaginate = (
  items,
  qunatintyOnOnePage,
  component,
  page,
  isOnUserProfile
) => {
  const [itemOffset, setItemOffset] = useState({
    offset: qunatintyOnOnePage * (page - 1),
    page: page * 1,
  });
  let usedRoute;
  const navigate = useNavigate();
  const itemsPerPage = qunatintyOnOnePage;
  const endOffset = itemOffset.offset + itemsPerPage;
  const currentItems = items.slice(itemOffset.offset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  if (component === "postList") {
    usedRoute = "posts";
  }
  if (component === "usersList") {
    usedRoute = "users";
  }

  useEffect(() => {
    if (page === "1") {
      setItemOffset({ offset: 0, page: 1 });
      window.scrollTo({ top: 0 });
    }
  }, [page]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset({ offset: newOffset, page: event.selected + 1 });
    window.scrollTo({ top: 0 });
    if (isOnUserProfile) return;
    navigate(`/${usedRoute}?page=${event.selected + 1}`);
  };
  return { currentItems, pageCount, handlePageClick, itemOffset };
};
export default usePaginate;
