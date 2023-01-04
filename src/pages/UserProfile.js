import { Suspense } from "react";
import { getUser } from "../utils/api";
import { useLoaderData, defer, Await } from "react-router-dom";
import UserProfile from "../components/Users/UserProfile";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const User = () => {
  const loaderData = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={loaderData.user}>
        {(loadedData) => {
          if (!loadedData.userData) throw new Error("User not found.");
          else {
            const postsCopy = [...loadedData.loadedPosts];
            postsCopy.reverse();
            return (
              <UserProfile
                image={loadedData.userData.profile_picture}
                username={loadedData.userData.username}
                email={loadedData.userData.email}
                posts={postsCopy}
              />
            );
          }
        }}
      </Await>
    </Suspense>
  );
};

export default User;

export function loader({ params }) {
  const { id } = params;
  return defer({ user: getUser(id) });
}
