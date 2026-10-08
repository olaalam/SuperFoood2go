import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {Button} from '../../../Components/Button'
import {ButtonAdd} from '../../../Components/Button'
import { Link ,useNavigate} from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const OrderPage = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [storeLink, setStoreLink] = useState('');
    const [storeCpanel, setStoreCpanel] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("pending");
    const [orders, setOrders] = useState('');
    const [orderChanged, setOrderChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

const [selectedOrder, setSelectedOrder] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [newStatus, setNewStatus] = useState(""); // To track the selected new status

const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

const [isDropdownVisible, setDropdownVisible] = useState(false);

    const openModal = (orders) => {
        setSelectedOrder(orders);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder([]);
      };

      const openStatusModal = (order) => {
        setSelectedOrder(order);
        setIsStatusModalOpen(true);
      };
    
      const closeStatusModal = () => {
        setIsStatusModalOpen(false);
        setSelectedOrder(null);
      };

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/order/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setOrders(response.data.order)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [orderChanged]);

    const updateOrderStatus = async (status,orderId) => {
        // if (!selectedOrder) return;
        setIsLoading(true);
        try {
            const response = await axios.post(` https://clientbcknd.food2go.online/admin/v1/order/update/${orderId}`,{
             order_status:status
            }, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
                },
            });
 
            if (response.status === 200) {
                auth.toastSuccess('Status Updated successfully!');
                setIsStatusModalOpen(false);
                // handleGoBack();
                setOrderChanged(!orderChanged)
                setOrders((prevOrder) =>
                        prevOrder.filter((order) => order.id !== orderId)
                 );
                // setIsLoading(true);
            } else {
                auth.toastError('Failed to Update Status.');
            }
        } catch (error) {    
            console.log(error)
                const errorMessages = error?.response?.data.errors;
                let errorMessageString = 'Error occurred';
                if (errorMessages) {
                    errorMessageString = Object.values(errorMessages).flat().join(' ');}
                auth.toastError('Error', errorMessageString);
    
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusStoreChange = async (status,orderId) => {
        // if (!selectedOrder) return;
        setIsLoading(true);
        try {
            const response = await axios.post(` https://clientbcknd.food2go.online/admin/v1/store/approve`,{
                store_id:orderId,status:status ,email:username ,password:password,link_store:storeLink,link_cbanal:storeCpanel
            }, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
                },
            });
 
            if (response.status === 200) {
                auth.toastSuccess('Status Updated successfully!');
                setIsStatusModalOpen(false);
                // handleGoBack();
                setOrderChanged(!orderChanged)
                setOrders((prevOrder) =>
                        prevOrder.filter((order) => order.id !== orderId)
                 );
                // setIsLoading(true);
            } else {
                auth.toastError('Failed to Update Status.');
            }
        } catch (error) {    
            console.log(error)
                const errorMessages = error?.response?.data.errors;
                let errorMessageString = 'Error occurred';
                if (errorMessages) {
                    errorMessageString = Object.values(errorMessages).flat().join(' ');}
                auth.toastError('Error', errorMessageString);
    
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
      
    if (!orders) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Orders data available</div>;
    }
       return (
              <>
                <div className='w-full'>
                    <div className="flex w-full gap-5 mb-5">
                        {/* Tab buttons */}
                        <div className='sm:w-3/6'> 
                        <Button
                        rounded='rounded-2xl'
                        Text="Pending"
                        Width="full"
                        px="px-1"
                        Size='text-lg'
                        BgColor={activeTab === "pending" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "pending" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("pending")}
                        />
                        </div>      
                        <div className='sm:w-3/6'> 
                        <Button
                         rounded='rounded-2xl'
                        Text="InProgress"
                        Width="full"
                        px="px-1"
                        Size='text-lg'
                        BgColor={activeTab === "InProgress" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "InProgress" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("InProgress")}
                        />
                        </div>  
                        <div className='sm:w-3/6'> 
                        <Button
                         rounded='rounded-2xl'
                        Text="Finished"
                        Width="full"
                        px="px-1"
                        Size='text-lg'
                        BgColor={activeTab === "Finished" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "Finished" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("Finished")}
                        />
                        </div>           
                    </div>

                        {activeTab === "pending" && (
                                <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                <table className="w-full sm:min-w-0">
                                <thead className="w-full">
                                        <tr className="w-full border-b-2">
                                        <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                        <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                        {/* <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th> */}
                                        <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                        <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Order Number</th>
                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Service Name</th>
                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                        <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Details</th>
                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                        </tr>
                                </thead>
                                <tbody className="w-full">
                                {orders
                                .filter(order => order.order_status === "pending")
                                .map((order, index) => (
                                        <tr className="w-full border-b-2" key={order.id}>
                                        <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{index + 1}</td>
                                        <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.name || '-'}</td>
                                        {/* <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.email || '-'}</td> */}
                                        <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.phone || '-'}</td>
                                        <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
                                        <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.order_number || '-'}</td>
                                        <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                        {order.domain?.name || order.plans?.name || order.extra?.name ||order.store?.store_name|| '-'}
                                        </td>
                                        <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.status || '-'} {order.store !== null ?"Store" : order.extra !== null?"Extra" : order.domain !== null ?"Domain" :null }</td>
                                        <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                        <button
                                                onClick={() => openModal(order)}
                                                className="text-mainColor underline"
                                        >
                                                View Services
                                        </button>
                                        </td>
                                        <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                        <button
                                        onClick={() => openStatusModal(order)}
                                        className="px-4 py-2 bg-gray-500 text-white font-medium rounded shadow-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700"
                                        >
                                        {order.order_status ==="pending" ? "Pending" : "Unknown"}
                                        </button>
                                        </td>

                                        </tr>
                                        ))}

                                        {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                        <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full overflow-y-auto max-h-96">
                                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Service Details</h2>
                                        <ul className="space-y-4">
                                                {selectedOrder?.plans && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Plan Details</h4>
                                                <p><b>Name:</b> {selectedOrder.plans?.name || '-'}</p>
                                                <p><b>SetUp Fees:</b> {selectedOrder.plans?.setup_fees || '0.00'} LE</p>
                                                </div>
                                                )}
                                                {selectedOrder?.domain && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Domain Details</h4>
                                                <p><b>Domain Name:</b> {selectedOrder.domain?.name || '-'}</p>
                                                <p><b>Price:</b> {selectedOrder.domain?.price || '0.00'}</p>
                                                </div>
                                                )}
                                                {selectedOrder.extra && selectedOrder.extra !== null && (
                                                                <div className="mb-4">
                                                                <h4 className="text-xl font-semibold text-blue-600">Plan Details</h4>
                                                                <div className="text-gray-700 pl-4 text-xl">
                                                                <p><span className="font-semibold">Name:</span> {selectedOrder.extra?.name || '-'}</p>
                                                                <p><span className="font-semibold">SetUp Fees: </span>{selectedOrder.extra?.setup_fees || '0.00'} LE</p>
                                                                {selectedOrder.extra?.status === "one_time" ?
                                                                (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_monthly || selectedOrder.extra?.price || '0.00'} LE
                                                                        </p>      
                                                                ):(
                                                                        selectedOrder.price_cycle === "monthly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_monthly || selectedOrder.extra?.monthly || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "quarterly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_quarterly || selectedOrder.extra?.quarterly || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "semi_annual" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_semi_annual || selectedOrder.plans?.semi_annual || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "yearly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_yearly || selectedOrder.extra?.yearly || '0.00'} LE
                                                                        </p>
                                                                ) : null)
                                                                }
                                                                <p><span className="font-semibold">Total: </span>{selectedOrder.price_item || '0.00'} LE</p>
                                                                </div>
                                                                </div>
                                                )}
                                                {selectedOrder?.store && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Store Details</h4>
                                                <p><b>Store Name:</b> {selectedOrder.store?.store_name || '-'}</p>
                                                {/* <p><b>Price:</b> {selectedOrder.extra?.price || '0.00'}</p> */}
                                                </div>
                                                )}
                                        </ul>
                                        <button
                                                onClick={closeModal}
                                                className="mt-6 bg-mainColor text-center text-white py-2 px-6 rounded hover:bg-blue-600"
                                        >
                                                Close
                                        </button>
                                        </div>
                                        </div>
                                        )}

                                        {isStatusModalOpen && (
                                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-md p-6">
                                                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                                                        Update Order Status
                                                </h2>
                                                <p className="text-center text-gray-600 mb-4">
                                                        Please select the current status of the order.
                                                </p>
                                                <div className="flex gap-4 justify-center">
                                                        <button
                                                        onClick={() => updateOrderStatus("in_progress", selectedOrder.id)}
                                                        className="flex-1 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-300 active:bg-yellow-700"
                                                        >
                                                        In Progress
                                                        </button>
                                                        <button
                                                        onClick={closeStatusModal}
                                                        className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-700"
                                                        >
                                                                Cancel
                                                        </button>
                                                        {/* <button
                                                        onClick={() => updateOrderStatus("done", selectedOrder.id)}
                                                        className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700"
                                                        >
                                                        Done
                                                        </button> */}
                                                </div>
                                                </div>
                                                </div>
                                        )}
                                </tbody>
                                </table>
                                </div>
                        )}

                        {activeTab === "InProgress" && (
                          <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                          <table className="w-full sm:min-w-0">
                          <thead className="w-full">
                                <tr className="w-full border-b-2">
                                <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                {/* <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th> */}
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Order Number</th>
                                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Service Name</th>
                                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Details</th>
                                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                </tr>
                          </thead>
                          <tbody className="w-full">
                          {orders
                          .filter(order => order.order_status === "in_progress")
                          .map((order, index) => (
                                <tr className="w-full border-b-2" key={order.id}>
                                <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{index + 1}</td>
                                <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.name || '-'}</td>
                                {/* <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.email || '-'}</td> */}
                                <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.phone || '-'}</td>
                                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
                                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.order_number || '-'}</td>
                                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                {order.domain?.name || order.plans?.name || order.extra?.name ||order.store?.store_name|| '-'}
                                </td>
                                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.status || '-'} {order.store !== null ?"Store" : order.extra !== null?"Extra" : order.domain !== null ?"Domain" :null }</td>
                                <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                  <button
                                          onClick={() => openModal(order)}
                                          className="text-mainColor underline"
                                  >
                                          View Services
                                  </button>
                                  </td>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                  <button
                                  onClick={() => openStatusModal(order)}
                                  className="px-4 py-2 bg-yellow-500 text-white font-medium rounded shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700"
                                  >
                                  {order.order_status === "in_progress"? "InProgress" : "Unknown"}
                                  </button>
                                  </td>

                                  </tr>
                                  ))}

                                
                                {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                        <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full overflow-y-auto max-h-96">
                                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Service Details</h2>
                                        <ul className="space-y-4">
                                                {selectedOrder?.plans && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Plan Details</h4>
                                                <p><b>Name:</b> {selectedOrder.plans?.name || '-'}</p>
                                                <p><b>SetUp Fees:</b> {selectedOrder.plans?.setup_fees || '0.00'} LE</p>
                                                </div>
                                                )}
                                                {selectedOrder?.domain && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Domain Details</h4>
                                                <p><b>Domain Name:</b> {selectedOrder.domain?.name || '-'}</p>
                                                <p><b>Price:</b> {selectedOrder.domain?.price || '0.00'}</p>
                                                </div>
                                                )}
                                                {selectedOrder.extra && selectedOrder.extra !== null && (
                                                                <div className="mb-4">
                                                                <h4 className="text-xl font-semibold text-blue-600">Plan Details</h4>
                                                                <div className="text-gray-700 pl-4 text-xl">
                                                                <p><span className="font-semibold">Name:</span> {selectedOrder.extra?.name || '-'}</p>
                                                                <p><span className="font-semibold">SetUp Fees: </span>{selectedOrder.extra?.setup_fees || '0.00'} LE</p>
                                                                {selectedOrder.extra?.status === "one_time" ?
                                                                (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_monthly || selectedOrder.extra?.price || '0.00'} LE
                                                                        </p>      
                                                                ):(
                                                                        selectedOrder.price_cycle === "monthly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_monthly || selectedOrder.extra?.monthly || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "quarterly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_quarterly || selectedOrder.extra?.quarterly || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "semi_annual" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_semi_annual || selectedOrder.plans?.semi_annual || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "yearly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_yearly || selectedOrder.extra?.yearly || '0.00'} LE
                                                                        </p>
                                                                ) : null)
                                                                }
                                                                <p><span className="font-semibold">Total: </span>{selectedOrder.price_item || '0.00'} LE</p>
                                                                </div>
                                                                </div>
                                                )}
                                                {selectedOrder?.store && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Store Details</h4>
                                                <p><b>Store Name:</b> {selectedOrder.store?.store_name || '-'}</p>
                                                {/* <p><b>Price:</b> {selectedOrder.extra?.price || '0.00'}</p> */}
                                                </div>
                                                )}
                                        </ul>
                                        <button
                                                onClick={closeModal}
                                                className="mt-6 bg-mainColor text-center text-white py-2 px-6 rounded hover:bg-blue-600"
                                        >
                                                Close
                                        </button>
                                        </div>
                                        </div>
                                )}

                                {isStatusModalOpen && (
                                <>
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-md p-6">
                                                        {
                                                                selectedOrder?.store_id !== null && selectedOrder?.status !=="delete"  ? (
                                                                        <div>
                                                                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                                                                        Please Enter Store Details
                                                                        </h2>
                                                                        <input
                                                                        type="text"
                                                                        className="flex-1 w-full px-6 py-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                                        placeholder="Enter Username"
                                                                        value={username}
                                                                        onChange={(e) => setUsername(e.target.value)}
                                                                        required
                                                                        />
                                                                        <input
                                                                        type="password"
                                                                        className="flex-1 w-full px-6 py-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                                        placeholder="Enter Password"
                                                                        value={password}
                                                                        required
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        />
                                                                        <input
                                                                        type="url"
                                                                        className="flex-1 w-full px-6 py-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                                        placeholder="Enter Store Link"
                                                                        value={storeLink}
                                                                        required
                                                                        onChange={(e) => setStoreLink(e.target.value)}
                                                                        />
                                                                        <input
                                                                        type="url"
                                                                        className="flex-1 w-full px-6 py-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                                        placeholder="Enter Store Cpanel Link"
                                                                        value={storeCpanel}
                                                                        required
                                                                        onChange={(e) => setStoreCpanel(e.target.value)}
                                                                        />
                                                                                <div>
                                                                        <p className="text-center text-gray-600 mb-4">
                                                                        Please select the current status of the order.
                                                                        </p>
                                                                        <div className="flex gap-4 justify-center">

                                                                        <button
                                                                                onClick={() => handleStatusStoreChange("done",selectedOrder.store_id)}
                                                                                className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700"
                                                                        >
                                                                                Done
                                                                        </button>
                                                                        <button
                                                                        onClick={closeStatusModal}
                                                                        className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-700"
                                                                        >
                                                                                Cancel
                                                                        </button>
                                                                        </div>
                                                                        </div>
                                                                        </div>
                                                                        
                                                                ):(
                                                                <div>
                                                                        <p className="text-center text-gray-600 mb-4">
                                                                        Please select the current status of the order.
                                                                        </p>
                                                                        <div className="flex gap-4 justify-center">
                                                                        {/* <button
                                                                                onClick={() => updateOrderStatus("in_progress",selectedOrder.id)}
                                                                                className="flex-1 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-300 active:bg-yellow-700"
                                                                        >
                                                                                In Progress
                                                                        </button> */}
                                                                        <button
                                                                                onClick={() => updateOrderStatus("done",selectedOrder.id)}
                                                                                className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700"
                                                                        >
                                                                                Done
                                                                        </button>
                                                                        <button
                                                                        onClick={closeStatusModal}
                                                                        className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-700"
                                                                        >
                                                                                Cancel
                                                                        </button>
                                                                        </div>
                                                                </div>
                                                                )
                                                        }
                                                
                                                </div>
                                        </div>
                                </>
                                )}

                          </tbody>
                          </table>
                          </div>
                        )}

                        {activeTab === "Finished" && (
                          <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                          <table className="w-full sm:min-w-0">
                          <thead className="w-full">
                                  <tr className="w-full border-b-2">
                                  <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                  {/* <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th> */}
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Order Number</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Service Name</th>
                                  <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Details</th>
                                  <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                  </tr>
                          </thead>
                          <tbody className="w-full">
                          {orders
                          .filter(order => order.order_status === "done")
                          .map((order, index) => (
                                  <tr className="w-full border-b-2" key={order.id}>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{index + 1}</td>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.name || '-'}</td>
                                  {/* <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.email || '-'}</td> */}
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.users?.phone || '-'}</td>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.order_number || '-'}</td>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                  {order.domain?.name || order.plans?.name || order.extra?.name ||order.store?.store_name|| '-'}
                                  </td>
                                  <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{order.status || '-'} {order.store !== null ?"Store" : order.extra !== null?"Extra" : order.domain !== null ?"Domain" :null }</td>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                  <button
                                          onClick={() => openModal(order)}
                                          className="text-mainColor underline"
                                  >
                                          View Services
                                  </button>
                                  </td>
                                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                  <button
                                  onClick={() => openStatusModal(order)}
                                  className="px-4 py-2 bg-white text-green-600 font-medium rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700"
                                  >
                                        Done
                                  {/* {order.order_status ==="done"?"Done" : "Unknown"} */}
                                  </button>
                                  </td>

                                  </tr>
                                  ))}

                                {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                        <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full overflow-y-auto max-h-96">
                                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Service Details</h2>
                                        <ul className="space-y-4">
                                                {selectedOrder?.plans && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Plan Details</h4>
                                                <p><b>Name:</b> {selectedOrder.plans?.name || '-'}</p>
                                                <p><b>SetUp Fees:</b> {selectedOrder.plans?.setup_fees || '0.00'} LE</p>
                                                </div>
                                                )}
                                                {selectedOrder?.domain && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Domain Details</h4>
                                                <p><b>Domain Name:</b> {selectedOrder.domain?.name || '-'}</p>
                                                <p><b>Price:</b> {selectedOrder.domain?.price || '0.00'}</p>
                                                </div>
                                                )}
                                                {selectedOrder.extra && selectedOrder.extra !== null && (
                                                                <div className="mb-4">
                                                                <h4 className="text-xl font-semibold text-blue-600">Plan Details</h4>
                                                                <div className="text-gray-700 pl-4 text-xl">
                                                                <p><span className="font-semibold">Name:</span> {selectedOrder.extra?.name || '-'}</p>
                                                                <p><span className="font-semibold">SetUp Fees: </span>{selectedOrder.extra?.setup_fees || '0.00'} LE</p>
                                                                {selectedOrder.extra?.status === "one_time" ?
                                                                (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_monthly || selectedOrder.extra?.price || '0.00'} LE
                                                                        </p>      
                                                                ):(
                                                                        selectedOrder.price_cycle === "monthly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_monthly || selectedOrder.extra?.monthly || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "quarterly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_quarterly || selectedOrder.extra?.quarterly || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "semi_annual" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_semi_annual || selectedOrder.plans?.semi_annual || '0.00'} LE
                                                                        </p>
                                                                ) : selectedOrder.price_cycle === "yearly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {selectedOrder.extra?.discount_yearly || selectedOrder.extra?.yearly || '0.00'} LE
                                                                        </p>
                                                                ) : null)
                                                                }
                                                                <p><span className="font-semibold">Total: </span>{selectedOrder.price_item || '0.00'} LE</p>
                                                                </div>
                                                                </div>
                                                )}
                                                {selectedOrder?.store && (
                                                <div>
                                                <h4 className="font-semibold text-lg">Store Details</h4>
                                                <p><b>Store Name:</b> {selectedOrder.store?.store_name || '-'}</p>
                                                {/* <p><b>Price:</b> {selectedOrder.extra?.price || '0.00'}</p> */}
                                                </div>
                                                )}
                                        </ul>
                                        <button
                                                onClick={closeModal}
                                                className="mt-6 bg-mainColor text-center text-white py-2 px-6 rounded hover:bg-blue-600"
                                        >
                                                Close
                                        </button>
                                        </div>
                                        </div>
                                )}

                                {/* {isStatusModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-md p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                                        Update Order Status
                                </h2>
                                <p className="text-center text-gray-600 mb-4">
                                        Please select the current status of the order.
                                </p>
                                <div className="flex gap-4 justify-center">
                                        <button
                                        onClick={() => updateOrderStatus("pending", selectedOrder.id)}
                                        className="flex-1 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-300 active:bg-yellow-700"
                                        >
                                        Pending
                                        </button>
                                        <button
                                        onClick={() => updateOrderStatus("in_progress", selectedOrder.id)}
                                        className="flex-1 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700"
                                        >
                                        InProgress
                                        </button>
                                </div>
                                <button
                                        onClick={closeStatusModal}
                                        className="mt-6 block w-full py-3 bg-gray-900 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-700"
                                >
                                        Cancel
                                </button>
                                </div>
                                </div>
                                )}
                                */}

                          </tbody>
                          </table>
                          </div>
                        )}

      
                </div>
              </>
       )
}

export default OrderPage