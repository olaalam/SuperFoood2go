import React, { useState ,useEffect} from "react";
import {HomeIcon,ProfileIcon,StoreIcon,SubscriptionIcon,DomainIcon,ExtraIcon,PaymentIcon,TutorialIcon} from "../Icons/AllIcons";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const MenuSideUser =  ({setIsSidebarOpen }) => {

       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation();
       const pathName = location.pathname;
       const savedState = JSON.parse(localStorage.getItem('sidebarUserState')) || {};
       const { t, i18n } = useTranslation();

       const handleLinkClick = () => {
              setIsSidebarOpen(false);  // Close the sidebar when a link is clicked
       };
      
       const [isActiveHome, setIsActiveHome] =  useState(savedState.isActiveHome ?? true);
       const [isActiveProfile, setIsActiveProfile] =  useState(savedState.isActiveProfile ?? false);
       const [isActiveStore, setIsActiveStore] =  useState(savedState.isActiveStore ?? false);
       const [isActiveSubscription, setIsActiveSubscription] =  useState(savedState.isActiveSubscription ?? false);
       const [isActiveDomain, setIsActiveDomain] =  useState(savedState.isActiveDomain ?? false);
       const [isActiveDomainList, setIsActiveDomainList] =  useState(savedState.isActiveDomainList ?? false);
              const [isActiveMyDomain, setIsActiveMyDomain] =  useState(savedState.isActiveMyDomain ?? false);
              const [isActiveBuyDomain, setIsActiveBuyDomain] =  useState(savedState.isActiveBuyDomain ?? false);
       const [isActiveSupport, setIsActiveSupport] =  useState(savedState.isActiveSupport ?? false);
       const [isActiveSupportList, setIsActiveSupportList] =  useState(savedState.isActiveSupportList ?? false);
              const [isActiveContactUs, setIsActiveContactUs] =  useState(savedState.isActiveContactUs ?? false);
              const [isActiveTutorial, setIsActiveTutorial] =  useState(savedState.isActiveTutorial ?? false);

       const [isActiveExtra, setIsActiveExtra] =  useState(savedState.isActiveExtra ?? false);
       const [isActivePayment, setIsActivePayment] =  useState(savedState.isActivePayment ?? false);
       // const [isActiveTutorial, setIsActiveTutorial] =  useState(savedState.isActiveTutorial ?? false);
   
       const handleLogout = () => {
              auth.logout();
              // navigate("/", { replace: true });
       }

       useEffect(() => {
              const sidebarUserState = {
                     isActiveHome,isActiveProfile,isActiveStore,isActiveSubscription,isActiveDomain,isActiveSupportList,
                     isActiveContactUs,isActiveTutorial,isActiveSupport,
                     isActiveDomainList,isActiveMyDomain,isActiveBuyDomain,isActiveExtra,isActivePayment
              };
              localStorage.setItem('sidebarUserState', JSON.stringify(sidebarUserState));
       }, [isActiveHome,isActiveProfile,isActiveStore,isActiveSubscription,isActiveDomain,isActiveSupportList,
              isActiveContactUs,isActiveTutorial,isActiveSupport,
              isActiveDomainList,isActiveMyDomain,isActiveBuyDomain,isActiveExtra,isActivePayment
       ]);

       useEffect(() => {
              if (i18n.language === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
              } else {
                document.documentElement.setAttribute('dir', 'ltr');
              }
       }, [i18n.language]);

       const handleClickHome = () => {
              setIsActiveHome(true);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)

       };
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 2).join('/');
              if (result == "/dashboard_user/") {
                     handleClickHome()
              }
       }, [location])
       const handleClickProfile = () => {
              setIsActiveHome(false);
              setIsActiveProfile(true)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)
       };
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/profile") {
                     handleClickProfile()
              }
       }, [location])
       const handleClickStore =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(true)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/store") {
                     handleClickStore()
              }
       }, [location])

       const handleClickSubscription =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(true)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/subscription") {
                     handleClickSubscription()
              }
       }, [location])

       const handleClickDomain =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(true)
              setIsActiveDomainList(true)
              setIsActiveMyDomain(true)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)              
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/my_domain") {
                     handleClickDomain()
              }
       }, [location])

       const handleClickMyDomain =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(true)
              setIsActiveDomainList(true)
              setIsActiveMyDomain(true)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/my_domain") {
                     handleClickMyDomain()
              }
       }, [location])

       const handleClickBuyDomain =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(true)
              setIsActiveDomainList(true)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(true)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)
       }
       
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/buy_domain") {
                     handleClickBuyDomain()
              }
       }, [location])

       const handleClickExtra =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)               
              setIsActiveExtra(true)
              setIsActivePayment(false)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/extra") {
                     handleClickExtra()
              }
       }, [location])
       const handleClickPayment =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(true)
              setIsActiveSupport(false)
              setIsActiveSupportList(false)
              setIsActiveContactUs(false)
              setIsActiveTutorial(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/payment_history") {
                     handleClickPayment()
              }
       }, [location])
       
       const handleClickSupport =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(true)
              setIsActiveSupportList(true)
              setIsActiveContactUs(true)
              setIsActiveTutorial(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/contact_us") {
                     handleClickSupport()
              }
       }, [location])

       const handleClickContactUs =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(true)
              setIsActiveSupportList(true)
              setIsActiveContactUs(true)
              setIsActiveTutorial(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/contact_us") {
                     handleClickContactUs()
              }
       }, [location])
       const handleClickTutorial =() =>{
              setIsActiveHome(false);
              setIsActiveProfile(false)
              setIsActiveStore(false)
              setIsActiveSubscription(false)
              setIsActiveDomain(false)
              setIsActiveDomainList(false)
              setIsActiveMyDomain(false)
              setIsActiveBuyDomain(false)              
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSupport(true)
              setIsActiveSupportList(true)
              setIsActiveContactUs(false)
              setIsActiveTutorial(true)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_user/tutorial") {
                     handleClickTutorial()
              }
       }, [location])
       return (
              <>
                     <div className="w-full h-full mt-3 flex justify-center mb-10">
                            <div className="MenuSide w-5/6 flex flex-col items-center gap-y-4">                      
                                   <Link to="/dashboard_user" onClick={() =>{handleClickHome();handleLinkClick();}} className={`${isActiveHome ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <HomeIcon isActive={isActiveHome} />
                                          <span className={`${isActiveHome ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}> {t('home')}</span>
                                   </Link>
                                   <Link to="profile" onClick={() =>{handleClickProfile();handleLinkClick();}} className={`${isActiveProfile ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <ProfileIcon isActive={isActiveProfile} />
                                          <span className={`${isActiveProfile ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('profile')}</span>
                                   </Link>
                                   <Link to="store" onClick={() =>{handleClickStore();handleLinkClick();}} className={`${isActiveStore ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <StoreIcon isActive={isActiveStore} />
                                          <span className={`${isActiveStore ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('store')}</span>
                                   </Link>
                                   <Link to="subscription" onClick={() =>{handleClickSubscription();handleLinkClick();}} className={`${isActiveSubscription ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <SubscriptionIcon isActive={isActiveSubscription} />
                                          <span className={`${isActiveSubscription ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('plans')}</span>
                                   </Link>                     
                                   {/* <Link to="domain" onClick={() =>{handleClickDomain();handleLinkClick();}} className={`${isActiveDomain ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <DomainIcon isActive={isActiveDomain} />
                                          <span className={`${isActiveDomain ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Domain</span>
                                   </Link> */}
                                   <>
                                   <Link
                                          to="my_domain"
                                          onClick={() =>{handleClickDomain();handleLinkClick();}}
                                          className={`${isActiveDomain ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}
                                   >
                                          <DomainIcon isActive={isActiveDomain} />
                                          <span className={`${isActiveDomain ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('domains')}</span>
                                   </Link>
                                   {isActiveDomainList && (
                                          <div className="h-22 w-full transition-all duration-500">
                                          <ul className={`h-full listUser ${i18n.language === 'ar' ? 'mr-10' : 'ml-10'} bg-blacks transition-all duration-700 flex flex-col gap-y-2`}>
                                                 <Link
                                                 to="my_domain"
                                                 onClick={() =>{handleClickMyDomain();handleLinkClick();}}
                                                 className={`${isActiveMyDomain ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}
                                                 >
                                                 <span className={`${isActiveMyDomain ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>
                                                        {t('my_domain')}
                                                 </span>
                                                 </Link>
                                                 <Link
                                                 to="buy_domain"
                                                 onClick={() =>{handleClickBuyDomain();handleLinkClick();}}
                                                 className={`${isActiveBuyDomain ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}
                                                 >
                                                 <span className={`${isActiveBuyDomain ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>
                                                        {t('buy_domain')}                                                 </span>
                                                 </Link>
                                          </ul>
                                          </div>
                                   )}
                                   </>

                                   <>
                                   <Link
                                          to="contact_us"
                                          onClick={() =>{handleClickSupport();handleLinkClick();}}
                                          className={`${isActiveSupport ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}
                                   >
                                          <TutorialIcon isActive={isActiveSupport} />
                                          <span className={`${isActiveSupport ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('Support')}</span>
                                   </Link>
                                   {isActiveSupportList && (
                                          <div className="h-22 w-full transition-all duration-500">
                                          <ul className={`h-full listUser ${i18n.language === 'ar' ? 'mr-10' : 'ml-10'} bg-blacks transition-all duration-700 flex flex-col gap-y-2`}>
                                                 <Link
                                                 to="contact_us"
                                                 onClick={() =>{handleClickContactUs();handleLinkClick();}}
                                                 className={`${isActiveContactUs ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}
                                                 >
                                                 <span className={`${isActiveContactUs ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>
                                                        {t('contact_us')}
                                                 </span>
                                                 </Link>
                                                 <Link
                                                 to="tutorial"
                                                 onClick={() =>{handleClickTutorial();handleLinkClick();}}
                                                 className={`${isActiveTutorial ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}
                                                 >
                                                 <span className={`${isActiveTutorial ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>
                                                        {t('tutorial')}                                                 
                                                 </span>
                                                 </Link>
                                          </ul>
                                          </div>
                                   )}
                                   </>

                                   <Link to="extra" onClick={() =>{handleClickExtra();handleLinkClick();}} className={`${isActiveExtra ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <ExtraIcon isActive={isActiveExtra} />
                                          <span className={`${isActiveExtra ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('extras')}</span>
                                   </Link>
                                   <Link to="payment_history" onClick={() =>{handleClickPayment();handleLinkClick();}} className={`${isActivePayment ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PaymentIcon isActive={isActivePayment} />
                                          <span className={`${isActivePayment ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('payment_history')}</span>
                                   </Link>
                                   {/* <Link to="tutorial" onClick={() =>{handleClickTutorial();handleLinkClick();}} className={`${isActiveTutorial ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <TutorialIcon isActive={isActiveTutorial} />
                                          <span className={`${isActiveTutorial ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>{t('tutorial')}</span>
                                   </Link> */}
                                   <Link to="/" onClick={() =>{handleLogout();handleLinkClick();}} className="w-full flex items-center justify-start px-0 py-2 gap-x-5">
                                          <IoIosLogOut size={23} style={{ strokeWidth: 2 }} color="#ffff"/>
                                          <span className="text-secoundColor text-lg font-medium">{t('log_out')}</span>
                                   </Link>               
                            </div>
                     </div>
              </>
       );
};

export default MenuSideUser;
