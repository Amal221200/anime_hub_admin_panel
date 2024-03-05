/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";
import { AnimeContext } from "./AnimeProvider";


export const PopupContext = createContext();

export default function PopupProvider({ children }) {
    const { editAnime: editAnimeFunc, deleteAnime: deleteAnimeFunc, addAnime: addAnimeFunc } = useContext(AnimeContext)
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
    }, [editAnimeFunc, editAnime])
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
    }, [addAnimeFunc, addAnime])

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
    }, [deleteAnimeFunc, deleteAnime])

    return (
        <PopupContext.Provider value={{ deleteAnime, editAnime, onDeleteClose, onDeleteOpen, onEditClose, onEditOpen, editPopup, deletePopup, addAnime, addPopup, onAddClose, onAddOpen }}>
            {children}
        </PopupContext.Provider>
    )
}
