import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./components/RootLayout"
import BlogPage from "./pages/BlogPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path='/blog' element={<BlogPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
