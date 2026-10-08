// import React from "react";
// import StoreLogo from '../../../public/Images/logo white.png'
// import MenuSideUser from "../../Components/UserComponents/MenuSideUser";
// const SidebarUser =({ isOpen }) => {
//        return (
//               <>
//                 <aside
//                 className={`fixed scrollSec w-4/12 lg:w-2/12 xl:w-2/12 sm:w-8/12 left-0 overflow-y-auto z-10 h-screen flex flex-col items-center bg-mainColor gap-y-3 transition-transform transform ${
//                     isOpen ? "translate-x-0" : "-translate-x-full"
//                 } lg:translate-x-0`} // Sidebar always visible on large screens
//                 >
//                 <div className="w-full lg:mt-0 sm:mt-6 flex text-white items-center justify-center border-b-2 py-6 px-4 text-xl font-semibold">
//                   <img src={StoreLogo} alt="wegoStore"/>
//                 </div>
//                 <MenuSideUser />
//                 </aside>      
//               </>
//        );
// };

// export default SidebarUser;


// import React from "react";
// import { useTranslation } from "react-i18next";
// import StoreLogo from '../../../public/Images/logo white.png';
// import MenuSideUser from "../../Components/UserComponents/MenuSideUser";

// const SidebarUser = ({ isOpen }) => {
//   const { i18n } = useTranslation();  // Initialize i18n here

//   return (
//     <>
//       <aside
//         className={`fixed scrollSec w-4/12 lg:w-2/12 xl:w-2/12 sm:w-8/12 
//           ${i18n.language === 'ar' ? 'right-0' : 'left-0'} 
//           overflow-y-auto z-10 h-screen flex flex-col items-center bg-mainColor gap-y-3 transition-transform transform ${
//             isOpen ? "translate-x-0" : `${i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`
//           } lg:translate-x-0`} // Sidebar always visible on large screens
//       >
//   {/* Sidebar content */}
//         <div className="w-full lg:mt-0 sm:mt-6 flex text-white items-center justify-center border-b-2 py-6 px-4 text-xl font-semibold">
//           <img src={StoreLogo} alt="wegoStore" />
//         </div>
//         <MenuSideUser />
//       </aside>
//     </>
//   );
// };

// export default SidebarUser;


import React from "react";
import { useTranslation } from "react-i18next";
import StoreLogo from '../../../public/Images/logo white.png';
import MenuSideUser from "../../Components/UserComponents/MenuSideUser";
import Logo from '../../assets/Images/WhiteLogo'
const SidebarUser = ({ isOpen, setIsSidebarOpen }) => {
  const { i18n } = useTranslation();  // Initialize i18n here

  return (
    // <aside
    //   className={`fixed scrollSec w-4/12 lg:w-2/12 xl:w-2/12 sm:w-8/12 
    //     ${i18n.language === 'ar' ? 'right-0' : 'left-0'} 
    //     overflow-y-auto z-10 h-screen flex flex-col items-center bg-mainColor gap-y-3 transition-transform transform ${
    //       isOpen ? "translate-x-0" : `${i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`
    //     } lg:translate-x-0`} // Sidebar always visible on large screens
    // >
    <aside
    className={`fixed scrollSec w-4/12 md:w-6/12 lg:w-[19%] sm:w-8/12 
     ${i18n.language === 'ar' ? 'right-0' : 'left-0'} 
     overflow-y-auto z-10 h-screen flex flex-col items-center bg-mainColor gap-y-3 transition-transform transform ${
       isOpen ? "translate-x-0" : `${i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`
     } lg:translate-x-0`}
   >
      {/* Sidebar content */}
      <div className="w-[60%] lg:mt-0 sm:mt-6 flex text-white items-center justify-center border-b-2 py-6 px-4 text-xl font-semibold">
        <Logo/>
      </div>
      <MenuSideUser setIsSidebarOpen={setIsSidebarOpen} />
    </aside>
  );
};

export default SidebarUser;
