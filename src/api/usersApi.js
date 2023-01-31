
import { ref as dbRef, get, child } from "firebase/database";
import { db } from "../firebase";

export const getUser = async (id) => {
  let userData;
  await get(child(dbRef(db), `users/${id}`))
    .then((post) => {
      userData = post.val();
    })
    .catch((err) => {
      throw new Error("getUser");
    });

  const loadedPosts = [];

  await get(child(dbRef(db), `user-posts/${id}`))
    .then((data) => {
      const posts = data.val();
      for (const post in posts) {
        loadedPosts.push({
          id: post,
          title: posts[post].title,
          tags: posts[post].tags,
          body: posts[post].body,
          imageLink: posts[post].imageLink ? posts[post].imageLink : "",
        });
      }
    })
    .catch((err) => {
      throw new Error("userPostsError");
    });
  return { userData, loadedPosts };
};

export const getAllUsers = async () => {
  const loadedUsers = [];
  await get(child(dbRef(db), `users`))
    .then((data) => {
      const users = data.val();
      for (const user in users) {
        loadedUsers.push({
          userId: users[user].userId,
          username: users[user].username,
          email: users[user].email,
          image: users[user].profile_picture,
        });
      }
    })
    .catch((err) => {
      throw new Error("usersError");
    });
  return loadedUsers;
};

