import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import { lazy, Suspense } from "react";
import AuthLayout from "./layout/AuthLayout";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const EditAnimePage = lazy(() => import("./pages/EditAnimePage"));
const AddAnimePage = lazy(() => import("./pages/AddAnimePage"));
const MerchandisePage = lazy(() => import("./pages/MerchandisePage"));



export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AuthLayout />,
            children: [
                {
                    path: "/sign-in",
                    element: <Suspense><SignInPage /></Suspense>
                },
                // {
                //     path: "/sign-up",
                //     element: <SignUpPage />
                // },
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
                            element: (
                                <Suspense>
                                    <AddAnimePage />
                                </Suspense>
                            )
                        },
                        {
                            path: "/anime/:id",
                            element: (
                                <Suspense>
                                    <EditAnimePage />
                                </Suspense>
                            )
                        },
                        {
                            path: "/merchandise",
                            element: (
                                <Suspense>
                                    <MerchandisePage />
                                </Suspense>
                            )
                        },
                    ]
                }]
        },
    ], { basename: import.meta.env?.VITE_BASE_URL || "/" })
    return (
        <RouterProvider router={router} />
    )
}
