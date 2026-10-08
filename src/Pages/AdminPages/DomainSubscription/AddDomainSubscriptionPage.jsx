import React, { useState } from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';

const AddDomainSubscriptionPage = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

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
            auth.toastError('Please Enter Subscription Name.');
            return;
        }
         if (!link) {
            auth.toastError('Please Enter Domain Link.');
            return;
        }
         if (!from) {
            auth.toastError('Please Enter Subscription From.');
            return;
        }
         if (!to) {
            auth.toastError('Please Enter Subscription To.');
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('back_link', link);
        formData.append('from', from);
        formData.append('to', to);

        // Submit the form
        setIsLoading(true)
        try {
            const response = await axios.post('https://clientbcknd.food2go.online/admin/v1/subscription/add', formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                auth.toastSuccess('Domain Subscription added successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to add Domain Subscription.');
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
                            placeholder="Subscription Name"
                            borderColor="mainColor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            placeholder="Domain Link"
                            borderColor="mainColor"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="Date"
                            placeholder="Subscription From"
                            borderColor="mainColor"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>
                      <div className="w-full">
                        <InputCustom
                            type="Date"
                            placeholder="Subscription To"
                            borderColor="mainColor"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
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

export default AddDomainSubscriptionPage;
