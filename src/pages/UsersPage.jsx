import { Search } from "lucide-react";
import { useCallback, useEffect, useState, } from "react";
import { fetchAllUser } from "../lib/userControllers";
import UserTable from "../components/user/UserTable";


function UsersPage() {
    const [users, setUsers] = useState(null)
    const [rerender, setRerender] = useState(false)

    const handleSearch = useCallback(async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = await fetchAllUser(formData.get("search"));
        setUsers(userData);
    }, [])


    useEffect(() => {
        (async () => {
            const usersData = await fetchAllUser();
            setUsers(usersData);
        })()
    }, [rerender])

    if (!users)
        return
    return (
        <main>
            <section className="mt-5">
                <form onSubmit={handleSearch} className="flex justify-between items-center mx-auto mt-4 lg:w-[50dvw] sm:w-[60dvw] w-[70dvw] rounded-full bg-white">
                    <input type="text" name="search" id="search" placeholder="Search user" className="w-[90%] px-3 py-2 rounded-full outline-none" />
                    <button type="submit">
                        <Search size={18} className="mr-2" />
                    </button>
                </form>
            </section>

            <UserTable users={users} setRerender={setRerender} />
        </main>
    )
}

export default UsersPage;