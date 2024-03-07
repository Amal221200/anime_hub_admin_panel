import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PopupContext } from "../providers/PopupProvider";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";
import GoBack from "../components/GoBack";
import { fetchAnime, uploadFile } from "../lib/animeControllers";

const EditAnimePage = () => {
    const { id: animeId } = useParams();
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null)
    const { onEditOpen } = useContext(PopupContext);
    const { user } = useContext(AuthContext);
    const [imageURL, setImageURL] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newAnime = { ...Object.fromEntries(formData.entries()), genre: formData.get("genre").split(", "), _id: animeId, imageLink: formData.get("imageURL") }
        onEditOpen(newAnime)
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
    }, [animeId, navigate, user])

    if (!anime)
        return

    return (
        <main>
            <GoBack />
            <h1 className="my-4 text-3xl leading-6">Edit <span className="font-bold">{anime?.title}</span> </h1>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    <div className="grid content-between">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="title" className='font-bold text-md'>Title</label>
                            <input type="text" required id='title' name='title' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.title} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="artist" className='font-bold text-md'>Artist</label>
                            <input type="text" required id='artist' name='artist' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.artist} />
                        </div>

                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="studio" className='font-bold text-md'>Studio</label>
                            <input type="text" required id='studio' name='studio' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.studio} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="genre" className='font-bold text-md'>Genre</label>
                            <input type="text" required id='genre' name='genre' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.genre.join(", ")} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="status" className='font-bold text-md'>Status</label>
                            <div className="flex gap-3">
                                <div className="inline-flex justify-center gap-1 my-2">
                                    <label htmlFor="ongoing">Ongoing</label>
                                    <input type="radio" required id='ongoing' name='status' className='px-2 py-1 border border-gray-600 rounded' defaultChecked={anime?.status === 'ongoing'} value={"ongoing"} />
                                </div>
                                <div className="inline-flex justify-center gap-1 my-2">
                                    <label htmlFor="completed">Completed</label>
                                    <input type="radio" required id='completed' name='status' className='px-2 py-1 border border-gray-600 rounded' defaultChecked={anime?.status === 'completed'} value={"completed"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid content-between">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="release" className='font-bold text-md'>Release</label>
                            <input type="number" required id='release' name='release' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.release} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="episodes" className='font-bold text-md'>Episodes</label>
                            <input type="number" required id='episodes' name='episodes' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.episodes} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="episodeDuration" className='font-bold text-md'>Episode Duration</label>
                            <input type="number" required id='episodeDuration' name='episodeDuration' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.episodeDuration} />
                        </div>
                        <div className="flex flex-wrap-reverse items-center gap-3 my-2">
                            <input type="hidden" name="imageURL" value={imageURL} required />
                            <input type="file" id='imageLink' disabled={uploading} name='imageLink' onInput={handleFileInput} className='hidden' />

                            {/* Visible Elements */}
                            <label htmlFor="imageLink" className='flex gap-2 font-bold text-md'>
                                <span className="px-2 py-1 transition-colors border border-gray-600 rounded cursor-pointer hover:bg-black/10">
                                    Image Link
                                </span>
                                
                                {/* Spinner */}
                                {uploading && <div className="w-5 h-5 border border-b-0 border-r-0 border-black rounded-full animate-spin-fast" />}
                            </label>
                            {
                                imageURL && <img src={imageURL} alt="" className="max-w-[180px] mx-auto rounded" />
                            }
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="watchLink" className='font-bold text-md'>Watch Link</label>
                            <input type="url" required id='watchLink' name='watchLink' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.watchLink} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="description" className='font-bold text-md'>Description</label>
                            <textarea rows={5} required id='description' name='description' className='px-2 py-1 border border-gray-600 rounded resize-none no-scrollbar' defaultValue={anime?.description} />
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-5 justify-evenly'>
                    <button className='inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-emerald-100 text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed' disabled={uploading} type='submit'>Edit</button>
                </div>
            </form>
        </main>
    )
}

export default EditAnimePage