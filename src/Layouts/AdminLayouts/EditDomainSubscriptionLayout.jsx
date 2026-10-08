import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate} from 'react-router-dom';
import { EditDomainSubscriptionPage } from "../../Pages/AllPages";

const EditDomainSubscriptionLayout =()=>{
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Domain Subscription" />
            <EditDomainSubscriptionPage/>
        </>
    )
}

export default EditDomainSubscriptionLayout;

