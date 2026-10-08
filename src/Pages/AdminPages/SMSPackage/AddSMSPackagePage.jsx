import React, { useEffect, useState, useRef } from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import CheckBox from '../../../Components/CheckBox';

const AddSMSPackagePage = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('')
    const [months, setMonths] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [message, setMessage] = useState('')
    const [activePackage, setActivePackage] = useState(0);

    const [valueType, setValueType] = useState([{ name: 'Percentage' }, { name: 'Value' }]);
    const [selectValueType, setSelectValueType] = useState('Select ValueType');
    const [selectValueTypeName, setSelectValueTypeName] = useState(null);
    const [openSelectValueType, setOpenSelectValueType] = useState(false);

    const dropdownValueTypeRef = useRef();

    const handleOpenValueType = () => {
        setOpenSelectValueType(!openSelectValueType);
    };

    const handleSelectValueType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectValueType(selectedOptionName);
        setSelectValueTypeName(selectedOptionValue)
        setOpenSelectValueType(false);
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setActivePackage(isChecked ? 1 : 0);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownValueTypeRef.current && !dropdownValueTypeRef.current.contains(event.target)) {
            setOpenSelectValueType(false)
        }
    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    if (isLoading) {
        return (
            <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                <Loading />
            </div>
        );
    }

    const handleSubmitAdd = async (event) => {
        event.preventDefault();

        if (!name) {
            auth.toastError('Please Enter Package Name.');
            return;
        }
        if (!months) {
            auth.toastError('Please Enter Number Of Months.');
            return;
        }
        if (!price) {
            auth.toastError('Please Enter Price.');
            return;
        }
        // Prepare FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('months', months);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('discount_type', selectValueTypeName === "Percentage" ? "precentage": "value");
        formData.append('msg_number', message);
        formData.append('status', activePackage);

        // Submit the form
        setIsLoading(true)
        try {
            const response = await axios.post('https://clientbcknd.food2go.online/admin/v1/sms_packages/add', formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                auth.toastSuccess('SMS Package added successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to add SMS Package.');
            }
        } catch (error) {
            console.log(error);
            const errorMessages = error?.response?.data?.errors;
            let errorMessageString = 'Error occurred';
            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }
            auth.toastError('Error', errorMessageString);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitAdd} className="w-full p-4 flex flex-col items-center justify-center gap-y-10">
                <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            placeholder="Package Name"
                            borderColor="mainColor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="number"
                            placeholder="Number Of Months"
                            borderColor="mainColor"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="number"
                            placeholder="Price"
                            borderColor="mainColor"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="number"
                            placeholder="Discount"
                            borderColor="mainColor"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <DropDownMenu
                            ref={dropdownValueTypeRef}
                            handleOpen={handleOpenValueType}
                            handleOpenOption={handleSelectValueType}
                            stateoption={selectValueType}
                            openMenu={openSelectValueType}
                            options={valueType}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="number"
                            placeholder="Number Of Message"
                            borderColor="mainColor"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-x-4 w-full">
                    <span className="text-2xl text-thirdColor font-medium">Active:</span>
                    <div>
                        <CheckBox checked={activePackage} handleClick={handleClick} />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center justify-start gap-y-5 md:gap-x-28 sm:my-8 lg:my-0">
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
                            stateLoding={isLoading}
                        />
                    </div>
                    <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                </div>
            </form>
        </>
    )
}

export default AddSMSPackagePage;
