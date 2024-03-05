/* eslint-disable react/prop-types */
import { memo } from "react";
import { useContext } from "react";
import { PopupContext } from "../providers/PopupProvider";
import { Link } from "react-router-dom";

const AnimeCard = memo(function AnimeCard({ anime }){

    const { onDeleteOpen } = useContext(PopupContext);

    const handleDelete = () => {
        onDeleteOpen(anime)
    }

    return (
        <article className="relative h-[250px] overflow-hidden bg-gray-300 rounded-md group/anime">
            <img src={anime.imageLink} alt={anime.title} className="w-full h-full transition duration-[0.5s] transform group-hover/anime:scale-[1.2] object-top z-0 object-cover" />
            <div className="absolute inset-0 z-10 grid w-full h-full px-3 py-1 space-y-1 transition-all opacity-0 bg-black/50 group-hover/anime:backdrop-blur-md group-hover/anime:opacity-100 place-content-center">
                <div className="flex flex-col items-center gap-2 text-center text-white duration-500 transition-[all] delay-[200ms] transform translate-y-[20%] opacity-0 group-hover/anime:translate-y-0 group-hover/anime:opacity-100">
                    <h2 className="text-xl font-bold">{anime.title}</h2>
                    <h4 className="font-semibold">Artist: {anime.artist}</h4>
                    <div className="flex justify-center gap-3">
                        <Link to={`/anime/${anime._id}`} className="px-2 py-1 bg-transparent border-2 rounded hover:bg-emerald-500 hover:text-black text-emerald-500 border-emerald-700">
                            Edit
                        </Link>
                        <button type="button" className="px-2 py-1 bg-transparent border-2 rounded hover:bg-rose-500 hover:text-black text-rose-500 border-rose-700" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
})

export default AnimeCard;