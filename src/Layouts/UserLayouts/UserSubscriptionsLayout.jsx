import React from "react";
import { UserSubscriptionsPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom'

const UserSubscriptionsLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        {/* <HeaderPageSection handleClick={handleGoBack} name="Subscriptions" /> */}
        <UserSubscriptionsPage/>
        </>
    )
}

export default UserSubscriptionsLayout;