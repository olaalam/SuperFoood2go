import React from "react";
import { TutorialDataPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom'

const TutorialDataLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Video Tutorial" />
        <TutorialDataPage/>
        </>
    )
}

export default TutorialDataLayout;