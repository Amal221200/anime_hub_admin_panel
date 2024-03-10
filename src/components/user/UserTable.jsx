/* eslint-disable react/prop-types */
import UserRows from "./UserRows"
import "./UserTable.css";

const UserTable = ({ users, setRerender }) => {
    
    return (
        <table className="mx-auto table-auto border-collapse sm:w-[80%] w-full mt-4 rounded overflow-hidden py-2 px-1">
            <thead className="text-left bg-zinc-400 py-2 px-1">
                <tr className="">
                    <th>Username</th>
                    <th>Email</th>
                    <th colSpan={2}>Role</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => (
                        <UserRows user={user} key={user._id} setRerender={setRerender} />
                    ))
                }
            </tbody>
        </table>
    )
}

export default UserTable