import React from "react";
import { AddWelcomOfferPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AddWelcomOfferLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Welcome Offer" />
        <AddWelcomOfferPage/>
        </>
    )
}

export default AddWelcomOfferLayout;