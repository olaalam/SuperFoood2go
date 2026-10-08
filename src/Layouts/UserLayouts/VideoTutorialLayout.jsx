import React from "react";
import { VideoTutorialPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom'

const VideoTutorialLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Video Tutorial" />
        <VideoTutorialPage/>
        </>
    )
}

export default VideoTutorialLayout;