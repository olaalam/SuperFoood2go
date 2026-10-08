import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdCheck } from "react-icons/md";

const PaymentPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState('');
    const [paymentHistoryChanged, setPaymentHistoryChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/payment/show/history', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPaymentHistory(response.data.payment)
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

    const openModal = (orders) => {
        setSelectedOrders(orders);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrders([]);
      };

    const handleOpenDialog = (paymentId) => {
       setOpenDialog(paymentId);
       };

    const handleCloseDialog = () => {
            setOpenDialog(null);
    };

       const handleDelete = async (paymentId) => {
              setIsDeleting(true);
              const success = await deletePayment(paymentId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     setPaymentChanged(!paymentChanged)
                     auth.toastSuccess('Payment Method deleted successfully!');
                     setPayments((prevPayment) =>
                        prevPayment.filter((payment) => payment.id !== paymentId)
                     );
              } else {
                     auth.toastError('Failed to delete Payment Method.');
              }
       };

       const deletePayment = async (paymentId, authToken) => {
              try {
                     const response = await axios.delete(`https://transitstation.online/api/admin/payment/show/history/delete/${paymentId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('payment history deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete payment history:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting payment history:', error);
                     return false;
              }
       };


    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
    if (!paymentHistory) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Payment history data available</div>;
    }

       return (
              <>
              <div className='w-full flex flex-col gap-10'>
                <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                        <table className="w-full sm:min-w-0">
                        <thead className="w-full">
                                <tr className="w-full border-b-2">
                                <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Payment Method</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Orders</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                </tr>
                        </thead>
                        <tbody className="w-full">
                                {paymentHistory.map((payment, index) => (
                                        <tr className="w-full border-b-2" key={payment.id}>
                                                <td
                                                        className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                        {index + 1}
                                                </td>
                                                <td
                                                        className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                        {payment?.user?.name || 'Null'}
                                                </td>
                                                <td
                                                        className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                        {payment?.user?.email || 'Null'}
                                                </td>
                                                <td
                                                        className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                        {payment?.user?.phone || 'Null'}
                                                </td>
                                                <td
                                                        className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                        {payment?.payment_method?.name || 'Null'}
                                                </td>
                                                <td
                                                        className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                        <button
                                                        onClick={() => openModal(payment.orders)}
                                                        className="text-mainColor underline"
                                                        >
                                                        View Services
                                                        </button>
                                                </td>
                                                <td
                                                        className={`min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center ${payment.status === "approved" ? "text-green-500" : "text-red-500"} text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden`}>
                                                        {payment?.status || '_'}
                                                </td>
                                        </tr>
                                ))}
                        {isModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full overflow-y-auto max-h-96">
                                <h2 className="text-3xl font-bold mb-4 text-gray-800">Service Details</h2>
                                <ul className="space-y-6">
                                {selectedOrders.map((order, idx) => (
                                        <li key={idx} className="border-b pb-4">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Service {idx + 1}</h3>
                                        
                                        {/* Plan Section */}
                                        {order.plans && (
                                        <div className="mb-4">
                                        <h4 className="text-xl font-semibold text-blue-600">Plan Details</h4>
                                        <div className="text-gray-700 pl-4 text-xl">
                                        <p><span className="font-semibold">Name:</span> {order.plans?.name || '-'}</p>
                                        <p><span className="font-semibold">Total Price : </span>{order.price_item || '0.00'} LE</p>
                                        <p><span className="font-semibold">Duration: </span>{order.price_cycle || '-'}</p>
                                        {/* <p><span className="font-semibold">Price Per Year: </span>{order.plans?.price_per_year || '0.00'} LE</p> */}
                                        <p><span className="font-semibold">Limit Store:</span> {order.plans?.limet_store || 'N/A'}</p>
                                        <p><span className="font-semibold">Included App:</span> {order.plans?.app === "1" ?"True" : "False" || 'N/A'}</p>
                                        </div>
                                        </div>
                                        )}

                                        {/* Domain Section */}
                                        {order.domain && (
                                        <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-green-600">Domain Details</h4>
                                        <div className="text-gray-700 pl-4 text-xl">
                                                <p><span className="font-semibold">Domain Name:</span> {order.domain.name || '-'}</p>
                                                <p><span className="font-semibold">Total Price :</span> {order.price_cycle || '-'}</p>
                                                <p><span className="font-semibold">Store Name:</span> {order.domain.status || '-'}</p>
                                        </div>
                                        </div>
                                        )}

                                        {order.extra && order.extra !== null && (
                                        <div>
                                        <h4 className="text-lg font-semibold text-purple-600">Extra Product</h4>
                                        <div className="text-gray-700 pl-4 text-xl">
                                                <p><span className="font-semibold">Product Name:</span> {order.extra?.name || '-'}</p>
                                                <p><span className="font-semibold">Total Price : </span>{order.price_item || '0.00'} LE</p>
                                                <p><span className="font-semibold">Duration: </span>{order.price_cycle || '-'}</p>
                                        </div>
                                        </div>
                                        )}
                                        </li>
                                ))}
                                </ul>
                                <div className='flex items-center justify-center'>
                                <button
                                onClick={closeModal}
                                className="mt-6 bg-mainColor text-center text-xl text-white py-2 px-6 rounded hover:bg-blue-600"
                                >
                                Close
                                </button>
                                </div>
                                </div>
                                </div>
                        )}
                        </tbody>
                        </table>
                </div>
              </div>
              </>
       )
}

export default PaymentPage
