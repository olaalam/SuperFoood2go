import React from "react";
import { UserEditProfilePage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserProfileLayout =()=>{
  const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name={t('Edit Profile')} />
        <UserEditProfilePage/>
        </>
    )
}

export default UserProfileLayout;