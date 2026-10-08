import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdCheck } from "react-icons/md";
import CheckBox from '../../../Components/CheckBox';
import PaymentModel from '../../../Components/PaymentModel';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { convertNumberToArabic } from '../../../Components/convert_number';

const PaymentHistoryPage = () => {
        const { t } = useTranslation();

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState([]);
//     const [storeChanged, setStoreChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(false);

    const openPaymentModel = (payment) => {
        setSelectedPayment(payment);
        setIsPaymentModalOpen(true);
      };
      const closePaymentModel = () => {
        setSelectedPayment([]);
        setIsPaymentModalOpen(false);
      };


    const openModal = (orders) => {
        setSelectedOrders(orders);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrders([]);
      };

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(i18n.language==="ar" ? ' https://clientbcknd.food2go.online/user/v1/payment/history?locale=ar' :' https://clientbcknd.food2go.online/user/v1/payment/history', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPaymentHistory(response.data.payment_history)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [i18n.language]);

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
//     if (!paymentHistory <0) {
//         return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No payment history data available</div>;
//     }

       return (
              <>
              {paymentHistory.length !== 0 ?(
              <>
                <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                        <table className="w-full sm:min-w-0">
                                <thead className="w-full">
                                        <tr className="w-full border-b-2"> 
                                        <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">{t("Payment Method")}</th>
                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">{t("Service")}</th>
                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">{t("Invoice")}</th>
                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">{t("Action")}</th>
                                        </tr>
                                </thead>
                                <tbody className="w-full">
                                        {paymentHistory.map((payment, index) => (
                                                <tr className="w-full border-b-2" key={payment.id}>
                                                        <td
                                                                className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {convertNumberToArabic(index + 1,i18n.language)}
                                                        </td>
                                                        <td
                                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {payment?.payment_method?.name || '_'}
                                                        </td>
                                                        <td
                                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                <button
                                                                onClick={() => openModal(payment.orders)}
                                                                className="text-mainColor underline"
                                                                >
                                                                {t("View Services")}
                                                                </button>
                                                        </td>
                                                        <td
                                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                <button
                                                                onClick={() => openPaymentModel(payment)}
                                                                className="text-mainColor underline"
                                                                >
                                                                {t("View Invoice")}
                                                                </button>
                                                        </td>
                                                        <td
                                                                className={`min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center ${payment.status === "approved" ? "text-green-500" : "text-red-500"} text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden`}>
                                                                {t(payment?.status) || '_'}
                                                        </td>
                                                </tr>
                                        ))}
                                </tbody>
                        </table>

                        {isPaymentModalOpen && selectedPayment && (
                                <PaymentModel payment={selectedPayment} closeModal={closePaymentModel} />
                        )}

                        {isModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full overflow-y-auto max-h-96">
                                <h2 className="text-3xl font-bold mb-4 text-gray-800">{t("Service Details")}</h2>
                                <ul className="space-y-6">
                                {selectedOrders.map((order, idx) => (
                                        <li key={idx} className="border-b pb-4">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t("Service")} {idx + 1}</h3>
                                        
                                        {/* Plan Section */}
                                        {order.plans && (
                                        <div className="mb-4">
                                        <h4 className="text-xl font-semibold text-blue-600">{t("Plan Details")}</h4>
                                        <div className="text-gray-700 pl-4 text-xl">
                                        <p><span className="font-semibold">{t("name")}:</span> {order.plans?.name || '-'}</p>
                                        <p><span className="font-semibold">{t("SetUp Fees")}: </span>{order.plans?.setup_fees || '0.00'} {t("LE")}</p>
                                        <p><span className="font-semibold">{t("Price Per Month")}: </span>{order.plans?.price_per_month || '0.00'} {t("LE")}</p>
                                        <p><span className="font-semibold">{t("Price Per Year")}: </span>{order.plans?.price_per_year || '0.00'} {t("LE")}</p>
                                        <p><span className="font-semibold">{t("Limit Store")}:</span> {order.plans?.limet_store || 'N/A'}</p>
                                        <p><span className="font-semibold">{t("Included App")}:</span> {order.plans?.app === "1" ?t("True") : t("False") || 'N/A'}</p>
                                        </div>
                                        </div>
                                        )}

                                        {/* Domain Section */}
                                        {order.domain && (
                                        <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-green-600">{t("Domain Details")}</h4>
                                        <div className="text-gray-700 pl-4 text-xl">
                                                <p><span className="font-semibold">{t("Domain Name")}:</span> {order.domain.name || '-'}</p>
                                                <p><span className="font-semibold">{t("Price")}:</span> {order.domain.price || '-'}</p>
                                                <p><span className="font-semibold">{t("Store Name")}:</span> {order.domain.status || '-'}</p>
                                        </div>
                                        </div>
                                        )}

                                        {order.extra && order.extra !== null && (
                                        <div>
                                        <h4 className="text-lg font-semibold text-purple-600">{t("Extra Product")}</h4>
                                        <div className="text-gray-700 pl-4 text-xl">
                                                <p><span className="font-semibold">{t("Product Name")}:</span> {order.extra?.name || '-'}</p>
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
                                {t("close")}
                                </button>
                                </div>
                                </div>
                                </div>
                        )}
                </div>
              </>

              ):(
                     <>
                     <div className='w-full flex flex-col gap-5 justify-center items-center'>
                            <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>{t("No payment history data available")}</h1>
                     </div>
                     </>
              )
              }
              </>
       )
}

export default PaymentHistoryPage
