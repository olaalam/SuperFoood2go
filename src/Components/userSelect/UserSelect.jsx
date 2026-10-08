import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/Auth';
import Loading from '../Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../Redux/CartSlice.js';
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useNavigate, Link } from 'react-router-dom';  // Import useNavigate
import { FaCrown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import {ButtonAdd} from '../Button.jsx'

const UserSelect = () => {
    
  const [select, setSelect] = useState(localStorage.getItem('selectedLanguage')); // Retrieve language from localStorage
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState(localStorage.getItem('popupClosed') === 'true'); // Track popup visibility
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en'); // Default to 'en'
  const [userData, setUserData] = useState('');
  const [userPlanId, setUserPlanId] = useState('');
  const {t,i18n} = useTranslation();
  const dispatch = useDispatch();
  const [billingPeriod, setBillingPeriod] = useState({});
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const navigate = useNavigate(); 
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle expanded state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const fetchData = async () => {
    setIsLoading(true);
        try {
        const response = await axios.get('https://clientbcknd.food2go.online/user/v1/welcome_offer', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
          });
      if (response.status === 200) {
        console.log(response.data)
        setData(response.data.welcome_offer);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const savedPlanId = localStorage.getItem('selectedPlanId');
    if (savedPlanId) {
        setSelectedPlanId(savedPlanId);
    }
  }, [data]);

  const ProfilefetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(' https://clientbcknd.food2go.online/user/v1/profile', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data)
            setUserData(response.data.user);
            setUserPlanId(response.data.user.plan_id);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false);
    }
    };

    useEffect(()=>{
      ProfilefetchData()
    },[])


    const handleLanguageSelect = async () => {
        const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
      
        try {
          // Change the language using i18n and wait for it to complete
          await i18n.changeLanguage(newLanguage);
      
          // Update the state and localStorage after the language change
          setLanguage(newLanguage);
          localStorage.setItem('selectedLanguage', newLanguage);
          console.log(`Language changed to ${newLanguage}`);
        } catch (error) {
          console.error('Error changing language:', error);
        }
      };
      
      
  const handleImageClick = () => {
    setClick(true);
    localStorage.setItem('popupClosed', 'true'); // Mark popup as closed
  };

    const handleAddToCart = async (plan) => {

        const priceOptions = {
            monthly: plan.plan?.monthly,
            quarterly: plan.plan?.quarterly || plan.plan?.monthly * 3,
            semiAnnually: plan.plan?.semi_annual|| plan.plan?.monthly * 6,
            annually: plan.plan?.yearly,
        };

        const discountOptions = {
            monthly: plan.plan?.discount_monthly,
            quarterly: plan.plan?.discount_quarterly,
            semiAnnually: plan.plan?.discount_semi_annual,
            annually: plan.plan?.discount_yearly,
        };
      
      const planWithPeriodAndPrice = {
          ...plan.plan,
          billingPeriod: plan.duration,
        //   finalprice: plan.price ,
        // finalprice:priceOptions[plan.duration] ? priceOptions[plan.duration]: discountOptions[plan.duration] ,
        // welcome_offer_price:priceOptions[plan.duration] ? priceOptions[plan.duration]: discountOptions[plan.duration]  ,
        price:priceOptions[plan.duration] ? priceOptions[plan.duration]: discountOptions[plan.duration]  ,
        price_discount: plan.price ,
        welcome_offer_plan:true
      };
      console.log(planWithPeriodAndPrice)

      dispatch(addToCart(planWithPeriodAndPrice));
      setSelectedPlanId(plan.id);
      localStorage.setItem('selectedPlanId', plan.plan.id);
      // console.log(planWithPeriodAndPrice)
      navigate('cart')
      localStorage.removeItem('popupClosed');
    };

    if (!data) {
        return   <div
        className={`fixed w-fill inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-1000 ${click ? 'hidden' : ''}`}
    >
        <div className="bg-white md:w-3/6 lg:w-2/6 w-full rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                    onClick={handleImageClick}
                >
                    Close
                </button>
            </div>

            <div className="flex flex-col items-center space-y-4">
                {isLoading ? (
                  <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                      <Loading />
                  </div>                                
                  ) : (
                    <div
                    className={`cursor-pointer w-full rounded-lg text-center bg-gray-100 shadow-lg p-6 transform transition-all duration-300 hover:scale-105`}
                >
                    <h2 className="text-2xl font-bold text-mainColor mb-4">
                        You currently do not have any active plans
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Explore our options and choose a plan that suits your needs today!
                    </p>
                    <div className="w-full flex justify-center">
                        <Link to="subscription">
                            <ButtonAdd
                                Text="Buy Plan"
                                isWidth="true"
                                BgColor="mainColor"
                                Color="white"
                                iconColor="white"
                                className="px-6 py-3 rounded-lg"
                            />
                        </Link>
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
    }

  return (
    <>
        {userPlanId === null? (
            (() => {
                return (
                    <div
                        className={`fixed w-full inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-1000 ${click ? 'hidden' : ''}`}
                    >
                        <div className="bg-white md:w-3/6 lg:w-2/6 w-full rounded-lg shadow-lg p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-1xl font-bold">{t("Select Language")}</h2>
                                <button
                                    className="bg-blue-500 w-fit text-white px-2 py-2 rounded-lg"
                                    onClick={handleLanguageSelect}
                                >
                                    {t("Change Language")}
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                                    onClick={handleImageClick}
                                >
                                    {t("Close")}
                                </button>
                            </div>

                            <div className="flex flex-col items-center space-y-4">
                                {isLoading ? (
                                  <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                                      <Loading />
                                  </div>                                
                                  ) : (
                                    <div
                                        className={`cursor-pointer w-full rounded-lg text-center shadow-lg transform transition-all duration-300 hover:scale-105 ${select === 'English' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                    >
                                        <div className="overflow-hidden rounded-lg">
                                            <img
                                                src={i18n.language === "en"? data.en_image_link : data.ar_image_link}
                                                alt="Plan Image"
                                                className="w-full h-56 object-fit rounded-lg transition-transform duration-300 hover:scale-110"
                                            />
                                        </div>

                                        <div
                                            key={data.id}
                                            className={`relative p-6 text-mainColor shadow-md text-xl rounded-lg border border-gray-200 hover:shadow-lg transition-all`}
                                        >
                                {/* {selectedPlanId != data.plan?.id && ( */}
                                    <button
                                    onClick={() => handleAddToCart(data)}
                                    className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform bg-mainColor text-white hover:bg-blue-700
                                    hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor`}
                                    >
                                    {t("Add to Cart")}
                                    </button>
                                {/* )} */}

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()
        ) : null}
    </>
);

          
};

export default UserSelect;
