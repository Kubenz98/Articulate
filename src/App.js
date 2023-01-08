import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PostDetail, { loader as postDetailLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import Posts, { loader as postsLoader } from "./pages/Posts";
import Welcome from "./pages/Welcome";
import Comments, { loader as commentsLoader, action as commentAction } from "./pages/Comments";
import Error from "./pages/Error";
import User, { loader as userLoader } from "./pages/UserProfile";
import AllUsers, { loader as allUsersLoader } from "./pages/AllUsers";
import NewPost, { action as newPostAction } from "./pages/NewPost";
import AuthPage, { action as authAction } from "./pages/Authentication";
import NotFound from "./pages/NotFound";
import SignUpPage, { action as signUpAction } from "./pages/SignUp";
import Profile, { action as profileAction } from "./pages/Profile";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<Welcome />} />
        <Route path="login" element={<AuthPage />} action={authAction} errorElement={<Error />}/>
        <Route path="signup" element={<SignUpPage />} action={signUpAction} />
        <Route path="profile" element={<Profile />} action={profileAction} />
        <Route path="posts" element={<Posts />} loader={postsLoader} />
        <Route path="posts/new" element={<NewPost />} action={newPostAction} />
        <Route
          path="/posts/:id"
          element={<PostDetail />}
          loader={postDetailLoader}
        >
          <Route
            path="comments"
            element={<Comments />}
            loader={commentsLoader}
            action={commentAction}
          />
        </Route>
        <Route path="users" element={<AllUsers />} loader={allUsersLoader} />
        <Route path="users/:id" element={<User />} loader={userLoader} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
