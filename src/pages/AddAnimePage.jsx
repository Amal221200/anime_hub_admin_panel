import { useContext, useState } from "react";
import { PopupContext } from "../providers/PopupProvider";
import { toast } from "react-hot-toast";
import { uploadFile } from "../lib/animeControllers";
import AnimeForm from "../components/AnimeForm";

export default function AddAnimePage() {
    const [imageURL, setImageURL] = useState('')
    const [uploading, setUploading] = useState(false)
    const { onAddOpen } = useContext(PopupContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newAnime = { ...Object.fromEntries(formData.entries()), genre: formData.get('genre').split(", "), imageLink: formData.get("imageURL") }
        onAddOpen(newAnime)
    };

    const handleFileInput = async (e) => {
        if (e.target.files.length === 0) {
            setImageURL('')
            return null
        }
        setUploading(true)

        const file = e.target.files[0];
        const url = await uploadFile(file);

        if (!url) {
            setUploading(false)
            toast.error("Image Didn't Upload");
            return null;
        }

        setImageURL(url)
        toast.success("Image Uploaded");
        setUploading(false)
    }


    return (
        <AnimeForm type="add" handleFileInput={handleFileInput} handleSubmit={handleSubmit} uploading={uploading} imageURL={imageURL} />
    )
}
