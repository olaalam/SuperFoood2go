import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate} from 'react-router-dom';
import { AddSMSPackagePage } from "../../Pages/AllPages";

const AddSMSPackageLayout =()=>{
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add SMS Package" />
            <AddSMSPackagePage/>
        </>
    )
}

export default AddSMSPackageLayout;

