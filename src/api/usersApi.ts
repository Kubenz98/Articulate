import { ref as dbRef, get, child } from "firebase/database";
import { db } from "../firebase";

import { User, UsersObj } from "src/ts/userInterfaces";
import { Post, PostsObj } from "src/ts/postInterfaces";

export const getUser = async (id: string) => {
  let userData: User | undefined;

  await get(child(dbRef(db), `users/${id}`))
    .then((user) => {
      userData = user.val();
    })
    .catch((err) => {
      throw new Error("getUser");
    });

  const loadedPosts: Post[] = [];

  await get(child(dbRef(db), `user-posts/${id}`))
    .then((data) => {
      const posts: PostsObj = data.val();
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
  const loadedUsers: User[] = [];
  await get(child(dbRef(db), `users`))
    .then((data) => {
      const users: UsersObj = data.val();
      for (const user in users) {
        loadedUsers.push({
          userId: users[user].userId,
          username: users[user].username,
          profile_picture: users[user].profile_picture,
        });
      }
    })
    .catch((err) => {
      throw new Error("usersError");
    });
  return loadedUsers;
};
