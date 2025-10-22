import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SignUpPage from "./pages/SignUpPage";
import UserManagementPanel from "./components/layout/UserManagementPanel";
import ProductList from "./components/layout/ProductList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <UserManagementPanel />,
          },
          {
            path: "products",
            element: <ProductList />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
