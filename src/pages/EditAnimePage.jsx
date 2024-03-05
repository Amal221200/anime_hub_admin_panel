import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimeContext } from "../providers/AnimeProvider";
import { PopupContext } from "../providers/PopupProvider";
import { AuthContext } from "../providers/AuthProvider";
import GoBack from "../components/GoBack";

const EditAnimePage = () => {
    const { id: animeId } = useParams();
    const navigate = useNavigate();
    const { fetchAnime } = useContext(AnimeContext);
    const [anime, setAnime] = useState(null)
    const { onEditOpen } = useContext(PopupContext);
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formmData = new FormData(e.target);
        const newAnime = { ...Object.fromEntries(formmData.entries()), genre: formmData.get("genre").split(", "), _id: animeId }
        onEditOpen(newAnime)
    }

    useEffect(() => {
        (async () => {
            const data = await fetchAnime(animeId)
            setAnime(data);
        })()
        return () => {
            setAnime(null)
        }
    }, [animeId, fetchAnime, navigate, user])

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
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="imageLink" className='font-bold text-md'>Image Link</label>
                            <input type="text" required id='imageLink' name='imageLink' className='px-2 py-1 border border-gray-600 rounded' defaultValue={anime?.imageLink} />
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
                    <button className='inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-emerald-100 text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2' type='submit'>Edit</button>
                </div>
            </form>
        </main>
    )
}

export default EditAnimePage