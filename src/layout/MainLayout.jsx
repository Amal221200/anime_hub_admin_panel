import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import PopupProvider from "../providers/PopupProvider";

const AddPopup = lazy(() => import('../components/AddPopup'))
const EditPopup = lazy(() => import("../components/EditPopup.jsx"))
const DeletePopup = lazy(() => import("../components/DeletePopup.jsx"))

export default function MainLayout() {
    return (
        <PopupProvider>
            <div className="w-[80vw] mx-auto my-4">
                <Suspense>
                    <Outlet />
                </Suspense>
            </div>
            <Suspense>
                <AddPopup />
                <DeletePopup />
                <EditPopup />
            </Suspense>
        </PopupProvider>
    )
}
