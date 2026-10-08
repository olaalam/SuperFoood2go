import React from 'react';
import logo from '../../public/Images/logo.png'

const PaymentModel = ({ payment, closeModal }) => {
  return (
    <div className="w-full fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg  w-full xl:w-3/6 overflow-y-auto max-h-96">
         <div className="w-full mb-5 flex text-white text-xl">
                  <img src={logo} alt="wegoStore" height={100} width={300}/>
         </div>
          
        <div className='w-full flex flex-col xl:flex-row xl:justify-between gap-5'>
          <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-3 text-mainColor'>
                <h2 className="text-2xl font-bold">Order Details :</h2>
                <div className='flex flex-col gap-2 font-semibold text-xl'>
                      <h1>Order Number :{payment?.transaction_id}</h1>
                      <h1>Order Date : {payment?.updated_at}</h1>
                </div>
            </div>

            <div className='flex flex-col gap-3 text-mainColor'>
                <h2 className="text-2xl font-bold">Customer Information :-</h2>
                <div className='flex flex-col gap-2 font-semibold text-xl'>
                      <h1>{payment?.user?.name}</h1>
                      <h1>{payment?.user?.email}</h1>
                      <h1>{payment?.user?.phone}</h1>
                </div>
            </div>
          </div>

          <div className='flex flex-col gap-3 text-mainColor p-0 xl:p-6 pt-0'>
                <h2 className="text-2xl font-bold">Payment Details :</h2>
                <div className='flex flex-col gap-2 font-semibold text-xl bg-mainColor text-white p-4 rounded-2xl'>
                      <h1>{payment?.payment_method?.name}</h1>
                      <h1 className='flex flex-wrap'>Description : <span>{payment?.payment_method?.description}</span></h1>
                      <h1>{payment?.user?.phone}</h1>
                </div>
            </div>
        </div>

        <hr className="border-t-4 border-mainColor my-4" />

        <div className='w-full flex flex-col gap-5'>
          <div className='flex flex-col gap-3 text-mainColor'>
                <h2 className="text-2xl font-bold">Order Summary :</h2>
                <div className='flex flex-col gap-2 font-semibold text-xl'>
                <ul className="space-y-6">
                    {payment.orders.map((order, idx) => (
                            <li key={idx} className="border-b pb-4">
                            {/* <h3 className="text-2xl font-semibold text-gray-800 mb-2">Order {idx + 1}</h3> */}
                            
                            {/* Plan Section */}
                            {order.plans && (
                            <div className="mb-4">
                            <h4 className="text-xl font-semibold text-blue-600">Plan Details</h4>
                            <div className="text-gray-700 pl-4 text-xl">
                            <p><span className="font-semibold">Name:</span> {order.plans?.name || '-'}</p>
                            <p><span className="font-semibold">SetUp Fees: </span>{order.plans?.setup_fees || '0.00'} LE</p>
                            <p><span className="font-semibold">Price Per Month: </span>{order.plans?.price_per_month || '0.00'} LE</p>
                            <p><span className="font-semibold">Price Per Year: </span>{order.plans?.price_per_year || '0.00'} LE</p>
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
                                    <p><span className="font-semibold">Price:</span> {order.domain.price || '-'}</p>
                                    <p><span className="font-semibold">Store Name:</span> {order.domain.status || '-'}</p>
                            </div>
                            </div>
                            )}

                            {order.extra && order.extra !== null && (
                            <div>
                            <h4 className="text-lg font-semibold text-purple-600">Extra Product</h4>
                            <div className="text-gray-700 pl-4 text-xl">
                                    <p><span className="font-semibold">Product Name:</span> {order.extra?.name || '-'}</p>
                            </div>
                            </div>
                            )}
                            </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>

        <div className='p-4 border border-2 border-mainColor '>
          <h1 className='text-2xl font-bold text-center text-mainColor'>Total : {payment.amount || 0}</h1>
        </div>

          {/* Close Button */}
          <div className="w-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="mt-6 bg-mainColor w-1/2 md:w-1/3 text-center text-xl text-white py-2 px-6 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>

      </div>
    </div>
  );
};

export default PaymentModel;
