import React, { Suspense } from "react";
import { getUser } from "../api/usersApi";
import { useLoaderData, defer, Await, Params } from "react-router-dom";
import UserDetails from "../components/Users/UserDetails";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { UserData, User } from "src/ts/userInterfaces";
import { Post } from "src/ts/postInterfaces";

interface LoadedUserData {
  userData: User;
  loadedPosts: Post[];
}

const UserDetailsPage = () => {
  const user = useLoaderData() as UserData;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={user.data}>
        {(loadedData: LoadedUserData) => {
          if (!loadedData.userData) throw new Error("getUser");
          else {
            const postsCopy = [...loadedData.loadedPosts];
            postsCopy.reverse();
            return (
              <UserDetails
                profile_picture={loadedData.userData.profile_picture}
                username={loadedData.userData.username}
                posts={postsCopy}
              />
            );
          }
        }}
      </Await>
    </Suspense>
  );
};

export default UserDetailsPage;

export function loader(args: { params: Params }) {
  const { params } = args;
  return defer({ data: getUser(params.id!) });
}
