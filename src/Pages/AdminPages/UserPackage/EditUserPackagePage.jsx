import React, { useEffect, useState, useRef } from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import CheckBox from '../../../Components/CheckBox';
import { useGet } from '../../../Hooks/UseGet';

const EditUserPackagePage = () => {
    const { userPackageId } = useParams();
    const { refetch: refetchPackage, loading: loadingPackage, data: dataPackage } = useGet({ url: `https://clientbcknd.food2go.online/admin/v1/user_sms` });
    const { refetch, loading, data } = useGet({ url: `https://clientbcknd.food2go.online/admin/v1/user_sms/item/${userPackageId}` });

    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const [packages, setPackages] = useState([]);
    const [selectPackage, setSelectPackage] = useState('Select SMS Package');
    const [selectPackageId, setSelectPackageId] = useState('');
    const [openSelectPackage, setOpenSelectPackage] = useState(false);
    const dropdownPackageRef = useRef();

    useEffect(() => {
        refetchPackage();
        refetch();
    }, [refetchPackage, refetch]);

    useEffect(() => {
        if (dataPackage && dataPackage.sms_packages) {
            setPackages(dataPackage.sms_packages)
        }
    }, [dataPackage]);


    useEffect(() => {
        if (data && data.user_sms) {
            const packages = data.user_sms;
            setName(packages.name || '');
            setLink(packages.back_link);

            if (packages.sms_package) {
                setSelectPackage(packages.sms_package?.name);
                setSelectPackageId(packages.sms_package?.id);
            } else {
                setSelectPackage('Select SMS Package');
                setSelectPackageId(null);
            }
        }
    }, [data]); // Only run this effect when `data` changes

    const handleOpenSelectPackage = () => {
        setOpenSelectPackage(!openSelectPackage)
    };

    const handleSelectPackage = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectPackage(selectedOptionName);
        setSelectPackageId(parseInt(selectedOptionValue));
        setOpenSelectPackage(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownPackageRef.current && !dropdownPackageRef.current.contains(event.target)) {
            setOpenSelectValueType(false)
        }
    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    if (isLoading || loading || loadingPackage) {
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
        if (!link) {
            auth.toastError('Please Enter Back Link.');
            return;
        }
        if (!selectPackageId) {
            auth.toastError('Please Select SMS Package.');
            return;
        }
        // Prepare FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('back_link', link);
        formData.append('sms_package_id', selectPackageId);

        // Submit the form
        setIsLoading(true)
        try {
            const response = await axios.post(`https://clientbcknd.food2go.online/admin/v1/user_sms/update/${userPackageId}`, formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                auth.toastSuccess('User Package Updated successfully!');
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
                            placeholder="Name"
                            borderColor="mainColor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            placeholder="Back Link"
                            borderColor="mainColor"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <DropDownMenu
                            ref={dropdownPackageRef}
                            handleOpen={handleOpenSelectPackage}
                            handleOpenOption={handleSelectPackage}
                            stateoption={selectPackage}
                            openMenu={openSelectPackage}
                            options={packages}
                        />
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

export default EditUserPackagePage;
