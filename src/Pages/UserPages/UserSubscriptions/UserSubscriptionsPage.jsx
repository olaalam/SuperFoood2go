import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart,updateCartItem } from '../../../Redux/CartSlice.js';
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { FaCrown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { convertNumberToArabic } from '../../../Components/convert_number';

const UserSubscriptionsPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState([]);
    const dispatch = useDispatch();
    const [billingPeriod, setBillingPeriod] = useState({});
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const navigate = useNavigate();
    const {t,i18n} = useTranslation();
    const [userData, setUserData] = useState('');

    // Fetch plans from API
    const fetchData = async () => {
        setIsLoading(true);
        try {
            let url;
            if (i18n.language === 'ar') {
                url = 'https://clientbcknd.food2go.online/user/v1/subscription?locale=ar'; // Arabic URL
            } else {
                url = 'https://clientbcknd.food2go.online/user/v1/subscription'; // Non-Arabic URL (assuming English or other)
            }
           
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
    
            if (response.status === 200) {
                console.log(response.data.plans);
                setPlans(response.data.plans);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleAddToCart = async (plan, event) => {
        if (event) event.preventDefault();
    
        setIsLoading(true);
    
        try {
            const response = await axios.post(
                ' https://clientbcknd.food2go.online/user/v1/cart/pending',
                {
                    id: plan.id, // Properly include plan.id as a key-value pair
                    type: "plan",
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'application/json', // Explicitly specify JSON content type
                    },
                }
            );
    
            const data = response.data;
    
            if (response.status === 200 && data.success === "You can buy it") {
                // Calculate price options
                const selectedPeriod = billingPeriod[plan.id] || 'monthly';
                const priceOptions = {
                    monthly: plan.monthly,
                    quarterly: plan.quarterly || plan.monthly * 3,
                    semiAnnually: plan["semi_annual"] || plan.monthly * 6,
                    annually: plan.yearly,
                };
    
                const discountOptions = {
                    monthly: plan.discount_monthly,
                    quarterly: plan.discount_quarterly,
                    semiAnnually: plan.discount_semi_annual,
                    annually: plan.discount_yearly,
                };
    
                const currentPrice = discountOptions[selectedPeriod]
                    ? discountOptions[selectedPeriod]
                    : priceOptions[selectedPeriod];
    
                const planWithPeriodAndPrice = {
                    ...plan,
                    billingPeriod: selectedPeriod,
                    price: priceOptions[selectedPeriod],
                    price_discount: discountOptions[selectedPeriod] ?  discountOptions[selectedPeriod] : priceOptions[selectedPeriod],
                };
    
                // Update cart based on the selected plan
                if (selectedPlanId == plan.id) {
                    setSelectedPlanId(null);
                    dispatch(removeFromCart(planWithPeriodAndPrice));
                    localStorage.removeItem('selectedPlanId');
                } else {
                    if (selectedPlanId !== null) {
                        const previousPlan = plans.find((p) => p.id == selectedPlanId);
                        const previousPrice = priceOptions[billingPeriod[previousPlan.id] || 'monthly'];
                        const previousPlanWithPeriodAndPrice = {
                            ...previousPlan,
                            billingPeriod: billingPeriod[previousPlan.id] || 'monthly',
                            finalprice: previousPrice + plan.setup_fees,
                        };
                        dispatch(removeFromCart(previousPlanWithPeriodAndPrice));
                        localStorage.removeItem('selectedPlanId');
                    }
                    dispatch(addToCart(planWithPeriodAndPrice));
                    setSelectedPlanId(plan.id);
                    localStorage.setItem('selectedPlanId', plan.id);
                }
            } else {
                // Toast error if success message is not "you can buy it"
                auth.toastError('Error', data?.message || 'Failed to add to cart.');
            }
        } catch (error) {
            console.error(error);
            auth.toastError(error.response.data.faild)
        } finally {
            setIsLoading(false);
        }
    };
    

    // Handle billing period change
   
    // const handleBillingPeriodChange = (planId, newPeriod) => {
        // setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
    // };

      const handleBillingPeriodChange = (itemId, newPeriod, item) => {
    
        setBillingPeriod((prev) => ({ ...prev, [itemId]: newPeriod }));

        const priceOptions = {
          monthly: item.monthly,
          quarterly: item.quarterly || item.monthly * 3,
          semiAnnually: item["semi_annual"] || item.monthly * 6,
          annually: item.yearly || item.monthly * 12,
        };
        const discountOptions = {
            monthly: item.discount_monthly,
            quarterly: item.discount_quarterly,
            semiAnnually: item.discount_semi_annual,
            annually: item.discount_yearly,
        };
    
        const updatedItem = {
          ...item,
          billingPeriod: newPeriod,
          // finalprice: priceOptions[newPeriod],
    
          // finalprice: (discountOptions[newPeriod] 
          //   ? discountOptions[newPeriod]
          //   : priceOptions[newPeriod]) + item.setup_fees,
          price: priceOptions[newPeriod],
          price_discount: discountOptions[newPeriod],
        };
    
        dispatch(updateCartItem({ id: itemId, type: item.type, updatedItem }));
      };
    

    // Set selected plan from localStorage
    useEffect(() => {
        fetchData();
        console.log(auth.user.package)
    }, [i18n.language]);

    useEffect(() => {
        const savedPlanId = localStorage.getItem('selectedPlanId');
        const savedPlan = plans.find((plan) => plan.id == savedPlanId);
        if (savedPlanId && plans.length > 0) {
            setSelectedPlanId(savedPlanId);
            // billingPeriod[savedPlanId]
        }
    }, [plans]);

    useEffect(() => {
        // If a plan is selected, add it to the cart
        if (selectedPlanId) {
            const selectedPlan = plans.find((plan) => plan.id == selectedPlanId);
            if (selectedPlan) {
                dispatch(addToCart(selectedPlan));
            }
        }
    }, [selectedPlanId, plans, dispatch]); // Ensure to run only when selectedPlanId or plans change


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
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
        };
    
      useEffect(() => {
          ProfilefetchData()
      }, []);
    


    if (isLoading) {
        return (
            <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                <Loading />
            </div>
        );
    }

    if (!plans.length) {
        return <div className="text-mainColor text-2xl font-bold flex items-center justify-center h-screen">{t("No plans data available")}</div>;
    }

    return (
        <div className="w-full p-6 flex flex-col">
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
                const selectedPeriod = billingPeriod[plan.id] || 'monthly';
                const priceOptions = {
                    monthly: plan.monthly,
                    quarterly: plan.quarterly || plan.monthly * 3,
                    semiAnnually: plan["semi_annual"] || plan.monthly * 6,
                    annually: plan.yearly || plan.monthly * 12,
                };
                const discountOptions = {
                    monthly: plan.discount_monthly,
                    quarterly: plan.discount_quarterly,
                    semiAnnually: plan.discount_semi_annual,
                    annually: plan.discount_yearly,
                };
                const currentPrice = priceOptions[selectedPeriod];
                const discountedPrice = discountOptions[selectedPeriod];
                const savings = discountedPrice ? currentPrice - discountedPrice : 0;
    
                return (
                    <div
                        key={plan.id}
                        className={`relative flex flex-col justify-between p-6 text-mainColor transition-all duration-300 ease-in-out transform rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:scale-105 
                        ${selectedPlanId == plan.id ? 'border-green-500 bg-green-100' : ''} ${plan.my_plan === true && selectedPlanId !== plan.id? 'bg-mainColor text-white' : ''}  `}
                    >
                    <div>
                        {/* Header */}
                        <h2 className="text-center font-bold text-2xl mb-4">{plan.name}</h2>
                        {/* Plan Details */}
                        <div className="space-y-4 mb-6">
                            <p className="text-sm">{plan.description}</p>
                            <p className="flex items-center gap-2"><PiStorefront size={26} /><span className="font-semibold">{t("Number of stores:")}</span> {convertNumberToArabic(plan.limet_store ,i18n.language)|| '0'}</p>
    
                            {plan.my_plan !== true && (
                                <p className="flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor' /><span className="font-semibold text-mainColor">{t("SetUp Fees:")}</span> {convertNumberToArabic(plan.setup_fees,i18n.language) || '0'} {t("EGP")}</p>
                            )}
                        </div>
    
                        {/* Billing Period */}
                        {/* <div className="flex justify-between items-center mb-4">
                            <label htmlFor={`billing-${plan.id}`} className="text-lg font-medium">{t("Billing Period:")}</label>
                            <select
                                id={`billing-${plan.id}`}
                                value={selectedPeriod}
                                onChange={(e) => handleBillingPeriodChange(plan.id, e.target.value)}
                                className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-mainColor"
                            >
                                <option value="monthly">{t("Monthly")}</option>
                                <option value="quarterly">{t("3 Months")}</option>
                                <option value="semiAnnually">{t("6 Months")}</option>
                                <option value="annually">{t("Yearly")}</option>
                            </select>
                        </div>
                    */}

<div className="flex justify-between items-center mb-4">
    <label htmlFor={`billing-${plan.id}`} className="text-lg font-medium">
        {t("Billing Period:")}
    </label>
    <select
        id={`billing-${plan.id}`}
        value={selectedPeriod}
        onChange={(e) => handleBillingPeriodChange(plan.id, e.target.value,plan)}
        className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-mainColor"
    >
        {plan.my_plan ? (
            <>
                {userData.package !== "1" && <option value="monthly">{t("Monthly")}</option>}
                {userData.package !== "3" && <option value="quarterly">{t("3 Months")}</option>}
                {userData.package !== "6" && <option value="semiAnnually">{t("6 Months")}</option>}
                {userData.package !== "yearly" && <option value="annually">{t("Yearly")}</option>}
            </>
        ) : (
            <>
                <option value="monthly">{t("Monthly")}</option>
                <option value="quarterly">{t("3 Months")}</option>
                <option value="semiAnnually">{t("6 Months")}</option>
                <option value="annually">{t("Yearly")}</option>
            </>
        )}
    </select>
</div>

                        {/* Pricing and Savings */}
                        <div className="text-center mb-4">
                            {discountedPrice ? (
                                <>
                                    <p className="text-lg line-through">{convertNumberToArabic(currentPrice,i18n.language)} {t("EGP")}</p>
                                    <p className="text-3xl font-semibold ">{convertNumberToArabic(discountedPrice,i18n.language)} {t("EGP")}</p>
                                    <p className="text-green-500 font-semibold mt-2">{t("Save")} {convertNumberToArabic(savings,i18n.language)} {t("EGP")} {t("per")} {t(selectedPeriod)}</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg text-gray-500 line-through">{priceOptions['monthly'] * (selectedPeriod === 'monthly' ? 1 : selectedPeriod === 'quarterly' ? 3 : selectedPeriod === 'semiAnnually' ? 6 : 12)} {t("EGP")} / {t("month")}</p>
                                    <p className="text-3xl font-semibold text-mainColor">{currentPrice} {t("EGP")}</p>
                                    {selectedPeriod !== 'monthly' ? (
                                        <p className="text-green-500 font-semibold mt-2">
                                            {t("Save")} {priceOptions['monthly'] * (selectedPeriod === 'quarterly' ? 3 : selectedPeriod === 'semiAnnually' ? 6 : 12) - currentPrice} {t("EGP")}
                                        </p>
                                    ): 
                                    <>
                                    <p className="text-green-500 font-semibold mt-2">
                                        {t("Save")} 0 {t("EGP")}
                                    </p>
                                    </>
                                    }
                                </>
                            )}
                        </div>
                    </div>

                        {/* Plan Buttons */}
                        <div>
                            {plan.my_plan === true ? (
                                <div className="w-full relative border rounded-lg p-4 bg-gray-50 shadow-lg">
                                    {/* "My Plan" Badge */}
                                    <div className="absolute flex items-center top-0 left-0 transform -translate-y-2 -translate-x-2 bg-mainColor text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg">
                                        <FaCrown className="text-yellow-400 mr-1" /> {t("My Plan")}
                                    </div>
    
                                    {/* Upgrade Button */}
                                    {selectedPlanId != plan.id && (
                                        <button
                                            onClick={() => handleAddToCart(plan, event)}
                                            className="w-full py-3 mt-4 font-semibold rounded-lg transition-all duration-300 transform bg-blue-800 text-white hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg"
                                        >
                                            {t("Upgrade Now")}
                                        </button>
                                    )}
    
                                    {/* Remove from Cart and Go to Cart Buttons */}
                                    {selectedPlanId == plan.id && (
                                        <div className="flex space-x-3 mt-4">
                                            <button
                                                onClick={() => handleAddToCart(plan, event)}
                                                className="w-full py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                            >
                                                {t("Remove from Cart")}
                                            </button>
                                            <button
                                                onClick={() => navigate('../cart')}
                                                className="w-full py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md"
                                            >
                                                {t("Go to Cart")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full">
                                    {/* Add to Cart Button */}
                                    {selectedPlanId != plan.id && (
                                        <button
                                            onClick={() => handleAddToCart(plan, event)}
                                            className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform 
                                            ${selectedPlanId === plan.id ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-mainColor text-white hover:bg-mainColor'} 
                                            hover:scale-105 shadow-md hover:shadow-lg`}
                                        >
                                            {t("Add to Cart")}
                                        </button>
                                    )}
    
                                    {/* Remove from Cart and Go to Cart Buttons */}
                                    {selectedPlanId == plan.id && (
                                        <div className="flex space-x-3 mt-3">
                                            <button
                                                onClick={() => handleAddToCart(plan, event)}
                                                className="w-full py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                            >
                                                {t("Remove from Cart")}
                                            </button>
                                            <button
                                                onClick={() => navigate('../cart')}
                                                className="w-full py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                            >
                                                {t("Go to Cart")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
    
                            {/* "Selected" Label */}
                            {selectedPlanId == plan.id && (
                                <div className="absolute top-0 left-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-tr-lg">
                                    {t("Selected")}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    
    );
};

export default UserSubscriptionsPage;
