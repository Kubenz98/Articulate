import UsersList from "../components/Users/UsersList";
import { getAllUsers } from "../api";
import { Suspense } from "react";
import { defer, Await } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const AllUsers = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data.users}>
        {(loadedData) => <UsersList users={loadedData} />}
      </Await>
    </Suspense>
  );
};

export default AllUsers;

export async function loader() {
  return defer({ users: getAllUsers() });
}
