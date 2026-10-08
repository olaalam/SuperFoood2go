import React, { useState, useRef,useEffect ,useContext} from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import CheckBox from '../../../Components/CheckBox';
import DropDownMenu from '../../../Components/DropDownMenu';
import { SubscriperLayout } from '../../../Layouts/AdminLayouts/EditSubscriptionLayout';

const EditSubscriptionPage =()=>{
    const subscriperContent = useContext(SubscriperLayout);

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

    useEffect(() => {
        if (subscriperContent) {
            if (subscriperContent.id) {
                    setSelectUser(subscriperContent.name);
                    setSelectUserId(subscriperContent.id);
                    // set arabic
                    setSelectUser_ar(subscriperContent.name);
                    setSelectUserId_ar(subscriperContent.id);
            } else {
                    setSelectUser('Select User');
                    setSelectUser_ar('اختر مستخدم')
                    setSelectUserId(null);
                    setSelectUserId_ar(null);
            }

            if (subscriperContent.plan_id) {
                setSelectPlan(subscriperContent.plan?.name);
                setSelectPlanId(subscriperContent.plan?.id);
                // set arabic
                setSelectPlan_ar(subscriperContent.plan?.name);
                setSelectPlanId_ar(subscriperContent.plan?.id);
            } else {
                setSelectPlan('Select Plan');
                setSelectPlan_ar('اختر خطة');

                setSelectPlanId(null);
                setSelectPlanId_ar(null);
            }

            if (subscriperContent.package) {
                console.log(`Package value: ${subscriperContent.package}`); // Add this log
                if (subscriperContent.package === '1') {
                    setSelectPackage('Monthly')
                    setSelectPackageName('Monthly');

                    // set arabic
                    setSelectPackage_ar('شهري')
                    setSelectPackageName_ar('شهري');
                } else if (subscriperContent.package === '3') {
                    setSelectPackage('3 Months')
                    setSelectPackageName('3 Months');
                    // set arabic
                    setSelectPackage_ar('3 شهور')
                    setSelectPackageName_ar('3 شهور');

                } else if (subscriperContent.package === '6') {
                    setSelectPackage('6 Month')
                    setSelectPackageName('6 Months');
                    // set arabic
                    setSelectPackage_ar('6 شهور')
                    setSelectPackageName_ar('6 شهور');

                } else if (subscriperContent.package === 'yearly' || subscriperContent.package === 'سنوي') {
                    setSelectPackage('Yearly')
                    setSelectPackageName('Yearly');
                    // set arabic
                    setSelectPackage_ar('سنوي')
                    setSelectPackageName_ar('سنوي');
                } else {
                    setSelectPackage('Select Plan Package');
                    setSelectPackageName(null);
                    // set arabic
                    setSelectPackage_ar('اختر باقة الخطة');
                    setSelectPackageName_ar(null);
                }

                // fetch data 
                
            }

        }
    }, [subscriperContent]);

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

        // set arabic
        setOpenSelectUser_ar(!openSelectUser_ar);
        setOpenSelectPlan_ar(false)
    };
    const handleOpenSelectPackage = () => {
        setOpenSelectPackage(!openSelectPackage);
        setOpenSelectPlan(false)
        setOpenSelectUser(false);
        // set arabic
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
    // ------------------------------
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
        // --------------------------
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
         // -------------------------------
         setOpenSelectPlan_ar(false);   
         setOpenSelectUser_ar(false);    
        }
      };
 
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitEdit = async (userId ,event) => {
        event.preventDefault();

        if (!selectPlanId) {
            auth.toastError('Please Select Plan.');
            return;
        }
        if (!selectUserId) {
            auth.toastError('Please Select User.');
            return;
        }
        if (!selectPackageName) {
            auth.toastError('Please Select Plan Package.');
            return;
        }
        // ------------------------------------------

        // if (!selectPlanId_ar) {
        //     auth.toastError('يرجى اختيار خطة.');
        //     return;
        // }
        // if (!selectUserId_ar) {
        //     auth.toastError('يرجى اختيار مستخدم.');
        //     return;
        // }
        // if (!selectPackageName_ar) {
        //     auth.toastError('يرجى اختيار باقة الخطة.');
        //     return;
        // }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('plan_id', selectPlanId);
            formData.append('user_id', selectUserId);

            if (selectPackageName === 'Monthly') {
                formData.append('package', "1"); 
            } else if (selectPackageName === '3 Months') {
                formData.append('package', "3"); 
            } else if (selectPackageName === '6 Months') {
                formData.append('package', "6"); 
            } else if (selectPackageName === 'Yearly') {
                formData.append('package', "yearly"); 
            }

            // -------------------------------

            // const translations = [
            //     { key: 'plan_id', value: selectPlanId_ar, locale: 'ar' },
            //     { key: 'user_id', value: selectUserId_ar, locale: 'ar' },
            //     { key: 'package', value: selectPackageName_ar, locale: 'ar' }
            // ];
    

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            } 

            // translations.forEach((translation, index) => {
            //     Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
            //         formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
            //     });
            // });

            const response = await axios.post(
                ` https://clientbcknd.food2go.online/admin/v1/subscripe/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess(language === 'ar' ? 'تم تحديث المشترك بنجاح!' : 'Subscriber updated successfully!');
                handleGoBack();
            } else {
                console.error(language === 'ar' ? 'فشل في تحديث المشترك:' : 'Failed to update Subscriber:', response.status, response.statusText);
                auth.toastError(language === 'ar' ? 'فشل في تحديث المشترك.' : 'Failed to update Subscriber.');
            }
            } catch (error) {
                const errors = error.response?.data?.error;
                console.log(language === 'ar' ? 'تفاصيل الخطأ:' : 'Error details:', errors);
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

    return(
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
<form onSubmit={(event) => handleSubmitEdit(subscriperContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
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
    )
}

export default EditSubscriptionPage;