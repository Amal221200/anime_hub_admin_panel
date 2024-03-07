import { useContext, useState } from "react";
import { PopupContext } from "../providers/PopupProvider";
import GoBack from "../components/GoBack";
import { toast } from "react-hot-toast";
import { uploadFile } from "../lib/animeControllers";

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
        const url = await uploadFile(file)
        if(!url)
            return null;
        
        setImageURL(url)
        toast.success("Image Uploaded");
        setUploading(false)
    }


    return (
        <main>
            <GoBack />
            <h1 className="my-4 text-3xl leading-6">Add <span className="font-bold">Anime</span> </h1>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    <div className="grid content-between">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="title" className='font-bold text-md'>Title</label>
                            <input type="text" required id='title' name='title' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="artist" className='font-bold text-md'>Artist</label>
                            <input type="text" required id='artist' name='artist' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>

                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="studio" className='font-bold text-md'>Studio</label>
                            <input type="text" required id='studio' name='studio' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="genre" className='font-bold text-md'>Genre</label>
                            <input type="text" required id='genre' name='genre' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="status" className='font-bold text-md'>Status</label>
                            <div className="flex gap-3">
                                <div className="inline-flex justify-center gap-1 my-2">
                                    <label htmlFor="ongoing">Ongoing</label>
                                    <input type="radio" required id='ongoing' name='status' className='px-2 py-1 border border-gray-600 rounded' value={"ongoing"} />
                                </div>
                                <div className="inline-flex justify-center gap-1 my-2">
                                    <label htmlFor="completed">Completed</label>
                                    <input type="radio" required id='completed' name='status' className='px-2 py-1 border border-gray-600 rounded' value={"completed"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid content-between">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="release" className='font-bold text-md'>Release</label>
                            <input type="number" required id='release' name='release' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="episodes" className='font-bold text-md'>Episodes</label>
                            <input type="number" required id='episodes' name='episodes' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="episodeDuration" className='font-bold text-md'>Episode Duration</label>
                            <input type="number" required id='episodeDuration' name='episodeDuration' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>
                        <div className='flex flex-wrap-reverse items-center gap-3 my-2'>
                            <input type="hidden" name="imageURL" value={imageURL} required />
                            <input type="file" required id='imageLink' name='imageLink' disabled={uploading} onInput={handleFileInput} className='hidden' onInvalid={()=> alert("Please upload an image")} />

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
                            <input type="url" required id='watchLink' name='watchLink' className='px-2 py-1 border border-gray-600 rounded' />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="description" className='font-bold text-md'>Description</label>
                            <textarea rows={5} required id='description' name='description' className='px-2 py-1 border border-gray-600 rounded resize-none no-scrollbar' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-5 justify-evenly'>
                    <button className='inline-flex justify-center px-4 py-2 text-sm font-medium text-orange-900 bg-orange-100 border border-transparent rounded-md hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed' disabled={uploading} type='submit'>Add</button>
                </div>
            </form>
        </main>
    )
}
