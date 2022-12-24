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

export async function addPost(data) {
  const post = {
    title: data.get("title"),
    tags: data.get("tags"),
    body: data.get("text"),
    userId: 5,
  };

  if (post.title.trim().length < 3 || post.body.trim().length < 5) {
    return { isError: true, message: "Invalid input data provided" };
  }

  await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw response;
      }
      return response.json();
    })
    .then((response) => console.log(response));
}

// export async function createUser(data) {

//   const 
// }