/* eslint-disable react/prop-types */
import { capitalize } from "../lib/utils"
import GoBack from "./GoBack"


const AnimeForm = ({ anime, handleSubmit, uploading, imageURL, handleFileInput, type }) => {

    return (
        <main>
            <GoBack />
            <h1 className="my-4 text-3xl leading-6">{capitalize(type)}
                {" "}    <span className="font-bold">{type === 'add' ? "Anime" : anime?.title}</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    <div className="grid content-between">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="title" className='font-bold text-md'>Title</label>
                            <input type="text" required id='title' name='title' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.title : ''} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="artist" className='font-bold text-md'>Artist</label>
                            <input type="text" required id='artist' name='artist' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.artist : ''} />
                        </div>

                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="studio" className='font-bold text-md'>Studio</label>
                            <input type="text" required id='studio' name='studio' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.studio : ''} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="genre" className='font-bold text-md'>Genre</label>
                            <input type="text" required id='genre' name='genre' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.genre.join(", ") : ''} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="status" className='font-bold text-md'>Status</label>
                            <div className="flex gap-3">
                                <div className="inline-flex justify-center gap-1 my-2">
                                    <label htmlFor="ongoing">Ongoing</label>
                                    <input type="radio" required id='ongoing' name='status' className='px-2 py-1 border border-gray-600 rounded' defaultChecked={type === 'edit' ? anime?.status === 'ongoing' : false} value={"ongoing"} />
                                </div>
                                <div className="inline-flex justify-center gap-1 my-2">
                                    <label htmlFor="completed">Completed</label>
                                    <input type="radio" required id='completed' name='status' className='px-2 py-1 border border-gray-600 rounded' defaultChecked={type === 'edit' ? anime?.status === 'completed' : false} value={"completed"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid content-between">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="release" className='font-bold text-md'>Release</label>
                            <input type="number" required id='release' name='release' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.release : ''} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="episodes" className='font-bold text-md'>Episodes</label>
                            <input type="number" required id='episodes' name='episodes' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.episodes : ''} />
                        </div>
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="episodeDuration" className='font-bold text-md'>Episode Duration</label>
                            <input type="number" required id='episodeDuration' name='episodeDuration' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.episodeDuration : ''} />
                        </div>
                        <div className="flex flex-wrap-reverse items-center gap-3 my-2">
                            <input type="hidden" name="imageURL" value={imageURL} required />
                            <input type="file" id='imageLink' required={type === 'add'} disabled={uploading} name='imageLink' onInput={handleFileInput} className='hidden' onInvalid={() => alert('Please upload a file')} />

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
                            <input type="url" required id='watchLink' name='watchLink' className='px-2 py-1 border border-gray-600 rounded' defaultValue={type === 'edit' ? anime?.watchLink :''} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className='flex flex-col justify-center gap-1 my-2'>
                            <label htmlFor="description" className='font-bold text-md'>Description</label>
                            <textarea rows={5} required id='description' name='description' className='px-2 py-1 border border-gray-600 rounded resize-none no-scrollbar' defaultValue={type === 'edit' ? anime?.description : ''} />
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-5 justify-evenly'>
                    <button className={`inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${type === 'edit'? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 focus-visible:ring-emerald-500': type==='add' ?'bg-orange-100 text-orange-900 hover:bg-orange-200 focus-visible:ring-orange-500':'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-500'}`} disabled={uploading} type='submit'>
                        {capitalize(type)}
                    </button>
                </div>
            </form>
        </main>
    )
}

export default AnimeForm