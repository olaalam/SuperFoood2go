import React from "react";
import { AddSubscriptionPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AddSubscriptionLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Subscriper" />
        <AddSubscriptionPage/>
        </>
    )
}

export default AddSubscriptionLayout;
