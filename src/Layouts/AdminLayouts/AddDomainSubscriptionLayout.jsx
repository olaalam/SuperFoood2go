import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate} from 'react-router-dom';
import { AddDomainSubscriptionPage } from "../../Pages/AllPages";

const AddDomainSubscriptionLayout =()=>{
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Domain Subscription" />
            <AddDomainSubscriptionPage/>
        </>
    )
}

export default AddDomainSubscriptionLayout;

