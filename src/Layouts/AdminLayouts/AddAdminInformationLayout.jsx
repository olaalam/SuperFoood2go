import React from "react";
import { AddAdminInformationPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AddAdminInformationLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Contact Information" />
        <AddAdminInformationPage/>
        </>
    )
}

export default AddAdminInformationLayout;
