import { useTranslation } from "react-i18next";
import logo from "../../../public/Images/LogoImage.png";
import Logo from '../../assets/Images/WhiteLogo'
const ContactSection = ({id}) => {
  const {t} = useTranslation()
    return (
      <section id={id} className="py-16 bg-mainColor text-secoundColor shadow-custom">
      {/* Section Title */}
      <div className="flex justify-center items-center text-center flex-col">
        <h2 className="text-3xl font-bold text-center mb-4">
          {t("We are happy to answer your questions at any time.")}
        </h2>
    
        {/* Description Text */}
        <p className="text-center text-lg text-gray-200 w-[50%] mb-8">
          {t("Your opinion matters to us. Please feel free to reach out with any questions or concerns. We're committed to providing prompt responses.")}
        </p>
      </div>
    
      {/* Form and Image Container */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center max-w-6xl gap-6 mx-auto">
        {/* Left Section: Form */}
        <div className="w-full lg:w-1/2 space-y-4">
          <form className="space-y-6 p-8 rounded-lg shadow-md bg-mainColor">
            {/* Full Name */}
            <div className="flex flex-col">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="border-b bg-transparent border-b-gray-300 p-3 focus:outline-none focus:ring-2"
                placeholder={t("Enter your full name")}
              />
            </div>
    
            {/* Email */}
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                className="border-b bg-transparent border-b-gray-300 p-3 focus:outline-none focus:ring-2"
                placeholder={t("Enter your email")}
              />
            </div>
    
            {/* Phone Number */}
            <div className="flex flex-col">
              <input
                type="text"
                id="phone"
                name="phone"
                className="border-b bg-transparent border-b-gray-300 p-3 focus:outline-none focus:ring-2"
                placeholder={t("Enter your phone number")}
              />
            </div>
    
            {/* Description */}
            <div className="flex flex-col">
              <textarea
                id="description"
                name="description"
                className="border-b bg-transparent border-b-gray-300 p-3 focus:outline-none focus:ring-2"
                placeholder={t("Write your message or inquiry")}
                rows="4"
              ></textarea>
            </div>
    
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-secoundColor text-mainColor font-semibold rounded-lg focus:outline-none"
            >
              {t("Send")}
            </button>
          </form>
        </div>
    
        {/* Right Section: Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
         <Logo/>
        </div>
      </div>
    </section>
  
    
    );
  };
  
  export default ContactSection;
  