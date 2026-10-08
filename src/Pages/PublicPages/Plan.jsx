import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import { FaCalendarCheck, FaCalendarAlt, FaCheckCircle, FaQuestionCircle } from "react-icons/fa"; // Import icons

const Plan = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false); // Track the toggle for monthly/annually

  const handleNavigate = () => {
    navigate("/signUp");
  };

  const handleToggle = () => {
    setIsAnnual((prevState) => !prevState);
  };

  useEffect(() => {
    // Initialize AOS with custom settings (optional)
    AOS.init({
      duration: 1000, // animation duration (milliseconds)
      easing: "ease-in-out", // easing function
      once: false, // animation will happen only once (not repeat on scroll)
      mirror: true,
    });
  }, []);

  return (
    <section id={id} className="bg-secoundColor text-mainColor py-10 px-5">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          {t("Find the plan that meets your needs")}
        </h1>
        <p className="text-base md:text-lg mt-4">
          {t("Explore our diverse plans and select the one that best suits your needs. Click")}
          <strong
            onClick={handleNavigate}
            className="ml-2 cursor-pointer text-blue-400"
          >
            {t("Start Now")}
          </strong>{" "}
          {t("to learn more.")}
        </p>
      </div>

     {/* Monthly / Annually Switch with Icon */}
<div className="flex justify-center items-center mb-8">
  <p className="font-bold">{t("Pay monthly")}</p>
  <label htmlFor="toggle" className="mx-4 relative flex items-center cursor-pointer">
    <input
      type="checkbox"
      id="toggle"
      checked={isAnnual}
      onChange={handleToggle}
      className="absolute opacity-0 w-0 h-0"
    />
    {/* Toggle Background */}
    <span
      className={`block w-12 h-6 rounded-full transition-colors ${
        isAnnual ? "bg-mainColor" : "bg-gray-300"
      }`}
    >
      {/* Toggle Knob */}
      <span
        className={`w-6 h-6 bg-white rounded-full absolute top-0 transition-transform ${
          isAnnual ? "transform translate-x-6" : "transform translate-x-0"
        }`}
      ></span>
    </span>
    {/* Toggle Icons */}
    {isAnnual ? (
      <FaCalendarCheck className="absolute left-1 top-0.5 text-mainColor" />
    ) : (
      <FaCalendarAlt className="absolute right-1 top-0.5 text-mainColor" />
    )}
  </label>
  <p className="font-bold">{t("Pay annually")}</p>
</div>


      <div className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-3 lg:justify-items-center">
        {/* Personal Plan */}
        <div className="text-secoundColor border h-auto border-mainColor bg-mainColor p-6 rounded-lg shadow-lg w-full sm:w-80 lg:w-96 relative">
          <h1 className="text-2xl font-bold text-start mb-4">{t("Personal")}</h1>
          <p className="text-start text-3xl font-semibold mb-4">
            {isAnnual ? (
              <>
                $199 <span className="text-sm">/ Year</span>
              </>
            ) : (
              <>
                $19 <span className="text-sm">/ Month</span>
              </>
            )}
          </p>
          <p className="text-center mb-4">
            {t("All the basic features to boost your freelance career")}
          </p>

          <div className="border-t border-mainColor pt-4">
            <ul className="space-y-4 text-left text-sm md:text-base">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Full Access to Landingfolio")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("100 GB Free Storage")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Unlimited Visitors")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("10 Agents")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Live Chat Support")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
            </ul>
          </div>
          <button
            onClick={handleNavigate}
            className="py-3 mt-4 w-full text-lg font-medium border rounded-b-lg bg-mainColor text-secoundColor"
          >
            {t("Start Now")}
          </button>
        </div>

        {/* Professional Plan */}
        <div className="bg-gradient-to-br from-mainColor h-auto to-gray-900 text-secoundColor p-6 rounded-lg shadow-2xl w-full sm:w-80 lg:w-96 relative">
          <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 border border-blue-100 bg-mainColor text-secoundColor text-sm md:text-lg font-semibold py-2 px-10 rounded-xl shadow-lg mb-5">
            {t("Best Seller")}
          </span>
          <h1 className="text-2xl font-bold text-start mb-4">{t("Professional")}</h1>
          <p className="text-start text-3xl font-semibold mb-4">
            {isAnnual ? (
              <>
                $499 <span className="text-sm">/ {t("Year")}</span>
              </>
            ) : (
              <>
                $49 <span className="text-sm">/ {t("Month")}</span>
              </>
            )}
          </p>
          <p className="text-center mb-4">
            {t("All the basic features to boost your freelance career")}
          </p>

          <div className="border-t border-secoundColor pt-4">
            <ul className="space-y-4 text-left text-sm md:text-base">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Full Access to Landingfolio")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("100 GB Free Storage")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Unlimited Visitors")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("10 Agents")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Live Chat Support")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
            </ul>
          </div>
          <button
            onClick={handleNavigate}
            className="py-3 mt-4 w-full text-lg font-medium border rounded-b-lg bg-mainColor text-white"
          >
            {t("Start Now")}
          </button>
        </div>

        {/* Business Plan */}
        <div className="text-mainColor border h-auto border-mainColor p-6 rounded-lg shadow-lg w-full sm:w-80 lg:w-96 relative">
          <h1 className="text-2xl font-bold text-start mb-4">{t("Business")}</h1>
          <p className="text-start text-3xl font-semibold mb-4">
            {isAnnual ? (
              <>
                $999 <span className="text-sm">/ Year</span>
              </>
            ) : (
              <>
                $99 <span className="text-sm">/ Month</span>
              </>
            )}
          </p>
          <p className="text-center mb-4">
            {t("All the basic features to boost your freelance career")}
          </p>

          <div className="border-t border-mainColor pt-4">
            <ul className="space-y-4 text-left text-sm md:text-base">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Full Access to Landingfolio")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("100 GB Free Storage")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Unlimited Visitors")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("10 Agents")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCheckCircle className="ml-2" />
                  {t("Live Chat Support")}
                </div>
                <FaQuestionCircle className="mr-2 text-gray-500" />
              </li>
            </ul>
          </div>
          <button
            onClick={handleNavigate}
            className="py-3 mt-4 w-full text-lg font-medium border rounded-b-lg bg-mainColor text-secoundColor"
          >
            {t("Start Now")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Plan;
