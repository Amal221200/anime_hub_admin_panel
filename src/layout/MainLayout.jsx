import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import AnimeProvider from "../providers/AnimeProvider";
import PopupProvider from "../providers/PopupProvider";

const AddPopup = lazy(() => import('../components/AddPopup'))
const EditPopup = lazy(() => import("../components/EditPopup.jsx"))
const DeletePopup = lazy(() => import("../components/DeletePopup.jsx"))

export default function MainLayout() {
    return (
        <AnimeProvider>
            <PopupProvider>
                <div className="max-w-[80vw] mx-auto">
                    <Outlet />
                </div>
                
                <Suspense>
                    <AddPopup />
                    <DeletePopup />
                    <EditPopup />
                </Suspense>
            </PopupProvider>
        </AnimeProvider>
    )
}
