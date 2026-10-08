import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate} from 'react-router-dom';
import { EditSMSPackagePage } from "../../Pages/AllPages";

const EditSMSPackageLayout =()=>{
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit SMS Package" />
            <EditSMSPackagePage/>
        </>
    )
}

export default EditSMSPackageLayout;

