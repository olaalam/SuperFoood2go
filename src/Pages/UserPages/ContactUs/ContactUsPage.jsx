import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const ContactUsPage = () => {
  const phoneNumber = "+01018150150"; // Replace with your phone number
  const email = "Support@wegostores.com"; // Replace with your email
  const whatsappNumber = "+01018150150"; // Replace with your WhatsApp number
  const {t} = useTranslation();
  // Handle Phone Call
  const handlePhoneCall = () => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  // Handle Phone Copy
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success("Phone number copied to clipboard!");
  };

  // Handle WhatsApp Redirection
  const handleWhatsApp = () => {
    const formattedNumber = whatsappNumber.replace(/\+/g, ""); // Remove "+"
    window.open(`https://wa.me/${formattedNumber}`, "_blank");
  };

  // Handle Email Redirection
  const handleEmail = () => {
    window.open(`mailto:${email}`, "_blank");
  };

  return (
    // <div className="w-full bg-gray-50 flex items-center justify-center px-4 py-8">
    //   <div className="bg-white w-full shadow-xl rounded-lg p-8">
    //     <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
    //       {t("Get in Touch with Us")}
    //     </h1>
    //     <p className="text-center text-xl text-gray-600 mb-8">
    //       {t("We’re here to help! Reach out via phone, WhatsApp, or email.")}
    //     </p>
    //     <div className="space-y-6">
    //       {/* Phone */}
    //       <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition">
    //         <div className="flex items-center space-x-4">
    //           <FaPhoneAlt className="text-blue-600 text-3xl" />
    //           <span className="text-gray-800 font-medium text-xl">{phoneNumber}</span>
    //         </div>
    //         <div className="flex mt-4 sm:mt-0 space-x-4">
    //         <button
    //             onClick={handleCopyPhone}
    //             className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition"
    //           >
    //             <FaArrowRight className="text-gray-600" />
    //             {t("Copy Number")}
    //           </button>
    //           <button
    //             onClick={handlePhoneCall}
    //             className="bg-blue-600 px-4 py-2 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
    //           >
    //             <FaPhoneAlt className="text-lg" />
    //             {t("Call Now")}
    //           </button>
    //         </div>
    //       </div>

    //       {/* WhatsApp */}
    //       <div
    //         onClick={handleWhatsApp}
    //         className="flex items-center justify-between p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
    //       >
    //         <div className="flex items-center space-x-4">
    //           <FaWhatsapp className="text-green-600 text-3xl" />
    //           <span className="text-gray-800 font-medium text-xl">{t("Chat on WhatsApp")}</span>
    //         </div>
    //         <button className="bg-green-600 px-4 py-2 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
    //           <FaArrowRight className="text-lg" />
    //           {t("Chat Now")}
    //         </button>
    //       </div>

    //       {/* Email */}
    //       <div
    //         onClick={handleEmail}
    //         className="flex items-center justify-between p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
    //       >
    //         <div className="flex items-center space-x-4">
    //           <FaEnvelope className="text-yellow-600 text-3xl" />
    //           <span className="text-gray-800 font-medium text-xl">{email}</span>
    //         </div>
    //         <button className="bg-yellow-600 px-4 py-2 text-white rounded-lg flex items-center gap-2 hover:bg-yellow-700 transition">
    //           <FaArrowRight className="text-lg" />
    //           {t("Send Email")}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full bg-gray-50 flex items-center justify-center px-4 py-6">
  <div className="bg-white w-full max-w-4xl shadow-xl rounded-lg p-6">
    <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
      {t("Get in Touch with Us")}
    </h1>
    <p className="text-center text-sm sm:text-xl text-gray-600 mb-8">
      {t("We’re here to help! Reach out via phone, WhatsApp, or email.")}
    </p>
    <div className="space-y-6">
      {/* Phone */}
      <div className="flex flex-col xl:flex-row gap-2 items-center sm:justify-between p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          <FaPhoneAlt className="text-blue-600 text-3xl" />
          <span className="text-gray-800 font-medium text-lg sm:text-xl">{phoneNumber}</span>
        </div>
        <div className="flex flex-row mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleCopyPhone}
            className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition"
          >
            <FaArrowRight className="text-gray-600" />
            {t("Copy Number")}
          </button>
          <button
            onClick={handlePhoneCall}
            className="bg-blue-600 px-4 py-2 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FaPhoneAlt className="text-lg" />
            {t("Call Now")}
          </button>
        </div>
      </div>

      {/* WhatsApp */}
      <div
        onClick={handleWhatsApp}
        className="flex flex-col xl:flex-row gap-2 items-center sm:justify-between p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
      >
        <div className="flex items-center space-x-4">
          <FaWhatsapp className="text-green-600 text-3xl" />
          <span className="text-gray-800 font-medium text-lg sm:text-xl">{t("Chat on WhatsApp")}</span>
        </div>
        <button className="bg-green-600 px-4 py-2 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition mt-4 sm:mt-0">
          <FaArrowRight className="text-lg" />
          {t("Chat Now")}
        </button>
      </div>

      {/* Email */}
      <div
        onClick={handleEmail}
        className="flex flex-col xl:flex-row gap-2 items-center sm:justify-between p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
      >
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-yellow-600 text-3xl" />
          <span className="text-gray-800 font-medium text-lg sm:text-xl">{email}</span>
        </div>
        <button className="bg-yellow-600 px-4 py-2 text-white rounded-lg flex items-center gap-2 hover:bg-yellow-700 transition mt-4 sm:mt-0">
          <FaArrowRight className="text-lg" />
          {t("Send Email")}
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ContactUsPage;
