import React from "react";
import UserList from "../components/Users/UserList";
import { getAllUsers } from "../api/usersApi";
import { Suspense } from "react";
import { defer, Await } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { User, UsersArr } from "src/ts/userInterfaces";

const UserListPage = () => {
  const users = useLoaderData() as UsersArr;
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={users.data}>
        {(loadedData: User[]) => <UserList users={loadedData} />}
      </Await>
    </Suspense>
  );
};

export default UserListPage;

export async function loader() {
  return defer({ data: getAllUsers() });
}
