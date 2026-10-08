
// import { useState } from 'react';
// import { RiCloseFill, RiMenu2Fill } from 'react-icons/ri';
// import SidebarUser from '../../Components/UserComponents/SidebarUser'
// import NavbarUser from '../../Components/UserComponents/NavbarUser'
// import { Outlet } from 'react-router-dom'

// const UserDashboardLayout = () => {
//        const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//        const toggleSidebar = () => {
//            setIsSidebarOpen(!isSidebarOpen);
//        };

//   return (
//     <div className="relative flex gap-x-4">
//       {/* Fixed Menu Icon for Small Screens */}
//       <div className="relative top-0 z-20 lg:hidden bg-[#fff]">
//         <button onClick={toggleSidebar} className="text-black p-2 focus:outline-none">
//           {isSidebarOpen ? (
//             <RiCloseFill className="w-8 h-8 ml-auto z-10" color="black" />
//           ) : (
//             <RiMenu2Fill className="w-8 h-8" color="black" />
//           )}
//         </button>
//       </div>

//       {/* Sidebar that overlays the content on small screens */}
//       <SidebarUser isOpen={isSidebarOpen} />

//       {/* Main Content Section */}
//       <div className={`contentSection md:w-full sm:w-full lg:w-4/5 min-h-screen transition-opacity ${isSidebarOpen ? 'opacity-50' : 'opacity-100'}`}>
//                     {/* <HeaderStudent /> */}
//                     <NavbarUser />
//                     <div className="pl-5">
//                         <Outlet />
//                     </div>
//                 </div>
//     </div>
//   );
// };

// export default UserDashboardLayout;


// import { useState } from 'react';
// import { RiCloseFill, RiMenu2Fill } from 'react-icons/ri';
// import SidebarUser from '../../Components/UserComponents/SidebarUser';
// import NavbarUser from '../../Components/UserComponents/NavbarUser';
// import { Outlet } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';  // Import the translation hook

// const UserDashboardLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { i18n } = useTranslation();  // Access i18n to determine the language direction

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const isRTL = i18n.language === 'ar'; // Check if the language is Arabic (RTL)

//   return (
//     <div className={`relative flex gap-x-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
//       {/* Fixed Menu Icon for Small Screens */}
//       <div className="relative top-0 z-20 lg:hidden bg-[#fff]">
//         <button onClick={toggleSidebar} className="text-black p-2 focus:outline-none">
//           {isSidebarOpen ? (
//             <RiCloseFill className="w-8 h-8 ml-auto z-10" color="black" />
//           ) : (
//             <RiMenu2Fill className="w-8 h-8" color="black" />
//           )}
//         </button>
//       </div>

//       {/* Sidebar that overlays the content on small screens */}
//       <SidebarUser isOpen={isSidebarOpen} />

//       {/* Main Content Section */}
//       <div
//         className={`contentSection md:w-full sm:w-full lg:w-4/5 min-h-screen transition-opacity ${isSidebarOpen ? 'opacity-50' : 'opacity-100'} ${isRTL ? 'pr-5' : 'pl-5'}`}
//       >
//         <NavbarUser />
//         <div className="pl-1">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboardLayout;


import { useState } from 'react';
import { RiCloseFill, RiMenu2Fill } from 'react-icons/ri';
import SidebarUser from '../../Components/UserComponents/SidebarUser';
import NavbarUser from '../../Components/UserComponents/NavbarUser';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Import the translation hook

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { i18n } = useTranslation();  // Access i18n to determine the language direction

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isRTL = i18n.language === 'ar'; // Check if the language is Arabic (RTL)

  return (
    <div className={`relative flex gap-x-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Fixed Menu Icon for Small Screens */}
      <div className="relative top-0 z-20 lg:hidden bg-[#fff]">
        <button onClick={toggleSidebar} className="text-black p-2 focus:outline-none">
          {isSidebarOpen ? (
            <RiCloseFill className="w-8 h-8 ml-auto z-10" color="black" />
          ) : (
            <RiMenu2Fill className="w-8 h-8" color="black" />
          )}
        </button>
      </div>

      {/* Sidebar that overlays the content on small screens */}
      <SidebarUser isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Section */}
      <div
        className={`contentSection md:w-full sm:w-full lg:w-4/5 min-h-screen transition-opacity ${isSidebarOpen ? 'opacity-50' : 'opacity-100'}`}
      >
        <NavbarUser />
        <div className="pl-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
