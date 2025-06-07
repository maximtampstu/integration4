import { useNavigate } from "react-router";

const BackButton = () => {
    const navigate = useNavigate();

    console.log("appel")
    
    return (
        <button type="button" onClick={() => navigate(-1)}>&lt; Back</button>
    );
};

export default BackButton;
