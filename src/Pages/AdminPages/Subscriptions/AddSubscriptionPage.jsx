import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import CheckBox from '../../../Components/CheckBox';
import DropDownMenu from '../../../Components/DropDownMenu';

const AddSubscriptionPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [language,setLanguage]= useState('en')
    const translate= new FormData();
    const [userData, setrUserData] = useState([]);
    const [planData, setPlanData] = useState([]);
    const [packageData, setPackageData] = useState([{ name: 'Monthly' }, { name: '3 Months' },{ name: '6 Months' },{ name: 'Yearly' }]);

    const [selectUser, setSelectUser] = useState('Select User');
    const [selectUserId, setSelectUserId] = useState([]);
    const [openSelectUser, setOpenSelectUser] = useState(false);

    const [selectPlan, setSelectPlan] = useState('Select Plan');
    const [selectPlanId, setSelectPlanId] = useState([]);
    const [openSelectPlan, setOpenSelectPlan] = useState(false);

    const [selectPackage, setSelectPackage] = useState('Select Plan Package');
    const [selectPackageName, setSelectPackageName] = useState(null);
    const [openSelectPackage, setOpenSelectPackage] = useState(false);
    // set arabic

    const [userData_ar, setrUserData_ar] = useState([]);
    const [planData_ar, setPlanData_ar] = useState([]);

    

    const [selectUser_ar, setSelectUser_ar] = useState('اختر مستخدم');
    const [selectUserId_ar, setSelectUserId_ar] = useState([]);
    const [openSelectUser_ar, setOpenSelectUser_ar] = useState(false);

    const [selectPlan_ar, setSelectPlan_ar] = useState('اختر خطة');
    const [selectPlanId_ar, setSelectPlanId_ar] = useState([]);
    const [openSelectPlan_ar, setOpenSelectPlan_ar] = useState(false);

    const [selectPackage_ar, setSelectPackage_ar] = useState('اختر باقة الخطة');
    const [selectPackageName_ar, setSelectPackageName_ar] = useState(null);
    const [openSelectPackage_ar, setOpenSelectPackage_ar] = useState(false);

    
    const dropdownUserRef = useRef();
    const dropdownPlanRef = useRef();
    const dropdownPackageRef = useRef();

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/users/view', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setrUserData(response.data.user)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };
    const fetchPlanData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/plan/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPlanData(response.data.plan)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(); 
        fetchPlanData();
    }, []);

    
    const handleOpenSelectPlan = () => {
        setOpenSelectUser(false);
        setOpenSelectPlan(!openSelectPlan)
        setOpenSelectUser_ar(false);
        setOpenSelectPlan_ar(!openSelectPlan_ar)
    };
    const handleOpenSelectUser = () => {
        setOpenSelectUser(!openSelectUser);
        setOpenSelectPlan(false)
        setOpenSelectUser_ar(!openSelectUser_ar);
        setOpenSelectPlan_ar(false)
    };
    const handleOpenSelectPackage = () => {
        setOpenSelectPackage(!openSelectPackage);
        setOpenSelectPlan(false)
        setOpenSelectUser(false);
        setOpenSelectPackage_ar(!openSelectPackage_ar);
        setOpenSelectPlan_ar(false)
        setOpenSelectUser_ar(false);
      };
 
    const handleSelectPlan = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectPlan(selectedOptionName);
    setSelectPlanId(parseInt(selectedOptionValue));
    setOpenSelectPlan(false);

    // set arabic

    setSelectPlan_ar(selectedOptionName);
    setSelectPlanId_ar(parseInt(selectedOptionValue));
    setOpenSelectPlan_ar(false);
    console.log('Selected Plan:', selectedOptionName);
    console.log('Plan ID:', selectedOptionValue);
    };
    const handleSelectUser = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectUser(selectedOptionName);
    setSelectUserId(parseInt(selectedOptionValue));
    setOpenSelectUser(false);

    // set arabic
    setSelectUser_ar(selectedOptionName);
    setSelectUserId_ar(parseInt(selectedOptionValue));
    setOpenSelectUser_ar(false);
    console.log('Selected User:', selectedOptionName);
    console.log('User ID:', selectedOptionValue);
    };
    const handleSelectPackage = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectPackage(selectedOptionName);
        setSelectPackageName(selectedOptionValue);
        setOpenSelectPackage(false);
        // set arabic
        setSelectPackage_ar(selectedOptionName);
        setSelectPackageName_ar(selectedOptionValue);
        setOpenSelectPackage_ar(false);
        console.log('Selected Package:', selectedOptionName);
        console.log('Package Name:', selectedOptionValue);
    };
 
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownPlanRef.current && !dropdownPlanRef.current.contains(event.target) &&
            dropdownUserRef.current && !dropdownUserRef.current.contains(event.target)&&
            dropdownPackageRef.current && !dropdownPackageRef.current.contains(event.target)
        )
         {
           setOpenSelectPlan(false);   
           setOpenSelectUser(false);   
           setOpenSelectPlan_ar(false);   
           setOpenSelectUser_ar(false);  
        }
      };
 
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };
    const handleSubmitAdd = async (event) => {
        event.preventDefault();
    
        // Validation for English fields
        if (!selectPlanId || !selectUserId || !selectPackageName) {
            auth.toastError('Please select the required fields.');
            return;
        }
    
        // Validation for Arabic fields
        
        // if (!selectPlanId_ar || !selectUserId_ar || !selectPackageName_ar) {
        //     auth.toastError('يرجى اختيار الحقول المطلوبة.');
        //     return;
        // }
    
        setIsLoading(true);
    
        try {
            // Prepare translations array
            // const translations = [
            //     { key: 'plan_id', value: selectPlanId_ar, locale: 'ar' },
            //     { key: 'user_id', value: selectUserId_ar, locale: 'ar' },
            //     { key: 'package', value: selectPackageName_ar, locale: 'ar' }
            // ];
    
            // Create FormData object
            const formData = new FormData();
    
            // Append the main fields
            formData.append('plan_id', selectPlanId);
            formData.append('user_id', selectUserId);
    
            // Append package selection
            if (selectPackageName === 'Monthly') {
                formData.append('package', '1');
            } else if (selectPackageName === '3 Months') {
                formData.append('package', '3');
            } else if (selectPackageName === '6 Months') {
                formData.append('package', '6');
            } else if (selectPackageName === 'Yearly') {
                formData.append('package', 'yearly');
            }
    
            // translations.forEach((translation, index) => {
            //     Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
            //         formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
            //     });
            // });
    
            // API request
            const response = await axios.post(
                ' https://clientbcknd.food2go.online/admin/v1/subscripe/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response.status === 200) {
                // Success message based on language
                auth.toastSuccess(language === 'en' ? 'Subscriber added successfully!' : 'تمت إضافة المشترك بنجاح!');
                handleGoBack();
            } else {
                // Error handling based on language
                console.error(language === 'en' ? 'Failed to add Subscriber:' : 'فشل في إضافة المشترك:', response.status, response.statusText);
                auth.toastError(language === 'en' ? 'Failed to add Subscriber.' : 'فشل في إضافة المشترك.');
            }
    
        } catch (error) {
            // Capture and log error information
            console.log(language === 'en' ? 'Error details:' : 'تفاصيل الخطأ:', error?.response?.data?.error);
            auth.toastError(language === 'en' ? 'An error occurred.' : 'حدث خطأ.');
        } finally {
            setIsLoading(false);
        }
    };
    
    

    
    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
    // const handleChangeLanguage = () => {
    //     const newLanguage = language === 'en' ? 'ar' : 'en'; 
    //     setLanguage(newLanguage); 
    // };

    return (
       <div className="">
        {/* <Button 
    type="submit"
    Text={`Change to ${language === 'en' ? 'Arabic' : 'English'}`}
    BgColor="bg-mainColor"
    Color="text-white"
    Width="fit"
    Size="text-2xl"
    px="px-28"
    rounded="rounded-2xl"
     
    handleClick={() => handleChangeLanguage()}
/> */}
<form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
                  { <div className="w-full flex flex-wrap items-center justify-start gap-10">
                  <div className="lg:w-[30%] sm:w-full">
                            <DropDownMenu
                            ref={dropdownUserRef}
                            handleOpen={handleOpenSelectUser}
                            handleOpenOption={handleSelectUser}
                            stateoption={selectUser}
                            openMenu={openSelectUser}
                            options={userData}
                            />
                     </div>
                     <div className="lg:w-[30%] sm:w-full">
                            <DropDownMenu
                            ref={dropdownPlanRef}
                            handleOpen={handleOpenSelectPlan}
                            handleOpenOption={handleSelectPlan}
                            stateoption={selectPlan}
                            openMenu={openSelectPlan}
                            options={planData}
                            />
                     </div>
                     <div className="lg:w-[30%] sm:w-full">
                            <DropDownMenu
                            ref={dropdownPackageRef}
                            handleOpen={handleOpenSelectPackage}
                            handleOpenOption={handleSelectPackage}
                            stateoption={selectPackage}
                            openMenu={openSelectPackage}
                            options={packageData}
                            />
                     </div>
                  </div>
                  }

                
      
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

export default AddSubscriptionPage;
