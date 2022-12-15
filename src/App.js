import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PostDetail, { loader as postDetailLoader } from "./pages/PostDetail";
import RootLayout from "./components/RootLayout";
import BlogPage, { loader as postsLoader } from "./pages/BlogPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/blog" element={<BlogPage />} loader={postsLoader} />
        <Route
          path="blog/:id"
          element={<PostDetail />}
          loader={postDetailLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
