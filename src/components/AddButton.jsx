import { Plus } from "lucide-react";
import {useNavigate} from "react-router-dom";
const AddButton = () => {
    const navigate = useNavigate();
    return (
        <button type="button" onClick={()=>navigate("/anime")} className="fixed z-50 inline-flex items-center justify-center w-12 h-12 transition-colors rounded-md shadow bg-slate-300 right-5 bottom-5 hover:bg-slate-600 hover:text-gray-300">
            <Plus />
        </button>
    )
}

export default AddButton