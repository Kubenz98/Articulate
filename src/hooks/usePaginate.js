import { useState } from "react";

const usePaginate = (items, qunatintyOnOnePage) => {

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = qunatintyOnOnePage;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0 });
  };

  return { currentItems,pageCount, handlePageClick };
}

export default usePaginate;