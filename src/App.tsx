import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject
} from "react-router-dom";

import PostDetailPage, { loader as postDetailLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import PostsPage, { loader as postsLoader } from "./pages/Posts";
import PostQueuePage, { loader as postsQueueLoader } from "./pages/PostsQueue";
import WelcomePage from "./pages/Welcome";
import CommentsPage, {
  loader as commentsLoader,
  action as commentAction,
} from "./pages/Comments";
import Error from "./pages/Error";
import UserDetailsPage, { loader as userLoader } from "./pages/UserDetails";
import UserListPage, { loader as userListLoader } from "./pages/UserList";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import AuthPage, { action as authAction } from "./pages/Authentication";
import NotFoundPage from "./pages/NotFound";
import SignUpPage, { action as signUpAction } from "./pages/SignUp";
import ProfilePage, { action as profileAction } from "./pages/Profile";
import ConfirmEmailPage from "./pages/ConfirmEmail";

function App() {

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: "login", element: <AuthPage />, action: authAction },
        { path: "signup", element: <SignUpPage />, action: signUpAction },
        { path: "confirm", element: <ConfirmEmailPage /> },
        { path: "profile", element: <ProfilePage />, action: profileAction },
        {
          path: "posts",
          element: <PostsPage />,
          loader: postsLoader,
        },
        {
          path: "posts/queue",
          element: <PostQueuePage />,
          loader: postsQueueLoader,
        },

        { path: "posts/new", element: <NewPostPage />, action: newPostAction },
        {
          path: "posts/:id",
          element: <PostDetailPage />,
          loader: postDetailLoader,
          children: [
            {
              path: "comments",
              element: <CommentsPage />,
              loader: commentsLoader,
              action: commentAction,
            },
          ],
        },
        {
          path: "users",
          element: <UserListPage />,
          loader: userListLoader,
        },
        { path: "users/:id", element: <UserDetailsPage />, loader: userLoader },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]

  
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
