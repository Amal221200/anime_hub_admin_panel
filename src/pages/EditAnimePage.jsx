import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PopupContext } from "../providers/PopupProvider";
import { toast } from "react-hot-toast";
import { fetchAnime, uploadFile } from "../lib/animeControllers";
import AnimeForm from "../components/AnimeForm";

const EditAnimePage = () => {
    const { id: animeId } = useParams();
    
    const [uploading, setUploading] = useState(false);
    const [anime, setAnime] = useState(null)
    const [imageURL, setImageURL] = useState('')
    
    const { onEditOpen } = useContext(PopupContext);
        
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newAnime = { ...Object.fromEntries(formData.entries()), genre: formData.get("genre").split(", "), _id: animeId, imageLink: formData.get("imageURL") };
        onEditOpen(newAnime);
    }

    const handleFileInput = async (e) => {
        if (e.target.files.length === 0) {
            setImageURL(anime.imageLink);
            return null
        }
        
        setUploading(true);
        
        const file = e.target.files[0];
        const url = await uploadFile(file);
        
        if (!url) {
            setUploading(false)
            toast.error("Image Didn't Upload");
            return null;
        }
        
        setImageURL(url)
        toast.success("Image Uploaded");
        setUploading(false);
    }

    useEffect(() => {
        (async () => {
            const data = await fetchAnime(animeId)
            setAnime(data);

            setImageURL(data.imageLink)
        })()
        
        return () => {
            setAnime(null)
        }
    }, [animeId])

    if (!anime)
        return

    return (
        <AnimeForm type="edit" anime={anime} handleFileInput={handleFileInput} handleSubmit={handleSubmit} uploading={uploading} imageURL={imageURL} />
    )
}

export default EditAnimePage