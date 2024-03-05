import { useContext, useEffect, useState, lazy, Suspense } from "react"
import { AnimeContext } from "../providers/AnimeProvider";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../lib/utils";
import AddButton from "../components/AddButton";

const AnimeCard = lazy(() => import('../components/AnimeCard'));

export default function HomePage() {
  const [animes, setAnimes] = useState(null);
  const { fetchAnimes } = useContext(AnimeContext);
  const { user, fetchSession } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await fetchAnimes();
      setAnimes(data);
    })()
  }, [fetchAnimes, navigate, fetchSession])

  return (
    <main className="relative">
      <section className="mt-5">
        <h1 className="text-2xl text-center">Welcome Back <span className="font-bold">{capitalize(user?.username)}</span>!</h1>
      </section>
      <section className="grid items-center justify-center gap-3 my-10 lg:grid-cols-3 sm:grid-cols-2 ">
        {
          animes?.map((anime) => (
            <Suspense key={anime._id}>
              <AnimeCard anime={anime} />
            </Suspense>
          ))
        }
      </section>

      <section>
        Pagination
      </section>

      <AddButton />
    </main>
  )
}
