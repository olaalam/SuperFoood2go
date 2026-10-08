import React from "react";
import { AddAdminTutorialPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AddAdminTutorialLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Tutorial Group" />
        <AddAdminTutorialPage/>
        </>
    )
}

export default AddAdminTutorialLayout;