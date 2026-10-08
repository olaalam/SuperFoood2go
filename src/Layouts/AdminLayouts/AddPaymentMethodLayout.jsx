import React from "react";
import { AddPaymentMethodPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AddPaymentMethodLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Payment Method" />
        <AddPaymentMethodPage/>
        </>
    )
}

export default AddPaymentMethodLayout;
