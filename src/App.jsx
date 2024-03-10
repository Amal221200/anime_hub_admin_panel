import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"

const SignInPage = lazy(() => import("./pages/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const EditAnimePage = lazy(() => import("./pages/EditAnimePage"));
const AddAnimePage = lazy(() => import("./pages/AddAnimePage"));
const MerchandisePage = lazy(() => import("./pages/MerchandisePage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout />,

        children: [
            {
                path: "/auth/sign-in",
                element: <SignInPage />
            }
        ]
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/anime",
                element: <AddAnimePage />
            },
            {
                path: "/anime/:id",
                element: <EditAnimePage />
            },
            {
                path: "/users",
                element: <UsersPage />
            },
            {
                path: "/merchandise",
                element: <MerchandisePage />
            },
        ]
    }
])

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}
