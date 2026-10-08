import React from "react";
import { CheckoutPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom'
const CheckoutLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="CheckOut" />
        <CheckoutPage/>
        </>
    )
}

export default CheckoutLayout;