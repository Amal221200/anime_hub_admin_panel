import { useCallback, useEffect, useState } from "react"
import { Search } from "lucide-react";
import AddButton from "../components/AddButton";
import AnimeCard from "../components/AnimeCard";
import { fetchAnimes } from "../lib/animeControllers";

export default function HomePage() {
  const [animes, setAnimes] = useState(null);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const animes = await fetchAnimes(formData.get("search"));
    setAnimes(animes);
  }, [])

  useEffect(() => {
    (async () => {
      const data = await fetchAnimes();
      setAnimes(data);
    })()
  }, [])

  if (!animes)
    return null

  return (
    <main className="relative">
      <section className="mt-5">
        <form onSubmit={handleSearch} className="flex justify-between items-center mx-auto mt-4 lg:w-[50dvw] sm:w-[60dvw] w-[70dvw] rounded-full bg-white">
          <input type="text" name="search" id="search" placeholder="Search anime" className="w-[90%] px-3 py-2 rounded-full outline-none" />
          <button type="submit">
            <Search size={18} className="mr-2" />
          </button>
        </form>
      </section>
      <section className="grid items-center justify-center gap-3 my-10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {
          animes.length === 0 ? (
            <h3>No such anime</h3>
          ) : animes?.map((anime) => (
            <AnimeCard key={anime._id} anime={anime} />
          ))
        }
      </section>

      <AddButton />
    </main>
  )
}
