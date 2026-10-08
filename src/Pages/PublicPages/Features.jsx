import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles
import I1 from '../../../src/assets/Images/I1'
import I2 from '../../../src/assets/Images/I2'
import I3 from '../../../src/assets/Images/I3'
import I4 from '../../../src/assets/Images/I4'
import I5 from '../../../src/assets/Images/I5'
import I6 from '../../../src/assets/Images/I6'
import I7 from '../../../src/assets/Images/I7'
import I8 from '../../../src/assets/Images/I8'
import I9 from '../../../src/assets/Images/I9'
import I10 from '../../../src/assets/Images/I10'
import I11 from '../../../src/assets/Images/I11'
import I12 from '../../../src/assets/Images/I12'
import I13 from '../../../src/assets/Images/I13'
import I14 from '../../../src/assets/Images/I4'

import I15 from '../../../src/assets/Images/I15'
import I16 from '../../../src/assets/Images/I16'
import I17 from '../../../src/assets/Images/I17'
import I18 from '../../../src/assets/Images/I18'
import I19 from '../../../src/assets/Images/I19'
import I20 from '../../../src/assets/Images/I20'

import {
  FaRegThumbsUp,
  FaUsers,
  FaShoppingCart,
  FaLanguage,
  FaGift,
  FaRegClock,
  FaRegNewspaper,
  FaTools,
  FaHeart,
  FaCreditCard,
  FaPhoneAlt,
  FaSearch,
  FaStar,
  FaCommentAlt,
  FaArrowCircleDown,
  FaLock,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Features = ({id}) => {
  const featuresData = [
    { icon: <I1 />, title: "Log in via social media" },
    { icon: <I2 />, title: "Share on social media" },
    { icon: <I3 />, title: "Featured Product" },
    { icon: <I4 />, title: "Support multiple languages" },
    { icon: <I5 />, title: "Publish videos of the products" },
    { icon: <I6 />, title: "Smart Product Search" },
    { icon: <I7 />, title: "Customer Reviews" },
    { icon: <I8 />, title: "Today's Offers" },
    { icon: <I9 />, title: "Supporting multiple currencies" },
    { icon: <I10 />, title: "Product Comparison" },
    { icon: <I11 />, title: "Wishlist" },
    { icon: <I12 />, title: "Flash Sales" },
    { icon: <I13 />, title: "Dynamic Home Page" },
    { icon: <I14 />, title: "Pay with Visa cards" },
    { icon: <I15 />, title: "Smart Payment System" },
    { icon: <I16 />, title: "Responsive website" },
    { icon: <I17 />, title: "Multiple shipping methods" },
    { icon: <I18 />, title: "Online payment via credit cards" },
    { icon: <I19 />, title: "Multiple shipping methods" },
    { icon: <I20 />, title: "Online payment with credit cards" },
    
  ];
  
  const { t } = useTranslation();

  // Function to handle navigation
  useEffect(() => {
    // Initialize AOS with custom settings (optional)
    AOS.init({
      duration: 1000, // animation duration (milliseconds)
      easing: 'ease-in-out', // easing function
      once: false, // animation will happen only once (not repeat on scroll)
      mirror: true,
    });
  }, []);

  return (
    <section id={id} className="features px-2 py-5 mt-4 bg-secoundColor">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-4 mt-6 text-mainColor">{t("Our Features")}</h2>
      <p className="text-center text-xl text-mainColor mb-8">
        {t("Technology experts, committed to providing you with the best.")}
      </p>
      <div className="flex flex-wrap justify-center p-10 text-secoundColor gap-10">
        {featuresData.map((feature, index) => (
          <Link
            to='features'
            key={index}
            className="w-64 md:w-48 lg:w-1/5 p-6 bg-gray-200 border border-gray-300 rounded-lg shadow-lg"
          >
            <div className="icon flex items-center text-mainColor justify-center text-8xl w-full h-32 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-center text-mainColor text-lg font-semibold">{t(feature.title)}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Features;
