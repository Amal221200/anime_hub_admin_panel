import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

const GoBack = () => {
    const navigate = useNavigate();
    
    return (
        <button className="py-3 group/back" onClick={() => navigate(-1)}>
            <span className="inline-flex gap-3" ><ArrowLeft className="transition-transform transform translate-x-0 group-hover/back:-translate-x-2" /> Go Back</span>
        </button>
    )
}

export default GoBack