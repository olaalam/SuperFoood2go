import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import DropDownMenu from '../../../Components/DropDownMenu';
import Loading from '../../../Components/Loading';

const AddWelcomOfferPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [language,setLanguage]= useState('en')
    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice] = useState('');
    const [active, setActive] = useState(0); // Default status to 0
    const translate= new FormData();
    const [price_ar, setPrice_ar] = useState('');
    const [active_ar, setActive_ar] = useState(0); // Default status to 0
    const [arabicThumbnails, setArabicThumbnails] = useState('');
    const [arabicThumbnails_ar, setArabicThumbnails_ar] = useState('');
    const [arabicThumbnailFile, setArabicThumbnailFile] = useState(null); // Store the file object
    const [englishThumbnails, setEnglishThumbnails] = useState('');
    const [englishThumbnails_ar, setEnglishThumbnails_ar] = useState('');
    const [englishThumbnailFile, setEnglishThumbnailFile] = useState(null); // Store the file object

    const [plans, setPlans] = useState([]);
    
    const [selectPlan, setSelectPlan] = useState('Select Plan');
    const [selectPlan_ar, setSelectPlan_ar] = useState('اختر الخطة');
    const [selectPlanId, setSelectPlanId] = useState('');
    const [selectPlanId_ar, setSelectPlanId_ar] = useState('');
    const [openSelectPlan, setOpenSelectPlan] = useState(false);

    const [durationData, setDurationData] = useState([{ name: 'Monthly' }, { name: 'Quarterly' } , { name: 'SemiAnnual' },  { name: 'Yearly' }]);
    const [durationData_ar, setDurationData_ar] = useState([{ name: 'Monthly' }, { name: 'Quarterly' } , { name: 'SemiAnnual' },  { name: 'Yearly' }]);
    const [selectDuration, setSelectDuration] = useState('Select Duration');
    const [selectDuration_ar, setSelectDuration_ar] = useState('اختر المدة');
    const [selectDurationName, setSelectDurationName] = useState('');
    const [selectDurationName_ar, setSelectDurationName_ar] = useState('');
    const [openSelectDuration, setOpenSelectDuration] = useState(false);

    const dropdownPlanRef =useRef();
    const dropdownDurationRef =useRef();
    const arabicThumbnailRef =useRef();
    const englishThumbnailRef =useRef();

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/plan/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPlans(response.data.plan)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleArabicInputClick = () => {
        if (arabicThumbnailRef.current) {
            arabicThumbnailRef.current.click(); // Trigger a click on the hidden file input
        }
    };

    const handleArabicFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArabicThumbnailFile(file); // Set file object for upload
            setArabicThumbnails(file.name); // Display file name in the text input
            setArabicThumbnails_ar(file.name);
        }
    };
    const handleEnglishInputClick = () => {
        if (englishThumbnailRef.current) {
            englishThumbnailRef.current.click(); // Trigger a click on the hidden file input
        }
    };

    const handleEnglishFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEnglishThumbnailFile(file); // Set file object for upload
            setEnglishThumbnails(file.name); // Display file name in the text input
            setEnglishThumbnails_ar(file.name);
        }
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked; // Checked status
        setActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
        setActive_ar(isChecked ? 1 : 0); 
    };

    const handleOpenSelectPlan = () => {
        setOpenSelectPlan(!openSelectPlan)
        setOpenSelectDuration(false)
      
    };
    const handleOpenSelectDuration = () => {
    setOpenSelectPlan(false)
    setOpenSelectDuration(!openSelectDuration)
    };

    const handleSelectPlan = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectPlan(selectedOptionName);
        setSelectPlanId(parseInt(selectedOptionValue));
        setOpenSelectPlan(false);
        // ---
        setSelectPlan_ar(selectedOptionName);
        setSelectPlanId_ar(parseInt(selectedOptionValue));
        
        console.log('Selected Plan:', selectedOptionName);
        console.log('Plan ID:', selectedOptionValue);
    };
    const handleSelectDuration = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectDuration(selectedOptionName);
        setSelectDurationName(parseInt(selectedOptionValue));
        setOpenSelectDuration(false);
        // ---
        setSelectDuration_ar(selectedOptionName);
        setSelectDurationName_ar(parseInt(selectedOptionValue));
        console.log('Selected Duration:', selectedOptionName);
        console.log('Duration Name:', selectedOptionValue);
    };

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownPlanRef.current && !dropdownPlanRef.current.contains(event.target)&&
            dropdownDurationRef.current && !dropdownDurationRef.current.contains(event.target)
        ) {
            setOpenSelectPlan(false); 
            setOpenSelectDuration(false); 
        }
      };


   
    const handleSubmitAdd = async (event) => {
        event.preventDefault();
         // Map duration for the API
        const durationMap = {
            Monthly: 'monthly',
            Quarterly: 'quarterly',
            SemiAnnual: 'semi-annual',
            Yearly: 'yearly',
        };  
        const duration = durationMap[selectDuration] || selectDuration;
        const duration_ar = durationMap[selectDuration_ar] || selectDuration_ar;

        if (!selectPlanId) {
            auth.toastError('Please Select the Plan.');
            return;
        }
        if (!selectDuration) {
            auth.toastError('Please Select the Duration.');
            return;
        }
        if (!price) {
            auth.toastError('Please Enter the Price.');
            return;
        }

        if (!selectPlanId_ar ) {
            auth.toastError('يرجى اختيار الخطة.');
            return;
        }
        
        if (!selectDuration_ar) {
            auth.toastError('يرجى اختيار المدة.');
            return;
        }
      //   if (!price_ar) {
      //     auth.toastError('يرجى اختيار السعر.');
      //     return;
      // }
        
     
        
        // if (!active) {
        //     auth.toastError('Please Enter the Status.');
        //     return;
        // }
        if (!arabicThumbnails_ar) {
            auth.toastError('يرجى رفع صورة المعاينة العربية.');
            return;
        }
        
        if (!englishThumbnails_ar) {
            auth.toastError('يرجى رفع صورة المعاينة الإنجليزية.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('plan_id', selectPlanId);
            formData.append('duration', duration);
            formData.append('price', price);
            formData.append('status', active || 0);
            formData.append('ar_image', arabicThumbnailFile);
            formData.append('en_image', englishThumbnailFile); // Append the file

               // Create translations array
        const translations = [
          { key: 'plan_id', value: selectPlanId_ar, locale: 'ar' },
          { key: 'duration', value: duration_ar, locale: 'ar' },
          // { key: 'status', value: active || 0, locale: 'ar' },
          { key: 'ar_image', value: arabicThumbnailFile || 0, locale: 'ar' },
          { key: 'en_image', value: englishThumbnailFile || 0, locale: 'ar' },
      ];

      translations.forEach((translation, index) => {
        Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
            formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
        });
    });
            
            const response = await axios.post(
                ' https://clientbcknd.food2go.online/admin/v1/welcome_offer/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
             console.log(response)
             if (response.status === 200) {
                auth.toastSuccess(
                    language === 'ar' 
                        ? 'تم إضافة عرض الترحيب بنجاح!' 
                        : 'Welcome Offer added successfully!'
                );
                handleGoBack();
            } else {
                auth.toastError(
                    language === 'ar' 
                        ? 'فشل في إضافة عرض الترحيب.' 
                        : 'Failed to add Welcome Offer.'
                );
            }
            
            } catch (error) {
                console.log(error);
                // auth.toastError(error.response.data.faild);
                // const errorMessage = error?.response?.data?.errors || (language === 'ar' ? 'خطأ في الشبكة' : 'Network error');
                // auth.toastError(errorMessage);
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
        
    if (!plans) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No promoCode data available</div>;
    }
    const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; 
        setLanguage(newLanguage); 
    };

    return (
       <div className="">
             
                    <Button 
    type="submit"
    Text={`Change to ${language === 'en' ? 'Arabic' : 'English'}`}
    BgColor="bg-mainColor"
    Color="text-white"
    Width="fit"
    Size="text-2xl"
    px="px-28"
    rounded="rounded-2xl"
     
    handleClick={() => handleChangeLanguage()}
/>

<form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
  {language === 'en' ? (

    
    <div className="w-full flex flex-wrap items-center justify-start gap-10">
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownPlanRef}
          handleOpen={handleOpenSelectPlan}
          handleOpenOption={handleSelectPlan}
          stateoption={selectPlan}
          openMenu={openSelectPlan}
          options={plans}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownDurationRef}
          handleOpen={handleOpenSelectDuration}
          handleOpenOption={handleSelectDuration}
          stateoption={selectDuration}
          openMenu={openSelectDuration}
          options={durationData}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="number"
          borderColor="mainColor"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          width="w-full"
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="text"
          borderColor="mainColor"
          placeholder="Arabic Thumbnail"
          value={arabicThumbnails}
          readOnly={true}
          onClick={handleArabicInputClick}
          upload="true"
          required={false}
        />
        <input
          type="file"
          className="hidden"
          onChange={handleArabicFileChange}
          ref={arabicThumbnailRef}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="text"
          borderColor="mainColor"
          placeholder="English Thumbnail"
          value={englishThumbnails}
          readOnly={true}
          onClick={handleEnglishInputClick}
          upload="true"
          required={false}
        />
        <input
          type="file"
          className="hidden"
          onChange={handleEnglishFileChange}
          ref={englishThumbnailRef}
        />
      </div>

      <div className="lg:w-[30%] sm:w-full flex items-center gap-x-4 w-full">
        <span className="text-2xl text-mainColor font-medium">Activation:</span>
        <div>
          <CheckBox handleClick={handleClick} checked={active} />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-wrap items-center justify-start gap-10">
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownPlanRef}
          handleOpen={handleOpenSelectPlan}
          handleOpenOption={handleSelectPlan}
          stateoption={selectPlan}
          openMenu={openSelectPlan}
          options={plans}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownDurationRef}
          handleOpen={handleOpenSelectDuration}
          handleOpenOption={handleSelectDuration}
          stateoption={selectDuration}
          openMenu={openSelectDuration}
          options={durationData}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="number"
          borderColor="mainColor"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          width="w-full"
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="text"
          borderColor="mainColor"
          placeholder="صورة العنوان بالعربية"
          value={arabicThumbnails_ar}
          readOnly={true}
          onClick={handleArabicInputClick}
          upload="true"
          required={false}
        />
        <input
          type="file"
          className="hidden"
          onChange={handleArabicFileChange}
          ref={arabicThumbnailRef}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="text"
          borderColor="mainColor"
          placeholder="صورة العنوان بالإنجليزية"
          value={englishThumbnails_ar}
          readOnly={true}
          onClick={handleEnglishInputClick}
          upload="true"
          required={false}
        />
        <input
          type="file"
          className="hidden"
          onChange={handleEnglishFileChange}
          ref={englishThumbnailRef}
        />
      </div>

      <div className="lg:w-[30%] sm:w-full flex items-center gap-x-4 w-full">
        <span className="text-2xl text-mainColor font-medium">التفعيل</span>
        <div>
          <CheckBox handleClick={handleClick} checked={active} />
        </div>
      </div>
    </div>
  )}

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

export default AddWelcomOfferPage;
