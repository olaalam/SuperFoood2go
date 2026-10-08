import React, { useEffect, useState ,useRef} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart ,removeFromCart} from '../../../Redux/CartSlice.js';
import DropDownMenu from '../../../Components/DropDownMenu';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const BuyDomainPage =()=>{
    const auth = useAuth();
    const navigate = useNavigate();
    const [selectedDomainId, setSelectedDomainId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [domainRequest, setDomainRequest] = useState('');
    const [alldomainRequest, setAllDomainRequest] = useState('');
    const [domainApproved, setDomainApproved] = useState('');
    const [domainRejected, setDomainRejected] = useState('');
    const [domainPendding, setDomainPending] = useState('');
    const [activeTab, setActiveTab] = useState("Approved");
    const { t, i18n } = useTranslation();

     // State to control modal visibility and content
     const [showModal, setShowModal] = useState(false);
     const [selectedReason, setSelectedReason] = useState('');

    const [storeData ,setStoreData] =useState([])
    const [selectStore, setSelectStore] = useState('');
    const [selectStoreId, setSelectStoreId] = useState('');
    const [openSelectStore, setOpenSelectStore] = useState(false);

    const dropdownStoreRef =useRef();

    useEffect(() => {
        setSelectStore(t("Select Store"));
      }, [t]); // Ensure it updates if the language changes

     const fetchStoresData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/user/v1/store', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setStoreData(response.data.stores)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    const handleOpenSelectStore = () => {
        setOpenSelectStore(!openSelectStore)
      };

    const handleSelectStore = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectStore(selectedOptionName);
        setSelectStoreId(parseInt(selectedOptionValue));
        setOpenSelectStore(false);
        console.log('Selected store:', selectedOptionName);
        console.log('Store ID:', selectedOptionValue);
      };

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownStoreRef.current && !dropdownStoreRef.current.contains(event.target)
        ) {
            setOpenSelectStore(false); 
        }
      };
 
     // Function to open modal and set the rejection reason
     const handleViewReason = (reason) => {
         setSelectedReason(reason);
         setShowModal(true);
     };
 
     // Function to close the modal
     const closeModal = () => {
         setShowModal(false);
         setSelectedReason('');
     };

    const dispatch = useDispatch();

    // const handleAddToCart = (domain) => {
    //     dispatch(addToCart(domain));
    // };
    // const handleAddToCart = (domain) => {
    //     const productToCart = {
    //         name: domain.name,
    //         price: domain.price };
    //     dispatch(addToCart(productToCart));
    // };

    const handleAddToCart = async(domain,event) => {

        if (event) event.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await axios.post(
                ' https://clientbcknd.food2go.online/user/v1/cart/pending',
                {
                    id: domain.id, // Properly include plan.id as a key-value pair
                    type: "domain",
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'application/json', // Explicitly specify JSON content type
                    },
                }
            );

            const data = response.data;
    
        if (response.status === 200 && data.success === "You can buy it") {

                if (selectedDomainId == domain.id) {
                    // Deselect plan and remove from cart
                    setSelectedDomainId(null);
                    dispatch(removeFromCart(domain));
                    localStorage.removeItem('selectedDomainId');
         
                } else {
            // Deselect previous plan and add new plan
            if (selectedDomainId !== null) {
                const previousDomain = domainApproved.find((p) => p.id == selectedDomainId);
                dispatch(removeFromCart(previousDomain));
                localStorage.removeItem('selectedDomainId');
            }
            dispatch(addToCart(domain));
            setSelectedDomainId(domain.id);
            localStorage.setItem('selectedDomainId', domain.id);  // Save selected plan to localStorage
                }
        }
        else {
            // Toast error if success message is not "you can buy it"
            auth.toastError('Error', data?.message || 'Failed to add to cart.');
        }
    } catch (error) {
        console.error(error);
        auth.toastError(error.response.data.faild)
    } finally {
        setIsLoading(false);
    }
    };
    
    useEffect(() => {
        const savedDomainId = localStorage.getItem('selectedDomainId');
        if (savedDomainId && domainApproved.length > 0) {
            setSelectedDomainId(savedDomainId);
        }
        console.log(savedDomainId)
    }, [domainApproved]); // Run this effect when plans are set

    useEffect(() => {
        // If a plan is selected, add it to the cart
        if (selectedDomainId) {
            const selectedDomain = domainApproved.find((p) => p.id == selectedDomainId);
            console.log(selectedDomain)
            if (selectedDomain) {
                dispatch(addToCart(selectedDomain));
            }
        }
    }, [selectedDomainId, domainApproved, dispatch]); // Ensure to run only when selectedPlanId or plans change

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/user/v1/domains/my_domains', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setAllDomainRequest(response.data)
                      setDomainApproved(response.data.approve_domains)
                      setDomainPending(response.data.pending_domains)
                      setDomainRejected(response.data.rejected_domains)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStoresData(); 
    }, []);

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
    
        if (!domainRequest) {
            auth.toastError('Please Enter Domain Name.');
            return;
        }
        if (!selectStoreId) {
            auth.toastError('Please Select Store.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', domainRequest);
        formData.append('store_id', selectStoreId);
    
        for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
        }        
    
        setIsLoading(true);
        try {
            const response = await axios.post(' https://clientbcknd.food2go.online/user/v1/domains/add_domain',formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
                },
            });
            console.log(response)
    
            if (response.status === 200) {
                auth.toastSuccess('Domain Send successfully!');
                  // Clear the input fields on success
                setDomainRequest('');
                setSelectStore('Select Store'); // Or an empty string '' if that fits your requirements better
                setSelectStoreId(''); // Or an empty string '' if that fits your requirements better
                // handleGoBack();
                setActiveTab("pending")
                window.location.reload(true);
            } else {
                auth.toastError('Failed to Send Domain.');
            }
        } catch (error) {
            toast.error(error.response.data.faild)
            setDomainRequest('');
            setSelectStore('Select Store'); // Or an empty string '' if that fits your requirements better
            setSelectStoreId(''); // Or an empty string '' if that fits your requirements better
            const errorMessages = error?.response?.data.errors;
            let errorMessageString = 'Error occurred';
    
            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }
            // auth.toastError('Error', errorMessageString);
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
      
    if (!alldomainRequest) {
        return (
            <>
            {/* <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No domain Request data available</div>; */}
            <form onSubmit={handleSubmitAdd} className="w-full flex flex-col gap-y-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg">
            <div className="w-full flex flex-col gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h1 className="text-3xl text-mainColor font-bold tracking-tight mb-4">{t('Request Your Custom Domain')}</h1>

                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Dropdown and Input Group */}
                <div className="flex flex-col md:flex-row w-full border border-mainColor rounded-lg shadow-sm">
                    
                    {/* Dropdown Menu */}
                    <div className="w-full lg:w-[40%] p-3 flex items-center">
                    <DropDownMenu
                        ref={dropdownStoreRef}
                        handleOpen={handleOpenSelectStore}
                        handleOpenOption={handleSelectStore}
                        stateoption={selectStore}
                        openMenu={openSelectStore}
                        options={storeData}
                        borderWidth={0}
                    />
                    </div>

                    {/* Input Field */}
                    <input
                    className="p-4 font-semibold text-lg w-full bg-gray-50 border-l border-gray-200 rounded-r-lg focus:bg-white focus:border-mainColor focus:ring-2 focus:ring-mainColor/30 outline-none transition-all duration-300 ease-in-out"
                    type="text"
                    placeholder={t("Enter Domain Name")}
                    value={domainRequest}
                    onChange={(e) => setDomainRequest(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div className=" flex items-center justify-center">
                    <Button
                        type="submit"
                        Text={t("send")}
                        BgColor="bg-mainColor hover:bg-mainColor/90 transition duration-200 ease-in-out"
                        Color="text-white"
                        Width="w-full md:w-auto"
                        Size="text-xl"
                        px="px-16"
                        py="py-3"
                        rounded="rounded-full shadow-md"
                    />
                </div>
                </div>
            </div>
            </form>
            </>
        )
    }

    return(
        <div>

            <form onSubmit={handleSubmitAdd} className="w-full flex flex-col gap-y-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg">
            <div className="w-full flex flex-col gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h1 className="text-3xl text-mainColor font-bold tracking-tight mb-4">{t('Request Your Custom Domain')}</h1>

                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Dropdown and Input Group */}
                <div className="flex flex-col md:flex-row w-full border border-mainColor rounded-lg shadow-sm">
                    
                    {/* Dropdown Menu */}
                    <div className="w-full lg:w-[40%] p-3 flex items-center">
                    <DropDownMenu
                        ref={dropdownStoreRef}
                        handleOpen={handleOpenSelectStore}
                        handleOpenOption={handleSelectStore}
                        stateoption={selectStore}
                        openMenu={openSelectStore}
                        options={storeData}
                        borderWidth={0}
                    />
                    </div>

                    {/* Input Field */}
                    <input
                    className="p-4 font-semibold text-lg w-full bg-gray-50 border-l border-gray-200 rounded-r-lg focus:bg-white focus:border-mainColor focus:ring-2 focus:ring-mainColor/30 outline-none transition-all duration-300 ease-in-out"
                    type="text"
                    placeholder={t("Enter Domain Name")}
                    value={domainRequest}
                    onChange={(e) => setDomainRequest(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div className=" flex items-center justify-center">
                    <Button
                        type="submit"
                        Text={t("send")}
                        BgColor="bg-mainColor hover:bg-mainColor/90 transition duration-200 ease-in-out"
                        Color="text-white"
                        Width="w-full md:w-auto"
                        Size="text-xl"
                        px="px-16"
                        py="py-3"
                        rounded="rounded-full shadow-md"
                    />
                </div>
                </div>
            </div>
            </form>

            <div className='mt-10 mb-10'>
                <h1 className='font-semibold text-center text-3xl'>{t("Domains Requests")}</h1>
                <div>
                <div className="flex w-full gap-3 mt-5 mb-5">
                        {/* Tab buttons */}
                        <div className='sm:w-2/4'> 
                        <Button
                        Text={t("Pending Requests")}
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "pending" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "pending" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("pending")}
                        />
                        </div>
                        <div className='sm:w-2/4'> 
                        <Button
                        Text={t("Approved Requests")}
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "Approved" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "Approved" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("Approved")}
                        />
                        </div>
                        <div className='sm:w-2/4'> 
                        <Button
                        Text={t("Rejected Requests")}
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "Rejected" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "Rejected" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("Rejected")}
                        />
                        </div>            
                    </div>
                {activeTab === "pending" &&(
                    <>
                    {domainPendding.length !== 0 ?(
                        <>
                        <div className='w-full flex flex-col gap-10'>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                            {domainPendding.map((domain, index) => (
                                <>
                                    <div key={domain.id} className="lg:w-[80%] xl:w-[30%] text-mainColor sm:w-full border border-mainColor rounded-2xl">
                                        <div className='mb-2 p-4 pb-0 text-xl md:text-2xl xl:text-2xl font-semibold'>
                                            <h1 className='p-2'><span>{t("domain")} : </span>{domain.name || '-'}</h1>
                                            {/* <h1 className='p-2'><span>Price : </span>{domain.price || '-'}</h1> */}
                                            <h1 className='p-2'><span>{t("store")} : </span>{domain.store?.store_name || '-'}</h1>
                                            {/* <h1 className='p-2'><span>Renew Date : </span>{domain.renewdate || '-'}</h1> */}
                                            <h1 className='p-2 text-gray-500'><span className='text-mainColor'>{t("status")} : </span>{domain.status === 1? t("pending") : t("pending")}</h1>
                                        </div>
                                    </div>       
                                </>
                            ))}
                            </div>
                        </div>
                        </>
                    ):(
                            <>
                            <div className='w-full flex flex-col gap-5 justify-center items-center'>
                                    <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>{t("noPendingRequests")}</h1>
                            </div>
                            </>
                    )
                    }
                    </>
                )}

                {activeTab === "Approved" &&(
                    <>
                    {domainApproved.length !== 0 ?(
                        <>
                        <div className='w-full flex flex-col gap-10'>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                           {domainApproved.map((domain, index) => (
                                <div
                                    key={domain.id}
                                    className={`lg:w-[80%] xl:w-[30%] sm:w-full border rounded-md transition-all relative ${selectedDomainId == domain.id ? 'border-green-500 bg-green-50 shadow-lg' : 'border-mainColor'}`}
                                >
                                    {/* "Selected" Label */}
                                    {selectedDomainId == domain.id && (
                                    <div className="absolute top-0 right-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-md shadow-md">
                                       {t("selected")}
                                    </div>
                                    )}

                                    {/* Domain Details Section */}
                                    <div className="p-6 text-lg md:text-xl xl:text-2xl font-semibold text-mainColor space-y-4">
                                    <h1><span className="font-medium">{t("domain")}:</span> {domain.name || '-'}</h1>
                                    <h1><span className="font-medium">{t("price")}:</span> {domain.price || '-'}</h1>
                                    <h1><span className="font-medium">{t("store")}:</span> {domain.store?.store_name || '-'}</h1>
                                    {/* <h1><span className="font-medium">Renew Date:</span> {domain.renewdate || '-'}</h1> */}
                                    <h1 className="text-green-600"><span className="font-medium text-mainColor">{t("status")}:</span> {domain.status === 1 ? t('approved') : 'Approved'}</h1>
                                    </div>

                                    {/* Button Section */}
                                    <div className={`text-center font-semibold border-t-2 ${selectedDomainId == domain.id ? 'border-green-500' : 'border-mainColor'}`}>
                                    {selectedDomainId != domain.id ? (
                                        <button
                                        onClick={() => handleAddToCart(domain,event)}
                                        className="w-full p-4 font-semibold text-xl bg-mainColor text-white hover:bg-mainColor"
                                        >
                                        {t("Add to Cart")}
                                        </button>
                                    ) : (
                                        <div className="flex">
                                        <button
                                            onClick={() => handleAddToCart(domain,event)} // Remove from cart logic
                                            className="w-full py-3 text-xl font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md"
                                        >
                                          {t("Remove from Cart")}
                                        </button>
                                        <button
                                        onClick={() => navigate('../cart')} // Go to cart page
                                            className="w-full py-3 text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md "
                                        >
                                           {t("Go to Cart")}
                                        </button>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        </>
                    ):(
                            <>
                            <div className='w-full flex flex-col gap-5 justify-center items-center'>
                                    <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>{t("noApprovedRequests")}</h1>
                            </div>
                            </>
                    )
                    }
                    </>
                )}

                {activeTab === "Rejected" &&(
                    <>
                    {domainRejected.length !== 0 ?(
                        <>
                        <div className='w-full flex flex-col gap-10'>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                            {domainRejected.map((domain, index) => (
                                <>
                                    <div key={domain.id} className="lg:w-[80%] xl:w-[30%] text-mainColor sm:w-full border border-mainColor rounded-2xl">
                                        <div className='mb-2 p-4 pb-0 text-xl md:text-2xl xl:text-2xl font-semibold'>
                                            <h1 className='p-2'><span>{t("domain")} : </span>{domain.name || '-'}</h1>
                                            <h1 className='p-2'><span>{("price")} : </span>{domain.price || '-'}</h1>
                                            <h1 className='p-2'><span>{t("store")} : </span>{domain.store?.store_name || '-'}</h1>
                                            {/* <h1 className='p-2'><span>Renew Date : </span>{domain.renewdate || '-'}</h1> */}
                                            <h1 className='p-2 text-red-500'><span className='text-mainColor'>{t("status")} : </span>{domain.status === 0? t("Rejected") :t('Rejected')}</h1>
                                            <h1 className='p-2'>
                                                <span>{t("rejectedReason")}
                                                : </span>
                                                <button 
                                                    className="text-red-500 underline cursor-pointer" 
                                                    onClick={() => handleViewReason(domain.rejected_reason)}>
                                                    {t("view")}
                                                </button>
                                            </h1>                                       
                                        </div>
                                    </div>       
                                </>
                            ))}
                              {/* Modal for displaying the rejection reason */}
                                {showModal && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                            <h2 className="text-2xl font-bold mb-4">{t("rejectedReason")}</h2>
                                            <p className="text-lg mb-4">{selectedReason}</p>
                                            <button 
                                                className="bg-mainColor text-white px-4 py-2 rounded" 
                                                onClick={closeModal}>
                                                {t("close")}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        </>
                    ):(
                            <>
                            <div className='w-full flex flex-col gap-5 justify-center items-center'>
                                    <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>{t("noRejectedRequests")}</h1>
                            </div>
                            </>
                    )
                    }
                    </>
                )}
                </div>

            </div>

        </div>
    )
}

export default BuyDomainPage;