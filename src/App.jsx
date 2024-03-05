import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const EditAnimePage = lazy(() => import("./pages/EditAnimePage"));
const AddAnimePage = lazy(() => import("./pages/AddAnimePage"));
const MerchandisePage = lazy(() => import("./pages/MerchandisePage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/sign-in",
                element: (
                    <Suspense>
                        <SignInPage />
                    </Suspense>
                )
            },
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    {
                        path: "/",
                        element: (
                            <HomePage />
                        )
                    },
                    {
                        path: "/anime",
                        element: (
                            <AddAnimePage />
                        )
                    },
                    {
                        path: "/anime/:id",
                        element: (
                            <EditAnimePage />
                        )
                    },
                    {
                        path: "/merchandise",
                        element: (
                            <MerchandisePage />
                        )
                    },
                ]
            }]
    },
])

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}
