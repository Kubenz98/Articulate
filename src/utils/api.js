export const getPosts = async () => {
  const data = await fetch("https://dummyjson.com/posts?limit=150").then(
    (response) => {
      if (!response.ok) {
        throw new Error("Could not load posts.");
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
        throw new Error("Could not load post.");
      }
      return response.json();
    }
  );

  const user = await fetch(`https://dummyjson.com/users/${data.userId}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Could not load author of this post.");
      }
      return response.json();
    }
  );
  return { post: data, user };
};

export const getPostComments = async (id) => {
  const data = await fetch(`https://dummyjson.com/posts/${id}/comments`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Could not load comments.");
      }
      return response.json();
    }
  );

  return { comments: data.comments };
};

export const getUser = async (id) => {
  const userData = await fetch(`https://dummyjson.com/users/${id}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Could not load user.");
      }
      return response.json();
    }
  );

  const userPosts = await fetch(`https://dummyjson.com/users/${id}/posts`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Could not load user posts.");
      }
      return response.json();
    }
  );
  return { userData, userPosts };
};

export const getAllUsers = async () => {
  const users = await fetch("https://dummyjson.com/users?limit=100").then(
    (response) => {
      if (!response.ok) {
        throw new Error("Could not load users.");
      }
      return response.json();
    }
  );
  return users;
};
