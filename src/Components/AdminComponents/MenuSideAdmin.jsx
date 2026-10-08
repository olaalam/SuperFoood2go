import React, { useState, useEffect } from "react";
import {
       DemorequestsIcon, DollerIcon, DomainIcon,FoodIcon,ExtraIcon, HomeIcon, OrderIcon, PaymentIcon, PlanIcon, PromoCodeIcon, SettingIcon, StoreIcon, SubscriptionIcon, TutorialIcon, UserIcon, WelcomOfferIcon,
       // ProfileIcon,StoreIcon,SubscriptionIcon,DomainIcon,ExtraIcon,PaymentIcon,TutorialIcon
} from "../Icons/AllIcons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineDocumentText } from "react-icons/hi";

const MenuSideAdmin = ({ setIsSidebarOpen }) => {

       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation();
       const pathName = location.pathname;
       const savedState = JSON.parse(localStorage.getItem('sidebarAdminState')) || {};

       const handleLinkClick = () => {
              setIsSidebarOpen(false);  // Close the sidebar when a link is clicked
       };

       const [isActiveHome, setIsActiveHome] = useState(savedState.isActiveHome ?? true);
       const [isActiveDemoRequest, setIsActiveDemoRequest] = useState(savedState.isActiveDemoRequest ?? false);
       const [isActiveDomainRequest, setIsActiveDomainRequest] = useState(savedState.isActiveDomainRequest ?? false);
       const [isActivePaymentPending, setIsActivePaymentPending] = useState(savedState.isActivePaymentPending ?? false);
       const [isActiveOrder, setIsActiveOrder] = useState(savedState.isActiveOrder ?? false);
       const [isActiveUser, setIsActiveUser] = useState(savedState.isActiveUser ?? false);
       const [isActiveSubscription, setIsActiveSubscription] = useState(savedState.isActiveSubscription ?? false);
       const [isActivePlan, setIsActivePlan] = useState(savedState.isActivePlan ?? false);
       const [isActiveExtra, setIsActiveExtra] = useState(savedState.isActiveExtra ?? false);
       const [isActivePayment, setIsActivePayment] = useState(savedState.isActivePayment ?? false);
       const [isActiveTutorial, setIsActiveTutorial] = useState(savedState.isActiveTutorial ?? false);
       const [isActiveWelcomOffer, setIsActiveWelcomOffer] = useState(savedState.isActiveWelcomOffer ?? false);
       const [isActiveStores, setIsActiveStores] = useState(savedState.isActiveStores ?? false);
       const [isActiveSMSPackage, setIsActiveSMSPackage] = useState(savedState.isActiveSMSPackage ?? false);
       const [isActiveUserPackage, setIsActiveUserPackage] = useState(savedState.isActiveUserPackage ?? false);
       const [isActiveDomainSubscription, setIsActiveDomainSubscription] = useState(savedState.isActiveDomainSubscription ?? false);

       const [isActiveSetting, setIsActiveSetting] = useState(savedState.isActiveSetting ?? false);
       const [isActiveSettingList, setIsActiveSettingList] = useState(savedState.isActiveSettingList ?? false);
       const [isActivePaymentMethod, setIsActivePaymentMethod] = useState(savedState.isActivePaymentMethod ?? false);
       const [isActivePromoCode, setIsActivePromoCode] = useState(savedState.isActivePromoCode ?? false);
       const [isActiveActivity, setIsActiveActivity] = useState(savedState.isActiveActivity ?? false);
       const [isActiveContact, setIsActiveContact] = useState(savedState.isActiveContact ?? false);
       const [isActiveFood, setIsActiveFood] = useState(savedState.isActiveFood ?? false);


       const handleLogout = () => {
              auth.logout();
              // navigate("/", { replace: true });
       }

       useEffect(() => {
              const sidebarAdminState = {
                     isActiveHome, isActiveDemoRequest, isActivePaymentPending, isActiveDomainRequest, isActiveWelcomOffer, isActiveStores,
                     isActiveOrder, isActiveUser, isActiveSubscription, isActivePlan, isActiveTutorial, isActiveActivity, isActiveSMSPackage, isActiveUserPackage, isActiveDomainSubscription,
                     isActiveExtra, isActivePayment, isActiveSetting, isActiveSettingList, isActivePromoCode, isActiveContact
              };
              localStorage.setItem('sidebarAdminState', JSON.stringify(sidebarAdminState));
       }, [isActiveHome, isActiveDemoRequest, isActivePaymentPending, isActiveDomainRequest, isActiveWelcomOffer, isActiveStores,
              isActiveOrder, isActiveUser, isActiveSubscription, isActivePlan, isActiveTutorial, isActiveActivity, isActiveSMSPackage, isActiveUserPackage, isActiveDomainSubscription,
              isActiveExtra, isActivePayment, isActiveSetting, isActiveSettingList, isActivePromoCode, isActiveContact
       ]);

       const handleClickHome = () => {
              setIsActiveHome(true);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
                            setIsActiveFood(false)

              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       };
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 2).join('/');
              if (result == "/dashboard_admin/") {
                     handleClickHome()
              }
       }, [location])

       const handleClickDemoRequest = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(true)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
                            setIsActiveFood(false)

              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       };
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/demo_request") {
                     handleClickDemoRequest()
              }
       }, [location])

       const handleClickDomainRequest = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(true)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
                            setIsActiveFood(false)

              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       };

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/domain_request") {
                     handleClickDomainRequest()
              }
       }, [location])


       const handleClickPaymentPending = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(true)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
                            setIsActiveFood(false)

              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/pending_payment") {
                     handleClickPaymentPending()
              }
       }, [location])

       const handleClickOrder = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(true)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
                            setIsActiveFood(false)

              setIsActiveDomainSubscription(false)
       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/order") {
                     handleClickOrder()
              }
       }, [location])

       const handleClickUser = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(true)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
                            setIsActiveFood(false)

              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/user") {
                     handleClickUser()
              }
       }, [location])

       const handleClickSubscription = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(true)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
                            setIsActiveFood(false)

              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/subscription") {
                     handleClickSubscription()
              }
       }, [location])

       const handleClickPlan = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(true)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
                            setIsActiveFood(false)

              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/plan") {
                     handleClickPlan()
              }
       }, [location])

       const handleClickExtra = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(true)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
                            setIsActiveFood(false)

       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/extra_product") {
                     handleClickExtra()
              }
       }, [location])

       const handleClickPayment = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(true)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
                            setIsActiveFood(false)

              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/payment") {
                     handleClickPayment()
              }
       }, [location])

       const handleClickSetting = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(true)
              setIsActiveSettingList(true)
              setIsActiveSetting(true)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
                            setIsActiveFood(false)

       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/payment_method") {
                     handleClickSetting()
              }
       }, [location])
       const handleClickPaymentMethod = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(true)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(true)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
                            setIsActiveFood(false)

              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/payment_method") {
                     handleClickPaymentMethod()
              }
       }, [location])

       const handleClickPromoCode = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(true)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(true)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
                            setIsActiveFood(false)

              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/promocode") {
                     handleClickPromoCode()
              }
       }, [location])

       const handleClickActivity = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(true)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(true)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
                            setIsActiveFood(false)

              setIsActiveDomainSubscription(false)
       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/activity") {
                     handleClickActivity()
              }
       }, [location])

       const handleClickTutorial = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(false)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(true)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
                            setIsActiveFood(false)

       }
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/tutorial_group") {
                     handleClickTutorial()
              }
       }, [location])

       const handleClickContact = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(true)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(true)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
                            setIsActiveFood(false)

       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/contact_info") {
                     handleClickContact()
              }
       }, [location])

       const handleClickWelcomOffer = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(false)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(true)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
                            setIsActiveFood(false)

       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/welcome_offer") {
                     handleClickWelcomOffer()
              }
       }, [location])
       const handleClickStore = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(false)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(true)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
                            setIsActiveFood(false)

       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/stores") {
                     handleClickStore()
              }
       }, [location])

       const handleClickSMSPackage = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(false)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(true)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
                            setIsActiveFood(false)

       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/sms_packages") {
                     handleClickSMSPackage()
              }
       }, [location])

       const handleClickUserPackage = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(false)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(true)
                            setIsActiveFood(false)

              setIsActiveDomainSubscription(false)
       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/user_packages") {
                     handleClickUserPackage()
              }
       }, [location])


       const handleClickDomainSubscription = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(false)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
                            setIsActiveFood(false)

              setIsActiveDomainSubscription(true)
       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/domain_subscription") {
                     handleClickDomainSubscription()
              }
       }, [location])
       const handleClickLandpage = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActiveDomainRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(false)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
              setIsActiveTutorial(false)
              setIsActiveActivity(false)
              setIsActiveWelcomOffer(false)
              setIsActiveContact(false)
              setIsActiveStores(false)
              setIsActiveSMSPackage(false)
              setIsActiveUserPackage(false)
              setIsActiveDomainSubscription(false)
              setIsActiveFood(true)
       }

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard_admin/landpage") {
                     handleClickLandpage()
              }
       }, [location])

       return (
              <>
                     <div className="flex justify-center w-full h-full mt-3 mb-10">
                            <div className="flex flex-col items-center w-5/6 MenuSide gap-y-4">
                                   <Link to="/dashboard_admin" onClick={() => { handleClickHome(); handleLinkClick(); }} className={`${isActiveHome ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <HomeIcon isActive={isActiveHome} />
                                          <span className={`${isActiveHome ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Home</span>
                                   </Link>
                                   <Link to="welcome_offer" onClick={() => { handleClickWelcomOffer(); handleLinkClick(); }} className={`${isActiveWelcomOffer ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <WelcomOfferIcon isActive={isActiveWelcomOffer} />
                                          <span className={`${isActiveWelcomOffer ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Welcome Offer</span>
                                   </Link>
                                   {/* <Link to="demo_request" onClick={() =>{handleClickDemoRequest();handleLinkClick();}} className={`${isActiveDemoRequest ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <DemorequestsIcon isActive={isActiveDemoRequest} />
                                          <span className={`${isActiveDemoRequest ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Demo Requests</span>
                                   </Link> */}
                                   <Link to="domain_request" onClick={() => { handleClickDomainRequest(); handleLinkClick(); }} className={`${isActiveDomainRequest ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <DomainIcon isActive={isActiveDomainRequest} />
                                          <span className={`${isActiveDomainRequest ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Domain Requests</span>
                                   </Link>
                                   <Link to="pending_payment" onClick={() => { handleClickPaymentPending(); handleLinkClick(); }} className={`${isActivePaymentPending ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <DollerIcon isActive={isActivePaymentPending} />
                                          <span className={`${isActivePaymentPending ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Payment Pending</span>
                                   </Link>
                                   <Link to="order" onClick={() => { handleClickOrder(); handleLinkClick(); }} className={`${isActiveOrder ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <OrderIcon isActive={isActiveOrder} />
                                          <span className={`${isActiveOrder ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Order</span>
                                   </Link>
                                   <Link to="stores" onClick={() => { handleClickStore(); handleLinkClick(); }} className={`${isActiveStores ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <StoreIcon isActive={isActiveStores} />
                                          <span className={`${isActiveStores ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Stores</span>
                                   </Link>
                                   <Link to="user" onClick={() => { handleClickUser(); handleLinkClick(); }} className={`${isActiveUser ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <UserIcon isActive={isActiveUser} />
                                          <span className={`${isActiveUser ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>User</span>
                                   </Link>
                                   <Link to="subscription" onClick={() => { handleClickSubscription(); handleLinkClick(); }} className={`${isActiveSubscription ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <SubscriptionIcon isActive={isActiveSubscription} />
                                          <span className={`${isActiveSubscription ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Subscriptions</span>
                                   </Link>
                                   <Link to="plan" onClick={() => { handleClickPlan(); handleLinkClick(); }} className={`${isActivePlan ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PlanIcon isActive={isActivePlan} />
                                          <span className={`${isActivePlan ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>plan</span>
                                   </Link>

                                   <Link to="extra_product" onClick={() => { handleClickExtra(); handleLinkClick(); }} className={`${isActiveExtra ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <ExtraIcon isActive={isActiveExtra} />
                                          <span className={`${isActiveExtra ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Extras Product</span>
                                   </Link>
                                   <Link to="payment" onClick={() => { handleClickPayment(); handleLinkClick(); }} className={`${isActivePayment ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PaymentIcon isActive={isActivePayment} />
                                          <span className={`${isActivePayment ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Payment</span>
                                   </Link>
                                   <Link to="tutorial_group" onClick={() => { handleClickTutorial(); handleLinkClick(); }} className={`${isActiveTutorial ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <TutorialIcon isActive={isActiveTutorial} />
                                          <span className={`${isActiveTutorial ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Tutorial</span>
                                   </Link>
                                   <Link to="sms_packages" onClick={() => { handleClickSMSPackage(); handleLinkClick(); }} className={`${isActiveSMSPackage ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PaymentIcon isActive={isActiveSMSPackage} />
                                          <span className={`${isActiveSMSPackage ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>SMS Package</span>
                                   </Link>
                                   <Link to="user_packages" onClick={() => { handleClickUserPackage(); handleLinkClick(); }} className={`${isActiveUserPackage ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PaymentIcon isActive={isActiveUserPackage} />
                                          <span className={`${isActiveUserPackage ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>User Package</span>
                                   </Link>
                                   <Link to="domain_subscription" onClick={() => { handleClickDomainSubscription(); handleLinkClick(); }} className={`${isActiveDomainSubscription ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PaymentIcon isActive={isActiveDomainSubscription} />
                                          <span className={`${isActiveDomainSubscription ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Domain Subscription</span>
                                   </Link>
                                   <Link to="landpage" onClick={() => { handleClickLandpage(); handleLinkClick(); }} className={`${isActiveFood ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <FoodIcon isActive={isActiveFood} />
                                          <span className={`${isActiveFood ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Landpage</span>
                                   </Link>
                                   <NavLink
                                          to="proposal"
                                          onClick={handleLinkClick}
                                          className={({ isActive }) => `${isActive ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}
                                   >
                                          {({ isActive }) => (
                                                 <>
                                                        <HiOutlineDocumentText className={`h-6 w-6 ${isActive ? "text-mainColor" : "text-secoundColor"}`} />
                                                        <span className={`${isActive ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Proposal</span>
                                                 </>
                                          )}
                                   </NavLink>
                                   {/* <Link to="setting" onClick={() =>{handleClickSetting();handleLinkClick();}} className={`${isActiveSetting ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <SettingIcon isActive={isActiveSetting} />
                                          <span className={`${isActiveSetting ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Settings</span>
                                   </Link>   */}

                                   <>
                                          <Link to="payment_method" onClick={() => { handleClickSetting(); handleLinkClick(); }} className={`${isActiveSetting ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                                 <SettingIcon isActive={isActiveSetting} />
                                                 <span className={`${isActiveSetting ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Settings</span>
                                          </Link>
                                          {isActiveSettingList && (
                                                 <div className={`${isActiveSettingList ? "h-auto" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${isActiveSettingList ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-10 bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               <Link to="payment_method" onClick={() => { handleClickPaymentMethod(); handleLinkClick(); }} className={`${isActivePaymentMethod ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                                                      {/* <PromoCodeIcon isActive={isActivePaymentMethod} /> */}
                                                                      <span className={`${isActivePaymentMethod ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Payment Method</span>
                                                               </Link>
                                                               <Link to="promocode" onClick={() => { handleClickPromoCode(); handleLinkClick(); }} className={`${isActivePromoCode ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                                                      {/* <PromoCodeIcon isActive={isActivePromoCode} /> */}
                                                                      <span className={`${isActivePromoCode ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>PromoCode</span>
                                                               </Link>
                                                               <Link to="activity" onClick={() => { handleClickActivity(); handleLinkClick(); }} className={`${isActiveActivity ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                                                      {/* <PromoCodeIcon isActive={isActiveActivity} /> */}
                                                                      <span className={`${isActiveActivity ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Activity</span>
                                                               </Link>
                                                               <Link to="contact_info" onClick={() => { handleClickContact(); handleLinkClick(); }} className={`${isActiveContact ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                                                      {/* <PromoCodeIcon isActive={isActiveContact} /> */}
                                                                      <span className={`${isActiveContact ? "text-mainColor" : "text-secoundColor"} text-lg font-medium`}>Contact Information</span>
                                                               </Link>
                                                        </ul>
                                                 </div>
                                          )}
                                   </>
                                   <Link to="/" onClick={() => { handleLogout(); handleLinkClick(); }} className="flex items-center justify-start w-full px-0 py-2 gap-x-5">
                                          <IoIosLogOut size={23} style={{ strokeWidth: 2 }} color="#ffff" />
                                          <span className="text-lg font-medium text-secoundColor">Log Out</span>
                                   </Link>
                            </div>
                     </div>
              </>
       );
};

export default MenuSideAdmin;
