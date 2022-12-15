export const getPosts = async () => {
  const data = fetch("https://dummyjson.com/posts?limit=150")
  .then((response) => {
    if (!response.ok) {
      throw { message: "Failed to fetch posts!", status: 500 };
    }
    return response.json()
  });
  return data
};

export const getPost = async (id) => {
  const data = fetch(`https://dummyjson.com/posts/${id}`)
  .then((response) => {
    if (!response.ok) {
      throw { message: "Failed to fetch posts!", status: 500 };
    }
    return response.json()
  });
  return data
};
