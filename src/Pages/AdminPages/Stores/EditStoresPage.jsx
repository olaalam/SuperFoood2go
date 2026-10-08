import React, { useEffect, useState ,useRef ,useContext} from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';

import { StoresDataContext } from '../../../Layouts/AdminLayouts/EditStoresLayout';

const EditStoresPage = () => {
    const storeContent = useContext(StoresDataContext);

    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeLink, setStoreLink] = useState('');
    const [cpanel, setCPanel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [storeData, setStoreData] = useState([]);
    
    
    useEffect(() => {
        if(storeContent){
            setEmail(storeContent?.email); 
            setPassword(storeContent?.password); 
            setStoreName(storeContent?.store_name); 
            setStoreLink(storeContent?.link_store); 
            setCPanel(storeContent?.link_cbanal); 
        }
    }, [storeContent]);


    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitEdit = async (event,storeId) => {
        event.preventDefault();

        if (!email) {
            auth.toastError('Please Enter the Email.');
            return;
        }
        if (!password) {
            auth.toastError('Please Enter the Password.');
            return;
        }
        if (!storeName) {
            auth.toastError('Please Enter the Store Name.');
            return;
        }
        if (!storeLink) {
            auth.toastError('Please Enter the Store Link.');
            return;
        }
        if (!cpanel) {
            auth.toastError('Please Enter the Store Cpanel.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            // formData.append('store_name', storeName); // Append the file
            formData.append('link_store' , storeLink); // Append the file
            formData.append('link_cbanal', cpanel); // Append the file

            const response = await axios.post(
                ' https://clientbcknd.food2go.online/admin/v1/payment/method/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Store updated successfully!');
                handleGoBack();
            } else {
                console.error('Failed to update Store:', response.status, response.statusText);
                auth.toastError('Failed to update Store.');
            }
        } catch (error) {
            console.error('Error adding store:', error?.response?.data?.errors || 'Network error');
            const errorMessages = error?.response?.data?.errors;
            let errorMessageString = 'Error occurred';

            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }

            auth.toastError(errorMessageString);
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
      
    if (!storeData) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Stores data available</div>;
    }

    return(
        <form  onSubmit={(event) => handleSubmitEdit(storeContent.id, event)}  className="w-full flex flex-col items-center justify-center gap-y-10">
        <div className="w-full flex flex-wrap items-center justify-start gap-10">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                      type="email"
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
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                      type="text"
                      borderColor="mainColor"
                      placeholder="Store Name"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      width="w-full"
                  />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                      type="text"
                      borderColor="mainColor"
                      placeholder="Store Link"
                      value={storeLink}
                      onChange={(e) => setStoreLink(e.target.value)}
                      width="w-full"
                  />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                      type="text"
                      borderColor="mainColor"
                      placeholder="CPanel Link"
                      value={cpanel}
                      onChange={(e) => setCPanel(e.target.value)}
                      width="w-full"
                  />
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
                  //   stateLoding={isLoading}
                />
            </div>
            <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
        </div>
        </form>
    )
}
export default EditStoresPage;