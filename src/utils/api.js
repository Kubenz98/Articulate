export const getPosts = async () => {
  const data = await fetch("https://dummyjson.com/posts?limit=150").then(
    (response) => {
      if (!response.ok) {
        throw new Response('Failed to fetch posts.', { status: 500 });
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
        throw new Response('Failed to fetch post.', { status: 500 });
      }
      return response.json();
    }
  );
  
  const user = await fetch(`https://dummyjson.com/users/${data.userId}`)
  .then((response) => {
    if(!response.ok) {
      throw new Response('Failed to fetch user.', { status: 500 });
    }
    return response.json()
  })
  return { post: data, user };
};

export const getPostComments = async (id) => {
  const data = await fetch(`https://dummyjson.com/posts/${id}/comments`).then(
    (response) => {
      if (!response.ok) {
        throw new Response('Failed to fetch comments.', { status: 500 });
      }
      return response.json();
    }
  );

  return { comments: data.comments };
};
