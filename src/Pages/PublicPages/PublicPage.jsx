import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/Images/logo white.png";
import HomeSec from "../../../src/assets/Images/assets/img/HomeSec.svg";
import image from "../../../src/assets/Images/assets/img/imgHo.svg";
import pc from "../../../src/assets/Images/assets/img/pc.png";
import m1 from "../../../src/assets/Images/assets/img/1.jpg";
import m2 from "../../../src/assets/Images/assets/img/2.jpg";
import m3 from "../../../src/assets/Images/assets/img/3.jpg";
import m4 from "../../../src/assets/Images/assets/img/4.jpg";
import m6 from "../../../src/assets/Images/assets/img/6.jpg";
import m7 from "../../../src/assets/Images/assets/img/7.jpg";
import m8 from "../../../src/assets/Images/assets/img/8.jpg";
import m9 from "../../../src/assets/Images/assets/img/9.jpg";
import m10 from "../../../src/assets/Images/assets/img/10.jpg";
import m11 from "../../../src/assets/Images/assets/img/11.jpg";
import Logo from '../../assets/Images/WhiteLogo'
import { FaPhoneAlt, FaBullseye, FaStar, FaHandshake, FaRocket } from "react-icons/fa";
import { Button } from "../../Components/Button";
import 'aos/dist/aos.css'; // AOS styles
import { Link, useNavigate } from "react-router-dom";
import homeImage from "../../../public/Images/homeImage.png";
import imageLanding from '../../assets/Images/assets/img/landing.png'
import { FiArrowRight } from "react-icons/fi";
import feature2 from '../../assets/Images/assets/img/features-icon-2.png'
import feature3 from '../../assets/Images/assets/img/features-icon-3.png'
import feature4 from '../../assets/Images/assets/img/features-icon-4.png'
import CustomerReviewsSlider from "./Rating";
import LearnMoreSection from "./LearnMore";
import ContactSection from "./ContactUs";
import Footer from "./Footer";
import Features from "./Features";
import Plan from "./Plan";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io"; 
import { IoNotifications } from "react-icons/io5";
import AOS from 'aos';

import FeaturesPage from "./OurFeatureData";
import { FaLightbulb, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { useTranslation } from "react-i18next";
const PublicPage = () => {
         const dropdownRef = useRef(null)
         const navigate = useNavigate()
         const {i18n,t } = useTranslation();
         const [activeLink, setActiveLink] = useState('Home'); // Default active link
         const [menuOpen, setMenuOpen] = useState(false);

         const toggleMenu = () => {
           setMenuOpen(prevState => !prevState);
         };
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
         const handleNavigate =()=>{
          navigate('/signUp')

         }
         useEffect(() => {
          // Initialize AOS with custom settings (optional)
          AOS.init({
            duration: 1000, // animation duration (milliseconds)
            easing: 'ease-in-out', // easing function
            once: false, // animation will happen only once (not repeat on scroll)
            mirror: true,
          });
        }, []);
  
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
  

  const handleClick = (label) => {
    setActiveLink(label); // Set the clicked link as active
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
<div className="bg-mainColor text-secoundColor">
  {/* Navigation Bar */}
  <nav
  className={`fixed w-full pl-3 pr-3  flex justify-between z-10 transition-all duration-300 ${
    isScrolled ? 'bg-mainColor' : 'bg-mainColor'
  }`}
>
  <div className="w-2/6 lg:w-1/4 mt-4 flex lg:flex-row text-secoundColor  items-start justify-center py-4 px-4 text-xl font-semibold">
   <div className="w-[10%]">
   <Logo/>
   </div>
    <div className="lg:flex w-4/12 items-center py-1 gap-5 justify-center text-xl font-medium mr-3 text-secoundColor hover:cursor-pointer transition-all duration-300">
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-1 justify-between text-2xl"
          onClick={handleClickOpen}
        >
          <CiGlobe className="text-secoundColor text-2xl" />
          <span className="flex items-center text-secoundColor font-medium">
            {t(i18n.language.toUpperCase())}
            <IoIosArrowDown
              className={`${open ? 'rotate-180' : 'rotate-0'} mt-1 ml-1 transition-all text-secoundColor duration-300`}
            />
          </span>
        </button>
        <div
          className={`${open ? 'block' : 'hidden'} absolute w-28 top-14 -left-3.5 bg-secoundColor rounded-xl border-2 overflow-hidden`}
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
  </div>

  {/* Navbar Links */}
  <ul className="hidden items-center lg:flex w-2/4 justify-center space-x-8 py-4 gap-3 relative">
    <li className="relative" onClick={() => handleClick('Home')}>
      <a href="#section1" className="text-2xl transition-colors">{t("Home")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
        activeLink === 'Home' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('About Us')}>
      <a href="#section2" className="text-2xl transition-colors">{t("About Us")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
        activeLink === 'About Us' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Our features')}>
      <a href="#features" className="text-2xl transition-colors">{t("Our Features")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
        activeLink === 'Our features' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Plan')}>
      <a href="#plan" className="text-2xl transition-colors">{t("Plan")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
        activeLink === 'Plan' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Contact Us')}>
      <a href="#contactUs" className="text-2xl transition-colors">{t("Contact Us")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
        activeLink === 'Contact Us' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
  </ul>

  {/* Login/SignUp buttons on Desktop */}
  <div className="hidden lg:flex items-center gap-4 py-4">
    <Link to="/">
      <button className="text-xl  text-white font-medium w-32 h-12 flex items-center justify-center border rounded-xl hover:bg-secoundColor hover:text-mainColor">
        {t("Login")}
      </button>
    </Link>
    <Link to="/signUp">
      <button className="text-xl font-medium w-32 h-12 flex items-center justify-center bg-secoundColor text-mainColor border rounded-xl hover:bg-mainColor hover:text-white">
        {t("SignUp")}
      </button>
    </Link>
  </div>

  {/* Hamburger Menu for Small Screens */}
  <div className="lg:hidden flex items-center justify-center px-4">
    <button onClick={toggleMenu}>
      <CgMenu className="text-3xl text-secoundColor" />
    </button>
  </div>
</nav>

{/* Mobile Menu */}
{menuOpen && (
  <div className="lg:hidden absolute top-0 left-0 w-full max-w-[90%] mx-auto z-50 bg-mainColor text-secoundColor py-6 rounded-lg shadow-lg">
    <div className="flex justify-end px-4">
      <button
        onClick={toggleMenu}
        className="text-xl flex justify-center items-center flex-col font-bold text-secoundColor bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition-all duration-300"
      >
        X
      </button>
    </div>
    <ul className="flex flex-col items-start space-y-6 mx-5 mt-4">
      <li onClick={() => handleClick('Home')}>
        <a href="#section1" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Home")}</a>
      </li>
      <li onClick={() => handleClick('About Us')}>
        <a href="#section2" className="text-xl hover:text-red-500 transition-colors duration-300">{t("About Us")}</a>
      </li>
      <li onClick={() => handleClick('Our features')}>
        <a href="#features" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Our Features")}</a>
      </li>
      <li onClick={() => handleClick('Plan')}>
        <a href="#plan" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Plan")}</a>
      </li>
      <li onClick={() => handleClick('Contact Us')}>
        <a href="#contactUs" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Contact Us")}</a>
      </li>
    </ul>

    {/* Login / Sign Up Buttons inside Mobile Menu */}
    <div className="flex flex-col items-start mx-5 py-2 gap-5 w-4/6 lg:w-1/4">
      <Link to="/">
        <button className="text-xl font-medium w-32 h-12 flex items-center justify-center border rounded-xl hover:bg-secoundColor hover:text-mainColor">
          {t("Login")}
        </button>
      </Link>
      <Link to="/signUp">
        <button className="text-xl font-medium w-32 h-12 flex items-center justify-center bg-secoundColor text-mainColor border rounded-xl hover:bg-mainColor hover:text-white">
          {t("SignUp")}
        </button>
      </Link>
    </div>
  </div>
)}





<section id="section1" className="h-screen flex flex-col-reverse pt-10 lg:flex-row items-center  bg-mainColor text-secoundColor w-fit">
  <div className="w-[90%] lg:w-1/1 flex flex-col items-start text-center lg:text-left  p-4">
    {/* Heading */}
    <h1 className="font-semibold text-2xl sm:text-3xl lg:text-6xl text-secoundColor mb-4">
      {t("Design Your Perfect Website in One Click!")}
    </h1>

    {/* Paragraph */}
    <p className="font-normal text-2sm sm:text-base lg:text-lg text-secoundColor mb-6 lg:mb-8 mt-4 sm:mt-6">
      {t(
        "Enjoy a fast and easy process to create a stunning website that reflects your identity, with our flexible packages ensuring you a unique experience in no time. Choose what suits you and start your digital journey with confidence!"
      )}
    </p>

    <div className="flex items-center gap-4 flex-wrap">
      {/* Button 1 */}
      <button
        onClick={() => handleNavigate()}
        className="text-sm sm:text-lg font-medium py-2 sm:py-3 px-4 sm:px-6 lg:px-8 lg:py-4 border border-secoundColor flex items-center rounded-xl bg-secoundColor text-mainColor hover:bg-blue-200 hover:text-mainColor transition-colors duration-300 w-full sm:w-auto"
      >
        {t("Explore Demo")}
        <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 ml-3 mr-3 rounded-full bg-mainColor text-secoundColor transition-transform transform group-hover:translate-x-2">
          <FiArrowRight size={18} />
        </span>
      </button>

      {/* Button 2 */}
      <button
        onClick={() => handleNavigate()}
        className="text-sm sm:text-lg font-medium py-2 sm:py-3 px-4 sm:px-6 lg:px-8 lg:py-4 flex items-center border-2 rounded-xl border-mainColor bg-secoundColor text-mainColor hover:bg-blue-200 hover:text-mainColor transition-colors duration-300 w-full sm:w-auto"
      >
        {t("Start Now")}
        <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 ml-3 mr-3 rounded-full bg-mainColor text-secoundColor transition-transform transform group-hover:translate-x-2">
          <FiArrowRight size={18} />
        </span>
      </button>
    </div>
  </div>

  <div className="relative w-full h-full lg:mt-5 mt-5 flex justify-center lg:justify-end items-end">
  <img
    src={HomeSec}
    alt="Home"
    className="w-full h-full mt-14 sm:mt-6 rounded-lg absolute bottom-[-50px]  lg:bottom-[-130px] right-0 object-cover"
  />
</div>




</section>





{/* Section 2 */}
<section id="section2"  className="h-auto flex flex-col items-start justify-start w-full text-mainColor text-3xl px-4">
  <div className="w-full">
    <div className="flex flex-col lg:flex-row justify-around items-center w-full bg-white py-10">
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-mainColor">{t("Active Subscriptions")}</h3>
        <span className="text-3xl font-bold text-mainColor">{t("100+")}</span>
      </div>
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-mainColor">{t("New Orders Count")}</h3>
        <span className="text-3xl font-bold text-mainColor">{t("200+")}</span>
      </div>
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-mainColor">{t("Websites Created")}</h3>
        <span className="text-3xl font-bold text-mainColor">{t("50+")}</span>
      </div>
    </div>

    <div className="flex bg-mainColor flex-col lg:flex-row justify-between items-start w-full py-10 mt-10 px-10">
      <div className="flex flex-col gap-6 items-start w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-white">
          {t("Let's shape the digital future, together")}
        </h1>
        <ul className="list-none text-lg text-secoundColor">
          <li className="text-xl">{t("Customer-Centric: We prioritize understanding and meeting our clients' unique needs.")}</li>
          <li className="text-xl">{t("Tailored Solutions: We design custom software solutions to exceed client expectations.")}</li>
          <li className="text-xl">{t("Comprehensive Approach: We offer more than just technology products to help clients grow.")}</li>
          <li className="text-xl">{t("Strong Partnerships: We collaborate closely with clients to build their digital presence and increase efficiency.")}</li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 h-[350px] lg:h-[400px] flex justify-center md:justify-end ">
        <img src={image} alt="Digital Future" className="w-full h-full object-cover rounded-lg " />
      </div>
    </div>
  </div>
</section>
{/* section photo screen */}

<section className="p-5 bg-secoundColor">
  {/* Header Section */}
  <div className="text-center mb-8 mt-7">
    <h1 className="text-3xl font-bold text-mainColor">{t("Explore Our Demo Site!")}</h1>
    <p className="text-mainColor mt-4">
      {t("Take A Closer Look At Our Site Experience! Explore How Our Programming Services Meet Your Needs.")}
    </p>
  </div>

  {/* Flexbox Section for Images */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {/* Column 1 */}
    <div className="space-y-4">
    <div className="h-[200px] border-4 border-mainColor rounded-lg">
        <img
          src={m1}
          alt="Column 1 Top Image"
          className="h-full w-full object-cover  shadow-md"
        />
      </div>
      <div className="h-[350px] border-4 border-mainColor rounded-lg">
        <img
          src={m2}
          alt="Column 1 Bottom Image"
          className="h-full w-full object-cover  shadow-md"
        />
      </div>
    </div>

    {/* Column 2 */}
    <div className="space-y-4">
      <div className="h-[150px] border-4 border-mainColor rounded-lg">
        <img
          src={m3}
          alt="Column 2 Top Image"
          className="h-full w-full object-cover  shadow-md"
        />
      </div>
      <div className="h-[400px]  border-4 border-mainColor rounded-lg">
        <img
          src={m4}
          alt="Column 2 Bottom Image"
          className="h-full w-full object-cover  shadow-md"
        />
      </div>
    </div>

    {/* Column 3 */}
    <div className="space-y-4">
      <div className="h-[275px] border-4 border-mainColor rounded-lg">
        <img
          src={m6}
          alt="Column 3 Top Image"
          className="h-full w-full object-cover  shadow-md"
        />
      </div>
      <div className="h-[275px] border-4 border-mainColor rounded-lg">
        <img
          src={m7}
          alt="Column 3 Bottom Image"
          className="h-full w-full object-cover shadow-md"
        />
      </div>
    </div>

    {/* Column 4 */}
    <div className="space-y-4">
      <div className="h-[200px] border-4 border-mainColor rounded-lg">
        <img
          src={m8}
          alt="Column 4 Top Image"
          className="h-full w-full object-cover  shadow-md"
        />
      </div>
      <div className="h-[350px] border-4 border-mainColor rounded-lg">
        <img
          src={m9}
          alt="Column 4 Bottom Image"
          className="h-full w-full object-cover shadow-md"
        />
      </div>
    </div>

    {/* Column 5 */}
    <div className="space-y-4">
      <div className="h-[350px] border-4 border-mainColor rounded-lg">
        <img
          src={m10}
          alt="Column 5 Top Image"
          className="h-full w-full object-cover  shadow-md"
        />
      </div>
      <div className="h-[200px] border-4 border-mainColor rounded-lg">
        <img
          src={m11}
          alt="Column 5 Bottom Image"
          className="h-full w-full object-cover shadow-md"
        />
      </div>
    </div>
  </div>
  <button
        onClick={() => handleNavigate()}
        className="text-sm sm:text-lg font-medium py-2 sm:py-3 px-4 sm:px-6 lg:px-8 lg:py-4 border border-mainColor mt-7 flex items-center rounded-xl bg-mainColor text-secoundColor hover:bg-blue-200 hover:text-mainColor transition-colors duration-300 w-full sm:w-auto"
      >
        {t("Start Explore")}
        <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 ml-3 mr-3 rounded-full bg-secoundColor text-mainColor transition-transform transform group-hover:translate-x-2">
          <FiArrowRight size={18} />
        </span>
      </button>
</section>

   {/*section  */}

   <section className="bg-mainColor mx-auto py-16 px-6">
  {/* Main Heading */}
  <h2 className="text-4xl text-secoundColor font-bold text-center mb-4">
    {t("Together, We Build the Future")}
  </h2>
  {/* Subheading */}
  <h3 className="text-2xl font-semibold text-center text-gray-300 mb-12">
    {t("of Digital Innovation")}
  </h3>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 text-secoundColor lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="flex flex-col border-b-2 items-center text-center p-6  rounded-lg shadow-md">
      <div className="text-4xl text-secoundColor mb-4">
        <FaPhoneAlt />
      </div>
      <div className="w-12 mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{t("Customer-Centric")}</h3>
      <p className="text-gray-200">
        {t("We focus on understanding and exceeding client needs.")}
      </p>
    </div>

    {/* Card 2 */}
    <div className="flex flex-col border-b-2 items-center text-center p-6  rounded-lg shadow-md">
      <div className="text-4xl text-secoundColor mb-4">
        <FaBullseye />
      </div>
      <div className="w-12 mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{t("Tailored Solutions")}</h3>
      <p className="text-gray-200">
        {t("Custom software to align perfectly with your goals.")}
      </p>
    </div>

    {/* Card 3 */}
    <div className="flex flex-col border-b-2 items-center text-center p-6 rounded-lg shadow-md">
      <div className="text-4xl text-secoundColor mb-4">
        <FaLightbulb />
      </div>
      <div className="w-12  mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{t("Innovative Technologies")}</h3>
      <p className="text-gray-100">
        {t(
          "Empowering businesses with cutting-edge solutions to stay ahead in a digital-first world."
        )}
      </p>
    </div>

    {/* Card 4 */}
    <div className="flex flex-col border-b-2 items-center text-center p-6  rounded-lg shadow-md">
      <div className="text-4xl text-secoundColor mb-4">
        <FaStar />
      </div>
      <div className="w-12  mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{t("Comprehensive Approach")}</h3>
      <p className="text-gray-100">
        {t("Beyond technology, we drive business growth.")}
      </p>
    </div>

    {/* Card 5 */}
    <div className="flex flex-col border-b-2 items-center text-center p-6 rounded-lg shadow-md">
      <div className="text-4xl text-secoundColor mb-4">
        <FaHandshake />
      </div>
      <div className="w-12  mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{t("Strong Partnerships")}</h3>
      <p className="text-gray-100">
        {t("Working closely to maximize efficiency and impact.")}
      </p>
    </div>

    {/* Card 6 */}
    <div className="flex flex-col border-b-2 items-center text-center p-6  rounded-lg shadow-md">
      <div className="text-4xl text-secoundColor mb-4">
        <FaRocket />
      </div>
      <div className="w-12  mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{t("Your Vision, Our Mission")}</h3>
      <p className="text-gray-100">
        {t(
          "Turning your ideas into impactful digital experiences with precision and expertise."
        )}
      </p>
    </div>
  </div>
</section>

 {/* Plan 4 */}
 <Plan id='plan'/>

{/* section video */}

<section className="max-w-screen-xl mx-auto py-12 px-6 flex flex-col items-center space-y-6">
  {/* Heading */}
  <h2 className="text-3xl font-bold text-center text-primary">
    {t("Learn About Our Site in Minutes")}
  </h2>

  {/* Paragraph */}
  <p className="text-lg text-center max-w-2xl text-secondary">
    {t(
      "A short video explaining how you can benefit from our programming services. Enjoy a quick tour of our site's features."
    )}
  </p>

  {/* Video */}
  <div className="w-full max-w-4xl aspect-video">
    <iframe
      src="https://www.youtube.com/embed/example-video-id?autoplay=1" // Replace with your video URL and enable autoplay
      title="Site Tour Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-lg shadow-md"
    ></iframe>
  </div>
</section>


{/* Features 6 */}

<Features id={'features'}/>
{/* section CustomerReviewsSlider  */}
<CustomerReviewsSlider/>
{/* section LearnMoreSection */}
<LearnMoreSection/>

{/* section Contact us  */}
<ContactSection id={'contactUs'}/>
<Footer/>
      {/* Sections 3 */}

      
      {/* <section  className="bg-mainColor text-secoundColor py-20 border-b"> */}
      {/* <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold">{t("What Makes Us Different?")}</h2>
        <p className="text-xl mt-4">{t("Technology experts, committed to providing you the best.")}</p>
      </div> */}

      {/* <div className="flex flex-wrap justify-center gap-10"> */}
       
        {/* <div className="bg-secoundColor text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaLightbulb className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("We bring your digital visions to life.")} </p>
        </div> */}

      
        {/* <div className="bg-secoundColor text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaCheckCircle className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("Our software is built to the highest standards.")}</p>
        </div> */}

      
        {/* <div className="bg-secoundColor text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaHeadset className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("Our support team is available around the clock.")}</p>
        </div> */}
      {/* </div>
    </section> */}


  



 






 
 






    </div>
  );
};

export default PublicPage;
