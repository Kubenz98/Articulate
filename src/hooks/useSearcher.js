import { useState, useEffect } from "react";

const useSearcher = (items, users = false) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchValue, setSearchValue] = useState("");

  const inputChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    let updatedItems = [...items];
    const identifier = setTimeout(() => {
      if (users) {
        updatedItems = updatedItems.filter((item) => {
          return (
            item.username.toLowerCase().indexOf(searchValue.toLowerCase()) !==
            -1
          );
        });
      } else {
        updatedItems = updatedItems.filter((item) => {
          return (
            item.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
          );
        });
      }

      if (items.toString() !== updatedItems.toString()) {
        setFilteredItems(updatedItems);
      }
      if (searchValue.length === 0) {
        setFilteredItems(items);
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [searchValue, items, users]);

  return { filteredItems, inputChangeHandler };
};

export default useSearcher;
