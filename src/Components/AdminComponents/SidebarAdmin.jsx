import React from "react";
import StoreLogo from '../../../public/Images/logo white.png'
import MenuSideAdmin from "../../Components/AdminComponents/MenuSideAdmin";
import { useTranslation } from "react-i18next";
import Logo from '../../assets/Images/WhiteLogo'
const SidebarAdmin =({ isOpen , setIsSidebarOpen}) => {
  const {i18n} = useTranslation()
       return (
              <>
                <aside
                 className={`fixed scrollSec w-4/12 md:w-6/12 lg:w-[19%] sm:w-8/12 
                  ${i18n.language === 'ar' ? 'right-0' : 'left-0'} 
                  overflow-y-auto z-10 h-screen flex flex-col items-center bg-mainColor gap-y-3 transition-transform transform ${
                    isOpen ? "translate-x-0" : `${i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`
                  } lg:translate-x-0`}
                >
                <div className="w-[60%] lg:mt-0 sm:mt-6  items-start justify-start border-b-2 py-6 px-4 text-xl font-semibold">
                 <Logo/>
                </div>
                <MenuSideAdmin setIsSidebarOpen={setIsSidebarOpen}/>
                </aside>      
              </>
       );
};

export default SidebarAdmin;
