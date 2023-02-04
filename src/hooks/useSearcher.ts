import React, { useState, useEffect } from "react";
import { User } from "src/ts/userInterfaces";
import { Post } from "src/ts/postInterfaces";

const useSearcher = (items: (User | Post)[]) => {
  const [filteredItems, setFilteredItems] = useState<(User | Post)[]>(items);
  const [searchValue, setSearchValue] = useState("");

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    let updatedItems: (User | Post)[] = [];
    updatedItems = [...items];

    const identifier = setTimeout(() => {
      updatedItems = updatedItems.filter((item: User | Post) => {
        let isFound: boolean = false;
        if ("username" in item) {
          isFound =
            item.username.toLowerCase().indexOf(searchValue.toLowerCase()) !==
            -1;
        } else if ("title" in item) {
          isFound =
            item.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
        }
        return isFound;
      });
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
  }, [searchValue, items,]);

  return { filteredItems, inputChangeHandler };
};

export default useSearcher;
