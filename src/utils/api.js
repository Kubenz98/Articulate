export const getPosts = async () => {
  const data = await fetch("https://dummyjson.com/posts?limit=150").then(
    (response) => {
      if (!response.ok) {
        throw new Error('Could not load posts.')
      }
      return response.json();
    }
  );
  return data;
};

export const getPost = async (id) => {
  const data = await fetch(`https://dummyjson.com/posts/${id}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error('Could not load post.')
      }
      return response.json();
    }
  );
  
  const user = await fetch(`https://dummyjson.com/users/${data.userId}`)
  .then((response) => {
    if(!response.ok) {
      throw new Error('Could not load author of this post.')
    }
    return response.json()
  })
  return { post: data, user };
};

export const getPostComments = async (id) => {
  const data = await fetch(`https://dummyjson.com/postss/${id}/comments`).then(
    (response) => {
      if (!response.ok) {
        throw new Error('Could not load comments.')
      }
      return response.json();
    }
  );

  return { comments: data.comments };
};
