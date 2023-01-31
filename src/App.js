import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PostDetailPage, { loader as postDetailLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import PostsPage, { loader as postsLoader } from "./pages/Posts";
import PostQueuePage, { loader as postsQueueLoader } from "./pages/PostsQueue";
import WelcomePage from "./pages/Welcome";
import Comments, {
  loader as commentsLoader,
  action as commentAction,
} from "./pages/Comments";
import Error from "./pages/Error";
import UserPage, { loader as userLoader } from "./pages/User";
import AllUsersPage, { loader as allUsersLoader } from "./pages/AllUsers";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import AuthPage, { action as authAction } from "./pages/Authentication";
import NotFoundPage from "./pages/NotFound";
import SignUpPage, { action as signUpAction } from "./pages/SignUp";
import ProfilePage, { action as profileAction } from "./pages/Profile";
import ConfirmEmail from "./pages/ConfirmEmail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: "login", element: <AuthPage />, action: authAction },
        { path: "signup", element: <SignUpPage />, action: signUpAction },
        { path: "confirm", element: <ConfirmEmail /> },
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
              element: <Comments />,
              loader: commentsLoader,
              action: commentAction,
            },
          ],
        },
        {
          path: "users",
          element: <AllUsersPage />,
          loader: allUsersLoader,
        },
        { path: "users/:id", element: <UserPage />, loader: userLoader },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
