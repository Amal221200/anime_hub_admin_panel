import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import PopupProvider from "../providers/PopupProvider";
import AuthProvider from "../providers/AuthProvider";

const AddPopup = lazy(() => import('../components/popup/AddPopup'))
const EditPopup = lazy(() => import("../components/popup/EditPopup"))
const DeletePopup = lazy(() => import("../components/popup/DeletePopup"))

export default function MainLayout() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}
