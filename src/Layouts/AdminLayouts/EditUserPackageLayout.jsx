import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate} from 'react-router-dom';
import { EditUserPackagePage } from "../../Pages/AllPages";

const EditUserPackageLayout =()=>{
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit User Package" />
            <EditUserPackagePage/>
        </>
    )
}

export default EditUserPackageLayout;

