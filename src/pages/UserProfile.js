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
        {(loadedData) => (
          <UserProfile
            image={loadedData.userData.image}
            username={loadedData.userData.username}
            email={loadedData.userData.email}
            posts={loadedData.userPosts}
          />
        )}
      </Await>
    </Suspense>
  );
};

export default User;

export function loader({ params }) {
  const { id } = params;
  return defer({ user: getUser(id) });
}
