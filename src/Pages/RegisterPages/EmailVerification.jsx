// import React, { useState ,useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom'
// import ImageLogo from "../../../public/Images/LogoImage.png";
// import axios from 'axios';
// import { useAuth } from '../../Context/Auth';

// const EmailVerification = () => {
//     const auth = useAuth();
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [apiCode, setApiCode] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendEmail = async (event) => {
//     event.preventDefault();
//     setError(""); // Reset any previous errors
//     if (!email) {
//       setError("Enter The Email.");
//       return;
//     }
//     setIsLoading(true); // Start loading
//     try {
//       const response = await axios.post(' https://clientbcknd.food2go.online/user/v1/signUp/code', { email });
//       if (response.status === 200) {
//         auth.toastSuccess('Code Sent To Your Email successfully!');
//         // console.log(response.data.code)
//         setApiCode(response.data.code); // Store the code from API response
//         setShowPopup(true); // Show popup for code entry
//       } else {
//         setError("Failed to send code. Please try again.");
//       }
//     } catch (err) {
//       console.error(err.response || err.message);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false); // End loading
//     }
//   };

//   const handleVerifyCode = () => {
//     if (String(code) === String(apiCode)){
//         auth.toastSuccess('Email Verifyed successfully!');
//       navigate("/signup"); // Redirect to the signup page
//     } else {
//         auth.toastError("The code you entered is incorrect.");
//         setCode('')
//     }
//   };

//   return (
//     <div className="loginPage flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full bg-mainColor text-secoundColor">
//         {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
//             <div className="bg-white shadow-2xl rounded-xl p-6 max-w-sm w-full relative transform transition-all duration-300">
//             {/* Close Button */}
//             <button
//                 onClick={() => setShowPopup(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
//             >
//                 ✕
//             </button>
            
//             {/* Modal Header */}
//             <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//                 Verify Your Code
//             </h3>
//             <p className="text-center text-gray-500 mb-6">
//                 Enter the code sent to your email to proceed.
//             </p>
            
//             {/* Input Field */}
//             <input
//                 type="text"
//                 placeholder="Enter code"
//                 className="w-full text-black border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//             />
            
//             {/* Verify Button */}
//             <button
//                 onClick={handleVerifyCode}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-300"
//             >
//                 Verify Code
//             </button>
//             </div>
//         </div>
//         )}

//         <div className="w-full flex justify-center">
//             <form className="w-full sm:w-10/12 flex flex-col items-start justify-center gap-5" onSubmit={handleSendEmail}>
//             <div className='flex w-full flex-col text-secoundColor gap-8 text-4xl lg:text-5xl'>
//                 <h1 className='font-bold'>Welcome  In WegoStores !</h1>
//                 <h1 className='text-xl lg:text-2xl text-normal'>Enter your email address below, and we will send you a verification code to confirm your identity.</h1>
//             </div>
//             {/* Email Input */}
//             <div className="relative w-full">
//             <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 />
//             </div>
//             {error && (
//                 <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}
//             <div className="flex flex-col md:flex-row gap-5 w-full">          

//         </div>
//             {/* Submit Button */}
//             <button
//                 type="submit"
//                 className="w-full mt-5 text-center text-3xl font-medium px-6 py-3 text-mainColor bg-secoundColor rounded-md"
//             >
//                 Verify                
//             </button>

//             <div className='flex flex-col lg:flex-row gap-3 text-2xl font-medium'>
//                 <p>I have an account?</p>
//                 <Link to="login" className='underline'>
//                 Log In
//                 </Link>
//             </div>
            
//             </form>
//         </div>

//         <div className="w-full flex justify-center">
//             <img
//             src={ImageLogo}
//             alt="LoginImage"
//             />              
//         </div>
//     </div>
//   );
// };



// 


// const auth = useAuth();
// const navigate = useNavigate();
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState("");
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [verificationCode, setVerificationCode] = useState("");
// const [verificationError, setVerificationError] = useState("");
// const [userDetails, setUserDetails] = useState({ name: "", phone: "", email: "", password: "" });
// const [confPassword, setConfPassword] = useState("");
// const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prev) => ({ ...prev, [name]: value }));
// };

// const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { name, phone, email, password } = userDetails;

//     // Validation Checks
//     if (phone.length < 11) {
//         setError("Phone number must be at least 11 characters.");
//         return;
//     }

//     if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
//         setError("Password must include letters, numbers, and special characters.");
//         return;
//     }

//     if (password !== confPassword) {
//         setError("Passwords do not match.");
//         return;
//     }

//     setError("");
//     setIsLoading(true);

//     try {
//         // Send email to Code API
//         await axios.post(
//             " https://clientbcknd.food2go.online/user/v1/signUp/code",
//             { email },
//             { headers: { "Content-Type": "application/json" } }
//         );

//         setIsModalOpen(true); // Open verification modal
//     } catch (error) {
//         console.error(error.response?.data || error.message);
//         auth.toastError("Error sending verification code.");
//     } finally {
//         setIsLoading(false);
//     }
// };

// const handleVerifyCode = async () => {
//     try {
//         const { email } = userDetails;

//         // Verify Code API
//         const response = await axios.post(" https://clientbcknd.food2go.online/user/v1/signUp/code", {
//             email,
//             code: verificationCode,
//         });

//         if (response.status === 200) {
//             // Sign Up API
//             const { name, phone, password } = userDetails;
//             await axios.post(
//                 " https://clientbcknd.food2go.online/user/v1/signUp",
//                 { name, phone, email, password, conf_password: confPassword },
//                 { headers: { "Content-Type": "application/json" } }
//             );

//             auth.toastSuccess("Sign Up Successful!");
//             setIsModalOpen(false);
//             navigate("/dashboard_user");
//         }
//     } catch (error) {
//         console.error(error.response?.data || error.message);
//         setVerificationError("Invalid code. Please try again.");
//     }
// };

// const handleResendCode = async () => {
//     try {
//         const { email } = userDetails;

//         await axios.post(" https://clientbcknd.food2go.online/user/v1/signUp/resend_code", { email });
//         auth.toastSuccess("New verification code sent!");
//     } catch (error) {
//         console.error(error.response?.data || error.message);
//         setVerificationError("Error resending verification code.");
//     }
// };

// 
























// export default EmailVerification;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

const EmailVerification = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [apiCode, setApiCode] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async (event) => {
    event.preventDefault();
    setError("");
    if (!email) {
      setError("Enter The Email.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(' https://clientbcknd.food2go.online/user/v1/signUp/code', { email });
      if (response.status === 200) {
        auth.toastSuccess('Code sent to your email successfully!');
        setApiCode(response.data.code);
        setShowPopup(true);
      } else {
        setError("Failed to send code. Please try again.");
      }
    } catch (err) {
      console.error(err.response || err.message);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(' https://clientbcknd.food2go.online/user/v1/signUp/code', { email });
      if (response.status === 200) {
        auth.toastSuccess('Code resent to your email successfully!');
        setApiCode(response.data.code);
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } catch (err) {
      console.error(err.response || err.message);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
    if (String(code) === String(apiCode)) {
      auth.toastSuccess('Email verified successfully!');
      navigate("/signup");
    } else {
      auth.toastError("The code you entered is incorrect.");
      setCode('');
    }
  };

  return (
    <div className="loginPage flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full bg-mainColor text-secoundColor">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white shadow-2xl rounded-xl p-6 max-w-sm w-full relative transform transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
            >
              ✕
            </button>

            {/* Modal Header */}
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Verify Your Code
            </h3>
            <p className="text-center text-gray-500 mb-6">
              Enter the code sent to your email to proceed.
            </p>


            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter code"
              className="w-full text-black border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            {/* Verify Button */}
            <button
              onClick={handleVerifyCode}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-300 mb-3"
            >
              Verify Code
            </button>

            {/* Resend Code Button */}
            <button
              onClick={handleResendCode}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium text-lg ${
                isLoading
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-gray-100 text-blue-600 hover:bg-gray-200"
              } transition-all duration-300`}
            >
              {isLoading ? "Resending..." : "Resend Code"}
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        <form
          className="w-full sm:w-10/12 flex flex-col items-start justify-center gap-5"
          onSubmit={handleSendEmail}
        >
          <div className="flex w-full flex-col text-secoundColor gap-8 text-4xl lg:text-5xl">
            <h1 className="font-bold">Welcome to WegoStores!</h1>
            <h1 className="text-xl lg:text-2xl text-normal">
              Enter your email address below, and we will send you a verification code to confirm your identity.
            </h1>
          </div>
          {/* Email Input */}
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-5 text-center text-3xl font-medium px-6 py-3 text-mainColor bg-secoundColor rounded-md"
          >
            Verify
          </button>

          <div className="flex flex-col lg:flex-row gap-3 text-2xl font-medium">
            <p>I have an account?</p>
            <Link to="/" className="underline hover:text-gray-300">
              Log In
            </Link>
          </div>
        </form>
      </div>

      <div className="w-full flex justify-center">
        <img src="/Images/LogoImage.png" alt="LoginImage" />
      </div>
    </div>
  );
};

export default EmailVerification;
