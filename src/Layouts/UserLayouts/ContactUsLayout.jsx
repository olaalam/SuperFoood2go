import React from "react";
import { ContactUsPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom'
const ContactUsLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        {/* <HeaderPageSection handleClick={handleGoBack} name="Contact Us" /> */}
        <ContactUsPage/>
        </>
    )
}

export default ContactUsLayout;