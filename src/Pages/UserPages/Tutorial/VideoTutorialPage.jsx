// import React from "react";

// const VideoTutorialPage =() =>{
//     return(
//         <div className="w-full mb-5">
//         {/* {mainResource.type === "video" && (
//           <div className="w-full">
//             <video className="w-full object-cover" controls controlsList='nodownload'>
//               <source src={`${mainResource.file_link}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>

//           </div>
//         )} */}
//         {/* {mainResource.type === "voice" && (
//           <div>
//             <audio className="w-full" controls>
//               <source src={`${mainResource.file_link}`} type="audio/mp3" />
//               Your browser does not support the audio element.
//             </audio>
//           </div>
//         )}
//         {mainResource.type === "pdf" && (
//           <div>
//             <iframe
//               className="w-full h-96"
//               src={`${mainResource.file_link}`}
//               title="PDF"
//             />
//           </div>
//         )} */}

//         {/* <div className="mt-4">
//           <h4 className="text-2xl text-mainColor font-semibold">{chapterName}</h4>
//           <p className="text-gray-900 text-lg">{lessons.name}</p>
//         </div> */}
//       </div>    )
// }

// export default VideoTutorialPage;


import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const VideoTutorialPage = () => {
    const location = useLocation();
    const { tutorial } = location.state || {}; // Retrieve the tutorial data
    const {t} = useTranslation();

    if (!tutorial) {
        return <p className="text-center text-lg text-gray-600 mt-10">{t("No tutorial data available")}</p>;
    }

    return (
        <div className="flex flex-col items-center px-4">
            <div className="max-w-screen-xl w-full bg-white rounded-xl shadow-2xl p-4">
                <h1 className="text-4xl font-extrabold text-mainColor mb-10">
                    {tutorial.title}
                </h1>

                {/* Video Section */}
                {/* <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-black">
                    <video
                        controls
                        className="absolute top-0 left-0 w-full rounded-xl"
                        src={tutorial.video_link}
                        alt={tutorial.title}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div> */}
                <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-black">
                        <video className="w-full object-cover" controls>
                      <source src={tutorial.video_link} type="video/mp4" alt={tutorial.title}/>
                      {t("Your browser does not support the video tag.")}
                      </video>
                </div>

                {/* Description Section */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl font-semibold text-mainColor">{t("description")}</h2>
                    <p className="text-gray-800 text-lg leading-relaxed">{tutorial.description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoTutorialPage;
