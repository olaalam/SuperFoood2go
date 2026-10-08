import React, { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ImageLogo from "../../../public/Images/LogoImage.png";
import axios from 'axios';
import { useAuth } from '../../Context/Auth';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';
import Logo from '../../assets/Images/LoginBackground'
const SignUpPage =()=>{
    // console.log('auth.user', auth.user)
    const [show, setShow] = useState(false);
    const [plan, setPlan] = useState('demo');
    const [billingType, setBillingType] = useState('');
    const [data, setData] = useState(null);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    // const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    
    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [apiCode, setApiCode] = useState(null);
    const [verificationError, setVerificationError] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (data) {
          console.log('Calling auth.login with data:', data); // Debugging line
          auth.login(data); // Call auth.login with the updated data
    
          setIsLoading(false);
        //   navigate("/dashboard", { replace: true });

        if (type === "user") {
        navigate("/dashboard_user", { replace: true });
        }
        }
      }, [data]);

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email)
    
    // Validation Checks
    if (phone.length < 11) {
        setError("Phone number must be at least 11 characters.");
        return;
    }

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
        setError("Password must include letters, numbers, and special characters.");
        return;
    }

    if (password !== confPassword) {
        setError("Passwords do not match.");
        return;
    }

    setError("");
    setIsLoading(true);

    try {
        // Send email to Code API
        const response = await axios.post(
            " https://clientbcknd.food2go.online/user/v1/signUp/code",
            { email },
            { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
            auth.toastSuccess('Code sent to your email successfully!');
            setApiCode(response.data.code);
            setIsModalOpen(true);
          } else {
            setError("Failed to send code. Please try again.");
          }
    } catch (error) {
        console.error(error.response?.data || error.message);
        auth.toastError("Error sending verification code.");
    } finally {
        setIsLoading(false);
    }
};

    const handleVerifyCode = async () => {
        setIsLoading(true); // Show loading spinner when starting the process
        try {
            // Check if the code entered matches the expected code
            if (String(verificationCode) === String(apiCode)) {
                auth.toastSuccess('Email verified successfully!');

                // Attempt to sign up the user
                const response = await axios.post(
                    " https://clientbcknd.food2go.online/user/v1/signUp",
                    { name, phone, email, password, conf_password: confPassword },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (response.status === 200) {
                    const userData = {
                      ...response.data.user,
                      roles: ['user'] // Assuming type represents the user's role
                    };
                    setError('');
                    setIsModalOpen(false);
                    setData(userData);
                    setType(response.data.user.role);
                    console.log("response", response);
                    console.log("response role", response.data.user.role);
            
                  } else {
                    auth.toastError('Unexpected error occurred during sign-up.');
                    setError('Failed to post data');
                    console.log("error", error);
                    setIsLoading(false)
                  }
            } else {
                // Handle incorrect code
                auth.toastError("The code you entered is incorrect.");
                setVerificationCode(''); // Clear the code field
                return; // Stop further execution
            }
        } catch (error) {
            console.log(error)
            // Handle errors during sign-up
            setIsModalOpen(false); // Close modal if there was an error
            const errors = error.response?.data?.["signUp.errors"];

            if (errors) {
                if (errors.email?.includes('The email has already been taken.')) {
                    auth.toastError('The email has already been taken.');
                } else if (errors.phone?.includes('The phone has already been taken.')) {
                    auth.toastError('The phone has already been taken.');
                } else {
                    auth.toastError('Unexpected error occurred.');
                }
            } else {
                // Generic error message if no specific error response
                auth.toastError('Error posting data!');
            }
            
            console.log('Error details:', error.response?.data || error.message); // Log the error details
        } finally {
            setIsLoading(false); // Hide loading spinner
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

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return(
        <>
        <div className="loginPage flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full bg-mainColor text-secoundColor">

            {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gradient-to-t from-mainColor to-mainColor rounded-lg shadow-2xl w-full max-w-md p-8 animate-fade-in transform scale-95 hover:scale-100 transition-all duration-300 relative">
                {/* Close button (X) */}
                <button
                    onClick={() => setIsModalOpen(false)} // This closes the modal when clicked
                    className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 focus:outline-none"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">Enter Verification Code</h2>
                <input
                    type="text"
                    placeholder="Enter your code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full text-2xl text-gray-900 px-4 py-3 mb-4 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-500 transition-all"
                />
                {verificationError && (
                    <p className="text-sm text-red-400 mb-4 text-center">{verificationError}</p>
                )}
                <div className="flex justify-between space-x-4">
                    <button
                    onClick={handleVerifyCode}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition-all ease-in-out duration-200 shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                    Verify
                    </button>
                    <button
                    onClick={handleResendCode}
                    className="bg-transparent border-2 border-gray-200 text-gray-200 px-6 py-3 rounded-lg w-full hover:bg-gray-200 hover:text-gray-900 transition-all ease-in-out duration-200"
                    >
                    Resend Code
                    </button>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                    onClick={() => setIsModalOpen(false)} // This will also close the modal when clicked
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 w-full transition-all ease-in-out duration-200"
                    >
                    Cancel
                    </button>
                </div>
                </div>
            </div>
            )}
            <div className="w-full flex justify-center">
                <form className="w-full sm:w-10/12 flex flex-col items-start justify-center gap-5" onSubmit={handleSubmit}>
                <div className='flex w-full flex-col text-secoundColor font-bold gap-8 text-4xl lg:text-5xl'>
                    <h1>Sign up to Food2Go</h1>
                    <h1 className='text-3xl lg:text-4xl'>Welcome</h1>
                </div>

                {/* Two Inputs in One Row - Name and Phone */}
                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    </div>
                    <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    </div>
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

                 {/* Address Input */}
                 {/* <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Address"
                    className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                </div> */}

                <div className="flex flex-col md:flex-row gap-5 w-full">
                {/* Password Input */}
                <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {showPassword ? (
                                    <IoMdEye
                                        className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <IoMdEyeOff
                                        className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                </div>

                {/* Confirm Password Input */}
                <div className="relative w-full">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        required
                    />
                    {showConfirmPassword ? (
                        <IoMdEye
                            className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        />
                    ) : (
                        <IoMdEyeOff
                            className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        />
                    )}
                </div>

            </div>

                {/* Error Handling */}
                {/* {error && <div className="w-full text-red-500 text-center text-xl mb-4 font-bold">{error}</div>} */}
                {error && (
                <div className="w-full text-red-500 text-center text-lg p-4 bg-red-100 border border-red-500 rounded-md">
                    <strong>{error}</strong>
                </div>
                )}

                {/* Submit Button */}
                {/* <button
                    type="submit"
                    className="w-full mt-5 text-center text-3xl font-medium px-6 py-3 text-mainColor bg-secoundColor rounded-md"
                    disabled={isLoading}
                >
                    SignUp                
                </button> */}

                    <button
                        type="submit"
                        className={`w-full mt-10 text-center text-3xl font-medium px-6 py-3 text-mainColor bg-secoundColor rounded-md transition-all duration-200 ease-in-out 
                            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "hover:shadow-lg hover:scale-105 active:scale-95"}
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "SignUp"}
                    </button>


                <div className='flex flex-col lg:flex-row gap-3 text-2xl font-medium'>
                    <p>I have an account?</p>
                    <Link to="/" className='underline'>
                    Log In
                    </Link>
                </div>
                <div className="flex items-center gap-2 text-xl">
                <input
                    type="checkbox"
                    id="termsCheckbox"
                    className="w-4 h-4 accent-blue-500"
                />
                <label htmlFor="termsCheckbox" className="text-white">
                    I agree to the{" "}
                    <Link
                    to="/terms_condition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline hover:text-blue-400"
                    >
                    Terms and Conditions
                    </Link>.
                </label>
                </div>

                </form>
            </div>
            <div className="w-[50%] flex justify-center">
              <Logo/>            
            </div>
        </div>
        </>
    )
    }

    export default SignUpPage;
