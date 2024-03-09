import { Suspense } from "react";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {

    return (
        <section className="grid w-full min-h-[100dvh] place-content-center">
            <Suspense>
                <Outlet />
            </Suspense>
        </section>
    )
}

export default AuthLayout