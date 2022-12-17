import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PostDetail, { loader as postDetailLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import Blog, { loader as postsLoader } from "./pages/Blog";
import Welcome from "./pages/Welcome";
import Comments, { loader as commentsLoader } from "./pages/Comments";
import Error from "./pages/Error";
import User, { loader as userLoader } from "./pages/UserProfile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<Welcome />} />
        <Route path="blog" element={<Blog />} loader={postsLoader} />
          <Route
            path="/blog/:id"
            element={<PostDetail />}
            loader={postDetailLoader}
          >
            <Route path='comments' element={<Comments />} loader={commentsLoader} />
          </Route>
          <Route path='users/:id' element={<User />} loader={userLoader} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
