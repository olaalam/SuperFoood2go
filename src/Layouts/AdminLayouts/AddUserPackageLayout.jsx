import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';
import { AddUserPackagePage } from "../../Pages/AllPages";

const AddUserPackageLayout = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <>
            <HeaderPageSection handleClick={handleGoBack} name="Add User Package" />
            <AddUserPackagePage />
        </>
    )
}

export default AddUserPackageLayout;

