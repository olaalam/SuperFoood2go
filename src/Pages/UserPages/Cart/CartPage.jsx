import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateCartItem ,removeFromCart} from '../../../Redux/CartSlice.js';
import axios from 'axios';
import { useAuth } from "../../../Context/Auth";
import Loading from '../../../Components/Loading.jsx';
import { useTranslation } from 'react-i18next';
import { convertNumberToArabic } from '../../../Components/convert_number';

const CartPage = () => {
  const auth = useAuth();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({});
  // const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const {t,i18n} = useTranslation()

  const fetchData = async () => {
    setIsLoading(true);
        try {
        const response = await axios.get('https://clientbcknd.food2go.online/user/v1/welcome_offer', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
          });
      if (response.status === 200) {
        console.log(response.data.welcome_offer)
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

  // useEffect(() => {
  //   const storedTotal = localStorage.getItem('totalAfterDiscount');
  //   if (storedTotal) {
  //     setPromoDiscount(JSON.parse(storedTotal)); // Parsing the value if it's stored as a string
  //   }
  // }, []); 

  // const calculateTotal = () => {
  //   return cartItems
  //     .reduce((total, item) => total + (item.finalprice || item.price || 0), 0)
  //     .toFixed(2);
  // };


  // Calculate total price including setup fees
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price;
      const setupFees = item.setup_fees || 0;  // Ensure setup fees are considered
      return total + (price || 0) + setupFees;
    }, 0).toFixed(2);
  };

  // Calculate discount including setup fees for each product
  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price_discount ?item.price_discount : item.price;
      const setupFees = item.setup_fees || 0;  // Ensure setup fees are considered
      return total + (price || 0) + setupFees;
    }, 0).toFixed(2);
  };
  

  const handleApplyPromo = async () => {
    if (!promoCode) {
      auth.toastError("Please enter a promo code.");
      return;
    }
    setIsLoading(true);

    const formattedData = {
      code: promoCode,
      plan: cartItems
        .filter((item) => item.type=== "plan")
        .map((item) => ({
          plan_id: item.id,
          duration: item.billingPeriod,
          price: item.price|| 0,
          price_discount: item.price_discount ? item.price_discount: item.price|| 0,
          fees:item.setup_fees,
        })),
      extra: cartItems
        .filter((item) => item.type=== "extra")
        .map((item) => ({
          extra_id: item.id,
          duration: item.billingPeriod,
          price: item.price,
          price_discount: item.price_discount ? item.price_discount: item.price|| 0,
          fees:item.setup_fees,
        })),
      domain: cartItems
      .filter((item) => item.type=== "domain")
      .map((item) => ({
        domain_id: item.id,
        price: item.price,
        price_discount: item.price_discount ? item.price_discount: item.price|| 0,
      })),
    };

    try {
      const response = await axios.post(
        " https://clientbcknd.food2go.online/user/v1/promocode",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setPromoDiscount(response.data.total); // Extract the discount
        // setDiscount(discount); // Update the discount state
  
        // const newTotal = calculateTotal() - discount; // Calculate the new total price after discount
        // setDiscountedPrice(newTotal); // Update the state with the discounted total
  
        auth.toastSuccess(`Promo code applied!`);
  
        // Store the total after discount in local storage
        // localStorage.setItem("totalAfterDiscount", response.data.total);
  
        setPromoCode(""); // Reset the promo code input
      } else {
        auth.toastError("Failed to apply promo code. Please try again.");
      }

      // if (response.status === 200) {
      //   console.log(response.data)
      //   const { discount } = response.data; // Extract the discount
      //   setDiscount(discount); // Update the discount state
      //   const newTotal = totalPrice - discount; // Calculate the discounted total
      //   setDiscountedPrice(newTotal); // Update state with the new total
      //   auth.toastSuccess(`Promo code applied! You saved ${discount} EGP.`);
      //   setPromoCode("");
      // } else {
      //   auth.toastError("Failed to apply promo code. Please try again.");
      // }
    } catch (error) {
      console.error("Error applying promo code:", error);
      auth.toastError("Invalid promo code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBillingPeriodChange = (itemId, newPeriod, item) => {


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

    setPromoCode("");  // Clear the promo code
    setPromoDiscount(null);  // Reset the promo discount to use the regular discount

    dispatch(updateCartItem({ id: itemId, type: item.type, updatedItem }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
    
  
    if (item.type === "plan") {
      localStorage.removeItem('selectedPlanId');
    } else if (item.type === "domain") {
      localStorage.removeItem('selectedDomainId');
    } else if (item.type === "extra") {
      // Retrieve the array from localStorage
      const selectedProductIds = JSON.parse(localStorage.getItem('selectedProductIds')) || [];
      
      // Remove the specific id from the array
      const updatedProductIds = selectedProductIds.filter(id => id !== item.id);
  
      // Update the array in localStorage
      if (updatedProductIds.length > 0) {
        localStorage.setItem('selectedProductIds', JSON.stringify(updatedProductIds));
      } else {
        localStorage.removeItem('selectedProductIds'); // Remove key if the array is empty
      }

    setPromoCode("");  // Clear the promo code
    setPromoDiscount(null);  // Reset the promo discount to use the regular discount
    }
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
    setPromoCode("");  // Clear the promo code
    setPromoDiscount(null);  // Reset the promo discount to use the regular discount
  };

  const getBillingPeriodLabel = (billing) => {
    const billingPeriodMap = {
      monthly: t("Monthly"),
      quarterly: t('3 Months'),
      semiAnnually: t('6 Months'),
      annually: t('Yearly'),
    };
  
    return billingPeriodMap[billing] || '';
  };

  const handleRemovePromo = () => {
    setPromoCode("");  // Clear the promo code
    setPromoDiscount(null);  // Reset the promo discount to use the regular discount
  };  
  
  const totalPrice = calculateTotal();
  const discountPrice = calculateDiscount();


  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
}    
  
if (!data) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No plans data available</div>;
}


  return (

  <div className='flex flex-col bg-gray-50 w-full p-4 xl:p-4'>
    <div>
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">{t("Shopping Cart")}</h1>
    </div>
    <div className="xl:container w-full m-0 xl:mx-auto flex flex-wrap gap-4 lg:flex-nowrap">
      {/* Left Section */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border-b border-gray-200 py-4 last:border-none"
              >
                <div className="flex md:flex-row sm:flex-col gap-5 justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium text-[#9E090F]">
                      {t("Product Type")} : {item.type}
                    </h3>
                    <h3 className="text-lg font-medium text-[#9E090F]">
                      {t("Product Name")} : {item.name}
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base text-mainColor">
                      <span className="font-semibold">{t("One-time setup fees")} : </span> {convertNumberToArabic(item.setup_fees, i18n.language) || 0} {t("EGP")}
                    </p>
                    {item.welcome_offer_price ? (
                      <p className="text-base text-mainColor font-semibold">
                        <span>{t("subscription for")} {getBillingPeriodLabel(item.billingPeriod)}:</span> {convertNumberToArabic(item.welcome_offer_price) || 0} {t("EGP")}
                      </p>
                    ) : (
                      <p className="text-base text-mainColor font-semibold">
                        <span>{t("subscription for")} {getBillingPeriodLabel(item.billingPeriod)}:</span> {convertNumberToArabic(item.price, i18n.language) || 0} {t("EGP")}
                      </p>
                    )}
                    {!item.welcome_offer_plan && (
                      <p className="text-base text-red-500 font-semibold">
                        <span>{t("discounted subscription for")} {getBillingPeriodLabel(item.billingPeriod)}:</span> {convertNumberToArabic((item.price) - (item.price_discount || 0), i18n.language) || 0} {t("EGP")}
                      </p>
                    )}
                    {item.welcome_offer_plan && (
                      <p className="text-base text-green-600 font-semibold">
                        {t("price in welcome offer:")} {convertNumberToArabic(item.price_discount) || 0} {t("EGP")}
                      </p>
                    )}
                  </div>
                </div>
                {item.type === "plan" && !item.welcome_offer_plan && (
                  <div className="flex flex-wrap items-center mt-3 sm:mt-4">
                    <label className="text-sm font-semibold text-gray-600 mr-3">
                      {t("Billing Period:")}
                    </label>
                    <select
                      value={item.billingPeriod || "monthly"}
                      onChange={(e) =>
                        handleBillingPeriodChange(item.id, e.target.value, item)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="monthly">{t("monthly")}</option>
                      <option value="quarterly">{convertNumberToArabic(3, i18n.language)} {t("months")}</option>
                      <option value="semiAnnually">{convertNumberToArabic(6, i18n.language)} {t("months")}</option>
                      <option value="annually">{t("Yearly")}</option>
                    </select>
                  </div>
                )}
                {item.type === "extra" && item.status === "recurring" && (
                  <div className="flex flex-wrap items-center mt-3 sm:mt-4">
                    <label className="text-sm font-semibold text-gray-600 mr-3">
                      {t("Billing Period:")}
                    </label>
                    <select
                      value={item.billingPeriod || "monthly"}
                      onChange={(e) =>
                        handleBillingPeriodChange(item.id, e.target.value, item)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="monthly">{t("monthly")}</option>
                      <option value="quarterly">{convertNumberToArabic(3, i18n.language)} {t("months")}</option>
                      <option value="semiAnnually">{convertNumberToArabic(6, i18n.language)} {t("months")}</option>
                      <option value="annually">{t("Yearly")}</option>
                    </select>
                  </div>
                )}
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-red-500 font-semibold hover:underline"
                  >
                    {t("Remove")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">{t("Your cart is empty.")}</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleClearCart}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition"
            >
              {t("Clear Cart")}
            </button>
            <Link
              to="../checkout"
              state={{ cartItems, totalPrice, discountPrice , promoDiscount }}
              className="flex-1"
            >
              <button className="w-full bg-mainColor  text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition">
                {t("Proceed to Checkout")}
              </button>
            </Link>
          </div>
        )}
      </div>

    
      {/* Right Section */}
    <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-mainColor">{t("Order Summary")}</h2>
      <div className="mt-6">
        <p className="text-xl font-semibold text-mainColor">
          {t("Total Price")} : <span className="font-semibold text-mainColor">{convertNumberToArabic(totalPrice, i18n.language)} {t("EGP")}</span>
        </p>

        <p className="text-xl font-semibold text-red-500">
          {t("Discount")} : <span className="font-semibold text-red-500">{convertNumberToArabic(totalPrice - discountPrice, i18n.language)} {t("EGP")}</span>
        </p>

        <p className="text-xl font-semibold text-green-600">
          {t("Total After Discount")} : <span className="font-semibold text-green-600">{convertNumberToArabic(promoDiscount ? promoDiscount : discountPrice ? discountPrice : totalPrice, i18n.language)} {t("EGP")}</span>
        </p>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder={t("Enter promo code")}
          className="border-2 border-mainColor p-3 w-full rounded-md text-base focus:ring-2 focus:ring-mainColor focus:outline-none"
        />
        <button
          onClick={handleApplyPromo}
          className="mt-4 bg-mainColor text-white py-3 rounded-md w-full  transition duration-300"
        >
          {t("Apply Promo Code")}
        </button>
      </div>
    </div>

    </div>
  </div>
  
  
  );
};

export default CartPage;
