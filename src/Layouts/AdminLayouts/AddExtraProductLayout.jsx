import React from "react";
import { AddExtraProductPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AddExtraProductLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Extra Product" />
        <AddExtraProductPage/>
        </>
    )
}

export default AddExtraProductLayout;
