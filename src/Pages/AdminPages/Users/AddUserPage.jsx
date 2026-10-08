import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import CheckBox from '../../../Components/CheckBox';

const AddUserPage = () => {
    const auth = useAuth();
    const translate= new FormData();
    const [language,setLanguage]= useState('en')
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeUser, setActiveUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // set arabic
    const [name_ar, setName_ar] = useState('');
    const [phone_ar, setPhone_ar] = useState('');
    const [email_ar, setEmail_ar] = useState('');
    const [password_ar, setPassword_ar] = useState('');
    const [activeUser_ar, setActiveUser_ar] = useState('');


    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setActiveUser(isChecked ? 1 : 0);
        setActiveUser_ar(isChecked ? 1 : 0);

    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
    
        // Input validation
        if (!name) {
            auth.toastError('Please Enter the Name.');
            return;
        }
        if (!phone) {
            auth.toastError('Please Enter the Phone.');
            return;
        }
        if (!email) {
            auth.toastError('Please Enter the Email.');
            return;
        }
        if (!password) {
            auth.toastError('Please Enter the Password.');
            return;
        }
        if (!activeUser) {
            auth.toastError('Please Enter the Status.');
            return;
        }
    
        // Prepare FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('status', activeUser);
    
        setIsLoading(true);
    
        try {
            // Send data to the API
            const response = await axios.post(
                ' https://clientbcknd.food2go.online/admin/v1/users/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data', // Use multipart/form-data since we're sending FormData
                    },
                }
            );
    
            // Handle response
            if (response.status === 200) {
                auth.toastSuccess(`${language === 'en' ? 'User added successfully!' : 'تم إضافة المستخدم بنجاح!'}`);
                handleGoBack();
            } else {
                console.error('Failed to add User:', response.status, response.statusText);
                auth.toastError(`${language === 'en' ? 'Failed to add User.' : 'فشل في إضافة المستخدم.'}`);
            }
        } catch (error) {
            console.log(error);
            const errors = error.response?.data?.error;
            if (errors) {
                if (errors.email?.includes('The email has already been taken.')) {
                    auth.toastError(`${language === 'en' ? 'The email has already been taken.' : 'تم أخذ البريد الإلكتروني بالفعل.'}`);
                } else if (errors.phone?.includes('The phone has already been taken.')) {
                    auth.toastError(`${language === 'en' ? 'The phone has already been taken.' : 'تم أخذ رقم الهاتف بالفعل.'}`);
                } else {
                    auth.toastError(`${language === 'en' ? 'Unexpected error occurred.' : 'حدث خطأ غير متوقع.'}`);
                }
            } else {
                auth.toastError(`${language === 'en' ? 'Error posting data!' : 'خطأ في إرسال البيانات!'}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
       <div className="">

<form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
             <div className="w-full flex flex-wrap items-center justify-start gap-10">
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="text"
                                borderColor="mainColor"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="text"
                                borderColor="mainColor"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="text"
                                borderColor="mainColor"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="password"
                                borderColor="mainColor"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                            <span className="text-2xl text-thirdColor font-medium">Active:</span>
                            <div>
                                    <CheckBox handleClick={handleClick} />
                            </div>
                        </div>
                  </div> 
                  <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                      <div className="flex items-center justify-center w-72">
                          <Button
                              type="submit"
                              Text="Done"
                              BgColor="bg-mainColor"
                              Color="text-white"
                              Width="full"
                              Size="text-2xl"
                              px="px-28"
                              rounded="rounded-2xl"
                          />
                      </div>
                      <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                  </div>
        </form>   
       </div>     
    );
};

export default AddUserPage;
