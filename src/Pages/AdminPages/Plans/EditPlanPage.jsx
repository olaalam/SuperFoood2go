import React, { useEffect, useState ,useRef ,useContext} from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import { PlanDataContext } from '../../../Layouts/AdminLayouts/EditPlanLayout';
import i18n from '../../../i18n';
import DropDownMenu from '../../../Components/DropDownMenu';

const EditPlanPage =()=>{
    
    const auth = useAuth();
    // english translation
    
    const [language,setLanguage]= useState('en')
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const [limitPlan, setLimitPlan] = useState('');
    const [thumbnails, setThumbnails] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null); // Store the file object
    const [appActive, setAppActive] = useState(0); // Default status to 0
    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice] = useState('');

    const dropdownPlanType = useRef();
    const [planTypeData, setPlanTypeData] = useState([{ name: 'One Time' }, { name: 'Recurring' }]);
    const [planType, setPlanType] = useState('Select Type');
    const [planTypeName, setPlanTypeName] = useState();
    const [openPlanType, setOpenPlanType] = useState(false);     

    const [monthlyPrice, setMonthlyPrice] = useState('');
    const [monthlyDiscountPrice, setMonthlyDiscountPrice] = useState('');

    const [quarterlyPrice, setQuarterlyPrice] = useState('');
    const [quarterlyDiscountPrice, setQuarterlyDiscountPrice] = useState('');

    const [semiAnnualPrice, setSemiAnnualPrice] = useState('');
    const [semiAnnualDiscountPrice, setSemiAnnualDiscountPrice] = useState('');

    const [yearlyPrice, setYearlyPrice] = useState(''); 
    const [yearlyDiscountPrice, setYearlyDiscountPrice] = useState(''); 

    const [showMonthlyPriceInput, setShowMonthlyPriceInput] = useState(false);
    const [showQuarterlyPriceInput, setShowQuarterlyPriceInput] = useState(false);
    const [showSemiAnnualPriceInput, setShowSemiAnnualPriceInput] = useState(false);
    const [showYearlyPriceInput, setShowYearlyPriceInput] = useState(false);
    
    // arabic translation
    const [name_ar, setName_ar] = useState('');
    const [title_ar, setTitle_ar] = useState('');
    const [description_ar, setDescription_ar] = useState('');
    const navigate = useNavigate();
    const uploadRef = useRef();

    const { planEdit, planEdit_ar} = useContext(PlanDataContext);


    useEffect(() => {

        if (planEdit) {
            setName(planEdit.name || '');
            // setTitle(planContent.title || '');
            setDescription(planEdit.description|| '');
            setFee(planEdit.setup_fees|| 0);
            setLimitPlan(planEdit.limet_store|| '');
            setAppActive(planEdit.app||0);

            if(planEdit.monthly){
                setShowMonthlyPriceInput(true)
                setMonthlyPrice(planEdit.monthly)
                setMonthlyDiscountPrice(planEdit.discount_monthly)
            }
            if(planEdit.quarterly){
                setShowQuarterlyPriceInput(true)
                setQuarterlyPrice(planEdit.quarterly)
                setQuarterlyDiscountPrice(planEdit.discount_quarterly)
            }
            if(planEdit["semi_annual"]){
                setShowSemiAnnualPriceInput(true)
                setSemiAnnualPrice(planEdit["semi_annual"])
                setSemiAnnualDiscountPrice(planEdit.discount_semi_annual)
            }
            if(planEdit.yearly){
                setShowYearlyPriceInput(true)
                setYearlyPrice(planEdit.yearly)
                setYearlyDiscountPrice(planEdit.discount_yearly)
            }

        }
        if (planEdit_ar) {
            setName_ar(planEdit_ar.name || '');
            // setTitle(planContent.title || '');
            setDescription_ar(planEdit_ar.description|| '');
        }
    }, [planEdit,planEdit_ar]);

     const handleOpenPlanType = () => {
            setOpenPlanType(!openPlanType);
            setOpenSelectPlan(false)
        };
    const handlePlanType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
        setPlanType(selectedOptionName);
        setPlanTypeName(selectedOptionValue);
        setOpenPlanType(false);
        console.log(selectedOptionName)
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (
            dropdownPlanType.current && !dropdownPlanType.current.contains(event.target)
        ) {
            setOpenPlanType(false); 
        }
    };

    
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleInputClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click(); // Trigger a click on the hidden file input
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file); // Set file object for upload
            setThumbnails(file.name); // Display file name in the text input
        }
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked; // Checked status
        setAppActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
    };

    const handleSubmitEdit = async (planId,event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
      // Prepare translations data
      const translations = [
        { key: 'name', value: name_ar, locale: 'ar' },
        { key: 'description', value: description_ar, locale: 'ar' },
    ];

    const formData = new FormData();
    formData.append('plan_id', planId);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('setup_fees', fee);
    formData.append('limet_store', limitPlan);
    formData.append('image', thumbnailFile); // Append the file
    formData.append('app', appActive); // Append the file

    // Append selected prices if inputs are shown and filled
    if (showMonthlyPriceInput && monthlyPrice) {
        formData.append('monthly', monthlyPrice);
        formData.append('discount_monthly', monthlyDiscountPrice || 0);
    }
    if (showQuarterlyPriceInput && quarterlyPrice) {
        formData.append('quarterly', quarterlyPrice);
        formData.append('discount_quarterly', quarterlyDiscountPrice || 0);
    }
    if (showSemiAnnualPriceInput && semiAnnualPrice) {
        formData.append('semi_annual', semiAnnualPrice);
        formData.append('discount_semi_annual', semiAnnualDiscountPrice || 0);
    }
    if (showYearlyPriceInput && yearlyPrice) {
        formData.append('yearly', yearlyPrice);
        formData.append('discount_yearly', yearlyDiscountPrice || 0);
    }

    // append into form data
    translations.forEach((translation, index) => {
        Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
            formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
        });
    });

    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
 }   
            const response = await axios.post(
               `https://clientbcknd.food2go.online/admin/v1/plan/update`,
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
                auth.toastSuccess('Plan Updated successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to Updated Plan.');
            }
        } catch (error) {
            console.log(error)
            const errorMessage = error?.response?.data?.errors || 'Network error';
            auth.toastError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; // Fixed variable naming
        setLanguage(newLanguage); // Corrected variable usage
    };
    return(
    <div className="">
        <Button 
            type="submit"
            Text={`Change to ${language === 'en' ? 'Arabic' : 'English'}`}
            BgColor="bg-mainColor"
            Color="text-white"
            Width="fit"
            Size="text-2xl"
            rounded="rounded-2xl"
            className="w-full md:w-1/4"
            handleClick={() => handleChangeLanguage()}
        />

        <form onSubmit={(event) => handleSubmitEdit(planEdit.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10">
            {/* data in english */}      
            {language==='en'? <div className="w-full flex flex-wrap items-center justify-start gap-10">
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
                <textarea
                    className="w-full px-2 py-4 border-2 font-normal eleValueInput rounded-xl border-mainColor text-2xl focus:outline-none focus:ring-2 focus:ring-mainColor"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={1}
                ></textarea>
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="number"
                        borderColor="mainColor"
                        placeholder="Setup Fees"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="number"
                        borderColor="mainColor"
                        placeholder="Limit Store"
                        value={limitPlan}
                        onChange={(e) => setLimitPlan(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                            type="text"
                            borderColor="mainColor"
                            placeholder="Thumbnail"
                            value={thumbnails}
                            readOnly={true} 
                            onClick={handleInputClick}
                            upload="true"
                            required={false}
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={uploadRef}
                        />
                </div>

                <div className="lg:w-[30%] sm:w-full">
                    <DropDownMenu
                        ref={dropdownPlanType}
                        handleOpen={handleOpenPlanType}
                        handleOpenOption={handlePlanType}
                        stateoption={planType}
                        openMenu={openPlanType}
                        options={planTypeData}
                    />
                </div>
                {/* Conditionally render price inputs based on extraType */}
                {planType === 'One Time' && (
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
                )}
                <div className="flex items-center gap-x-4 w-full">
                        <span className="text-2xl text-mainColor font-medium">Application:</span>
                         <div>
                             <CheckBox handleClick={handleClick} checked={appActive}/>
                         </div>
                </div>
                {planType === 'Recurring' && (
                    <>
                     {/* Price Option Checkboxes */}
                    <div className="flex w-full flex-col gap-5">
                    {/* Monthly Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className=" flex items-center gap-3 w-full lg:w-1/3">
                        <input 
                            type="checkbox" 
                            checked={showMonthlyPriceInput}
                            onChange={() => setShowMonthlyPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Monthly</label>
                    </div>
                        {/* Conditional Price Inputs */}
                        {showMonthlyPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={monthlyPrice}
                                onChange={(e) => setMonthlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter Discount Price"
                            value={monthlyDiscountPrice}
                            onChange={(e) => setMonthlyDiscountPrice(e.target.value)}
                            width="w-full"
                            required={false}
                        />
                        </div>
                        </>
                        )}
                    </div>

                    {/* 3 Months Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showQuarterlyPriceInput}
                            onChange={() => setShowQuarterlyPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Quarterly</label>
                    </div>
                    {showQuarterlyPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={quarterlyPrice}
                                onChange={(e) => setQuarterlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter Discount Price"
                            value={quarterlyDiscountPrice}
                            onChange={(e) => setQuarterlyDiscountPrice(e.target.value)}
                            width="w-full"
                            required={false}
                        />
                        </div>
                        </>
                    )}
                    </div>

                    {/* 6 Months Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showSemiAnnualPriceInput}
                            onChange={() => setShowSemiAnnualPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Semi-Annual</label>
                    </div>
                    {showSemiAnnualPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={semiAnnualPrice}
                                onChange={(e) => setSemiAnnualPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter Discount Price"
                            value={semiAnnualDiscountPrice}
                            onChange={(e) => setSemiAnnualDiscountPrice(e.target.value)}
                            width="w-full"
                            required={false}
                        />
                        </div>
                        </>
                    )}
                    </div>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showYearlyPriceInput}
                            onChange={() => setShowYearlyPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Yearly</label>
                    </div>
                    {showYearlyPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={yearlyPrice}
                                onChange={(e) => setYearlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter Discount Price"
                            value={yearlyDiscountPrice}
                            onChange={(e) => setYearlyDiscountPrice(e.target.value)}
                            width="w-full"
                            required={false}
                        />
                        </div>
                        </>
                    )}
                    </div>
                    </div>
                    </>
                )}        
            </div>
            :
            <div className="w-full flex flex-wrap items-center justify-start gap-10">
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="الأسم"
                        value={name_ar}
                        onChange={(e) => setName_ar(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                <textarea
                    className="w-full px-2 py-4 border-2 font-normal eleValueInput rounded-xl border-mainColor text-2xl focus:outline-none focus:ring-2 focus:ring-mainColor"
                    placeholder="الوصف"
                    value={description_ar}
                    onChange={(e) => setDescription_ar(e.target.value)}
                    rows={1}
                ></textarea>
                </div>
            </div>}             
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

export default EditPlanPage;
