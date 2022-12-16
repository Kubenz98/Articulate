import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PostDetail, { loader as postDetailLoader } from "./pages/PostDetail";
import RootLayout from "./components/RootLayout/RootLayout";
import Blog, { loader as postsLoader } from "./pages/Blog";
import Welcome from "./pages/Welcome";
import Comments, { loader as commentsLoader } from "./components/Comments/Comments";
import Error from "./pages/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<Welcome />} />
        <Route path="blog" element={<Blog />} loader={postsLoader} />
          <Route
            path="blog/:id"
            element={<PostDetail />}
            loader={postDetailLoader}
          >
            <Route path='comments' element={<Comments />} loader={commentsLoader} />
          </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
