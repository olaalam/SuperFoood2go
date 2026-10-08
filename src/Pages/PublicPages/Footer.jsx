import { useTranslation } from "react-i18next";
import logo from "../../../public/Images/logo white.png";
import payment from '../../assets/Images/assets/img/Payment.png'
import Vodafone from '../../assets/Images/assets/img/Vodafone.png'
import visa from '../../assets/Images/assets/img/visa.png'
import instapay from '../../assets/Images/assets/img/instapay.png'
import mastercard  from '../../assets/Images/assets/img/mastercard.png'
import Logo from '../../assets/Images/WhiteLogo'
const Footer = () => {
  const {t} = useTranslation()
    return (
      <footer className="bg-mainColor  border-t-2 border-thirdColor text-secoundColor text-start py-12 px-6">
      {/* Footer Container */}
      <div className="">
      <div className="max-w-screen-xl  flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        {/* Left Section: Logo */}
        <div className="flex items-center justify-start gap-6 w-[20%] ">
        <Logo/>
        </div>
    
        {/* Middle Section: Contact Info */}
        <div className="flex flex-col items-start  w-full md:w-1/5">
          <h2 className="text-2xl font-bold text-center md:text-start mb-2">{t("Contact Us")}</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-2">
              <span className="font-semibold">{t("Phone Number")}</span>
              <span>01111771103</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-semibold">{t("WhatsApp")}</span>
              <span>01111771103</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-semibold">{t("Email")}</span>
              <span>info@wegostores.com</span>
            </li>
          </ul>
        </div>
    
        {/* Right Section: Company Links */}
        <div className="flex flex-col items-start  w-full md:w-1/5">
          <h2 className="text-2xl font-bold mb-4">{t("Company")}</h2>
          <ul className="space-y-4">
            <li>
              <a href="#section1" className="cursor-pointer underline hover:text-accent transition">{t("Home")}</a>
            </li>
            <li>
              <a href="#plan" className="cursor-pointer underline hover:text-accent transition">{t("Plan")}</a>
            </li>
            <li>
              <a href="#contactUs" className="cursor-pointer underline hover:text-accent transition">{t("Contact Us")}</a>
            </li>
          </ul>
        </div>

    
      </div>

      <div className="flex gap-4 items-center ml-10 mt-6">
            {/* Visa */}
            <div
              onClick={() => window.location.href = "https://www.visa.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-secoundColor shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105 hover:bg-accent"
            >
              <img
                src={visa}
                alt="Visa"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
    
            {/* Instapay */}
            <div
              onClick={() => window.location.href = "https://www.instapay.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-secoundColor shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105 hover:bg-accent"
            >
              <img
                src={instapay}
                alt="Instapay"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
    
            {/* Mastercard */}
            <div
              onClick={() => window.location.href = "https://www.mastercard.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-secoundColor shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105 hover:bg-accent"
            >
              <img
                src={mastercard}
                alt="Mastercard"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
    
            {/* Vodafone */}
            <div
              onClick={() => window.location.href = "https://www.vodafone.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-secoundColor shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105 hover:bg-accent"
            >
              <img
                src={Vodafone}
                alt="Vodafone"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
          </div>
      </div>
    
      {/* Footer Bottom Section */}
      <div className="border-t border-gray-600 mt-8 pt-4 flex items-center justify-center">
        

       
    
          {/* Right: Copyright */}
          <p className="text-secoundColor text-sm sm:text-base mt-4 sm:mt-0">
            {t("©2024. All rights reserved.")}
          </p>
      
      </div>
    </footer>
    
    
    );
  };
  
  export default Footer;
  