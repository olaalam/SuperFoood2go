import React from "react";
import { StorePage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom'

const StoreLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        {/* <HeaderPageSection handleClick={handleGoBack} name="Store" /> */}
        <StorePage/>
        </>
    )
}

export default StoreLayout;