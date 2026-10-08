import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const PendingPaymentPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentsPending, setPaymentsPending] = useState('');
    const [paymentsPendingChanged, setPaymentsPendingChanged] = useState(false);
    const [openViewPhoto, setOpenViewPhoto] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

const [showPopup, setShowPopup] = useState(false);
const [selectedOption, setSelectedOption] = useState("");
const [selectedPaymentId, setSelectedPaymentId] = useState(null);
const [rejectReason, setRejectReason] = useState("");
const [paymentStatuses, setPaymentStatuses] = useState({});

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedOrders, setSelectedOrders] = useState([]);

    const handleCloseViewPhoto = () => {
        setOpenViewPhoto(null);
      };
      const handleOpenViewPhoto = (paymentId) => {
        setOpenViewPhoto(paymentId);
      };
        // Handle the option change
      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value !== "Reject") {
          setRejectReason(""); // Clear reject reason if not rejecting
        }
      };
    
      // Handle rejection reason input
      const handleRejectReasonChange = (event) => {
        setRejectReason(event.target.value);
      };
    
      // Close the popup
      const closePopup = () => {
        setShowPopup(false);
        setSelectedOption("");
        setSelectedPaymentId(null);
        setRejectReason(""); // Clear the reason input
      };

      const openModal = (orders) => {
        setSelectedOrders(orders);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrders([]);
      };
    
      const handleDone = async () => {
        if (selectedOption && selectedPaymentId) {
          console.log(selectedPaymentId)
          console.log(rejectReason || "Approved")
          try {
            let response;
            if (selectedOption === "Approve") {
              response = await axios.post(` https://clientbcknd.food2go.online/admin/v1/payment/approve/${selectedPaymentId}`, {}, {
                headers: {
                  Authorization: `Bearer ${auth.user.token}`,
                },
              });
            } else if (selectedOption === "Reject") {
              response = await axios.post(` https://clientbcknd.food2go.online/admin/v1/payment/rejected/${selectedPaymentId}`,
                {
                        rejected_reason: rejectReason
                },
                {
                  headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                  },
                });
            }
    
            if (response.status === 200) {
              console.log(`${selectedOption} Action sent successfully`);
              // Optionally, refresh the payments list or handle success here
              // Update the paymentStatuses state based on the selected option
              setPaymentStatuses(prevStatuses => ({
                ...prevStatuses,
                [selectedPaymentId]: selectedOption
              }));
              window.location.reload();
            } else {
              console.error(`Failed to send ${selectedOption} action`);
            }
          } catch (error) {
            console.error('Error sending action:', error);
          }
        }
        closePopup();
      };

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/payment/show/pending', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPaymentsPending(response.data.payment)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [paymentsPendingChanged]);

   

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
    if (!paymentsPending) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Pending payments data available</div>;
    }
       return (
        <>
        <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
            <table className="w-full sm:min-w-0">
                <thead className="w-full">
                    <tr className="w-full border-b-2">
                        <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                        <th className="min-w-[200px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th>
                        <th className="min-w-[200px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">PaymentMethod</th>
                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Amount</th>
                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Orders</th>
                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Receipt</th>
                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                        {paymentsPending.map((payment, index) => (

                            <tr className="w-full border-b-2" key={payment.id}>
                                    <td
                                            className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {index + 1}
                                    </td>
                                    <td
                                            className="min-w-[150px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.user?.name || '_'}
                                    </td>
                                    <td
                                            className="min-w-[150px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.user?.email || '_'}
                                    </td>
                                    <td
                                            className="min-w-[150px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.user?.phone || '_'}
                                    </td>
                                    <td
                                            className="min-w-[150px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.payment_method?.name || '_'}
                                    </td>
                                    <td
                                            className="min-w-[150px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
{payment?.updated_at ? payment.updated_at.split("T")[0] : '_'}
</td>
                                    <td
                                            className="min-w-[150px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.amount || '_'}
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
                                    <td className="px-4 py-3 text-center">
                                        <span
                                                className="cursor-pointer text-mainColor font-semibold underline"
                                                onClick={() => handleOpenViewPhoto(payment.id)}
                                                >
                                                View
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                        onClick={() => {
                                                setSelectedPaymentId(payment.id);
                                                setShowPopup(true);
                                        }}
                                        className={`w-full py-2 px-4 rounded text-white font-medium ${paymentStatuses[payment.id] === "Approve"
                                                ? "bg-green-500"
                                                : paymentStatuses[payment.id] === "Reject"
                                                ? "bg-red-500"
                                                : "bg-thirdColor"
                                                }`}
                                        >
                                        {paymentStatuses[payment.id] || "Pending"}
                                        </button>
                                   </td>
                                        {openViewPhoto === payment.id && (
                                        <Dialog
                                        open={true}
                                        onClose={handleCloseViewPhoto}
                                        className="relative z-10"
                                        >
                                        {/* Backdrop */}
                                        <div
                                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                                onClick={handleCloseViewPhoto}
                                        />

                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                <div className="p-6">
                                                <span className="ml-6 text-3xl font-semibold text-mainColor border-b-2 border-mainColor">Receipt</span>
                                                </div>

                                                {/* Image Container */}
                                                <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                <img
                                                        src={payment.invoice_image_link|| '-'}
                                                        className="w-[400px] h-[450px] object-contain object-center rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                                                        alt="Receipt"
                                                        loading="lazy"
                                                />
                                                </div>

                                                {/* Dialog Footer */}
                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                        type="button"
                                                        onClick={handleCloseViewPhoto}
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark transition-colors duration-300 focus:outline-none"
                                                >
                                                        Close
                                                </button>
                                                </div>

                                                </DialogPanel>
                                                </div>
                                        </div>
                                        </Dialog>
                                        )}
                                        {showPopup && (
                                                <div className="fixed top-0 inset-0 left-0 w-full h-full bg-gray-500 bg-opacity-5 z-50 flex justify-center items-center">
                                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                                <h2 className="text-2xl text-mainColor font-semibold mb-6">Choose Action</h2>
                                                <div className="flex flex-col gap-4">
                                                <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                                                        <input
                                                        type="radio"
                                                        value="Approve"
                                                        checked={selectedOption === "Approve"}
                                                        onChange={handleOptionChange}
                                                        className="w-6 h-6 cursor-pointer"
                                                        />
                                                        Approve
                                                </label>
                                                <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                                                        <input
                                                        type="radio"
                                                        value="Reject"
                                                        checked={selectedOption === "Reject"}
                                                        onChange={handleOptionChange}
                                                        className="w-6 h-6 cursor-pointer"
                                                        />
                                                        Reject
                                                </label>

                                                {selectedOption === "Reject" && (
                                                        <div className="flex flex-col">
                                                        <label className="text-mainColor mb-2 font-medium" htmlFor="rejectReason">
                                                        Reason for Rejection:
                                                        </label>
                                                        <input
                                                        id="rejectReason"
                                                        type="text"
                                                        value={rejectReason}
                                                        onChange={handleRejectReasonChange}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                        placeholder="Enter rejection reason"
                                                        />
                                                        </div>
                                                )}
                                                </div>

                                                <div className="mt-6 flex justify-between">
                                                <button
                                                        onClick={handleDone}
                                                        className="bg-mainColor text-white py-2 px-4 rounded shadow hover:bg-mainColor-dark transition"
                                                >
                                                        Done
                                                </button>
                                                <button
                                                        onClick={closePopup}
                                                        className="text-red-600 py-2 px-4 hover:underline"
                                                >
                                                        Cancel
                                                </button>
                                                </div>
                                                </div>
                                                </div>
                                        )} 
                                        {isModalOpen && (
                                                <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center">
                                                <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full overflow-y-auto max-h-96">
                                                <h2 className="text-3xl font-bold mb-4 text-gray-800">Service Details</h2>
                                                <ul className="space-y-6">
                                                {selectedOrders.map((order, idx) => (
                                                        <li key={idx} className="border-b pb-4">
                                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Service</h3>
                                                        
                                                        {/* Plan Section */}
                                                        {order.plans && (
                                                        <div className="mb-4">
                                                        <h4 className="text-xl font-semibold text-blue-600">Plan Details</h4>
                                                        <div className="text-gray-700 pl-4 text-xl">
                                                        <p><span className="font-semibold">Name:</span> {order.plans?.name || '-'}</p>
                                                        <p><span className="font-semibold">Duration: </span>{order?.price_cycle || '-'} </p>
                                                        <p><span className="font-semibold">SetUp Fees: </span>{order.plans?.setup_fees || '0.00'} LE</p>
                                                        {
                                                        order.price_cycle === "monthly" ? (
                                                                <p>
                                                                <span className="font-semibold">Price: </span>
                                                                {order.plans?.discount_monthly || order.plans?.monthly || '0.00'} LE
                                                                </p>
                                                        ) : order.price_cycle === "quarterly" ? (
                                                                <p>
                                                                <span className="font-semibold">Price: </span>
                                                                {order.plans?.discount_quarterly || order.plans?.quarterly || '0.00'} LE
                                                                </p>
                                                        ) : order.price_cycle === "semi_annual" ? (
                                                                <p>
                                                                <span className="font-semibold">Price: </span>
                                                                {order.plans?.discount_semi_annual || order.plans?.semi_annual || '0.00'} LE
                                                                </p>
                                                        ) : order.price_cycle === "yearly" ? (
                                                                <p>
                                                                <span className="font-semibold">Price: </span>
                                                                {order.plans?.discount_yearly || order.plans?.yearly || '0.00'} LE
                                                                </p>
                                                        ) : null
                                                        }
                                                        <p><span className="font-semibold">Total: </span>{order.price_item || '0.00'} LE</p>
                                                        {/* <p><span className="font-semibold">Price Per Year: </span>{order.plans?.price_per_year || '0.00'} LE</p> */}
                                                        {/* <p><span className="font-semibold">Limit Store:</span> {order.plans?.limet_store || 'N/A'}</p> */}
                                                        {/* <p><span className="font-semibold">Included App:</span> {order.plans?.app === "1" ?"True" : "False" || 'N/A'}</p> */}
                                                        </div>
                                                        </div>
                                                        )}

                                                        {/* Domain Section */}
                                                        {order.domain && (
                                                        <div className="mb-4">
                                                        <h4 className="text-lg font-semibold text-green-600">Domain Details</h4>
                                                        <div className="text-gray-700 pl-4 text-xl">
                                                                <p><span className="font-semibold">Domain Name:</span> {order.domain.name || '-'}</p>
                                                                <p><span className="font-semibold">Price:</span> {order.domain.price || '-'}</p>
                                                                <p><span className="font-semibold">Store Name:</span> {order.domain.status || '-'}</p>
                                                        </div>
                                                        </div>
                                                        )}

                                                        {order.extra && order.extra !== null && (
                                                                <div className="mb-4">
                                                                <h4 className="text-xl font-semibold text-blue-600">Plan Details</h4>
                                                                <div className="text-gray-700 pl-4 text-xl">
                                                                <p><span className="font-semibold">Name:</span> {order.extra?.name || '-'}</p>
                                                                <p><span className="font-semibold">Duration: </span>{order?.price_cycle || '-'} </p>
                                                                <p><span className="font-semibold">SetUp Fees: </span>{order.extra?.setup_fees || '0.00'} LE</p>
                                                                {order.extra?.status === "one_time" ?
                                                                (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {order.extra?.discount_monthly || order.extra?.price || '0.00'} LE
                                                                        </p>      
                                                                ):(
                                                                order.price_cycle === "monthly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {order.extra?.discount_monthly || order.extra?.monthly || '0.00'} LE
                                                                        </p>
                                                                ) : order.price_cycle === "quarterly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {order.extra?.discount_quarterly || order.extra?.quarterly || '0.00'} LE
                                                                        </p>
                                                                ) : order.price_cycle === "semi_annual" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {order.extra?.discount_semi_annual || order.plans?.semi_annual || '0.00'} LE
                                                                        </p>
                                                                ) : order.price_cycle === "yearly" ? (
                                                                        <p>
                                                                        <span className="font-semibold">Price: </span>
                                                                        {order.extra?.discount_yearly || order.extra?.yearly || '0.00'} LE
                                                                        </p>
                                                                ) : null)
                                                                }
                                                                <p><span className="font-semibold">Total: </span>{order.price_item || '0.00'} LE</p>
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
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
        </>
       )
}

export default PendingPaymentPage
