/* eslint-disable react/prop-types */
import { createContext, useCallback, useState } from "react";
import { editAnime as editAnimeFunc, deleteAnime as deleteAnimeFunc, addAnime as addAnimeFunc } from "../lib/animeControllers"

export const PopupContext = createContext();

export default function PopupProvider({ children }) {
    const [editAnime, setEditAnime] = useState(null);
    const [editPopup, setEditPopup] = useState(false);
    const [addAnime, setAddAnime] = useState(null);
    const [addPopup, setAddPopup] = useState(false);
    const [deleteAnime, setDeleteAnime] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);

    const onEditOpen = useCallback((anime) => {
        setEditPopup(true);
        setEditAnime(anime);
    }, [])

    const onEditClose = useCallback((action) => {
        setEditPopup(false);
        if (action === 'update') {
            editAnimeFunc(editAnime).then(() => {
                setEditAnime(null);
            });
        }
    }, [editAnime])

    const onAddOpen = useCallback((anime) => {
        setAddPopup(true);
        setAddAnime(anime);
    }, [])

    const onAddClose = useCallback((action) => {
        setAddPopup(false);
        if (action === 'add') {
            addAnimeFunc(addAnime).then(() => {
                setAddAnime(null);
            });
        }
    }, [addAnime])

    const onDeleteOpen = useCallback((anime) => {
        setDeletePopup(true);
        setDeleteAnime(anime);
    }, [])

    const onDeleteClose = useCallback((action) => {
        setDeletePopup(false);
        if (action === 'delete') {
            deleteAnimeFunc(deleteAnime._id).then(() => {
                setDeleteAnime(null);
            });
        }
    }, [deleteAnime])

    return (
        <PopupContext.Provider value={{ deleteAnime, editAnime, addAnime, editPopup, deletePopup, addPopup, onAddOpen, onAddClose, onDeleteOpen, onDeleteClose, onEditOpen, onEditClose }}>
            {children}
        </PopupContext.Provider>
    )
}
