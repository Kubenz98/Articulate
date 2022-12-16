import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PostDetail, { loader as postDetailLoader } from "./pages/PostDetail";
import RootLayout from "./components/RootLayout/RootLayout";
import BlogPage, { loader as postsLoader } from "./pages/BlogPage";
import WelcomePage from "./pages/WelcomePage";
import Comments, { loader as commentsLoader } from "./components/Comments/Comments";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="blog" element={<BlogPage />} loader={postsLoader} />
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
