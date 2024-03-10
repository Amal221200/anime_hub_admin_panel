/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { deleteUser, updateUser } from "../../lib/userControllers";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

const UserRows = ({ user, setRerender }) => {

    const [role, setRole] = useState(user.role)
    const handleInput = useCallback(async (data) => {
        const res = await updateUser(data._id, { role: data.input });
        if (!res)
            return toast.error("Not Updated", {position: "top-right"})
        setRole(res.role);
        toast.success("Successfully updated", {position: "top-right"})
    }, [])

    const handleDelete = useCallback(async (id) => {
        const res = await deleteUser(id);
        if (!res)
            return toast.error("Not deleted", {position: "top-right"})
        setRerender(current => !current)
        toast.success("Successfully deleted", {position: "top-right"})
    }, [setRerender])

    return (
        <tr className="odd:bg-transparent even:bg-gray-300 group/user py-2 px-1">
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{(<select onInput={(e) => handleInput({ _id: user._id, input: e.target.value })} defaultValue={user.role} className={`rounded outline-none cursor-pointer ${role === 'admin' ? 'bg-emerald-200' : 'bg-orange-200'}`}>
                <option value="admin" className="bg-emerald-200 cursor-pointer">Admin</option>
                <option value="user" className="bg-orange-200 cursor-pointer">User</option>
            </select>)}</td>
            <td>{(<button onClick={() => handleDelete(user._id)} type="button" className="opacity-0 group-hover/user:opacity-100 p-1 bg-rose-500 hover:bg-rose-600 transition rounded-md">
                <Trash2 className="text-white" size={20} />
            </button>)}</td>
        </tr>
    )
}

export default UserRows