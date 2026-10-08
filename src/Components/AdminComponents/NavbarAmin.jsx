import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Context/Auth'
import SearchBar from '../SearchBar'
import { CiGlobe } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const NavbarAmin = () => {
       const auth = useAuth()
       const dropdownRef = useRef(null)
       
       const {i18n } = useTranslation();
       // const [selectedOption, setSelectedOption] = useState('EN');
       const [open, setOpen] = useState(false);


       const handleOptionClick = (value) => {
              i18n.changeLanguage(value.toLowerCase()); // Change language on selection
              setOpen(false);
            };
            const handleClickOpen = () => {
              setOpen(!open);
            };
     
       const handleClickOutside = (event) => {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                     setOpen(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);
       useEffect(() => {
              if (i18n.language === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
              } else {
                document.documentElement.setAttribute('dir', 'ltr');
              }
            }, [i18n.language]);

       return (
           <>
                     <div className="flex lg:mr-0 sm:ml-12 lg:ml-0 items-center justify-between py-2 px-4 bg-white mb-10">
                            <div className='w-full flex items-center justify-start gap-5'>
                                   {/* image profile */}
                                   {/* <div>
                                          {/* <img src={`data:image/jpeg;base64,${auth.user.data.image}`} className='w-20 h-20 rounded-full object-cover object-center' alt="Profile" /> */}
                                   {/* </div> */} 
                                   {/* Name Admin */}
                                   <div className='w-full md:w-4/12'>
                                          <span className='text-3xl mt-0 lg:m-5 text-mainColor font-[500] flex'>
                                                 Hello,<span>{auth.user.name}</span>
                                            </span>
                                   </div>
                                   <div className='w-8/12 hidden lg:flex'>
                                          <SearchBar bg={"thirdBgColor"} />
                                   </div>
                                   <div className='hidden lg:flex w-4/12 items-center py-1  gap-5 justify-center text-xl font-medium text-mainColor hover:cursor-pointer transition-all duration-300'>
                                          <div className=' flex items-center justify-around'>
                                          <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 justify-between text-2xl"
                onClick={handleClickOpen}
              >
                <CiGlobe className="text-mainColor text-2xl" />
                <span className="flex items-center text-mainColor font-medium">
                  {i18n.language.toUpperCase()}
                  <IoIosArrowDown
                    className={`${open ? "rotate-180" : "rotate-0"} mt-1 ml-1 transition-all duration-300`}
                  />
                </span>
              </button>
              <div
                className={`${open ? "block" : "hidden"} absolute w-28 top-14 -left-3.5 bg-white rounded-xl border-2 overflow-hidden`}
              >
                <div
                  className="flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300"
                  onClick={() => handleOptionClick('EN')}
                >
                  <CiGlobe /> EN
                </div>
                <div
                  className="flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300"
                  onClick={() => handleOptionClick('AR')}
                >
                  <CiGlobe /> AR
                </div>
              </div>
            </div>
                                          </div>
                                          <button type='button' className="">
                                                 <IoNotifications className='text-mainColor text-2xl' />
                                          </button>
                                   </div>
                            </div>
                    </div>
              </>
       )
}

export default NavbarAmin